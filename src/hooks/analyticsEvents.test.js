import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { trackEvent } from "../analytics"
import { useUnits } from "./useUnits"
import { useCustomAircraft } from "./useCustomAircraft"
import { useFleetImport } from "./useFleetImport"
import { useSharedCalculation } from "./useSharedCalculation"
import { encodeFleet } from "../utils/fleetLink"
import { encodeSharedCalculation } from "../utils/shareLink"

vi.mock("../analytics", () => ({ trackEvent: vi.fn() }))

const record = {
  baseModelId: "cessna-172s",
  registration: "LV-ABC",
  emptyWeight: 1700,
  emptyArm: 40.5,
}

/** @param {string} url */
function visit(url) {
  window.history.replaceState(null, "", url)
}

function sharedActions() {
  return {
    records: [],
    saveCustomAircraft: vi.fn(),
    setSelectedAircraft: vi.fn(),
    setWeights: vi.fn(),
    setFuelBurn: vi.fn(),
    setUnits: vi.fn(),
  }
}

describe("hook conversion events", () => {
  beforeEach(() => {
    window.localStorage.clear()
    vi.mocked(trackEvent).mockClear()
  })

  afterEach(() => {
    visit("/")
  })

  it("useUnits tracks units_changed only when the units change", () => {
    const { result } = renderHook(() => useUnits())

    act(() => result.current[1]("metric"))
    act(() => result.current[1]("metric"))

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent).toHaveBeenCalledWith("units_changed", { units: "metric" })
  })

  it("useCustomAircraft tracks custom_aircraft_created for new registrations only", () => {
    const { result } = renderHook(() => useCustomAircraft())

    act(() => {
      result.current.save(record)
    })
    act(() => {
      result.current.save({ ...record, emptyWeight: 1710 })
    })

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent).toHaveBeenCalledWith("custom_aircraft_created", {
      baseModelId: "cessna-172s",
    })
  })

  it("useCustomAircraft does not track saves with track: false or invalid input", () => {
    const { result } = renderHook(() => useCustomAircraft())

    act(() => {
      result.current.save(record, { track: false })
      result.current.save({ ...record, registration: "" })
    })

    expect(trackEvent).not.toHaveBeenCalled()
  })

  it("useFleetImport tracks fleet_link_opened when a ?fleet= link is detected", () => {
    visit(`/?fleet=${encodeFleet([record], "Club")}`)

    renderHook(() => useFleetImport(vi.fn()))

    expect(trackEvent).toHaveBeenCalledWith("fleet_link_opened", { count: 1 })
  })

  it("useFleetImport does not track without a fleet param", () => {
    renderHook(() => useFleetImport(vi.fn()))

    expect(trackEvent).not.toHaveBeenCalled()
  })

  it("useSharedCalculation tracks shared_link_opened with the outcome", () => {
    const s = encodeSharedCalculation({
      aircraftId: "cessna-172s",
      weights: {},
      fuelBurn: "",
      units: "imperial",
    })
    visit(`/?s=${s}`)

    renderHook(() => useSharedCalculation(sharedActions()))

    expect(trackEvent).toHaveBeenCalledWith("shared_link_opened", { status: "loaded" })
  })

  it("useSharedCalculation tracks invalid links", () => {
    visit("/?s=not-a-valid-link")

    renderHook(() => useSharedCalculation(sharedActions()))

    expect(trackEvent).toHaveBeenCalledWith("shared_link_opened", { status: "invalid" })
  })
})
