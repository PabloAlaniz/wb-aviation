/**
 * Display unit conversions.
 *
 * All W&B calculations stay in imperial units internally (lbs, inches,
 * lb-in). This module only converts values for display and converts user
 * input back to imperial before it reaches the calculation state.
 */

/** @typedef {import("../types").UnitSystem} UnitSystem */

/** Exact definition: 1 lb = 0.45359237 kg. */
export const KG_PER_LB = 0.45359237
/** Exact definition: 1 in = 25.4 mm. */
export const MM_PER_IN = 25.4
/** Exact definition: 1 US gal = 3.785411784 L. */
export const L_PER_US_GAL = 3.785411784

/** Standard AVGAS 100LL density used for W&B: 6.0 lb per US gallon. */
export const AVGAS_LB_PER_US_GAL = 6.0
/**
 * Same density in metric (≈ 0.72 kg/L). Derived from the imperial value so
 * that gal ↔ L ↔ weight conversions stay mutually consistent.
 */
export const AVGAS_KG_PER_L = (AVGAS_LB_PER_US_GAL * KG_PER_LB) / L_PER_US_GAL

export const DEFAULT_UNITS = /** @type {UnitSystem} */ ("imperial")

/** @type {UnitSystem[]} */
export const UNIT_SYSTEMS = ["imperial", "metric"]

/**
 * @param {unknown} value
 * @returns {value is UnitSystem}
 */
export function isUnitSystem(value) {
  return value === "imperial" || value === "metric"
}

/**
 * Short unit symbols for a unit system.
 * @param {UnitSystem} units
 * @returns {{ weight: string, arm: string, volume: string, moment: string }}
 */
export function unitSymbols(units) {
  return units === "metric"
    ? { weight: "kg", arm: "mm", volume: "L", moment: "kg·mm" }
    : { weight: "lbs", arm: "in", volume: "gal", moment: "lb-in" }
}

/**
 * Suffix appended to an arm value: `"` (inches) or ` mm`.
 * @param {UnitSystem} units
 */
export function armSuffix(units) {
  return units === "metric" ? " mm" : '"'
}

// --- weight ---------------------------------------------------------------

/**
 * @param {number} lbs
 * @param {UnitSystem} units
 * @returns {number} weight in the display unit (lbs or kg)
 */
export function weightToDisplay(lbs, units) {
  return units === "metric" ? lbs * KG_PER_LB : lbs
}

/**
 * @param {number} value - weight in the display unit (lbs or kg)
 * @param {UnitSystem} units
 * @returns {number} weight in lbs
 */
export function weightFromDisplay(value, units) {
  return units === "metric" ? value / KG_PER_LB : value
}

// --- arm ------------------------------------------------------------------

/**
 * @param {number} inches
 * @param {UnitSystem} units
 * @returns {number} arm in the display unit (in or mm)
 */
export function armToDisplay(inches, units) {
  return units === "metric" ? inches * MM_PER_IN : inches
}

/**
 * @param {number} value - arm in the display unit (in or mm)
 * @param {UnitSystem} units
 * @returns {number} arm in inches
 */
export function armFromDisplay(value, units) {
  return units === "metric" ? value / MM_PER_IN : value
}

// --- moment ---------------------------------------------------------------

/**
 * @param {number} lbIn - moment in lb-in
 * @param {UnitSystem} units
 * @returns {number} moment in lb-in or kg·mm
 */
export function momentToDisplay(lbIn, units) {
  return units === "metric" ? lbIn * KG_PER_LB * MM_PER_IN : lbIn
}

/**
 * @param {number} value - moment in lb-in or kg·mm
 * @param {UnitSystem} units
 * @returns {number} moment in lb-in
 */
export function momentFromDisplay(value, units) {
  return units === "metric" ? value / (KG_PER_LB * MM_PER_IN) : value
}

// --- fuel volume ----------------------------------------------------------

/**
 * Convert a fuel volume (US gal or L, per unit system) to weight in lbs
 * using the standard AVGAS density.
 * @param {number} volume
 * @param {UnitSystem} units
 * @returns {number} fuel weight in lbs
 */
export function fuelVolumeToLbs(volume, units) {
  const gallons = units === "metric" ? volume / L_PER_US_GAL : volume
  return gallons * AVGAS_LB_PER_US_GAL
}

/**
 * Convert a fuel weight in lbs to volume (US gal or L, per unit system).
 * @param {number} lbs
 * @param {UnitSystem} units
 * @returns {number} volume in gal or L
 */
export function lbsToFuelVolume(lbs, units) {
  const gallons = lbs / AVGAS_LB_PER_US_GAL
  return units === "metric" ? gallons * L_PER_US_GAL : gallons
}

// --- formatting -----------------------------------------------------------

/**
 * Round to a fixed number of decimals and drop trailing zeros
 * (e.g. 80.00 -> "80", 79.4 -> "79.4"). Non-finite values give "".
 * @param {number} value
 * @param {number} [decimals]
 */
export function trimNumber(value, decimals = 1) {
  if (!Number.isFinite(value)) return ""
  return String(Number(value.toFixed(decimals)))
}

/**
 * Format a weight given in lbs for display, e.g. "8000.0 lbs" / "3628.7 kg".
 * @param {number} lbs
 * @param {UnitSystem} units
 * @param {number} [decimals]
 */
export function formatWeight(lbs, units, decimals = 1) {
  return `${weightToDisplay(lbs, units).toFixed(decimals)} ${unitSymbols(units).weight}`
}

/**
 * Format an arm given in inches for display, e.g. `152.00"` / "3860.8 mm".
 * @param {number} inches
 * @param {UnitSystem} units
 * @param {number} [decimals] - defaults to 2 (in) or 1 (mm)
 */
export function formatArm(inches, units, decimals) {
  const places = decimals ?? (units === "metric" ? 1 : 2)
  return `${armToDisplay(inches, units).toFixed(places)}${armSuffix(units)}`
}

/**
 * Convert a stored lbs string (form state) to the text shown in an input.
 * Imperial weights are passed through untouched.
 * @param {string | undefined} lbsText
 * @param {UnitSystem} units
 * @param {"weight" | "volume"} [mode]
 */
export function lbsTextToInput(lbsText, units, mode = "weight") {
  if (lbsText === undefined || lbsText === "") return ""
  if (units === "imperial" && mode === "weight") return lbsText
  const lbs = Number(lbsText)
  if (!Number.isFinite(lbs)) return ""
  const value = mode === "volume" ? lbsToFuelVolume(lbs, units) : weightToDisplay(lbs, units)
  return trimNumber(value, 1)
}

/**
 * Convert input text in the display unit to the lbs string stored in the
 * form state. Imperial weights are passed through untouched; converted
 * values keep 4 decimals so round-trips back to the input are stable.
 * @param {string} inputText
 * @param {UnitSystem} units
 * @param {"weight" | "volume"} [mode]
 */
export function inputToLbsText(inputText, units, mode = "weight") {
  if (inputText === "") return ""
  if (units === "imperial" && mode === "weight") return inputText
  const value = Number(inputText)
  if (!Number.isFinite(value)) return ""
  const lbs = mode === "volume" ? fuelVolumeToLbs(value, units) : weightFromDisplay(value, units)
  return trimNumber(lbs, 4)
}
