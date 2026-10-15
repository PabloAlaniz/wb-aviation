/**
 * Fleet links ("school mode" v0).
 *
 * An instructor or flight school shares the aircraft saved by registration
 * as a single URL: `?fleet=<base64url(JSON)>`. Students open it and import
 * the records into their own device. Nothing leaves the browser except the
 * link itself.
 *
 * Payload (version 1), JSON before base64url encoding:
 *
 *   { "v": 1, "n": "Aeroclub X", "r": [[baseModelId, registration, emptyWeight, emptyArm, name?], ...] }
 *
 * - `v`: format version (required, must be 1).
 * - `n`: school/club name (optional, max MAX_FLEET_NAME_LENGTH chars).
 * - `r`: records as tuples; weights in lbs, arms in inches (the same units
 *   stored in localStorage). Optional 5th item: the record's display name.
 *
 * Decoding is strict and never throws: anything malformed returns null and
 * individual invalid entries (unknown base model, bad numbers, bad
 * registration) are dropped by reusing the custom aircraft validation.
 */
import { aircraftData } from "../data/aircraft"
import { sanitizeCustomAircraftRecords } from "./customAircraft"

export const FLEET_PARAM = "fleet"
export const FLEET_LINK_VERSION = 1
export const MAX_FLEET_AIRCRAFT = 30
export const MAX_FLEET_NAME_LENGTH = 60
export const MAX_RECORD_NAME_LENGTH = 40
/** Upper bound for the encoded param; a full legit fleet is well below it. */
export const MAX_FLEET_PARAM_LENGTH = 6000

const BASE64URL_PATTERN = /^[A-Za-z0-9_-]+$/
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/g

/**
 * @typedef {{
 *   name: string,
 *   records: import("./customAircraft").CustomAircraftRecord[],
 * }} Fleet
 */

/**
 * Trim, strip control characters and cap the length of free text.
 * @param {unknown} value
 * @param {number} maxLength
 * @returns {string}
 */
function cleanText(value, maxLength) {
  if (typeof value !== "string") return ""
  return value.replace(CONTROL_CHARS, "").trim().slice(0, maxLength).trim()
}

/**
 * @param {string} text
 * @returns {string} base64url (no padding) of the UTF-8 bytes
 */
function toBase64Url(text) {
  const bytes = new TextEncoder().encode(text)
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

/**
 * @param {string} encoded - base64url (padding optional)
 * @returns {string} decoded UTF-8 text
 * @throws When the input is not valid base64 or not valid UTF-8
 */
function fromBase64Url(encoded) {
  const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/")
  const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4))
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
}

/**
 * Encode records (+ optional school name) as the `fleet` param value.
 * Records are validated/normalized first and capped at MAX_FLEET_AIRCRAFT.
 * @param {import("./customAircraft").CustomAircraftRecord[]} records
 * @param {string} [name] - School / club name
 * @param {import("./customAircraft").AircraftCatalog} [catalog]
 * @returns {string | null} null when there is no valid record to share
 */
export function encodeFleet(records, name = "", catalog = aircraftData) {
  const valid = sanitizeCustomAircraftRecords(records, catalog).slice(0, MAX_FLEET_AIRCRAFT)
  if (valid.length === 0) return null

  /** @type {{ v: number, n?: string, r: (string | number)[][] }} */
  const payload = {
    v: FLEET_LINK_VERSION,
    r: valid.map((record) => {
      const tuple = [record.baseModelId, record.registration, record.emptyWeight, record.emptyArm]
      const recordName = cleanText(record.name, MAX_RECORD_NAME_LENGTH)
      return recordName ? [...tuple, recordName] : tuple
    }),
  }
  const schoolName = cleanText(name, MAX_FLEET_NAME_LENGTH)
  if (schoolName) payload.n = schoolName
  return toBase64Url(JSON.stringify(payload))
}

/**
 * Decode a `fleet` param value. Never throws.
 * @param {unknown} param
 * @param {import("./customAircraft").AircraftCatalog} [catalog]
 * @returns {Fleet | null} null when the param is malformed, oversized, of an
 *   unknown version or contains no valid aircraft
 */
export function decodeFleet(param, catalog = aircraftData) {
  if (typeof param !== "string" || param.length === 0) return null
  if (param.length > MAX_FLEET_PARAM_LENGTH || !BASE64URL_PATTERN.test(param)) return null

  /** @type {unknown} */
  let payload
  try {
    payload = JSON.parse(fromBase64Url(param))
  } catch {
    return null
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null

  const { v, n, r } = /** @type {{ v?: unknown, n?: unknown, r?: unknown }} */ (payload)
  if (v !== FLEET_LINK_VERSION) return null
  if (!Array.isArray(r) || r.length === 0 || r.length > MAX_FLEET_AIRCRAFT) return null

  /** @type {Record<string, unknown>[]} */
  const candidates = []
  for (const entry of r) {
    if (!Array.isArray(entry) || entry.length < 4 || entry.length > 5) continue
    const [baseModelId, registration, emptyWeight, emptyArm, recordName] = entry
    if (typeof baseModelId !== "string" || typeof registration !== "string") continue
    if (typeof emptyWeight !== "number" || typeof emptyArm !== "number") continue
    /** @type {Record<string, unknown>} */
    const candidate = { baseModelId, registration, emptyWeight, emptyArm }
    const cleanName = cleanText(recordName, MAX_RECORD_NAME_LENGTH)
    if (cleanName) candidate.name = cleanName
    candidates.push(candidate)
  }

  const records = sanitizeCustomAircraftRecords(candidates, catalog)
  if (records.length === 0) return null
  return { name: cleanText(n, MAX_FLEET_NAME_LENGTH), records }
}

/**
 * Build a shareable fleet URL on top of the app's base URL (any existing
 * query string or hash is dropped).
 * @param {import("./customAircraft").CustomAircraftRecord[]} records
 * @param {string} name
 * @param {string} baseHref - e.g. window.location.href
 * @returns {string | null}
 */
export function buildFleetUrl(records, name, baseHref) {
  const param = encodeFleet(records, name)
  if (!param) return null
  const url = new URL(baseHref)
  url.search = ""
  url.hash = ""
  url.searchParams.set(FLEET_PARAM, param)
  return url.toString()
}

/**
 * @param {string} search - e.g. window.location.search
 * @returns {string | null} Raw `fleet` param, null when absent
 */
export function readFleetParam(search) {
  return new URLSearchParams(search).get(FLEET_PARAM)
}

/**
 * Remove the `fleet` param from a URL, keeping every other param and hash.
 * @param {string} href
 * @returns {string} Relative URL (path + query + hash) for history.replaceState
 */
export function withoutFleetParam(href) {
  const url = new URL(href)
  url.searchParams.delete(FLEET_PARAM)
  return `${url.pathname}${url.search}${url.hash}`
}
