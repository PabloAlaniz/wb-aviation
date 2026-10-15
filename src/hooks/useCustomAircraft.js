import { useMemo } from "react"
import { useLocalStorage } from "./useLocalStorage"
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
 *   save: (input: import("../utils/customAircraft").CustomAircraftInput) => {
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

  /** @param {import("../utils/customAircraft").CustomAircraftInput} input */
  const save = (input) => {
    const errors = validateCustomAircraft(input)
    const record = toCustomAircraftRecord(input)
    if (!record) return { id: null, errors, aircraft: null }
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
