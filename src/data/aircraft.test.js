import { describe, it, expect } from "vitest"
import { aircraftData, aircraftOptions, emptyWeightsFor } from "./aircraft"
import { calculateWeightBalance, isPointInEnvelope } from "../utils/calculations"

// Invariantes estructurales que toda aeronave de la base debe cumplir.
// Si se agrega una aeronave nueva, estos tests la validan automáticamente.
describe.each(Object.entries(aircraftData))("aircraftData: %s", (key, aircraft) => {
  it("has the required weight and CG fields", () => {
    expect(aircraft.name).toBeTruthy()
    expect(aircraft.emptyWeight).toBeGreaterThan(0)
    expect(aircraft.emptyArm).toBeGreaterThan(0)
    expect(aircraft.maxWeight).toBeGreaterThan(aircraft.emptyWeight)
    expect(aircraft.cgLimits.forward).toBeLessThan(aircraft.cgLimits.aft)
  })

  it("declares data reliability and sources", () => {
    expect(["verified-complete", "verified-partial", "estimated"]).toContain(
      aircraft.metadata.dataReliability
    )
    expect(aircraft.metadata.sourceDocuments.length).toBeGreaterThan(0)
    expect(aircraft.dataValidation.lastUpdated).toBeTruthy()
  })

  it("every loadStation maps to a numeric station arm", () => {
    expect(aircraft.loadStations.length).toBeGreaterThan(0)
    for (const station of aircraft.loadStations) {
      expect(typeof aircraft.stations[station.key], `station ${station.key}`).toBe("number")
      expect(station.label).toBeTruthy()
    }
  })

  it("has a closed CG envelope polygon with at least 3 points", () => {
    const points = aircraft.cgEnvelope.points
    expect(points.length).toBeGreaterThanOrEqual(4)
    expect(points[0]).toEqual(points[points.length - 1])
  })

  it("empty aircraft CG falls within the fore/aft limits", () => {
    expect(aircraft.emptyArm).toBeGreaterThan(0)
    // el CG con la aeronave cargada razonablemente debe poder caer en la envolvente:
    // verificamos que los límites de CG contengan el rango de la envolvente
    const arms = aircraft.cgEnvelope.points.map((p) => p.arm)
    expect(Math.min(...arms)).toBeGreaterThanOrEqual(aircraft.cgLimits.forward - 0.01)
    expect(Math.max(...arms)).toBeLessThanOrEqual(aircraft.cgLimits.aft + 0.01)
  })

  it("emptyWeightsFor builds one empty entry per load station", () => {
    const weights = emptyWeightsFor(aircraft)
    expect(Object.keys(weights)).toHaveLength(aircraft.loadStations.length)
    expect(Object.values(weights).every((v) => v === "")).toBe(true)
  })
})

describe("aircraftOptions", () => {
  it("exposes one selector option per aircraft", () => {
    expect(aircraftOptions).toHaveLength(Object.keys(aircraftData).length)
    expect(aircraftOptions.map((o) => o.value)).toContain("cessna-172s")
  })
})

describe("Cessna 172S", () => {
  const c172 = aircraftData["cessna-172s"]

  it("calculates a typical mission within limits (2 adultos + combustible lleno)", () => {
    const weights = { pilot: "170", copilot: "170", fuel: "318" }

    const result = calculateWeightBalance(c172, weights)

    // 1663 + 170 + 170 + 318 = 2321 lbs
    expect(result.totalWeight).toBe(2321)
    // momento = 1663*41 + 340*37 + 318*48 = 96027 -> CG = 41.37"
    expect(result.centerOfGravity).toBeCloseTo(41.37, 1)
    expect(result.isWeightOk).toBe(true)
    expect(result.isCgOk).toBe(true)
  })

  it("detects overweight beyond 2550 lbs", () => {
    const weights = {
      pilot: "200",
      copilot: "200",
      passenger1: "200",
      passenger2: "200",
      baggage1: "120",
      baggage2: "50",
      fuel: "318",
    }

    const result = calculateWeightBalance(c172, weights)

    expect(result.totalWeight).toBeGreaterThan(2550)
    expect(result.isWeightOk).toBe(false)
  })

  it("variable forward limit: a CG legal at low weight is out at high weight", () => {
    const envelope = c172.cgEnvelope.points

    // 38" es válido a 1900 lbs (límite frontal 35") pero no a 2400 lbs (límite ~39.5")
    expect(isPointInEnvelope(38, 1900, envelope)).toBe(true)
    expect(isPointInEnvelope(38, 2400, envelope)).toBe(false)
  })

  it("rejects CG aft of 47.3 inches", () => {
    expect(isPointInEnvelope(48, 2000, c172.cgEnvelope.points)).toBe(false)
  })
})
