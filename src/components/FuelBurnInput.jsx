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
 * Planned fuel burn input. The value is stored in lbs; it is shown and typed
 * in the selected unit system. Disabled when the aircraft has no fuel station.
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   fuelLoaded: number,
 *   hasFuelStation: boolean,
 *   units?: import("../types").UnitSystem,
 * }} props
 */
export function FuelBurnInput({ value, onChange, fuelLoaded, hasFuelStation, units = "imperial" }) {
  // Keep what the user typed while it still maps to the stored value, so the
  // lbs round-trip doesn't rewrite the input mid-typing (e.g. "12." -> "12").
  const [draft, setDraft] = useState({ units, text: "" })
  const shown =
    draft.units === units && inputToLbsText(draft.text, units) === value
      ? draft.text
      : lbsTextToInput(value, units)
  const weightUnit = unitSymbols(units).weight

  return (
    <div className="space-y-2">
      <Label htmlFor="fuel-burn" className="flex items-center gap-1">
        <Fuel className="h-4 w-4" />
        {m.units.stationLabel(m.flightPhases.fuelBurnLabel, weightUnit)}
      </Label>
      <Input
        id="fuel-burn"
        type="number"
        min="0"
        inputMode="decimal"
        placeholder={lbsTextToInput(m.flightPhases.fuelBurnPlaceholder, units)}
        value={shown}
        disabled={!hasFuelStation}
        onChange={(e) => {
          setDraft({ units, text: e.target.value })
          onChange(inputToLbsText(e.target.value, units))
        }}
      />
      <p className="text-xs text-gray-500">
        {hasFuelStation
          ? m.flightPhases.fuelLoaded(trimNumber(weightToDisplay(fuelLoaded, units), 0), weightUnit)
          : m.flightPhases.noFuelStation}
      </p>
    </div>
  )
}
