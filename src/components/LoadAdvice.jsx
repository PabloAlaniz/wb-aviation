import { Lightbulb } from "lucide-react"
import { messages as m } from "../i18n"
import { resolveStationLabel } from "../utils/stationLabel"
import { armSuffix, armToDisplay, trimNumber, unitSymbols, weightToDisplay } from "../utils/units"

/**
 * By how much the takeoff is out of limits and the smallest single changes
 * that fix it. Renders nothing when there is no advice (takeoff within limits).
 * @param {{
 *   advice: import("../utils/loadAdvice").LoadAdvice | null,
 *   aircraft: import("../types").Aircraft,
 *   units?: import("../types").UnitSystem,
 * }} props - `advice` must be built with a step matching `units`
 */
export function LoadAdvice({ advice, aircraft, units = "imperial" }) {
  if (!advice) return null
  const ad = m.advice
  const unit = unitSymbols(units).weight
  const amount = (/** @type {number} */ lbs) => trimNumber(weightToDisplay(lbs, units), 0)
  const distance = (/** @type {number} */ inches) =>
    trimNumber(armToDisplay(inches, units), units === "metric" ? 1 : 2)
  const label = (/** @type {string} */ key) => {
    const station = aircraft.loadStations.find((s) => s.key === key)
    return station ? resolveStationLabel(station, m) : key
  }
  /** @param {import("../utils/loadAdvice").LoadAdviceOption} option */
  const text = (option) =>
    option.kind === "move"
      ? ad.move(amount(option.amount), unit, label(option.from), label(option.to))
      : ad[option.kind](amount(option.amount), unit, label(option.station))

  return (
    <div
      className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 space-y-2"
      data-testid="load-advice"
    >
      <h4 className="flex items-center gap-1 font-semibold">
        <Lightbulb className="h-4 w-4" aria-hidden="true" />
        {ad.title}
      </h4>
      <p>
        {advice.overweightBy !== null &&
          ad.overweight(Math.ceil(weightToDisplay(advice.overweightBy, units) - 1e-6), unit)}
        {advice.cgForwardBy !== null &&
          ad.cgForward(distance(advice.cgForwardBy), armSuffix(units))}
        {advice.cgAftBy !== null && ad.cgAft(distance(advice.cgAftBy), armSuffix(units))}
      </p>
      {advice.options.length === 0 ? (
        <p>{ad.none}</p>
      ) : (
        <>
          <ul className="list-disc pl-5">
            {advice.options.map((option) => (
              <li key={JSON.stringify(option)}>{text(option)}</li>
            ))}
          </ul>
          <p className="text-xs text-amber-800">{ad.note}</p>
        </>
      )}
    </div>
  )
}
