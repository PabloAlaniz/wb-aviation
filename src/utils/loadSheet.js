/**
 * Helpers for the printable load sheet (hoja de carga).
 */

export const LOAD_SHEET_STORAGE_KEY = "wb-load-sheet"
export const APP_URL = "https://wb-aviation.pages.dev"

/**
 * Flight details typed by the pilot before printing. Everything but the date
 * is persisted (the date defaults to today on every visit).
 * @typedef {{
 *   pilot: string,
 *   registration: string,
 *   departure: string,
 *   destination: string,
 *   remarks: string,
 * }} StoredLoadSheetDetails
 * @typedef {StoredLoadSheetDetails & { date: string }} LoadSheetDetails
 */

/** @type {StoredLoadSheetDetails} */
export const EMPTY_LOAD_SHEET_DETAILS = {
  pilot: "",
  registration: "",
  departure: "",
  destination: "",
  remarks: "",
}

/**
 * Validator for the persisted details (used by useLocalStorage).
 * @param {unknown} value
 * @returns {boolean}
 */
export function isStoredLoadSheetDetails(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false
  const record = /** @type {Record<string, unknown>} */ (value)
  return Object.keys(EMPTY_LOAD_SHEET_DETAILS).every(
    (key) => record[key] === undefined || typeof record[key] === "string"
  )
}

/**
 * Today's date as YYYY-MM-DD in local time (the format of <input type="date">).
 * @param {Date} [now]
 */
export function todayIso(now = new Date()) {
  const pad = (/** @type {number} */ n) => String(n).padStart(2, "0")
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

/**
 * Registration of a custom aircraft (by registration), or "" for catalog models.
 * @param {import("../types").Aircraft} aircraft
 * @returns {string}
 */
export function aircraftRegistration(aircraft) {
  const registration = aircraft.metadata?.registration
  return aircraft.metadata?.userProvided && typeof registration === "string" ? registration : ""
}

/**
 * Normalize an ICAO aerodrome code as it is typed: uppercase letters/digits, max 4.
 * @param {string} value
 */
export function normalizeIcao(value) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 4)
}

/**
 * @typedef {{ key: string, label: string, weight: number, arm: number, moment: number }} LoadSheetRow
 */

/**
 * Rows of the stations table: the empty aircraft first, then every load
 * station in form order (weights in lbs, arms in inches, moments in lb-in).
 * @param {import("../types").Aircraft} aircraft
 * @param {import("../types").StationWeights} weights
 * @param {(station: import("../types").LoadStation) => string} labelFor
 * @param {string} emptyLabel
 * @returns {LoadSheetRow[]}
 */
export function buildLoadSheetRows(aircraft, weights, labelFor, emptyLabel) {
  /** @type {LoadSheetRow[]} */
  const rows = [
    {
      key: "empty",
      label: emptyLabel,
      weight: aircraft.emptyWeight,
      arm: aircraft.emptyArm,
      moment: aircraft.emptyWeight * aircraft.emptyArm,
    },
  ]
  for (const station of aircraft.loadStations) {
    const arm = aircraft.stations[station.key]
    if (typeof arm !== "number") continue
    const weight = Number.parseFloat(weights[station.key]) || 0
    rows.push({ key: station.key, label: labelFor(station), weight, arm, moment: weight * arm })
  }
  return rows
}
