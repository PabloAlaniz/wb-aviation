import { useEffect, useState } from "react"
import { decodeFleet, readFleetParam, withoutFleetParam } from "../utils/fleetLink"
import { trackEvent } from "../analytics"

/**
 * @typedef {{ status: "idle" }
 *   | { status: "invalid" }
 *   | { status: "pending", fleet: import("../utils/fleetLink").Fleet }
 *   | { status: "imported", count: number }} FleetImportState
 */

/** @returns {FleetImportState} */
function initialState() {
  if (typeof window === "undefined") return { status: "idle" }
  const param = readFleetParam(window.location.search)
  if (param === null) return { status: "idle" }
  const fleet = decodeFleet(param)
  return fleet ? { status: "pending", fleet } : { status: "invalid" }
}

/** Drop `?fleet=` from the address bar so a reload doesn't prompt again. */
function clearFleetParam() {
  try {
    window.history.replaceState(window.history.state, "", withoutFleetParam(window.location.href))
  } catch {
    // ignore: the param stays visible but nothing else breaks
  }
}

/**
 * Read a shared fleet from `?fleet=` on load and let the user confirm it.
 * @param {(records: import("../utils/customAircraft").CustomAircraftRecord[]) => void} importRecords
 *   Persists the records (existing registrations are overwritten)
 * @returns {FleetImportState & {
 *   accept: () => void,
 *   dismiss: () => void,
 * }}
 */
export function useFleetImport(importRecords) {
  const [state, setState] = useState(initialState)

  // one-shot: a `?fleet=` link was opened (valid or not)
  useEffect(() => {
    if (state.status === "pending") {
      trackEvent("fleet_link_opened", { count: state.fleet.records.length })
    } else if (state.status === "invalid") {
      trackEvent("fleet_link_opened", { count: 0, invalid: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const accept = () => {
    if (state.status !== "pending") return
    const { records } = state.fleet
    importRecords(records)
    trackEvent("fleet_import", { count: records.length })
    clearFleetParam()
    setState({ status: "imported", count: records.length })
  }

  const dismiss = () => {
    if (state.status === "pending" || state.status === "invalid") clearFleetParam()
    setState({ status: "idle" })
  }

  return { ...state, accept, dismiss }
}
