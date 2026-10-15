/**
 * Shareable calculation links.
 *
 * A calculation (aircraft, station weights, planned fuel burn and display
 * units) is encoded as base64url JSON in the `s` URL param:
 *
 *   ?s=<base64url(JSON)>
 *   { v: 1, a: aircraftId, w?: { station: lbs }, b?: fuelBurnLbs, u?: "i" | "m",
 *     c?: { m: baseModelId, r: registration, e: emptyWeight, x: emptyArm, n?: name } }
 *
 * Weights are always in lbs (the internal unit), rounded to 2 decimals; empty
 * or non-positive stations are dropped. `c` is only present for custom
 * aircraft (`a` = "custom:<REG>") so the recipient can rebuild the aircraft
 * even if it is not saved on their device.
 *
 * Decoding is strict and never throws: any malformed, oversized or unknown
 * payload yields null.
 */
import { aircraftData } from "../data/aircraft"
import { customAircraftId, isCustomAircraftId, toCustomAircraftRecord } from "./customAircraft"

export const SHARE_PARAM = "s"
export const SHARE_VERSION = 1
/** Upper bound for the encoded param (a full King Air load is ~200 chars). */
export const MAX_SHARE_PARAM_LENGTH = 1500
/** Upper bound for any shared weight (lbs). */
const MAX_WEIGHT_LBS = 100000
const MAX_NAME_LENGTH = 60

/**
 * @typedef {{
 *   aircraftId: string,
 *   weights: import("../types").StationWeights,
 *   fuelBurn: string,
 *   units: import("../types").UnitSystem,
 *   customRecords?: import("./customAircraft").CustomAircraftRecord[],
 * }} ShareableState
 *
 * @typedef {{
 *   aircraftId: string,
 *   customRecord: import("./customAircraft").CustomAircraftRecord | null,
 *   weights: import("../types").StationWeights,
 *   fuelBurn: string,
 *   units: import("../types").UnitSystem | null,
 * }} SharedCalculation
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

/**
 * @param {unknown} value
 * @returns {number | null} Rounded positive weight, or null when not shareable
 */
function toShareableWeight(value) {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN
  if (typeof value === "string" && value.trim() === "") return null
  if (!Number.isFinite(n) || n <= 0 || n > MAX_WEIGHT_LBS) return null
  return Math.round(n * 100) / 100
}

/**
 * @param {unknown} value
 * @returns {value is number}
 */
function isValidWeight(value) {
  return (
    typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= MAX_WEIGHT_LBS
  )
}

/** @param {string} text */
function toBase64Url(text) {
  const bytes = new TextEncoder().encode(text)
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

/**
 * @param {string} encoded
 * @returns {string | null}
 */
function fromBase64Url(encoded) {
  if (!/^[A-Za-z0-9_-]+$/.test(encoded)) return null
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/")
    const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4))
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return null
  }
}

/**
 * Encode a calculation into the `s` param value.
 * @param {ShareableState} state
 * @returns {string | null} null when the aircraft cannot be shared (unknown id
 *   or a custom aircraft without its record)
 */
export function encodeSharedCalculation({
  aircraftId,
  weights,
  fuelBurn,
  units,
  customRecords = [],
}) {
  /** @type {Record<string, unknown>} */
  const payload = { v: SHARE_VERSION, a: aircraftId }

  if (isCustomAircraftId(aircraftId)) {
    const record = customRecords.find((r) => customAircraftId(r.registration) === aircraftId)
    if (!record) return null
    /** @type {Record<string, unknown>} */
    const c = {
      m: record.baseModelId,
      r: record.registration,
      e: record.emptyWeight,
      x: record.emptyArm,
    }
    if (record.name) c.n = record.name.slice(0, MAX_NAME_LENGTH)
    payload.c = c
  } else if (!Object.hasOwn(aircraftData, aircraftId)) {
    return null
  }

  /** @type {Record<string, number>} */
  const w = {}
  for (const [station, value] of Object.entries(weights ?? {})) {
    const weight = toShareableWeight(value)
    if (weight !== null) w[station] = weight
  }
  if (Object.keys(w).length > 0) payload.w = w

  const burn = toShareableWeight(fuelBurn)
  if (burn !== null) payload.b = burn
  if (units === "metric") payload.u = "m"

  return toBase64Url(JSON.stringify(payload))
}

/**
 * Decode and validate an `s` param value. Never throws.
 * @param {unknown} param
 * @returns {SharedCalculation | null}
 */
export function decodeSharedCalculation(param) {
  if (typeof param !== "string" || param.length === 0 || param.length > MAX_SHARE_PARAM_LENGTH) {
    return null
  }
  const json = fromBase64Url(param)
  if (json === null) return null

  /** @type {unknown} */
  let payload
  try {
    payload = JSON.parse(json)
  } catch {
    return null
  }
  if (!isPlainObject(payload) || payload.v !== SHARE_VERSION) return null

  const { a: aircraftId, c, w, b, u } = payload
  if (typeof aircraftId !== "string") return null

  /** @type {import("./customAircraft").CustomAircraftRecord | null} */
  let customRecord = null
  /** @type {import("../types").Aircraft} */
  let base
  if (isCustomAircraftId(aircraftId)) {
    if (!isPlainObject(c)) return null
    if (c.n !== undefined && (typeof c.n !== "string" || c.n.length > MAX_NAME_LENGTH)) return null
    // numbers must be real numbers (no "1700" strings, no NaN tricks)
    if (typeof c.e !== "number" || typeof c.x !== "number" || typeof c.m !== "string") return null
    customRecord = toCustomAircraftRecord({
      baseModelId: c.m,
      registration: typeof c.r === "string" ? c.r : "",
      emptyWeight: c.e,
      emptyArm: c.x,
      name: typeof c.n === "string" ? c.n : undefined,
    })
    if (!customRecord || customAircraftId(customRecord.registration) !== aircraftId) return null
    base = aircraftData[customRecord.baseModelId]
  } else {
    if (!Object.hasOwn(aircraftData, aircraftId) || c !== undefined) return null
    base = aircraftData[aircraftId]
  }

  const stationKeys = new Set(base.loadStations.map((station) => station.key))
  /** @type {import("../types").StationWeights} */
  const weights = {}
  if (w !== undefined) {
    if (!isPlainObject(w)) return null
    for (const [station, value] of Object.entries(w)) {
      if (!stationKeys.has(station) || !isValidWeight(value)) return null
      weights[station] = String(value)
    }
  }

  if (b !== undefined && !isValidWeight(b)) return null
  if (u !== undefined && u !== "i" && u !== "m") return null

  return {
    aircraftId,
    customRecord,
    weights,
    fuelBurn: b === undefined ? "" : String(b),
    units: u === "m" ? "metric" : u === "i" ? "imperial" : null,
  }
}

/**
 * Build the full share URL for the current page.
 * @param {string} href - Current location (query and hash are discarded)
 * @param {ShareableState} state
 * @returns {string | null}
 */
export function buildShareUrl(href, state) {
  const encoded = encodeSharedCalculation(state)
  if (encoded === null) return null
  try {
    const url = new URL(href)
    return `${url.origin}${url.pathname}?${SHARE_PARAM}=${encoded}`
  } catch {
    return null
  }
}

/**
 * Read the raw share param from a query string.
 * @param {string} search - e.g. window.location.search
 * @returns {string | null}
 */
export function readShareParam(search) {
  try {
    return new URLSearchParams(search).get(SHARE_PARAM)
  } catch {
    return null
  }
}

/**
 * Remove the share param from a URL, keeping any other params and the hash.
 * @param {string} href
 * @returns {string} Relative URL (path + query + hash) for history.replaceState
 */
export function withoutShareParam(href) {
  const url = new URL(href)
  url.searchParams.delete(SHARE_PARAM)
  return `${url.pathname}${url.search}${url.hash}`
}
