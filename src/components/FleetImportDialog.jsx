import { CircleCheck, Download, TriangleAlert, Users, X } from "lucide-react"
import { aircraftData } from "../data/aircraft"
import { messages as m } from "../i18n"
import { formatArm, formatWeight } from "../utils/units"

/**
 * Inline (non-modal) confirmation card for a fleet shared via `?fleet=`.
 * @param {{
 *   state: import("../hooks/useFleetImport").FleetImportState,
 *   existingRegistrations?: string[],
 *   units?: import("../types").UnitSystem,
 *   onImport: () => void,
 *   onDismiss: () => void,
 * }} props
 */
export function FleetImportDialog({
  state,
  existingRegistrations = [],
  units = "imperial",
  onImport,
  onDismiss,
}) {
  if (state.status === "idle") return null

  if (state.status === "invalid" || state.status === "imported") {
    const isError = state.status === "invalid"
    return (
      <div
        role={isError ? "alert" : "status"}
        className={`print:hidden flex items-start justify-between gap-3 rounded-lg border p-3 text-sm ${
          isError
            ? "border-amber-300 bg-amber-50 text-amber-900"
            : "border-green-300 bg-green-50 text-green-900"
        }`}
      >
        <p className="flex items-center gap-2">
          {isError ? (
            <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
          ) : (
            <CircleCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          )}
          {state.status === "invalid" ? m.fleet.invalidLink : m.fleet.imported(state.count)}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label={m.fleet.close}
          className="rounded-md p-1 hover:bg-black/5"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    )
  }

  const { fleet } = state
  const existing = new Set(existingRegistrations)

  return (
    <section
      aria-labelledby="fleet-import-title"
      className="print:hidden rounded-lg border border-blue-300 bg-white p-4 shadow-sm space-y-3"
    >
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-600" aria-hidden="true" />
        <h2 id="fleet-import-title" className="font-semibold text-gray-900">
          {m.fleet.importTitle}
        </h2>
      </div>
      <p className="text-sm text-gray-700">
        {fleet.name ? m.fleet.importFrom(fleet.name) : m.fleet.importAnonymous}
      </p>

      <ul
        className="divide-y divide-gray-200 rounded-md border border-gray-200 text-sm"
        aria-label={m.fleet.importListLabel}
      >
        {fleet.records.map((record) => (
          <li
            key={record.registration}
            className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"
          >
            <div>
              <div className="font-medium">{record.registration}</div>
              <div className="text-xs text-gray-600">
                {record.name || aircraftData[record.baseModelId]?.name} ·{" "}
                {m.customAircraft.recordDetail(
                  formatWeight(record.emptyWeight, units),
                  formatArm(record.emptyArm, units)
                )}
              </div>
            </div>
            {existing.has(record.registration) && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                {m.fleet.willOverwrite}
              </span>
            )}
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-600">{m.fleet.overwriteNote}</p>
      <p className="text-xs text-gray-600">{m.fleet.verifyNote}</p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onImport}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {m.fleet.importButton(fleet.records.length)}
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          {m.fleet.dismiss}
        </button>
      </div>
    </section>
  )
}
