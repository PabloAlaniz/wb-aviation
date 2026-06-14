import { Input, Label } from "./Input"

/**
 * Data-driven load station form. Renders one numeric input per entry in
 * aircraft.loadStations, in pairs (or full width when station.fullWidth).
 * @param {{
 *   aircraft: import("../types").Aircraft,
 *   weights: import("../types").StationWeights,
 *   onWeightChange: (key: string, value: string) => void,
 * }} props
 */
export function StationForm({ aircraft, weights, onWeightChange }) {
  const stations = aircraft.loadStations
  const paired = stations.filter((station) => !station.fullWidth)
  const fullWidth = stations.filter((station) => station.fullWidth)

  const rows = []
  for (let i = 0; i < paired.length; i += 2) {
    rows.push(paired.slice(i, i + 2))
  }

  const renderField = (/** @type {import("../types").LoadStation} */ station) => (
    <div key={station.key} className="space-y-2">
      <Label htmlFor={station.key}>{station.label}</Label>
      <Input
        id={station.key}
        type="number"
        min="0"
        placeholder={station.placeholder}
        value={weights[station.key] ?? ""}
        onChange={(e) => onWeightChange(station.key, e.target.value)}
      />
    </div>
  )

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
