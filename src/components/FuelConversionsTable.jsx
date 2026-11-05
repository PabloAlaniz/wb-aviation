import { messages as defaultMessages } from "../i18n"
import {
  FUEL_UNITS,
  formatFactor,
  fuelConversionTable,
  fuelDensityKgPerL,
} from "../utils/fuelConversions"

/**
 * Quick fuel conversion matrix (US gal, imperial gal, L, lb, kg) for the
 * aircraft's fuel: each row says what 1 unit equals in every column.
 * @param {{
 *   fuelType?: import("../types").FuelType,
 *   messages?: typeof defaultMessages,
 *   decimalSeparator?: string,
 *   className?: string,
 * }} props
 */
export function FuelConversionsTable({
  fuelType,
  messages = defaultMessages,
  decimalSeparator = ".",
  className = "",
}) {
  const fc = messages.fuelConversions
  const table = fuelConversionTable(fuelType)
  const fuel = fuelType === "jet-a" ? "Jet A" : "AVGAS"

  return (
    <div className={className} data-testid="fuel-conversions">
      <table className="w-full border-collapse text-right">
        <thead>
          <tr>
            <th className="border border-black px-1 text-left font-semibold">{fc.from}</th>
            {FUEL_UNITS.map((unit) => (
              <th key={unit} className="border border-black px-1 font-semibold">
                {fc.units[unit]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FUEL_UNITS.map((from) => (
            <tr key={from} data-testid={`fuel-conversions-${from}`}>
              <th className="border border-black px-1 text-left font-semibold">{fc.units[from]}</th>
              {FUEL_UNITS.map((to) => (
                <td key={to} className="border border-black px-1 font-mono">
                  {from === to ? "1" : formatFactor(table[from][to], decimalSeparator)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-0.5 text-[10px]">
        {fc.note(fuel, formatFactor(fuelDensityKgPerL(fuelType), decimalSeparator))}
      </p>
    </div>
  )
}
