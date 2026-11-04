import { useState } from "react"
import { Fuel } from "lucide-react"
import { Input, Label } from "./Input"
import { messages as m } from "../i18n"
import {
  inputToLbsText,
  lbsTextToInput,
  trimNumber,
  unitSymbols,
  weightToDisplay,
} from "../utils/units"

/**
 * Fuel amount input. The value is stored in lbs; it is shown and typed in the
 * selected unit system. Disabled when the aircraft has no fuel station.
 * @param {{
 *   id: string,
 *   label: string,
 *   placeholder: string,
 *   hint: string,
 *   value: string,
 *   onChange: (value: string) => void,
 *   hasFuelStation: boolean,
 *   units: import("../types").UnitSystem,
 * }} props
 */
function FuelAmountInput({ id, label, placeholder, hint, value, onChange, hasFuelStation, units }) {
  // Keep what the user typed while it still maps to the stored value, so the
  // lbs round-trip doesn't rewrite the input mid-typing (e.g. "12." -> "12").
  const [draft, setDraft] = useState({ units, text: "" })
  const shown =
    draft.units === units && inputToLbsText(draft.text, units) === value
      ? draft.text
      : lbsTextToInput(value, units)

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1">
        <Fuel className="h-4 w-4" />
        {m.units.stationLabel(label, unitSymbols(units).weight)}
      </Label>
      <Input
        id={id}
        type="number"
        min="0"
        inputMode="decimal"
        placeholder={lbsTextToInput(placeholder, units)}
        value={shown}
        disabled={!hasFuelStation}
        onChange={(e) => {
          setDraft({ units, text: e.target.value })
          onChange(inputToLbsText(e.target.value, units))
        }}
      />
      <p className="text-xs text-gray-500">
        {hasFuelStation ? hint : m.flightPhases.noFuelStation}
      </p>
    </div>
  )
}

/**
 * Planned fuel burn input (lbs), with the fuel loaded as a hint.
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   fuelLoaded: number,
 *   hasFuelStation: boolean,
 *   units?: import("../types").UnitSystem,
 * }} props
 */
export function FuelBurnInput({ value, onChange, fuelLoaded, hasFuelStation, units = "imperial" }) {
  return (
    <FuelAmountInput
      id="fuel-burn"
      label={m.flightPhases.fuelBurnLabel}
      placeholder={m.flightPhases.fuelBurnPlaceholder}
      hint={m.flightPhases.fuelLoaded(
        trimNumber(weightToDisplay(fuelLoaded, units), 0),
        unitSymbols(units).weight
      )}
      value={value}
      onChange={onChange}
      hasFuelStation={hasFuelStation}
      units={units}
    />
  )
}

/**
 * Start and taxi fuel input (lbs): removed from the fuel loaded to get the
 * takeoff condition.
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   hasFuelStation: boolean,
 *   units?: import("../types").UnitSystem,
 * }} props
 */
export function TaxiFuelInput({ value, onChange, hasFuelStation, units = "imperial" }) {
  return (
    <FuelAmountInput
      id="taxi-fuel"
      label={m.flightPhases.taxiFuelLabel}
      placeholder={m.flightPhases.taxiFuelPlaceholder}
      hint={m.flightPhases.taxiFuelHint}
      value={value}
      onChange={onChange}
      hasFuelStation={hasFuelStation}
      units={units}
    />
  )
}
