/**
 * Saved loads: named loadings a pilot flies often (solo, dual, full cabin),
 * kept per aircraft on the device so they can be applied in one tap.
 *
 * A record stores the ramp station weights (lbs, only loaded stations), the
 * planned fuel burn and the taxi fuel. Names are unique per aircraft (case
 * insensitive): saving with an existing name replaces that load.
 */
import { emptyWeightsFor } from "../data/aircraft"
import { parseStationWeight } from "./calculations"

export const SAVED_LOADS_STORAGE_KEY = "wb-saved-loads"
export const MAX_LOAD_NAME_LENGTH = 40
/** Oldest loads of an aircraft are dropped beyond this many. */
export const MAX_LOADS_PER_AIRCRAFT = 20
/** Upper bound for any stored weight (lbs). */
const MAX_WEIGHT_LBS = 100000

/**
 * @typedef {{
 *   aircraftId: string,
 *   name: string,
 *   weights: import("../types").StationWeights,
 *   fuelBurn: string,
 *   taxiFuel: string,
 * }} SavedLoad
 *
 * @typedef {"nameRequired" | "nothingToSave"} SavedLoadErrorCode
 */

/**
 * Trim, collapse inner whitespace and cap the length of a load name.
 * @param {unknown} name
 * @returns {string}
 */
export function normalizeLoadName(name) {
  return typeof name === "string"
    ? name.trim().replace(/\s+/g, " ").slice(0, MAX_LOAD_NAME_LENGTH).trim()
    : ""
}

/**
 * @param {unknown} value
 * @returns {string} The amount as a lbs string, "" when empty or not a valid positive weight
 */
function toStoredAmount(value) {
  if (typeof value !== "string" && typeof value !== "number") return ""
  const amount = Number.parseFloat(String(value))
  return Number.isFinite(amount) && amount > 0 && amount <= MAX_WEIGHT_LBS ? String(amount) : ""
}

/**
 * Build a normalized record from the current form state.
 * @param {{
 *   aircraftId: unknown,
 *   name: unknown,
 *   weights: unknown,
 *   fuelBurn?: unknown,
 *   taxiFuel?: unknown,
 * }} input
 * @returns {{ record: SavedLoad, error: null } | { record: null, error: SavedLoadErrorCode }}
 */
export function toSavedLoad({ aircraftId, name, weights, fuelBurn = "", taxiFuel = "" }) {
  const cleanName = normalizeLoadName(name)
  if (!cleanName) return { record: null, error: "nameRequired" }

  /** @type {import("../types").StationWeights} */
  const loaded = {}
  if (weights !== null && typeof weights === "object" && !Array.isArray(weights)) {
    for (const [station, value] of Object.entries(weights)) {
      const amount = toStoredAmount(value)
      if (amount) loaded[station] = amount
    }
  }
  if (typeof aircraftId !== "string" || !aircraftId || Object.keys(loaded).length === 0) {
    return { record: null, error: "nothingToSave" }
  }

  return {
    record: {
      aircraftId,
      name: cleanName,
      weights: loaded,
      fuelBurn: toStoredAmount(fuelBurn),
      taxiFuel: toStoredAmount(taxiFuel),
    },
    error: null,
  }
}

/**
 * @param {SavedLoad} a
 * @param {string} aircraftId
 * @param {string} name
 */
function isSameLoad(a, aircraftId, name) {
  return a.aircraftId === aircraftId && a.name.toLowerCase() === name.toLowerCase()
}

/**
 * Keep only valid records (re-normalized); later duplicates win. Never throws.
 * @param {unknown} value
 * @returns {SavedLoad[]}
 */
export function sanitizeSavedLoads(value) {
  if (!Array.isArray(value)) return []
  /** @type {SavedLoad[]} */
  let loads = []
  for (const entry of value) {
    if (entry === null || typeof entry !== "object") continue
    const { record } = toSavedLoad(entry)
    if (record) loads = upsertSavedLoad(loads, record)
  }
  return loads
}

/**
 * Insert a load, replacing the one with the same name for that aircraft and
 * dropping the aircraft's oldest loads beyond MAX_LOADS_PER_AIRCRAFT.
 * @param {SavedLoad[]} loads
 * @param {SavedLoad} record
 * @returns {SavedLoad[]}
 */
export function upsertSavedLoad(loads, record) {
  const next = [
    ...loads.filter((load) => !isSameLoad(load, record.aircraftId, record.name)),
    record,
  ]
  let excess =
    next.filter((load) => load.aircraftId === record.aircraftId).length - MAX_LOADS_PER_AIRCRAFT
  return next.filter((load) => load.aircraftId !== record.aircraftId || excess-- <= 0)
}

/**
 * @param {SavedLoad[]} loads
 * @param {string} aircraftId
 * @param {string} name
 * @returns {SavedLoad[]}
 */
export function removeSavedLoad(loads, aircraftId, name) {
  return loads.filter((load) => !isSameLoad(load, aircraftId, name))
}

/**
 * Drop every load of an aircraft (e.g. when a custom aircraft is deleted).
 * @param {SavedLoad[]} loads
 * @param {string} aircraftId
 * @returns {SavedLoad[]}
 */
export function removeLoadsForAircraft(loads, aircraftId) {
  return loads.filter((load) => load.aircraftId !== aircraftId)
}

/**
 * @param {SavedLoad[]} loads
 * @param {string} aircraftId
 * @returns {SavedLoad[]}
 */
export function loadsForAircraft(loads, aircraftId) {
  return loads.filter((load) => load.aircraftId === aircraftId)
}

/**
 * Form weights for a saved load: every station of the aircraft, empty unless
 * the load has it. Stations the aircraft no longer has are ignored.
 * @param {SavedLoad} load
 * @param {import("../types").Aircraft} aircraft
 * @returns {import("../types").StationWeights}
 */
export function savedLoadWeights(load, aircraft) {
  const weights = emptyWeightsFor(aircraft)
  for (const key of Object.keys(weights)) {
    if (Object.hasOwn(load.weights, key)) weights[key] = load.weights[key]
  }
  return weights
}

/**
 * Total weight loaded by a saved load (lbs), fuel included.
 * @param {SavedLoad} load
 * @returns {number}
 */
export function savedLoadTotal(load) {
  return Object.values(load.weights).reduce((sum, value) => sum + parseStationWeight(value), 0)
}
