import { describe, it, expect } from "vitest"
import {
  calculateFlightPhases,
  buildLandingReport,
  getFuelStationKeys,
  calculateWeightBalance,
} from "./calculations"
import { aircraftData } from "../data/aircraft"

const e90 = aircraftData["king-air-echo-90"]
const c172 = aircraftData["cessna-172s"]

describe("getFuelStationKeys", () => {
  it("returns stations flagged with isFuel", () => {
    expect(getFuelStationKeys(e90)).toEqual(["fuel"])
    expect(getFuelStationKeys(c172)).toEqual(["fuel"])
  })

  it("falls back to a numeric 'fuel' station when none is flagged", () => {
    const aircraft = {
      ...e90,
      loadStations: e90.loadStations.map(({ key, label }) => ({ key, label })),
    }
    expect(getFuelStationKeys(aircraft)).toEqual(["fuel"])
  })

  it("supports several flagged fuel stations", () => {
    const aircraft = {
      ...e90,
      stations: { ...e90.stations, fuelAux: 170 },
      loadStations: [...e90.loadStations, { key: "fuelAux", label: "Aux", isFuel: true }],
    }
    expect(getFuelStationKeys(aircraft)).toEqual(["fuel", "fuelAux"])
  })

  it("returns an empty list for an aircraft without fuel station", () => {
    const { fuel: _fuel, ...stations } = e90.stations
    const aircraft = {
      ...e90,
      stations,
      loadStations: e90.loadStations.filter((s) => s.key !== "fuel"),
    }
    expect(getFuelStationKeys(aircraft)).toEqual([])
  })
})

describe("calculateFlightPhases", () => {
  const weights = { pilot: "200", copilot: "180", fuel: "1500" }

  it("returns null without aircraft or weights", () => {
    expect(calculateFlightPhases(null, weights, "100")).toBeNull()
    expect(calculateFlightPhases(e90, null, "100")).toBeNull()
  })

  it("takeoff matches calculateWeightBalance", () => {
    const phases = calculateFlightPhases(e90, weights, "800")
    const base = calculateWeightBalance(e90, weights)
    expect(phases.takeoff.totalWeight).toBe(base.totalWeight)
    expect(phases.takeoff.centerOfGravity).toBeCloseTo(base.centerOfGravity, 6)
    expect(phases.takeoff.inEnvelope).toBe(base.isCgOk)
  })

  it("landing removes the burned fuel at the fuel arm", () => {
    const phases = calculateFlightPhases(e90, weights, "800")
    const t = phases.takeoff
    expect(phases.landing.totalWeight).toBe(t.totalWeight - 800)
    expect(phases.landing.totalMoment).toBeCloseTo(t.totalMoment - 800 * 154, 6)
    expect(phases.landing.centerOfGravity).toBeCloseTo(
      (t.totalMoment - 800 * 154) / (t.totalWeight - 800),
      6
    )
    expect(phases.fuelBurn).toBe(800)
    expect(phases.burnExceedsFuel).toBe(false)
  })

  it("zero-fuel removes all the loaded fuel", () => {
    const phases = calculateFlightPhases(e90, weights, "800")
    expect(phases.fuelLoaded).toBe(1500)
    expect(phases.zeroFuel.totalWeight).toBe(phases.takeoff.totalWeight - 1500)
    expect(phases.zeroFuel.totalMoment).toBeCloseTo(phases.takeoff.totalMoment - 1500 * 154, 6)
  })

  it("zero burn: landing equals takeoff", () => {
    for (const burn of ["", "0", 0, "abc"]) {
      const phases = calculateFlightPhases(e90, weights, burn)
      expect(phases.landing).toEqual(phases.takeoff)
      expect(phases.fuelBurn).toBe(0)
    }
  })

  it("negative burn is treated as zero", () => {
    const phases = calculateFlightPhases(e90, weights, "-300")
    expect(phases.fuelBurn).toBe(0)
    expect(phases.requestedBurn).toBe(0)
    expect(phases.landing).toEqual(phases.takeoff)
  })

  it("burn > fuel is clamped to the loaded fuel and flagged", () => {
    const phases = calculateFlightPhases(e90, weights, "2000")
    expect(phases.burnExceedsFuel).toBe(true)
    expect(phases.requestedBurn).toBe(2000)
    expect(phases.fuelBurn).toBe(1500)
    expect(phases.landing.totalWeight).toBe(phases.zeroFuel.totalWeight)
    expect(phases.landing.centerOfGravity).toBeCloseTo(phases.zeroFuel.centerOfGravity, 6)
  })

  it("burns proportionally from several fuel stations", () => {
    const aircraft = {
      ...e90,
      stations: { ...e90.stations, fuelAux: 170 },
      loadStations: [...e90.loadStations, { key: "fuelAux", label: "Aux", isFuel: true }],
    }
    const phases = calculateFlightPhases(aircraft, { fuel: "300", fuelAux: "100" }, "200")
    const t = phases.takeoff
    // mitad del combustible de cada estación: 150 @154 + 50 @170
    expect(phases.fuelLoaded).toBe(400)
    expect(phases.landing.totalWeight).toBe(t.totalWeight - 200)
    expect(phases.landing.totalMoment).toBeCloseTo(t.totalMoment - (150 * 154 + 50 * 170), 6)
  })

  it("aircraft without fuel station: landing and zero-fuel equal takeoff", () => {
    const { fuel: _fuel, ...stations } = e90.stations
    const aircraft = {
      ...e90,
      stations,
      loadStations: e90.loadStations.filter((s) => s.key !== "fuel"),
    }
    const phases = calculateFlightPhases(aircraft, { pilot: "200" }, "500")
    expect(phases.hasFuelStation).toBe(false)
    expect(phases.fuelLoaded).toBe(0)
    expect(phases.burnExceedsFuel).toBe(true)
    expect(phases.landing).toEqual(phases.takeoff)
    expect(phases.zeroFuel).toEqual(phases.takeoff)
  })
})

describe("buildLandingReport", () => {
  it("is ok for a normal flight", () => {
    const phases = calculateFlightPhases(e90, { pilot: "200", fuel: "1500" }, "800")
    const report = buildLandingReport(e90, phases)
    expect(report.isLandingOk).toBe(true)
    expect(report.errors).toEqual([])
  })

  it("flags a burn larger than the fuel on board", () => {
    const phases = calculateFlightPhases(e90, { pilot: "200", fuel: "500" }, "800")
    const report = buildLandingReport(e90, phases)
    expect(report.isLandingOk).toBe(false)
    expect(report.errors.map((e) => e.type)).toContain("burn-exceeds-fuel")
  })

  it("checks max landing weight when declared", () => {
    expect(c172.maxLandingWeight).toBe(2550)
    const aircraft = { ...c172, maxLandingWeight: 2300 }
    // 1663 + 170 + 170 + 318 = 2321 al despegue; sin consumo aterriza a 2321 > 2300
    const phases = calculateFlightPhases(
      aircraft,
      { pilot: "170", copilot: "170", fuel: "318" },
      "0"
    )
    const report = buildLandingReport(aircraft, phases)
    expect(report.errors.map((e) => e.type)).toContain("landing-weight")

    const burned = calculateFlightPhases(
      aircraft,
      { pilot: "170", copilot: "170", fuel: "318" },
      "100"
    )
    expect(buildLandingReport(aircraft, burned).isLandingOk).toBe(true)
  })

  it("skips MLW / MZFW checks when not declared", () => {
    expect(e90.maxLandingWeight).toBeUndefined()
    expect(e90.maxZeroFuelWeight).toBeUndefined()
    const phases = calculateFlightPhases(e90, { fuel: "100" }, "0")
    const types = buildLandingReport(e90, phases).errors.map((e) => e.type)
    expect(types).not.toContain("landing-weight")
    expect(types).not.toContain("zero-fuel-weight")
  })

  it("checks max zero-fuel weight when declared", () => {
    const aircraft = { ...e90, maxZeroFuelWeight: 7000 }
    const phases = calculateFlightPhases(aircraft, { pilot: "200", copilot: "200" }, "0")
    const report = buildLandingReport(aircraft, phases)
    expect(report.errors.map((e) => e.type)).toContain("zero-fuel-weight")
  })

  it("reports landing CG out of envelope as an error", () => {
    // aeronave ficticia con el combustible muy adelante: al quemarlo, el CG se va atrás
    const aircraft = { ...e90, stations: { ...e90.stations, fuel: 100 } }
    const weights = { baggage2: "350", passenger3: "200", passenger4: "200", fuel: "1500" }
    const phases = calculateFlightPhases(aircraft, weights, "1500")
    expect(phases.takeoff.inEnvelope).toBe(true)
    expect(phases.landing.inEnvelope).toBe(false)
    const report = buildLandingReport(aircraft, phases)
    expect(report.errors.map((e) => e.type)).toContain("landing-cg")
    expect(report.warnings.map((e) => e.type)).toContain("zero-fuel-cg")
  })
})
