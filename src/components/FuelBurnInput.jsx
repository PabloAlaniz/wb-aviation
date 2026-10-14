import { Fuel } from "lucide-react"
import { Input, Label } from "./Input"
import { messages as m } from "../i18n"

/**
 * Planned fuel burn input (lbs). Disabled when the aircraft has no fuel station.
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   fuelLoaded: number,
 *   hasFuelStation: boolean,
 * }} props
 */
export function FuelBurnInput({ value, onChange, fuelLoaded, hasFuelStation }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="fuel-burn" className="flex items-center gap-1">
        <Fuel className="h-4 w-4" />
        {m.flightPhases.fuelBurnLabel}
      </Label>
      <Input
        id="fuel-burn"
        type="number"
        min="0"
        inputMode="decimal"
        placeholder={m.flightPhases.fuelBurnPlaceholder}
        value={value}
        disabled={!hasFuelStation}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-xs text-gray-500">
        {hasFuelStation
          ? m.flightPhases.fuelLoaded(fuelLoaded.toFixed(0))
          : m.flightPhases.noFuelStation}
      </p>
    </div>
  )
}
