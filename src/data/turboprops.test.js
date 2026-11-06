import { describe, it, expect } from "vitest"
import { aircraftCategory, aircraftData, seatCount } from "./aircraft"
import { buildLandingReport, buildRampIssues, calculateFlightPhases } from "../utils/calculations"

// Turboprops loaded from operator weight & balance spreadsheets (not yet
// checked against the POH): marked as estimated, with max ramp weight.
const TURBOPROPS = ["king-air-b200", "king-air-b200-medevac", "beech-1900d"]

const KG = 2.20462262

describe.each(TURBOPROPS)("turboprop %s", (key) => {
  const aircraft = aircraftData[key]

  it("is flagged as estimated, with pending items and an example empty weight warning", () => {
    expect(aircraft.tcds).toMatch(/TCDS# A24CE/)
    expect(aircraft.metadata.dataReliability).toBe("estimated")
    expect(aircraft.cgEnvelope.verificationStatus).toBe("estimated")
    expect(aircraft.dataValidation.pendingVerification.length).toBeGreaterThan(0)
    expect(aircraft.metadata.aircraftSpecific?.warning).toBeTruthy()
  })

  it("declares consistent weight limits", () => {
    expect(aircraft.maxRampWeight).toBeGreaterThan(aircraft.maxWeight)
    expect(aircraft.maxLandingWeight).toBeLessThanOrEqual(aircraft.maxWeight)
    expect(aircraft.maxZeroFuelWeight).toBeLessThan(aircraft.maxLandingWeight)
    expect(aircraft.emptyWeight).toBeLessThan(aircraft.maxZeroFuelWeight)
  })

  it("has a closed envelope spanning cgLimits up to maxWeight", () => {
    const points = aircraft.cgEnvelope.points
    expect(points[0]).toEqual(points.at(-1))
    expect(Math.max(...points.map((p) => p.weight))).toBe(aircraft.maxWeight)
    expect(Math.min(...points.map((p) => p.arm))).toBe(aircraft.cgLimits.forward)
    expect(Math.max(...points.map((p) => p.arm))).toBe(aircraft.cgLimits.aft)
    expect(Math.min(...points.map((p) => p.weight))).toBeLessThan(aircraft.emptyWeight)
  })

  it("has a positive arm for every load station and one capped fuel station", () => {
    for (const station of aircraft.loadStations) {
      expect(aircraft.stations[station.key], station.key).toBeGreaterThan(0)
    }
    const fuel = aircraft.loadStations.filter((s) => s.isFuel)
    expect(fuel).toHaveLength(1)
    expect(fuel[0].max).toBeGreaterThan(0)
  })

  it("is listed with the 6+ seat aircraft", () => {
    expect(seatCount(aircraft)).toBeGreaterThanOrEqual(6)
    expect(aircraftCategory(aircraft)).toBe("multi")
  })
})

describe("King Air B200 worked example (executive, 8 adults of 85 kg)", () => {
  const b200 = aircraftData["king-air-b200"]
  const weights = { pilot: "187", copilot: "187", fuel: "2000" }
  for (let i = 1; i <= 8; i++) weights[`passenger${i}`] = String(85 * KG)

  it("matches a hand calculation, with taxi fuel removed at the fuel arm", () => {
    // empty 8198 @ 186.1 = 1,525,647.8; crew 374 @ 129 = 48,246
    // pax 187.393 each: 2 @ 215, 2 @ 259, 183, 176, 163, 293 -> 187.393 x 1763 = 330,373.9
    // fuel 2000 @ 195.9 = 391,800 -> ramp 12,071.14 lbs, 2,296,067.7 lb-in
    // taxi 90 @ 195.9 = 17,631 -> takeoff 11,981.14 lbs, 2,278,436.7 lb-in = 190.17"
    const phases = calculateFlightPhases(b200, weights, "400", "90")
    expect(phases.ramp.totalWeight).toBeCloseTo(12071.14, 1)
    expect(phases.takeoff.totalWeight).toBeCloseTo(11981.14, 1)
    expect(phases.takeoff.centerOfGravity).toBeCloseTo(190.17, 1)
    expect(phases.takeoff.inEnvelope).toBe(true)
    expect(phases.zeroFuel.totalWeight).toBeCloseTo(10071.14, 1)
    expect(buildRampIssues(b200, phases)).toEqual([])
    expect(buildLandingReport(b200, phases).isLandingOk).toBe(true)
  })

  it("flags a ramp weight over 12,590 lbs", () => {
    const phases = calculateFlightPhases(b200, { ...weights, fuel: "2600" }, "400", "90")
    expect(phases.ramp.totalWeight).toBeGreaterThan(12590)
    expect(phases.takeoff.totalWeight).toBeGreaterThan(12500)
    expect(buildRampIssues(b200, phases).map((issue) => issue.type)).toEqual(["ramp-weight"])
  })

  it("narrows the forward limit above 11,279 lbs", () => {
    const points = b200.cgEnvelope.points
    expect(points).toContainEqual({ arm: 181.0, weight: 11279 })
    expect(points).toContainEqual({ arm: 185.0, weight: 12500 })
  })
})

describe("Beech 1900D worked example (operator spreadsheet loading)", () => {
  const b1900 = aircraftData["beech-1900d"]
  // 15 adults of 85 kg (+ carry-on on some seats), 162.9 kg of baggage
  const paxKg = [92.3, 85, 89.5, 89.6, 89.1, 85, 90, 85, 85, 85, 85, 85, 85, 85, 85, 0, 85, 0, 0]
  const weights = { pilot: "187", copilot: "187", fuel: "1600" }
  paxKg.forEach((kg, i) => (weights[`passenger${i + 1}`] = kg ? String(kg * KG) : ""))
  weights.baggage1 = String((162.9 * KG) / 2)
  weights.baggage2 = String((162.9 * KG) / 2)

  it("keeps the takeoff CG where the loading puts it", () => {
    const phases = calculateFlightPhases(b1900, weights, "400", "120")
    expect(phases.ramp.totalWeight).toBeCloseTo(16038.44, 1)
    expect(phases.takeoff.totalWeight).toBeCloseTo(15918.44, 1)
    // the spreadsheet kept the taxi fuel moment and read 292.21" (about 2.2" aft)
    expect(phases.takeoff.centerOfGravity).toBeCloseTo(289.99, 1)
    expect(phases.takeoff.inEnvelope).toBe(true)
    expect(buildLandingReport(b1900, phases).isLandingOk).toBe(true)
  })

  it("seats passengers by rows 30 inches apart", () => {
    const arms = Array.from({ length: 19 }, (_, i) => b1900.stations[`passenger${i + 1}`])
    expect(arms).toEqual([
      197, 197, 227, 227, 257, 257, 287, 287, 317, 317, 347, 347, 377, 377, 407, 407, 436, 436, 436,
    ])
  })
})
