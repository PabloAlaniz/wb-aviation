import { useLocalStorage } from "./useLocalStorage"
import { DEFAULT_UNITS, isUnitSystem } from "../utils/units"
import { trackEvent } from "../analytics"

export const UNITS_STORAGE_KEY = "wb-units"

/**
 * Persisted display unit system ("imperial" | "metric").
 * @returns {[import("../types").UnitSystem, (units: import("../types").UnitSystem) => void]}
 */
export function useUnits() {
  const [units, setStoredUnits] = useLocalStorage(UNITS_STORAGE_KEY, DEFAULT_UNITS, isUnitSystem)
  /** @param {import("../types").UnitSystem} next */
  const setUnits = (next) => {
    if (next !== units) trackEvent("units_changed", { units: next })
    setStoredUnits(next)
  }
  return [units, setUnits]
}
