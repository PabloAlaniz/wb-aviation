import { useEffect, useRef, useState } from "react"
import { aircraftData, emptyWeightsFor } from "../data/aircraft"
import { createCustomAircraft } from "../utils/customAircraft"
import { decodeSharedCalculation, readShareParam, withoutShareParam } from "../utils/shareLink"

/** @typedef {import("../utils/customAircraft").CustomAircraftRecord} CustomAircraftRecord */

/**
 * Outcome of opening a shared link:
 * - "loaded": the shared calculation replaced the local one
 * - "conflict": the link carries a custom aircraft whose registration is
 *   already saved here with different weighing data; nothing was changed
 * - "invalid": the link is malformed or refers to an unknown aircraft
 * @typedef {"loaded" | "conflict" | "invalid"} SharedCalculationStatus
 */

/**
 * @param {CustomAircraftRecord} a
 * @param {CustomAircraftRecord} b
 */
function sameWeighingData(a, b) {
  return (
    a.baseModelId === b.baseModelId && a.emptyWeight === b.emptyWeight && a.emptyArm === b.emptyArm
  )
}

/**
 * Apply a `?s=` shared calculation once on mount, then drop the param from
 * the URL (history.replaceState) so reloads use the local state.
 *
 * An embedded custom aircraft is saved to the user's custom aircraft (so it
 * appears in the selector and survives reloads), unless the same
 * registration is already saved with different empty weight/arm: the user's
 * own weighing data is never overwritten by a link, so the link is rejected
 * with status "conflict".
 *
 * @param {{
 *   records: CustomAircraftRecord[],
 *   saveCustomAircraft: (record: CustomAircraftRecord) => unknown,
 *   setSelectedAircraft: (id: string) => void,
 *   setWeights: (weights: import("../types").StationWeights) => void,
 *   setFuelBurn: (fuelBurn: string) => void,
 *   setUnits: (units: import("../types").UnitSystem) => void,
 * }} actions
 * @returns {{ status: SharedCalculationStatus | null, dismiss: () => void }}
 */
export function useSharedCalculation(actions) {
  const [status, setStatus] = useState(/** @type {SharedCalculationStatus | null} */ (null))
  const handled = useRef(false)
  // latest callbacks without re-running the one-shot effect
  const actionsRef = useRef(actions)
  actionsRef.current = actions

  useEffect(() => {
    if (handled.current || typeof window === "undefined") return
    handled.current = true

    const param = readShareParam(window.location.search)
    if (param === null) return

    const { records, saveCustomAircraft, setSelectedAircraft, setWeights, setFuelBurn, setUnits } =
      actionsRef.current
    const shared = decodeSharedCalculation(param)
    const clearParam = () => {
      try {
        window.history.replaceState(
          window.history.state,
          "",
          withoutShareParam(window.location.href)
        )
      } catch {
        // ignore: the param stays but local state is still consistent
      }
    }

    if (!shared) {
      setStatus("invalid")
      clearParam()
      return
    }

    let aircraft = aircraftData[shared.aircraftId]
    if (shared.customRecord) {
      const record = shared.customRecord
      const existing = records.find((r) => r.registration === record.registration)
      if (existing && !sameWeighingData(existing, record)) {
        setStatus("conflict")
        clearParam()
        return
      }
      if (!existing) saveCustomAircraft(record)
      aircraft = createCustomAircraft(record)
    }

    setSelectedAircraft(shared.aircraftId)
    setWeights({ ...emptyWeightsFor(aircraft), ...shared.weights })
    setFuelBurn(shared.fuelBurn)
    if (shared.units) setUnits(shared.units)
    setStatus("loaded")
    clearParam()
  }, [])

  return { status, dismiss: () => setStatus(null) }
}
