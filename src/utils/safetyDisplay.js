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
      // the excess weight (lbs) is only carried inside the message text
      const match = item.message.match(/-?\d+(?:\.\d+)?/)
      if (!match) return item.message
      const kg = trimNumber(weightToDisplay(Number(match[0]), units), 0)
      return m.safety.reduceWeight(kg, unitSymbols(units).weight)
    }
    default:
      return item.message
  }
}
