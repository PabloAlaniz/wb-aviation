import { describe, it, expect } from "vitest"
import { buildCgTravel, buildLoadingPath, sampleBurnPath } from "./cgTravel"
import {
  applyTaxiFuel,
  buildLandingReport,
  burnPoint,
  calculateFlightPhases,
  calculateWeightBalance,
  findBurnEnvelopeExit,
} from "./calculations"
import { localizeLandingIssue } from "./safetyDisplay"
import { aircraftData } from "../data/aircraft"

const c172 = aircraftData["cessna-172s"]
const weights = { pilot: "180", copilot: "170", passenger1: "150", baggage1: "60", fuel: "300" }

/**
 * Aft limit that moves aft with weight (40" at 1000 lbs, 50" at 2000 lbs) and
 * fuel well aft of the CG: the burn curve bulges out of the limit mid-flight.
 * @type {import("../types").Aircraft}
 */
const slopedAft = {
  ...c172,
  emptyWeight: 1400,
  emptyArm: 43.5,
  maxWeight: 2000,
  maxLandingWeight: undefined,
  cgLimits: { forward: 30, aft: 50 },
  stations: { fuel: 65 },
  loadStations: [{ key: "fuel", label: "Fuel", isFuel: true }],
  cgEnvelope: {
    points: [
      { arm: 30, weight: 1000 },
      { arm: 30, weight: 2000 },
      { arm: 50, weight: 2000 },
      { arm: 40, weight: 1000 },
    ],
  },
}

describe("buildLoadingPath", () => {
  it("starts at the empty aircraft", () => {
    const [first] = buildLoadingPath(c172, weights)
    expect(first).toEqual({
      key: "empty",
      added: 0,
      weight: c172.emptyWeight,
      cg: c172.emptyArm,
    })
  })

  it("adds one step per loaded station, in the order of the form", () => {
    const path = buildLoadingPath(c172, weights)
    expect(path.map((step) => step.key)).toEqual([
      "empty",
      "pilot",
      "copilot",
      "passenger1",
      "baggage1",
      "fuel",
    ])
    expect(path[1].added).toBe(180)
    expect(path[1].weight).toBe(c172.emptyWeight + 180)
    expect(path[1].station?.key).toBe("pilot")
  })

  it("ends at the condition computed by calculateWeightBalance", () => {
    const path = buildLoadingPath(c172, weights)
    const result = calculateWeightBalance(c172, weights)
    const last = path[path.length - 1]
    expect(last.weight).toBeCloseTo(result.totalWeight, 9)
    expect(last.cg).toBeCloseTo(result.centerOfGravity, 9)
  })

  it("skips empty, invalid and negative loads", () => {
    const path = buildLoadingPath(c172, { pilot: "", copilot: "abc", passenger1: "-50" })
    expect(path).toHaveLength(1)
  })

  it("moves the CG towards the arm of each station", () => {
    const [empty, pilot] = buildLoadingPath(c172, { pilot: "200" })
    const arm = /** @type {number} */ (c172.stations.pilot)
    expect(Math.sign(pilot.cg - empty.cg)).toBe(Math.sign(arm - c172.emptyArm))
  })

  it("includes stations that count in the totals but have no form row", () => {
    const aircraft = { ...c172, stations: { ...c172.stations, ballast: 100 } }
    const path = buildLoadingPath(aircraft, { pilot: "180", ballast: "40" })
    expect(path.map((step) => step.key)).toEqual(["empty", "pilot", "ballast"])
    const result = calculateWeightBalance(aircraft, { pilot: "180", ballast: "40" })
    expect(path[2].cg).toBeCloseTo(result.centerOfGravity, 9)
  })
})

describe("burnPoint", () => {
  const phases = calculateFlightPhases(c172, weights, "190", "8")

  it("matches the takeoff, landing and zero-fuel phases", () => {
    const takeoff = burnPoint(phases, 0)
    expect(takeoff.weight).toBeCloseTo(phases.takeoff.totalWeight, 9)
    expect(takeoff.cg).toBeCloseTo(phases.takeoff.centerOfGravity, 9)

    const landing = burnPoint(phases, phases.fuelBurn)
    expect(landing.weight).toBeCloseTo(phases.landing.totalWeight, 9)
    expect(landing.cg).toBeCloseTo(phases.landing.centerOfGravity, 9)

    const zeroFuel = burnPoint(phases, phases.fuelLoaded)
    expect(zeroFuel.weight).toBeCloseTo(phases.zeroFuel.totalWeight, 9)
    expect(zeroFuel.cg).toBeCloseTo(phases.zeroFuel.centerOfGravity, 9)
  })

  it("clamps the burn to the fuel on board", () => {
    expect(burnPoint(phases, 99999).burned).toBe(phases.fuelLoaded)
    expect(burnPoint(phases, -5).burned).toBe(0)
  })

  it("handles an aircraft without fuel loaded", () => {
    const noFuel = calculateFlightPhases(c172, { pilot: "180" }, "0")
    expect(burnPoint(noFuel, 50)).toEqual({
      burned: 0,
      weight: noFuel.takeoff.totalWeight,
      cg: noFuel.takeoff.centerOfGravity,
    })
  })
})

describe("sampleBurnPath", () => {
  const phases = calculateFlightPhases(c172, weights, "190")

  it("samples from one fuel state to the other, weight decreasing", () => {
    const path = sampleBurnPath(phases, 0, phases.fuelBurn, 4)
    expect(path).toHaveLength(5)
    expect(path[0].weight).toBeCloseTo(phases.takeoff.totalWeight, 9)
    expect(path[4].weight).toBeCloseTo(phases.landing.totalWeight, 9)
    for (let i = 1; i < path.length; i++) expect(path[i].weight).toBeLessThan(path[i - 1].weight)
  })

  it("is empty when there is nothing to burn", () => {
    expect(sampleBurnPath(phases, 100, 100)).toEqual([])
    expect(sampleBurnPath(phases, 100, 50)).toEqual([])
  })
})

describe("buildCgTravel", () => {
  it("joins loading, burn and remaining fuel into one continuous route", () => {
    const takeoffWeights = applyTaxiFuel(c172, weights, "8").weights
    const phases = calculateFlightPhases(c172, weights, "190", "8")
    const travel = buildCgTravel(c172, takeoffWeights, phases)

    const lastLoaded = travel.loading[travel.loading.length - 1]
    expect(lastLoaded.weight).toBeCloseTo(travel.burn[0].weight, 9)
    expect(lastLoaded.cg).toBeCloseTo(travel.burn[0].cg, 9)
    const landing = travel.burn[travel.burn.length - 1]
    expect(landing.weight).toBeCloseTo(travel.reserve[0].weight, 9)
    expect(travel.reserve[travel.reserve.length - 1].weight).toBeCloseTo(
      phases.zeroFuel.totalWeight,
      9
    )
  })

  it("has no burn paths without a planned burn or without phases", () => {
    const phases = calculateFlightPhases(c172, { pilot: "180" }, "")
    expect(buildCgTravel(c172, { pilot: "180" }, phases).burn).toEqual([])
    expect(buildCgTravel(c172, { pilot: "180" }, phases).reserve).toEqual([])
    expect(buildCgTravel(c172, { pilot: "180" }, null).burn).toEqual([])
  })
})

describe("findBurnEnvelopeExit", () => {
  it("is null when the whole burn stays inside the envelope", () => {
    const phases = calculateFlightPhases(c172, weights, "190")
    expect(findBurnEnvelopeExit(c172, phases)).toBeNull()
  })

  it("is null without a planned burn", () => {
    const phases = calculateFlightPhases(slopedAft, { fuel: "600" }, "")
    expect(findBurnEnvelopeExit(slopedAft, phases)).toBeNull()
  })

  it("finds the CG leaving the envelope between an in-limits takeoff and landing", () => {
    const phases = calculateFlightPhases(slopedAft, { fuel: "600" }, "500")
    expect(phases.takeoff.inEnvelope).toBe(true)
    expect(phases.landing.inEnvelope).toBe(true)

    const exit = findBurnEnvelopeExit(slopedAft, phases)
    expect(exit).not.toBeNull()
    expect(exit.burned).toBeGreaterThan(0)
    expect(exit.burned).toBeLessThan(500)
    // aft of the limit at that weight: 30 + 0.01 × weight
    expect(exit.cg).toBeGreaterThan(30 + 0.01 * exit.weight)
  })

  it("leaves an out-of-limits takeoff or landing to their own checks", () => {
    const phases = calculateFlightPhases(slopedAft, { fuel: "700" }, "500")
    expect(phases.takeoff.inEnvelope).toBe(false)
    expect(findBurnEnvelopeExit(slopedAft, phases)).toBeNull()
  })
})

describe("landing report: CG in flight", () => {
  it("rejects a burn whose CG leaves the envelope mid-flight", () => {
    const phases = calculateFlightPhases(slopedAft, { fuel: "600" }, "500")
    const report = buildLandingReport(slopedAft, phases)
    const issue = report.errors.find((error) => error.type === "inflight-cg")
    expect(report.isLandingOk).toBe(false)
    expect(issue).toBeDefined()
    expect(issue.message).toMatch(/\d+ lbs/)
  })

  it("does not add the issue to a normal flight", () => {
    const phases = calculateFlightPhases(c172, weights, "190")
    const report = buildLandingReport(c172, phases)
    expect(report.errors.some((error) => error.type === "inflight-cg")).toBe(false)
  })

  it("shows the fuel burned in kg in metric units", () => {
    const phases = calculateFlightPhases(slopedAft, { fuel: "600" }, "500")
    const issue = buildLandingReport(slopedAft, phases).errors.find(
      (error) => error.type === "inflight-cg"
    )
    const text = localizeLandingIssue(issue, "metric", phases)
    expect(text).toMatch(/\d+ kg/)
    expect(text).not.toMatch(/lbs/)
  })
})
