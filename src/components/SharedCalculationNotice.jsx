import { X } from "lucide-react"
import { messages as m } from "../i18n"

const TONE_CLASSES = {
  loaded: "border-blue-200 bg-blue-50 text-blue-900",
  conflict: "border-amber-200 bg-amber-50 text-amber-900",
  invalid: "border-amber-200 bg-amber-50 text-amber-900",
}

/**
 * Dismissible notice shown after opening a shared calculation link.
 * @param {{
 *   status: import("../hooks/useSharedCalculation").SharedCalculationStatus | null,
 *   onDismiss: () => void,
 * }} props
 */
export function SharedCalculationNotice({ status, onDismiss }) {
  if (!status) return null
  return (
    <div
      role="status"
      className={`flex items-start justify-between gap-3 rounded-md border px-4 py-3 text-sm ${TONE_CLASSES[status]}`}
    >
      <p>{m.share[status]}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label={m.share.dismiss}
        className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
