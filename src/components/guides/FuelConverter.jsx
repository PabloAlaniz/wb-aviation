import { useState } from "react"
import { locales } from "../../i18n"
import { FUEL_UNITS, convertFuel } from "../../utils/fuelConversions"
import { FuelConversionDiagram } from "../FuelConversionDiagram"

/** @typedef {import("../../utils/fuelConversions").FuelUnit} FuelUnit */
/** @typedef {import("../../types").FuelType} FuelType */

/** @type {FuelType[]} */
const FUEL_TYPES = ["avgas", "jet-a"]

/**
 * Fuel converter for the fuel conversions guide: the conversion diagram for
 * AVGAS or Jet A, plus a quick calculator (type an amount in any unit and see
 * it in the others). Server-rendered and hydrated on the page
 * (`client:visible`).
 * @param {{ lang: keyof typeof locales }} props
 */
export default function FuelConverter({ lang }) {
  const fc = locales[lang].fuelConversions
  const [fuelType, setFuelType] = useState(/** @type {FuelType} */ ("avgas"))
  const [unit, setUnit] = useState(/** @type {FuelUnit} */ ("l"))
  const [amount, setAmount] = useState("100")

  const value = Number(amount)
  const valid = amount.trim() !== "" && Number.isFinite(value) && value >= 0
  const results = valid ? convertFuel(value, unit, fuelType) : null
  const format = new Intl.NumberFormat(lang, { maximumFractionDigits: 1 })

  const field = "rounded-md border border-gray-300 bg-white px-2 py-1.5 text-gray-900"

  return (
    <section
      aria-label={fc.title}
      className="not-prose mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4"
      data-testid="fuel-converter"
    >
      <h2 className="mb-3 text-lg font-semibold text-gray-900">{fc.title}</h2>
      <div
        role="group"
        aria-label={fc.fuel}
        className="mb-3 inline-flex rounded-md border border-gray-300 bg-white text-sm"
      >
        {FUEL_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            aria-pressed={fuelType === type}
            onClick={() => setFuelType(type)}
            className={`rounded px-3 py-1.5 ${fuelType === type ? "bg-blue-700 text-white" : "text-gray-700"}`}
          >
            {fc.fuels[type]}
          </button>
        ))}
      </div>
      <FuelConversionDiagram
        fuelType={fuelType}
        messages={locales[lang]}
        decimalSeparator={lang === "en" ? "." : ","}
        className="rounded-md bg-white p-2"
      />
      <p className="mt-1 mb-4 text-xs text-gray-600">{fc.fuelDependent}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          {fc.amount}
          <input
            className={field}
            type="number"
            min="0"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          {fc.unit}
          <select
            className={field}
            value={unit}
            onChange={(e) => setUnit(/** @type {FuelUnit} */ (e.target.value))}
          >
            {FUEL_UNITS.map((option) => (
              <option key={option} value={option}>
                {fc.units[option]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-3 text-sm text-gray-700">{fc.result}</p>
      <ul className="mt-1 flex flex-wrap gap-2" aria-live="polite">
        {FUEL_UNITS.filter((other) => other !== unit).map((other) => (
          <li
            key={other}
            data-testid={`fuel-converter-${other}`}
            className="rounded-md bg-white px-3 py-1.5 font-mono text-gray-900 shadow-sm"
          >
            {results ? format.format(results[other]) : "—"} {fc.units[other]}
          </li>
        ))}
      </ul>
    </section>
  )
}
