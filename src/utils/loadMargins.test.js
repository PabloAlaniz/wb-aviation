import { describe, it, expect } from "vitest"
import { buildLoadMargins } from "./loadMargins"
import {
  buildRampIssues,
  buildSafetyReport,
  buildStationLimitIssues,
  calculateFlightPhases,
  envelopeCgRangeAt,
} from "./calculations"
import { aircraftData } from "../data/aircraft"

/** Small synthetic aircraft so every number can be checked by hand. */
const trainer = {
  ...aircraftData["cessna-172s"],
  emptyWeight: 1000,
  emptyArm: 40,
  maxWeight: 2000,
  maxLandingWeight: undefined,
  maxRampWeight: undefined,
  cgLimits: { forward: 35, aft: 47 },
  stations: { pilot: 37, baggage: 95, fuel: 48 },
  loadStations: [
    { key: "pilot", label: "Pilot" },
    { key: "baggage", label: "Baggage", max: 100 },
    { key: "fuel", label: "Fuel", max: 300, isFuel: true },
  ],
  cgEnvelope: {
    points: [
      { arm: 35, weight: 900 },
      { arm: 35, weight: 1500 },
      { arm: 41, weight: 2000 },
      { arm: 47, weight: 2000 },
      { arm: 47, weight: 900 },
      { arm: 35, weight: 900 },
    ],
  },
}

describe("envelopeCgRangeAt", () => {
  const points = trainer.cgEnvelope.points

  it("returns the absolute limits where the envelope is at its widest", () => {
    expect(envelopeCgRangeAt(points, 1200)).toEqual({ forward: 35, aft: 47 })
    expect(envelopeCgRangeAt(points, 1500)).toEqual({ forward: 35, aft: 47 })
  })

  it("follows the sloped forward limit as weight goes up", () => {
    expect(envelopeCgRangeAt(points, 1750)).toEqual({ forward: 38, aft: 47 })
    expect(envelopeCgRangeAt(points, 2000)).toEqual({ forward: 41, aft: 47 })
  })

  it("covers the whole edge at the floor of the envelope", () => {
    expect(envelopeCgRangeAt(points, 900)).toEqual({ forward: 35, aft: 47 })
  })

  it("returns null outside the envelope's weight range or without an envelope", () => {
    expect(envelopeCgRangeAt(points, 2001)).toBeNull()
    expect(envelopeCgRangeAt(points, 800)).toBeNull()
    expect(envelopeCgRangeAt([], 1500)).toBeNull()
    expect(envelopeCgRangeAt(undefined, 1500)).toBeNull()
  })
})

describe("buildSafetyReport CG margins", () => {
  it("measures the forward margin against the envelope at the current weight", () => {
    // 38.05" is 3.05" aft of the absolute limit but only 0.05" inside at 1750 lbs
    const report = buildSafetyReport(trainer, 1750, 38.05)
    expect(report.cgMargins.forward).toBe("0.05")
    expect(report.warnings.map((w) => w.type)).toContain("cg-forward-warning")
  })

  it("falls back to the absolute limits when the weight is above the envelope", () => {
    const report = buildSafetyReport(trainer, 2100, 43)
    expect(report.cgMargins).toEqual({ forward: "8.00", aft: "4.00" })
  })
})

describe("buildStationLimitIssues", () => {
  it("flags a station loaded above its maximum", () => {
    const issues = buildStationLimitIssues(trainer, { pilot: "170", baggage: "120", fuel: "100" })
    expect(issues).toHaveLength(1)
    expect(issues[0]).toMatchObject({
      type: "station-max",
      station: "baggage",
      label: "Baggage",
      value: 120,
      limit: 100,
    })
  })

  it("accepts a load exactly at the maximum and ignores stations without one", () => {
    expect(buildStationLimitIssues(trainer, { pilot: "900", baggage: "100", fuel: "300" })).toEqual(
      []
    )
  })

  it("is part of the ramp issues only when the weights are given", () => {
    const weights = { pilot: "170", baggage: "0", fuel: "301" }
    const phases = calculateFlightPhases(trainer, weights, 0)
    expect(buildRampIssues(trainer, phases)).toEqual([])
    expect(buildRampIssues(trainer, phases, weights).map((i) => i.station)).toEqual(["fuel"])
  })
})

describe("buildLoadMargins", () => {
  it("reports the payload left up to the max takeoff weight", () => {
    const margins = buildLoadMargins(trainer, { pilot: "200", fuel: "100" })
    expect(margins.payloadAvailable).toBe(700)
  })

  it("caps the extra fuel at the tank capacity", () => {
    const margins = buildLoadMargins(trainer, { pilot: "200", fuel: "100" })
    expect(margins.extraFuel).toEqual({ amount: 200, limitedBy: "tank" })
  })

  it("caps the extra fuel at the max takeoff weight", () => {
    const margins = buildLoadMargins(trainer, { pilot: "700", baggage: "100", fuel: "100" })
    expect(margins.extraFuel).toEqual({ amount: 100, limitedBy: "weight" })
  })

  it("caps the extra fuel at the max ramp weight", () => {
    const aircraft = { ...trainer, maxRampWeight: 1400 }
    const margins = buildLoadMargins(aircraft, { pilot: "200", fuel: "100" })
    expect(margins.extraFuel).toEqual({ amount: 100, limitedBy: "ramp" })
  })

  it("caps the extra fuel at the max landing weight, after the planned burn", () => {
    const aircraft = { ...trainer, maxLandingWeight: 1450 }
    const weights = { pilot: "200", fuel: "100" }
    expect(buildLoadMargins(aircraft, weights).extraFuel).toEqual({
      amount: 150,
      limitedBy: "landing",
    })
    // burning 60 lbs leaves room for 60 lbs more, up to the tank capacity
    expect(buildLoadMargins(aircraft, weights, 60).extraFuel).toEqual({
      amount: 200,
      limitedBy: "tank",
    })
  })

  it("stops where the extra fuel would push the CG out of the envelope", () => {
    // forward tank (30"): fuel moves the CG forward while the limit moves aft
    const aircraft = { ...trainer, stations: { ...trainer.stations, fuel: 30 } }
    const margins = buildLoadMargins(aircraft, { pilot: "600", fuel: "0" })
    expect(margins.extraFuel.limitedBy).toBe("envelope")
    // 0.012 f² + 25.4 f − 4280 = 0
    expect(margins.extraFuel.amount).toBeCloseTo(156.88, 1)
    // never overstated: the reported amount still fits
    const loaded = { pilot: "600", fuel: String(margins.extraFuel.amount) }
    expect(calculateFlightPhases(aircraft, loaded, 0).takeoff.inEnvelope).toBe(true)
  })

  it("reports no room when the tanks are full", () => {
    const margins = buildLoadMargins(trainer, { pilot: "200", fuel: "300" })
    expect(margins.extraFuel).toEqual({ amount: 0, limitedBy: "tank" })
  })

  it("gives no extra fuel figure when the loading is already out of limits", () => {
    const overweight = buildLoadMargins(trainer, { pilot: "900", baggage: "100", fuel: "100" })
    expect(overweight.payloadAvailable).toBe(-100)
    expect(overweight.extraFuel).toBeNull()

    const overStation = buildLoadMargins(trainer, { pilot: "200", baggage: "130", fuel: "100" })
    expect(overStation.extraFuel).toBeNull()
  })

  it("subtracts the taxi fuel before measuring the takeoff margins", () => {
    const margins = buildLoadMargins(trainer, { pilot: "700", baggage: "100", fuel: "100" }, 0, 20)
    expect(margins.payloadAvailable).toBe(120)
    expect(margins.extraFuel).toEqual({ amount: 120, limitedBy: "weight" })
  })

  it("reports the fuel left at landing", () => {
    const margins = buildLoadMargins(trainer, { pilot: "200", fuel: "100" }, 60, 10)
    expect(margins.fuelAtLanding).toBe(30)
    expect(margins.hasFuelStation).toBe(true)
  })

  it("handles an aircraft without fuel station", () => {
    const aircraft = {
      ...trainer,
      stations: { pilot: 37, baggage: 95 },
      loadStations: trainer.loadStations.filter((station) => station.key !== "fuel"),
    }
    const margins = buildLoadMargins(aircraft, { pilot: "200" })
    expect(margins.hasFuelStation).toBe(false)
    expect(margins.extraFuel).toBeNull()
  })

  it("splits the extra fuel between tanks in proportion to their room", () => {
    const aircraft = {
      ...trainer,
      stations: { ...trainer.stations, fuelAux: 60 },
      loadStations: [
        ...trainer.loadStations,
        { key: "fuelAux", label: "Aux", max: 100, isFuel: true },
      ],
    }
    const margins = buildLoadMargins(aircraft, { pilot: "200", fuel: "200", fuelAux: "0" })
    expect(margins.extraFuel).toEqual({ amount: 200, limitedBy: "tank" })
  })

  it("works for every aircraft in the catalog with an empty load", () => {
    for (const aircraft of Object.values(aircraftData)) {
      const margins = buildLoadMargins(aircraft, {})
      expect(margins.payloadAvailable).toBe(aircraft.maxWeight - aircraft.emptyWeight)
    }
  })
})
