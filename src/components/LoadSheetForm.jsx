import { Input, Label } from "./Input"
import { messages as m } from "../i18n"
import { normalizeIcao } from "../utils/loadSheet"

/** @typedef {import("../utils/loadSheet").LoadSheetDetails} LoadSheetDetails */

/**
 * Flight details printed on the load sheet (collapsible to stay compact).
 * @param {{
 *   details: LoadSheetDetails,
 *   onChange: (field: keyof LoadSheetDetails, value: string) => void,
 *   children?: import("react").ReactNode,
 * }} props - children are rendered below the fields (e.g. the print button)
 */
export function LoadSheetForm({ details, onChange, children }) {
  const ls = m.loadSheet
  /**
   * @param {keyof LoadSheetDetails} field
   * @param {string} label
   * @param {Partial<import("react").ComponentProps<"input">>} [extra]
   */
  const field = (field, label, extra = {}) => (
    <div className="space-y-1">
      <Label htmlFor={`load-sheet-${field}`}>{label}</Label>
      <Input
        id={`load-sheet-${field}`}
        value={details[field]}
        onChange={(event) => onChange(field, event.target.value)}
        {...extra}
      />
    </div>
  )
  const icao = {
    placeholder: ls.icaoPlaceholder,
    maxLength: 4,
    autoCapitalize: "characters",
    className: "uppercase",
  }

  return (
    <details className="rounded-md border border-gray-200 p-3">
      <summary className="cursor-pointer text-sm font-medium">{ls.formTitle}</summary>

      <div className="mt-3 space-y-3">
        <p className="text-xs text-gray-600">{ls.formDescription}</p>
        <div className="grid grid-cols-2 gap-3">
          {field("pilot", ls.pilot, { autoComplete: "name" })}
          {field("registration", ls.registration, { autoCapitalize: "characters" })}
          {field("date", ls.date, { type: "date" })}
          <div />
          <div className="space-y-1">
            <Label htmlFor="load-sheet-departure">{ls.departure}</Label>
            <Input
              id="load-sheet-departure"
              value={details.departure}
              onChange={(event) => onChange("departure", normalizeIcao(event.target.value))}
              {...icao}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="load-sheet-destination">{ls.destination}</Label>
            <Input
              id="load-sheet-destination"
              value={details.destination}
              onChange={(event) => onChange("destination", normalizeIcao(event.target.value))}
              {...icao}
            />
          </div>
          <div className="col-span-2 space-y-1">
            <Label htmlFor="load-sheet-remarks">{ls.remarks}</Label>
            <textarea
              id="load-sheet-remarks"
              rows={2}
              value={details.remarks}
              onChange={(event) => onChange("remarks", event.target.value)}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
            />
          </div>
        </div>
        {children}
      </div>
    </details>
  )
}
