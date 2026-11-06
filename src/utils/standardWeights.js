/**
 * Standard person weights for one-tap loading of crew and passenger seats.
 * Defaults follow common operator manuals (crew 85 kg, adult 75 kg, child
 * 35 kg); every user can change them to their own operator's values.
 * Values are kept in lbs, like the rest of the calculation state.
 */
import { KG_PER_LB, trimNumber } from "./units"

/** @typedef {"crew" | "adult" | "child"} StandardWeightKey */
/** @typedef {Record<StandardWeightKey, number>} StandardWeights */
/** @typedef {"crew" | "passenger"} SeatKind */

export const STANDARD_WEIGHTS_STORAGE_KEY = "wb-standard-weights"

/** Upper bound for a standard person weight (lbs). */
const MAX_PERSON_LBS = 1000

/** @type {StandardWeights} */
export const DEFAULT_STANDARD_WEIGHTS = {
  crew: 85 / KG_PER_LB,
  adult: 75 / KG_PER_LB,
  child: 35 / KG_PER_LB,
}

/** @type {StandardWeightKey[]} */
export const STANDARD_WEIGHT_KEYS = ["crew", "adult", "child"]

/** Standard weights offered for each kind of seat. */
export const STANDARD_WEIGHTS_FOR_SEAT = /** @type {Record<SeatKind, StandardWeightKey[]>} */ ({
  crew: ["crew"],
  passenger: ["adult", "child"],
})

const CREW_STATION = /^(pilot|copilot)$/
const PASSENGER_STATION = /^(frontPassenger|rearPassenger\d*|passenger\d*|patient)$/
const CREW_LABELS = new Set(["stations.pilot", "stations.copilot"])

/**
 * Whether a load station seats crew, a passenger, or nobody (baggage, fuel...).
 * The label decides for crew keys: trainers reuse the "copilot" key for the
 * front passenger seat (labelKey "stations.frontPassenger").
 * @param {Pick<import("../types").LoadStation, "key" | "labelKey">} station
 * @returns {SeatKind | null}
 */
export function seatKind({ key, labelKey }) {
  if (CREW_STATION.test(key)) {
    return labelKey === undefined || CREW_LABELS.has(labelKey) ? "crew" : "passenger"
  }
  if (PASSENGER_STATION.test(key)) return "passenger"
  return null
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isPersonWeight(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 && value <= MAX_PERSON_LBS
}

/**
 * Validator for the persisted standard weights (used by useLocalStorage).
 * @param {unknown} value
 * @returns {boolean}
 */
export function isStandardWeights(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false
  const record = /** @type {Record<string, unknown>} */ (value)
  return STANDARD_WEIGHT_KEYS.every((key) => isPersonWeight(record[key]))
}

/**
 * Station value (lbs text) for a standard weight. Imperial users see the
 * stored text as typed, so it is rounded to 0.1 lb; metric users get 4
 * decimals so the weight reads back as the exact kg value.
 * @param {number} lbs
 * @param {import("../types").UnitSystem} units
 */
export function standardWeightText(lbs, units) {
  return trimNumber(lbs, units === "metric" ? 4 : 1)
}
