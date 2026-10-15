/**
 * Worked example of the "weight, arm and moment" guides (Cessna 152 with the
 * reference data of src/data/aircraft.js). examples.test.js runs it through
 * calculateWeightBalance / calculateFlightPhases and checks that every
 * number below appears, formatted for each locale, in the three guides: if
 * the aircraft data or the calculation changes, the guides must be updated.
 */

export const WORKED_EXAMPLE = {
  aircraftId: "cessna-152",
  /** Station weights in lbs, as the calculator receives them. */
  weights: {
    pilot: "170",
    copilot: "160",
    baggage1: "20",
    baggage2: "0",
    fuel: "147", // 24.5 gal usable x 6 lb/gal
  },
  /** Fuel burned in flight, lbs (9 gal x 6 lb/gal). */
  fuelBurn: 54,
}

/**
 * Results printed in the guides, rounded as shown there (weights 0 decimals,
 * moments and CG 2 decimals, moment/1000 2 decimals).
 */
export const WORKED_EXAMPLE_EXPECTED = {
  emptyMoment: 34000.48,
  takeoffWeight: 1633,
  takeoffMoment: 54324.48,
  takeoffMomentPer1000: 54.32,
  takeoffCg: 33.27,
  /** Forward limit at the takeoff weight (linear 31.0" @ 1350 -> 32.65" @ 1670). */
  forwardLimitAtTakeoff: 32.46,
  landingWeight: 1579,
  landingMoment: 52056.48,
  landingCg: 32.97,
  zeroFuelWeight: 1486,
  zeroFuelCg: 32.4,
}

/**
 * Number formatting used in the guides (the locale's own separators), so the
 * test can look for the exact strings.
 * @param {number} value
 * @param {string} locale
 * @param {number} [fractionDigits]
 */
export function formatGuideNumber(value, locale, fractionDigits = 0) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}
