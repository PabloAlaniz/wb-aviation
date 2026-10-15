import { messages as m } from "../i18n"
import { armSuffix, armToDisplay, trimNumber, unitSymbols, weightToDisplay } from "./units"

/**
 * Format a CG margin (inches, as produced by buildSafetyReport) in the
 * display unit system, e.g. `5.00"` or "127 mm".
 * @param {string} inchesText
 * @param {import("../types").UnitSystem} units
 */
export function formatCgMargin(inchesText, units) {
  if (units === "imperial") return `${inchesText}${armSuffix(units)}`
  return `${trimNumber(armToDisplay(Number(inchesText), units), 1)}${armSuffix(units)}`
}

/**
 * Re-render a safety report message in the display unit system.
 *
 * buildSafetyReport (calculations.js) produces messages in imperial units.
 * Messages that embed a length or weight are regenerated here for metric
 * display; everything else is returned untouched.
 * @param {import("../types").SafetyIssue | import("../types").SafetyRecommendation} item
 * @param {import("../types").SafetyReport} report
 * @param {import("../types").UnitSystem} units
 * @returns {string}
 */
export function localizeSafetyMessage(item, report, units) {
  if (units === "imperial") return item.message

  const suffix = armSuffix(units)
  const toMetricArm = (/** @type {string} */ inches) =>
    trimNumber(armToDisplay(Number(inches), units), 1)

  switch (item.type) {
    case "cg-forward-warning":
      return m.safety.cgNearForward(toMetricArm(report.cgMargins.forward), suffix)
    case "cg-aft-warning":
      return m.safety.cgNearAft(toMetricArm(report.cgMargins.aft), suffix)
    case "weight-reserve": {
      const excessLbs = "excessLbs" in item ? item.excessLbs : undefined
      if (excessLbs === undefined || !Number.isFinite(excessLbs)) return item.message
      const kg = trimNumber(weightToDisplay(excessLbs, units), 0)
      return m.safety.reduceWeight(kg, unitSymbols(units).weight)
    }
    default:
      return item.message
  }
}

/**
 * Re-render weight-based landing messages in the selected units; the report
 * itself is built in lbs by calculations.js.
 * @param {import("../types").SafetyIssue} issue
 * @param {import("../types").UnitSystem} units
 * @param {import("../types").FlightPhasesResult} [phases]
 * @returns {string}
 */
export function localizeLandingIssue(issue, units, phases) {
  if (units === "imperial") return issue.message
  const fp = m.flightPhases
  const kg = (/** @type {number} */ lbs) => trimNumber(weightToDisplay(lbs, units), 0)
  const unit = unitSymbols(units).weight
  switch (issue.type) {
    case "landing-weight":
      return issue.limit === undefined
        ? issue.message
        : fp.overMaxLandingWeight(kg(issue.limit), unit)
    case "zero-fuel-weight":
      return issue.limit === undefined
        ? issue.message
        : fp.overMaxZeroFuelWeight(kg(issue.limit), unit)
    case "burn-exceeds-fuel":
      return phases
        ? fp.burnExceedsFuel(kg(phases.requestedBurn), kg(phases.fuelLoaded), unit)
        : issue.message
    default:
      return issue.message
  }
}
