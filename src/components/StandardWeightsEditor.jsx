import { useState } from "react"
import { Input, Label } from "./Input"
import { messages as m } from "../i18n"
import { STANDARD_WEIGHT_KEYS } from "../utils/standardWeights"
import { trimNumber, unitSymbols, weightFromDisplay, weightToDisplay } from "../utils/units"

/**
 * Collapsible editor for the standard person weights (crew, adult, child),
 * shown and typed in the display units; values are stored in lbs. Empty or
 * invalid input keeps the previous value.
 * @param {{
 *   value: import("../utils/standardWeights").StandardWeights,
 *   onChange: (next: import("../utils/standardWeights").StandardWeights) => void,
 *   units?: import("../types").UnitSystem,
 * }} props
 */
export function StandardWeightsEditor({ value, onChange, units = "imperial" }) {
  // Raw text typed by the user, so converted values don't fight the caret
  const [drafts, setDrafts] = useState(
    /** @type {{ units: string, text: Record<string, string> }} */ ({ units, text: {} })
  )
  const text = drafts.units === units ? drafts.text : {}
  const unit = unitSymbols(units).weight
  const sw = m.standardWeights

  return (
    <details className="rounded-md border border-gray-200 p-3 text-sm">
      <summary className="cursor-pointer font-medium text-gray-700">{sw.title}</summary>
      <p className="mt-2 text-xs text-gray-500">{sw.description}</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {STANDARD_WEIGHT_KEYS.map((key) => (
          <div key={key} className="space-y-1">
            <Label htmlFor={`standard-weight-${key}`}>{m.units.stationLabel(sw[key], unit)}</Label>
            <Input
              id={`standard-weight-${key}`}
              type="number"
              min="1"
              inputMode="decimal"
              value={text[key] ?? trimNumber(weightToDisplay(value[key], units), 1)}
              onChange={(e) => {
                const typed = e.target.value
                setDrafts({ units, text: { ...text, [key]: typed } })
                const lbs = weightFromDisplay(Number(typed), units)
                if (typed !== "" && Number.isFinite(lbs) && lbs > 0 && lbs <= 1000) {
                  onChange({ ...value, [key]: lbs })
                }
              }}
            />
          </div>
        ))}
      </div>
    </details>
  )
}
