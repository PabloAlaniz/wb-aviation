import { useState } from "react"
import { Save, Trash2 } from "lucide-react"
import { Input, Label } from "./Input"
import { messages as m } from "../i18n"
import { MAX_LOAD_NAME_LENGTH, savedLoadTotal } from "../utils/savedLoads"
import { formatWeight } from "../utils/units"

/**
 * Save the current load under a name and apply or delete the loads saved for
 * the selected aircraft.
 * @param {{
 *   loads: import("../utils/savedLoads").SavedLoad[],
 *   onSave: (name: string) => import("../utils/savedLoads").SavedLoadErrorCode | null,
 *   onApply: (load: import("../utils/savedLoads").SavedLoad) => void,
 *   onRemove: (name: string) => void,
 *   units?: import("../types").UnitSystem,
 * }} props - `loads` are those of the selected aircraft
 */
export function SavedLoads({ loads, onSave, onApply, onRemove, units = "imperial" }) {
  const sl = m.savedLoads
  const [name, setName] = useState("")
  const [error, setError] = useState(
    /** @type {import("../utils/savedLoads").SavedLoadErrorCode | null} */ (null)
  )

  const handleSubmit = (/** @type {import("react").FormEvent<HTMLFormElement>} */ e) => {
    e.preventDefault()
    const result = onSave(name)
    setError(result)
    if (!result) setName("")
  }

  return (
    <details className="rounded-md border border-gray-200 p-3">
      <summary className="cursor-pointer text-sm font-medium">
        {sl.title}
        {loads.length > 0 && <span className="text-gray-500"> ({loads.length})</span>}
      </summary>

      <div className="mt-3 space-y-4">
        <p className="text-xs text-gray-600">{sl.description}</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="saved-load-name">{sl.nameLabel}</Label>
            <Input
              id="saved-load-name"
              value={name}
              maxLength={MAX_LOAD_NAME_LENGTH}
              placeholder={sl.namePlaceholder}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "saved-load-error" : undefined}
              onChange={(e) => setName(e.target.value)}
            />
            {error && (
              <p id="saved-load-error" role="alert" className="text-xs text-red-600">
                {sl.errors[error]}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-2"
          >
            <Save className="h-4 w-4" />
            {sl.save}
          </button>
        </form>

        {loads.length === 0 ? (
          <p className="text-xs text-gray-500">{sl.empty}</p>
        ) : (
          <ul className="divide-y divide-gray-200 text-sm" aria-label={sl.listLabel}>
            {loads.map((load) => (
              <li key={load.name} className="flex items-center justify-between gap-2 py-1">
                <button
                  type="button"
                  onClick={() => onApply(load)}
                  aria-label={sl.apply(load.name)}
                  className="min-w-0 flex-1 rounded-md px-2 py-1 text-left hover:bg-gray-50"
                >
                  <span className="block truncate font-medium text-blue-700">{load.name}</span>
                  <span className="block text-xs text-gray-600">
                    {sl.detail(formatWeight(savedLoadTotal(load), units, 0))}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(load.name)}
                  aria-label={sl.remove(load.name)}
                  className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  )
}
