/**
 * Quick fuel conversions between volume (litres, US and imperial gallons) and
 * weight (lbs, kg) for a fuel type. Volume <-> weight uses the W&B density
 * of the fuel (AVGAS 6.0 lb/US gal, Jet A 6.7 lb/US gal); the rest are exact
 * unit definitions.
 */
import { KG_PER_LB, L_PER_US_GAL, fuelDensityLbPerGal } from "./units"

/** Exact definition: 1 imperial gallon = 4.54609 L. */
export const L_PER_IMP_GAL = 4.54609

/** @typedef {"l" | "usGal" | "impGal" | "lb" | "kg"} FuelUnit */

/** Units in display order: volumes, then weights. */
export const FUEL_UNITS = /** @type {FuelUnit[]} */ (["usGal", "impGal", "l", "lb", "kg"])

/**
 * Litres of fuel in one of each unit, for a fuel density.
 * @param {number} lbPerUsGal
 * @returns {Record<FuelUnit, number>}
 */
function litresPerUnit(lbPerUsGal) {
  const lbPerL = lbPerUsGal / L_PER_US_GAL
  return {
    l: 1,
    usGal: L_PER_US_GAL,
    impGal: L_PER_IMP_GAL,
    lb: 1 / lbPerL,
    kg: 1 / KG_PER_LB / lbPerL,
  }
}

/**
 * Convert an amount of fuel to every unit.
 * @param {number} value
 * @param {FuelUnit} from
 * @param {import("../types").FuelType} [fuelType] - AVGAS by default
 * @returns {Record<FuelUnit, number>}
 */
export function convertFuel(value, from, fuelType) {
  const perUnit = litresPerUnit(fuelDensityLbPerGal(fuelType))
  const litres = value * perUnit[from]
  return /** @type {Record<FuelUnit, number>} */ (
    Object.fromEntries(FUEL_UNITS.map((unit) => [unit, litres / perUnit[unit]]))
  )
}

/**
 * Conversion matrix: `table[from][to]` is how many `to` units one `from` unit
 * of fuel makes (e.g. AVGAS: usGal -> lb = 6.0, l -> kg = 0.72).
 * @param {import("../types").FuelType} [fuelType] - AVGAS by default
 * @returns {Record<FuelUnit, Record<FuelUnit, number>>}
 */
export function fuelConversionTable(fuelType) {
  return /** @type {Record<FuelUnit, Record<FuelUnit, number>>} */ (
    Object.fromEntries(FUEL_UNITS.map((from) => [from, convertFuel(1, from, fuelType)]))
  )
}

/**
 * Fuel density in kg/L (≈ specific gravity) for a fuel type.
 * @param {import("../types").FuelType} [fuelType]
 */
export function fuelDensityKgPerL(fuelType) {
  return convertFuel(1, "l", fuelType).kg
}

/**
 * A conversion factor with about three significant figures (3.785, 0.264, 15.9).
 * @param {number} value
 * @param {string} decimalSeparator
 */
export function formatFactor(value, decimalSeparator = ".") {
  const digits = value >= 100 ? 0 : value >= 10 ? 1 : value >= 1 ? 2 : 3
  return value.toFixed(digits).replace(".", decimalSeparator)
}
