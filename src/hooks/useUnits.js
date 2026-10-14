import { useLocalStorage } from "./useLocalStorage"
import { DEFAULT_UNITS, isUnitSystem } from "../utils/units"

export const UNITS_STORAGE_KEY = "wb-units"

/**
 * Persisted display unit system ("imperial" | "metric").
 * @returns {[import("../types").UnitSystem, (units: import("../types").UnitSystem) => void]}
 */
export function useUnits() {
  const [units, setUnits] = useLocalStorage(UNITS_STORAGE_KEY, DEFAULT_UNITS, isUnitSystem)
  return [units, setUnits]
}
