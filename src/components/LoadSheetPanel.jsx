import { useEffect, useState } from "react"
import { createPortal, flushSync } from "react-dom"
import { Printer } from "lucide-react"
import { LoadSheet } from "./LoadSheet"
import { LoadSheetForm } from "./LoadSheetForm"
import { messages as m } from "../i18n"
import { trackEvent } from "../analytics"
import { useLocalStorage } from "../hooks/useLocalStorage"
import {
  EMPTY_LOAD_SHEET_DETAILS,
  LOAD_SHEET_STORAGE_KEY,
  aircraftRegistration,
  isStoredLoadSheetDetails,
  todayIso,
} from "../utils/loadSheet"

/** Delay before opening the print dialog, so the sheet and its chart are painted. */
export const PRINT_DELAY_MS = 150

/**
 * Load sheet form + "print / save PDF" button. The printable sheet is mounted
 * on demand (first print request or the browser's own `beforeprint`) in a
 * portal on <body>, outside the app container that print CSS hides.
 * @param {{
 *   aircraft: import("../types").Aircraft,
 *   weights: import("../types").StationWeights,
 *   results: import("../types").WeightBalanceResult,
 *   safetyChecks: import("../types").SafetyReport | null,
 *   phases: import("../types").FlightPhasesResult | null,
 *   landingReport: import("../types").LandingReport | null,
 *   units?: import("../types").UnitSystem,
 * }} props
 */
export function LoadSheetPanel({ units = "imperial", ...sheetProps }) {
  const [stored, setStored] = useLocalStorage(
    LOAD_SHEET_STORAGE_KEY,
    EMPTY_LOAD_SHEET_DETAILS,
    isStoredLoadSheetDetails
  )
  const [date, setDate] = useState(() => todayIso())
  const [sheetMounted, setSheetMounted] = useState(false)
  const [printPending, setPrintPending] = useState(false)

  // A custom aircraft brings its own registration: prefill it whenever the
  // selected aircraft changes to one (the pilot can still edit it), and drop
  // it again when switching back to a catalog model.
  const customRegistration = aircraftRegistration(sheetProps.aircraft)
  const [previous, setPrevious] = useState({
    name: sheetProps.aircraft.name,
    registration: customRegistration,
  })
  if (previous.name !== sheetProps.aircraft.name) {
    setPrevious({ name: sheetProps.aircraft.name, registration: customRegistration })
    if (customRegistration) {
      setStored((prev) => ({ ...prev, registration: customRegistration }))
    } else if (previous.registration && stored.registration === previous.registration) {
      setStored((prev) => ({ ...prev, registration: "" }))
    }
  }

  /** @type {import("../utils/loadSheet").LoadSheetDetails} */
  const details = {
    ...EMPTY_LOAD_SHEET_DETAILS,
    ...stored,
    registration: stored.registration || customRegistration,
    date,
  }

  const handleChange = (
    /** @type {keyof import("../utils/loadSheet").LoadSheetDetails} */ field,
    /** @type {string} */ value
  ) => {
    if (field === "date") setDate(value)
    else setStored((prev) => ({ ...prev, [field]: value }))
  }

  // Ctrl/Cmd+P without the button: mount the sheet before the page is laid out
  useEffect(() => {
    const onBeforePrint = () => flushSync(() => setSheetMounted(true))
    window.addEventListener("beforeprint", onBeforePrint)
    return () => window.removeEventListener("beforeprint", onBeforePrint)
  }, [])

  useEffect(() => {
    if (!printPending) return
    const timer = window.setTimeout(() => {
      setPrintPending(false)
      window.print()
    }, PRINT_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [printPending])

  const handlePrint = () => {
    trackEvent("pdf_export", { units })
    setSheetMounted(true)
    setPrintPending(true)
  }

  return (
    <div className="space-y-3 print:hidden">
      <LoadSheetForm details={details} onChange={handleChange} />
      <button
        type="button"
        onClick={handlePrint}
        disabled={printPending}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-60"
      >
        <Printer className="h-4 w-4" />
        {m.loadSheet.printButton}
      </button>
      {sheetMounted &&
        createPortal(
          <div className="hidden print:block">
            <LoadSheet {...sheetProps} details={details} units={units} />
          </div>,
          document.body
        )}
    </div>
  )
}
