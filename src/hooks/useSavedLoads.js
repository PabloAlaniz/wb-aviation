import { useMemo } from "react"
import { useLocalStorage } from "./useLocalStorage"
import {
  SAVED_LOADS_STORAGE_KEY,
  removeLoadsForAircraft,
  removeSavedLoad,
  sanitizeSavedLoads,
  toSavedLoad,
  upsertSavedLoad,
} from "../utils/savedLoads"

/**
 * Saved loads persisted in localStorage.
 * @returns {{
 *   loads: import("../utils/savedLoads").SavedLoad[],
 *   save: (input: Parameters<typeof toSavedLoad>[0]) =>
 *     import("../utils/savedLoads").SavedLoadErrorCode | null,
 *   remove: (aircraftId: string, name: string) => void,
 *   removeForAircraft: (aircraftId: string) => void,
 * }}
 */
export function useSavedLoads() {
  const [stored, setStored] = useLocalStorage(
    SAVED_LOADS_STORAGE_KEY,
    /** @type {import("../utils/savedLoads").SavedLoad[]} */ ([]),
    Array.isArray
  )
  // descartar entradas corruptas
  const loads = useMemo(() => sanitizeSavedLoads(stored), [stored])

  return {
    loads,
    save: (input) => {
      const { record, error } = toSavedLoad(input)
      if (!record) return error
      setStored((prev) => upsertSavedLoad(sanitizeSavedLoads(prev), record))
      return null
    },
    remove: (aircraftId, name) =>
      setStored((prev) => removeSavedLoad(sanitizeSavedLoads(prev), aircraftId, name)),
    removeForAircraft: (aircraftId) =>
      setStored((prev) => removeLoadsForAircraft(sanitizeSavedLoads(prev), aircraftId)),
  }
}
