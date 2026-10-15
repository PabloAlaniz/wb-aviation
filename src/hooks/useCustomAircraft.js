import { useMemo } from "react"
import { useLocalStorage } from "./useLocalStorage"
import { trackEvent } from "../analytics"
import {
  CUSTOM_AIRCRAFT_STORAGE_KEY,
  createCustomAircraft,
  customAircraftId,
  customAircraftOptions,
  hydrateCustomAircraft,
  isStoredCustomAircraftList,
  removeCustomAircraftRecord,
  sanitizeCustomAircraftRecords,
  toCustomAircraftRecord,
  upsertCustomAircraftRecord,
  validateCustomAircraft,
} from "../utils/customAircraft"

/**
 * Custom aircraft (by registration) persisted in localStorage.
 * @returns {{
 *   records: import("../utils/customAircraft").CustomAircraftRecord[],
 *   customAircraft: Record<string, import("../types").Aircraft>,
 *   options: import("../types").SelectOption[],
 *   save: (
 *     input: import("../utils/customAircraft").CustomAircraftInput,
 *     options?: { track?: boolean },
 *   ) => {
 *     id: string | null,
 *     errors: import("../utils/customAircraft").CustomAircraftErrors,
 *     aircraft: import("../types").Aircraft | null,
 *   },
 *   remove: (id: string) => void,
 * }}
 */
export function useCustomAircraft() {
  const [stored, setStored] = useLocalStorage(
    CUSTOM_AIRCRAFT_STORAGE_KEY,
    /** @type {import("../utils/customAircraft").CustomAircraftRecord[]} */ ([]),
    isStoredCustomAircraftList
  )

  // descartar entradas corruptas o cuyo modelo base ya no existe
  const records = useMemo(() => sanitizeCustomAircraftRecords(stored), [stored])
  const customAircraft = useMemo(() => hydrateCustomAircraft(records), [records])
  const options = useMemo(() => customAircraftOptions(customAircraft), [customAircraft])

  /**
   * @param {import("../utils/customAircraft").CustomAircraftInput} input
   * @param {{ track?: boolean }} [options] - track: false for records saved by
   *   a shared/fleet link (those have their own events)
   */
  const save = (input, { track = true } = {}) => {
    const errors = validateCustomAircraft(input)
    const record = toCustomAircraftRecord(input)
    if (!record) return { id: null, errors, aircraft: null }
    const isNew = !records.some((r) => r.registration === record.registration)
    if (track && isNew) trackEvent("custom_aircraft_created", { baseModelId: record.baseModelId })
    setStored((prev) => upsertCustomAircraftRecord(sanitizeCustomAircraftRecords(prev), record))
    return {
      id: customAircraftId(record.registration),
      errors,
      aircraft: createCustomAircraft(record),
    }
  }

  /** @param {string} id */
  const remove = (id) => {
    setStored((prev) => removeCustomAircraftRecord(sanitizeCustomAircraftRecords(prev), id))
  }

  return { records, customAircraft, options, save, remove }
}
