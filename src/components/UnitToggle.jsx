import { messages as m } from "../i18n"
import { UNIT_SYSTEMS, unitSymbols } from "../utils/units"

const ACTIVE_CLASSES = "bg-blue-600 text-white"
const INACTIVE_CLASSES = "bg-white text-gray-600 hover:bg-gray-100"

/**
 * Segmented imperial / metric switch for display units.
 * @param {{
 *   units: import("../types").UnitSystem,
 *   onUnitsChange: (units: import("../types").UnitSystem) => void,
 * }} props
 */
export function UnitToggle({ units, onUnitsChange }) {
  return (
    <div
      role="group"
      aria-label={m.units.label}
      className="inline-flex h-10 rounded-md border border-gray-200 bg-white p-1 text-sm"
    >
      {UNIT_SYSTEMS.map((system) => {
        const symbols = unitSymbols(system)
        const active = system === units
        return (
          <button
            key={system}
            type="button"
            aria-pressed={active}
            title={m.units[system]}
            onClick={() => onUnitsChange(system)}
            className={`rounded px-3 font-medium ${active ? ACTIVE_CLASSES : INACTIVE_CLASSES}`}
          >
            {symbols.weight} · {symbols.arm}
          </button>
        )
      })}
    </div>
  )
}
