import { useState } from "react"
import { Input, Label } from "./Input"
import { messages as m } from "../i18n"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { resolveStationLabel } from "../utils/stationLabel"
import {
  AVGAS_KG_PER_L,
  AVGAS_LB_PER_US_GAL,
  formatWeight,
  inputToLbsText,
  lbsTextToInput,
  lbsToFuelVolume,
  trimNumber,
  unitSymbols,
  weightToDisplay,
} from "../utils/units"

/** Station key that can also be entered by volume. */
const FUEL_KEY = "fuel"

/** @typedef {"weight" | "volume"} FuelInputMode */

/**
 * Data-driven load station form. Renders one numeric input per entry in
 * aircraft.loadStations, in pairs (or full width when station.fullWidth).
 *
 * Inputs are shown in the chosen display units, but `weights` always holds
 * lbs (as strings), so the calculations are unit-agnostic. The fuel station
 * can also be entered by volume (US gal / L) using AVGAS density.
 * @param {{
 *   aircraft: import("../types").Aircraft,
 *   weights: import("../types").StationWeights,
 *   onWeightChange: (key: string, value: string) => void,
 *   units?: import("../types").UnitSystem,
 * }} props
 */
export function StationForm({ aircraft, weights, onWeightChange, units = "imperial" }) {
  const [fuelMode, setFuelMode] = useLocalStorage(
    "wb-fuel-input-mode",
    /** @type {FuelInputMode} */ ("weight"),
    (value) => value === "weight" || value === "volume"
  )
  // Raw text typed by the user, so converted values don't fight the caret
  const [drafts, setDrafts] = useState(/** @type {Record<string, string>} */ ({}))

  const symbols = unitSymbols(units)
  const stations = aircraft.loadStations
  const paired = stations.filter((station) => !station.fullWidth)
  const fullWidth = stations.filter((station) => station.fullWidth)

  const rows = []
  for (let i = 0; i < paired.length; i += 2) {
    rows.push(paired.slice(i, i + 2))
  }

  /**
   * Convert a value in lbs to the field's display unit.
   * @param {number} lbs
   * @param {FuelInputMode} mode
   */
  const toDisplay = (lbs, mode) =>
    mode === "volume" ? lbsToFuelVolume(lbs, units) : weightToDisplay(lbs, units)

  const renderField = (/** @type {import("../types").LoadStation} */ station) => {
    const isFuel = station.key === FUEL_KEY
    /** @type {FuelInputMode} */
    const mode = isFuel ? fuelMode : "weight"
    const unit = mode === "volume" ? symbols.volume : symbols.weight
    const name = resolveStationLabel(station, m)
    const label =
      station.max !== undefined
        ? m.units.stationLabelMax(name, unit, trimNumber(toDisplay(station.max, mode), 0))
        : m.units.stationLabel(name, unit)

    const placeholderLbs = Number(station.placeholder)
    const placeholder =
      station.placeholder !== undefined && Number.isFinite(placeholderLbs)
        ? trimNumber(toDisplay(placeholderLbs, mode), 0)
        : station.placeholder

    const stored = weights[station.key] ?? ""
    const draft = drafts[station.key]
    const value =
      draft !== undefined && inputToLbsText(draft, units, mode) === stored
        ? draft
        : lbsTextToInput(stored, units, mode)

    return (
      <div key={station.key} className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor={station.key}>{label}</Label>
          {isFuel && (
            <div
              role="group"
              aria-label={m.units.fuelInputMode}
              className="inline-flex rounded-md border border-gray-200 text-xs"
            >
              {
                /** @type {FuelInputMode[]} */ (["weight", "volume"]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={fuelMode === option}
                    onClick={() => setFuelMode(option)}
                    className={`px-2 py-1 rounded ${
                      fuelMode === option ? "bg-gray-900 text-white" : "text-gray-600"
                    }`}
                  >
                    {option === "volume"
                      ? `${m.units.byVolume} (${symbols.volume})`
                      : `${m.units.byWeight} (${symbols.weight})`}
                  </button>
                ))
              }
            </div>
          )}
        </div>
        <Input
          id={station.key}
          type="number"
          min="0"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const text = e.target.value
            setDrafts((prev) => ({ ...prev, [station.key]: text }))
            onWeightChange(station.key, inputToLbsText(text, units, mode))
          }}
        />
        {isFuel && mode === "volume" && (
          <p className="text-xs text-gray-500">
            {stored !== "" && `${m.units.fuelEquivalent(formatWeight(Number(stored), units))} · `}
            {m.units.fuelDensityNote(
              units === "metric"
                ? `${trimNumber(AVGAS_KG_PER_L, 2)} kg/L`
                : `${AVGAS_LB_PER_US_GAL.toFixed(1)} lb/gal`
            )}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {rows.map((row, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
          {row.map(renderField)}
        </div>
      ))}
      {fullWidth.map(renderField)}
    </div>
  )
}
