import { messages as m } from "../i18n"
import { fuelDensityLbPerGal, lbsToFuelVolume, unitSymbols, weightToDisplay } from "../utils/units"

/**
 * Room left in the current loading: payload up to the max takeoff weight,
 * fuel that can still be added (and which limit caps it) and the fuel left at
 * landing. Amounts are rounded down so the display never overstates the room.
 * @param {{
 *   margins: import("../types").LoadMargins | null,
 *   fuelType?: import("../types").FuelType,
 *   units?: import("../types").UnitSystem,
 * }} props
 */
export function LoadMarginsPanel({ margins, fuelType, units = "imperial" }) {
  if (!margins) return null
  const mg = m.margins
  const symbols = unitSymbols(units)
  const whole = (/** @type {number} */ lbs) => Math.floor(weightToDisplay(lbs, units) + 1e-6)
  const weight = (/** @type {number} */ lbs) => `${whole(lbs)} ${symbols.weight}`
  const fuel = (/** @type {number} */ lbs) => {
    const volume = Math.floor(lbsToFuelVolume(lbs, units, fuelDensityLbPerGal(fuelType)) + 1e-6)
    return `${weight(lbs)} (${volume} ${symbols.volume})`
  }
  const over = margins.payloadAvailable < 0
  const { extraFuel } = margins

  return (
    <div className="space-y-2" data-testid="load-margins">
      <h3 className="font-semibold">{mg.title}</h3>
      <dl className="space-y-1 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-gray-600">{mg.payloadAvailable}</dt>
          <dd
            className={`font-mono text-right ${over ? "text-red-700 font-semibold" : ""}`}
            data-testid="margin-payload"
          >
            {over
              ? mg.overBy(
                  Math.ceil(weightToDisplay(-margins.payloadAvailable, units)),
                  symbols.weight
                )
              : weight(margins.payloadAvailable)}
          </dd>
        </div>
        {extraFuel && (
          <div className="flex justify-between gap-3">
            <dt className="text-gray-600">{mg.extraFuel}</dt>
            <dd className="text-right" data-testid="margin-extra-fuel">
              <span className="font-mono">{fuel(extraFuel.amount)}</span>
              <span className="block text-xs text-gray-500">
                {mg.limitedByNote(mg.limitedBy[extraFuel.limitedBy])}
              </span>
            </dd>
          </div>
        )}
        {margins.hasFuelStation && (
          <div className="flex justify-between gap-3">
            <dt className="text-gray-600">{mg.fuelAtLanding}</dt>
            <dd className="font-mono text-right" data-testid="margin-landing-fuel">
              {fuel(margins.fuelAtLanding)}
            </dd>
          </div>
        )}
      </dl>
    </div>
  )
}
