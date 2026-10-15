import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Input, Label } from "./Input"
import { SimpleSelect } from "./Select"
import { aircraftData, aircraftOptions } from "../data/aircraft"
import { customAircraftId } from "../utils/customAircraft"
import { messages as m } from "../i18n"
import {
  armFromDisplay,
  formatArm,
  formatWeight,
  trimNumber,
  unitSymbols,
  armToDisplay,
  weightFromDisplay,
  weightToDisplay,
} from "../utils/units"

const EMPTY_FORM = {
  baseModelId: aircraftOptions[0]?.value ?? "",
  registration: "",
  emptyWeight: "",
  emptyArm: "",
}

/**
 * Form + list to manage aircraft by registration, using the empty weight and
 * arm from each aircraft's own Weight & Balance Report.
 * @param {{
 *   records: import("../utils/customAircraft").CustomAircraftRecord[],
 *   onSave: (input: import("../utils/customAircraft").CustomAircraftInput) =>
 *     { id: string | null, errors: import("../utils/customAircraft").CustomAircraftErrors },
 *   onRemove: (id: string) => void,
 *   units?: import("../types").UnitSystem,
 * }} props
 */
export function CustomAircraftManager({ records, onSave, onRemove, units = "imperial" }) {
  const symbols = unitSymbols(units)
  // Weight and arm are typed in the selected units but stored in lbs/in;
  // non-numeric text is passed through so validation still reports it.
  /** @param {string} text @param {(value: number, units: import("../types").UnitSystem) => number} fromDisplay */
  const toImperial = (text, fromDisplay) => {
    const value = Number(text)
    return units === "imperial" || text.trim() === "" || !Number.isFinite(value)
      ? text
      : trimNumber(fromDisplay(value, units), 4)
  }
  /** @param {number | undefined} value @param {(value: number, units: import("../types").UnitSystem) => number} toDisplay */
  const placeholderFor = (value, toDisplay) =>
    value === undefined ? "" : trimNumber(toDisplay(value, units), 1)

  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState(
    /** @type {import("../utils/customAircraft").CustomAircraftErrors} */ ({})
  )

  const update = (/** @type {keyof typeof EMPTY_FORM} */ field, /** @type {string} */ value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (/** @type {import("react").FormEvent<HTMLFormElement>} */ e) => {
    e.preventDefault()
    const result = onSave({
      ...form,
      emptyWeight: toImperial(form.emptyWeight, weightFromDisplay),
      emptyArm: toImperial(form.emptyArm, armFromDisplay),
    })
    setErrors(result.errors)
    if (result.id) setForm({ ...EMPTY_FORM, baseModelId: form.baseModelId })
  }

  /** @param {keyof import("../utils/customAircraft").CustomAircraftErrors} field */
  const errorFor = (field) => {
    const code = errors[field]
    if (!code) return null
    return (
      <p id={`custom-${field}-error`} role="alert" className="text-xs text-red-600">
        {m.customAircraft.errors[code]}
      </p>
    )
  }

  return (
    <details className="rounded-md border border-gray-200 p-3">
      <summary className="cursor-pointer text-sm font-medium">{m.customAircraft.title}</summary>

      <div className="mt-3 space-y-4">
        <p className="text-xs text-gray-600">{m.customAircraft.description}</p>

        <form onSubmit={handleSubmit} noValidate className="grid grid-cols-2 gap-3">
          <div className="col-span-2 space-y-1">
            <Label htmlFor="custom-baseModelId">{m.customAircraft.baseModelLabel}</Label>
            <SimpleSelect
              id="custom-baseModelId"
              value={form.baseModelId}
              onValueChange={(value) => update("baseModelId", value)}
              options={aircraftOptions}
            />
            {errorFor("baseModelId")}
          </div>

          <div className="col-span-2 space-y-1">
            <Label htmlFor="custom-registration">{m.customAircraft.registrationLabel}</Label>
            <Input
              id="custom-registration"
              value={form.registration}
              placeholder={m.customAircraft.registrationPlaceholder}
              autoCapitalize="characters"
              aria-invalid={Boolean(errors.registration)}
              onChange={(e) => update("registration", e.target.value)}
            />
            {errorFor("registration")}
          </div>

          <div className="space-y-1">
            <Label htmlFor="custom-emptyWeight">
              {m.units.stationLabel(m.customAircraft.emptyWeightLabel, symbols.weight)}
            </Label>
            <Input
              id="custom-emptyWeight"
              type="number"
              inputMode="decimal"
              value={form.emptyWeight}
              placeholder={placeholderFor(
                aircraftData[form.baseModelId]?.emptyWeight,
                weightToDisplay
              )}
              aria-invalid={Boolean(errors.emptyWeight)}
              onChange={(e) => update("emptyWeight", e.target.value)}
            />
            {errorFor("emptyWeight")}
          </div>

          <div className="space-y-1">
            <Label htmlFor="custom-emptyArm">
              {m.units.stationLabel(m.customAircraft.emptyArmLabel, symbols.arm)}
            </Label>
            <Input
              id="custom-emptyArm"
              type="number"
              inputMode="decimal"
              step="any"
              value={form.emptyArm}
              placeholder={placeholderFor(aircraftData[form.baseModelId]?.emptyArm, armToDisplay)}
              aria-invalid={Boolean(errors.emptyArm)}
              onChange={(e) => update("emptyArm", e.target.value)}
            />
            {errorFor("emptyArm")}
          </div>

          <button
            type="submit"
            className="col-span-2 flex items-center justify-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-2"
          >
            <Plus className="h-4 w-4" />
            {m.customAircraft.save}
          </button>
        </form>

        {records.length === 0 ? (
          <p className="text-xs text-gray-500">{m.customAircraft.empty}</p>
        ) : (
          <ul className="divide-y divide-gray-200 text-sm" aria-label={m.customAircraft.listLabel}>
            {records.map((record) => {
              const id = customAircraftId(record.registration)
              return (
                <li key={id} className="flex items-center justify-between gap-2 py-2">
                  <div>
                    <div className="font-medium">{record.registration}</div>
                    <div className="text-xs text-gray-600">
                      {aircraftData[record.baseModelId]?.name} ·{" "}
                      {m.customAircraft.recordDetail(
                        formatWeight(Number(record.emptyWeight), units),
                        formatArm(Number(record.emptyArm), units)
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(id)}
                    aria-label={m.customAircraft.remove(record.registration)}
                    className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </details>
  )
}
