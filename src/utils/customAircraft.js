/**
 * Custom aircraft by registration (matrícula).
 *
 * A pilot must use the empty weight and empty arm from the Weight & Balance
 * Report of their own aircraft, not the generic POH values. A custom aircraft
 * is a catalog model (envelope, stations, limits) cloned with the empty
 * weight/arm overridden by user data.
 *
 * Only the minimal user input (a "record") is persisted; the full aircraft is
 * rebuilt from the catalog on load, so catalog fixes reach saved aircraft and
 * records whose base model no longer exists are dropped.
 */
import { aircraftData } from "../data/aircraft"
import { messages as m } from "../i18n"

export const CUSTOM_ID_PREFIX = "custom:"
export const CUSTOM_AIRCRAFT_STORAGE_KEY = "wb-custom-aircraft"

/** Letters, digits and dashes (e.g. LV-ABC, N12345, PR-XYZ). */
const REGISTRATION_PATTERN = /^[A-Z0-9][A-Z0-9-]{1,9}$/

/**
 * Persisted user input for one custom aircraft.
 * @typedef {{
 *   baseModelId: string,
 *   registration: string,
 *   emptyWeight: number,
 *   emptyArm: number,
 *   name?: string,
 * }} CustomAircraftRecord
 */

/**
 * Raw form input (numbers may still be strings).
 * @typedef {{
 *   baseModelId: string,
 *   registration: string,
 *   emptyWeight: number | string,
 *   emptyArm: number | string,
 *   name?: string,
 * }} CustomAircraftInput
 */

/**
 * Error codes per field; the UI maps them to localized messages.
 * @typedef {"registrationRequired" | "registrationInvalid" | "baseModelUnknown"
 *   | "emptyWeightInvalid" | "emptyWeightAboveMax" | "emptyArmInvalid"} CustomAircraftErrorCode
 * @typedef {Partial<Record<"registration" | "baseModelId" | "emptyWeight" | "emptyArm", CustomAircraftErrorCode>>} CustomAircraftErrors
 */

/** @typedef {Record<string, import('../types').Aircraft>} AircraftCatalog */

/**
 * Normalize a registration: trim, uppercase and drop inner whitespace.
 * @param {unknown} registration
 * @returns {string}
 */
export function normalizeRegistration(registration) {
  return typeof registration === "string"
    ? registration.trim().toUpperCase().replace(/\s+/g, "")
    : ""
}

/**
 * @param {string} registration - Normalized registration
 * @returns {string} Aircraft id, e.g. "custom:LV-ABC"
 */
export function customAircraftId(registration) {
  return `${CUSTOM_ID_PREFIX}${normalizeRegistration(registration)}`
}

/**
 * @param {unknown} id
 * @returns {boolean} Whether the id belongs to a custom aircraft
 */
export function isCustomAircraftId(id) {
  return (
    typeof id === "string" && id.startsWith(CUSTOM_ID_PREFIX) && id.length > CUSTOM_ID_PREFIX.length
  )
}

/**
 * @param {number | string} value
 * @returns {number} Parsed number, NaN for empty or non-numeric input
 */
function toNumber(value) {
  if (typeof value === "number") return value
  if (typeof value !== "string" || value.trim() === "") return NaN
  return Number(value)
}

/**
 * Validate user input for a custom aircraft.
 * @param {CustomAircraftInput} input
 * @param {AircraftCatalog} [catalog] - Base models (defaults to the built-in catalog)
 * @returns {CustomAircraftErrors} Empty object when valid
 */
export function validateCustomAircraft(input, catalog = aircraftData) {
  /** @type {CustomAircraftErrors} */
  const errors = {}

  const registration = normalizeRegistration(input.registration)
  if (!registration) errors.registration = "registrationRequired"
  else if (!REGISTRATION_PATTERN.test(registration)) errors.registration = "registrationInvalid"

  const base = Object.hasOwn(catalog, input.baseModelId) ? catalog[input.baseModelId] : undefined
  if (!base) errors.baseModelId = "baseModelUnknown"

  const emptyWeight = toNumber(input.emptyWeight)
  if (!Number.isFinite(emptyWeight) || emptyWeight <= 0) errors.emptyWeight = "emptyWeightInvalid"
  else if (base && emptyWeight >= base.maxWeight) errors.emptyWeight = "emptyWeightAboveMax"

  const emptyArm = toNumber(input.emptyArm)
  if (!Number.isFinite(emptyArm) || emptyArm <= 0) errors.emptyArm = "emptyArmInvalid"

  return errors
}

/**
 * Turn valid form input into a normalized record ready to persist.
 * @param {CustomAircraftInput} input
 * @param {AircraftCatalog} [catalog]
 * @returns {CustomAircraftRecord | null} null when the input is invalid
 */
export function toCustomAircraftRecord(input, catalog = aircraftData) {
  if (Object.keys(validateCustomAircraft(input, catalog)).length > 0) return null

  /** @type {CustomAircraftRecord} */
  const record = {
    baseModelId: input.baseModelId,
    registration: normalizeRegistration(input.registration),
    emptyWeight: toNumber(input.emptyWeight),
    emptyArm: toNumber(input.emptyArm),
  }
  const name = typeof input.name === "string" ? input.name.trim() : ""
  if (name) record.name = name
  return record
}

/**
 * Build a full aircraft from a base model and the aircraft's own weighing
 * data. The base model is deep-cloned so the catalog is never mutated.
 * @param {CustomAircraftInput} input
 * @param {AircraftCatalog} [catalog]
 * @returns {import('../types').Aircraft}
 * @throws {Error} When the input is invalid (see validateCustomAircraft)
 */
export function createCustomAircraft(input, catalog = aircraftData) {
  const record = toCustomAircraftRecord(input, catalog)
  if (!record) {
    const errors = validateCustomAircraft(input, catalog)
    throw new Error(`Invalid custom aircraft: ${JSON.stringify(errors)}`)
  }

  const base = catalog[record.baseModelId]
  /** @type {import('../types').Aircraft} */
  const aircraft = structuredClone(base)

  aircraft.name = `${record.registration} (${record.name || base.name})`
  aircraft.emptyWeight = record.emptyWeight
  aircraft.emptyArm = record.emptyArm
  aircraft.metadata = {
    ...aircraft.metadata,
    // datos cargados por el usuario: no verificados por la app
    dataReliability: "verified-partial",
    userProvided: true,
    registration: record.registration,
    baseModelId: record.baseModelId,
    baseModelName: base.name,
    sourceDocuments: [m.customAircraft.sourceDocument, ...base.metadata.sourceDocuments],
    aircraftSpecific: {
      registrationExample: record.registration,
      serialNumber: "N/A",
      warning: m.customAircraft.specificWarning,
    },
  }
  return aircraft
}

/**
 * Loose validator for the persisted list (used by useLocalStorage). Individual
 * bad entries are filtered later by hydrateCustomAircraft.
 * @param {unknown} value
 * @returns {boolean}
 */
export function isStoredCustomAircraftList(value) {
  return Array.isArray(value)
}

/**
 * Serialize records for storage (normalized, one entry per registration,
 * last one wins).
 * @param {CustomAircraftRecord[]} records
 * @returns {string}
 */
export function serializeCustomAircraft(records) {
  return JSON.stringify(dedupeByRegistration(records))
}

/**
 * Parse a stored JSON list, dropping invalid entries and entries whose base
 * model no longer exists in the catalog. Never throws.
 * @param {string | null} json
 * @param {AircraftCatalog} [catalog]
 * @returns {CustomAircraftRecord[]}
 */
export function deserializeCustomAircraft(json, catalog = aircraftData) {
  if (!json) return []
  try {
    return sanitizeCustomAircraftRecords(JSON.parse(json), catalog)
  } catch {
    return []
  }
}

/**
 * Keep only valid records (re-normalized), deduplicated by registration.
 * @param {unknown} value
 * @param {AircraftCatalog} [catalog]
 * @returns {CustomAircraftRecord[]}
 */
export function sanitizeCustomAircraftRecords(value, catalog = aircraftData) {
  if (!Array.isArray(value)) return []
  /** @type {CustomAircraftRecord[]} */
  const records = []
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue
    const record = toCustomAircraftRecord(/** @type {CustomAircraftInput} */ (entry), catalog)
    if (record) records.push(record)
  }
  return dedupeByRegistration(records)
}

/**
 * Rebuild full aircraft from stored records, keyed by custom id.
 * @param {unknown} records
 * @param {AircraftCatalog} [catalog]
 * @returns {AircraftCatalog}
 */
export function hydrateCustomAircraft(records, catalog = aircraftData) {
  return Object.fromEntries(
    sanitizeCustomAircraftRecords(records, catalog).map((record) => [
      customAircraftId(record.registration),
      createCustomAircraft(record, catalog),
    ])
  )
}

/**
 * Insert or replace (same registration) a record.
 * @param {CustomAircraftRecord[]} records
 * @param {CustomAircraftRecord} record
 * @returns {CustomAircraftRecord[]}
 */
export function upsertCustomAircraftRecord(records, record) {
  return [...records.filter((r) => r.registration !== record.registration), record]
}

/**
 * Remove the record for a custom aircraft id.
 * @param {CustomAircraftRecord[]} records
 * @param {string} id
 * @returns {CustomAircraftRecord[]}
 */
export function removeCustomAircraftRecord(records, id) {
  return records.filter((r) => customAircraftId(r.registration) !== id)
}

/**
 * Selector options for custom aircraft ("LV-ABC (Cessna 172S Skyhawk)").
 * @param {AircraftCatalog} customAircraft
 * @returns {import('../types').SelectOption[]}
 */
export function customAircraftOptions(customAircraft) {
  return Object.entries(customAircraft).map(([value, aircraft]) => ({
    value,
    label: aircraft.name,
  }))
}

/**
 * @param {CustomAircraftRecord[]} records
 * @returns {CustomAircraftRecord[]}
 */
function dedupeByRegistration(records) {
  /** @type {Map<string, CustomAircraftRecord>} */
  const byRegistration = new Map()
  for (const record of records) {
    byRegistration.delete(record.registration)
    byRegistration.set(record.registration, record)
  }
  return [...byRegistration.values()]
}
