import { describe, it, expect } from "vitest"
import { buildLoadAdvice, MAX_ADVICE_OPTIONS } from "./loadAdvice"
import { calculateFlightPhases } from "./calculations"
import { aircraftData } from "../data/aircraft"
import { KG_PER_LB } from "./units"

/** Rectangular envelope so every amount can be checked by hand. */
const box = (/** @type {number} */ forward, /** @type {number} */ aft) => ({
  points: [
    { arm: forward, weight: 900 },
    { arm: forward, weight: 2000 },
    { arm: aft, weight: 2000 },
    { arm: aft, weight: 900 },
    { arm: forward, weight: 900 },
  ],
})

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
    { key: "pilot", labelKey: "stations.pilot" },
    { key: "baggage", labelKey: "stations.baggage", max: 100 },
    { key: "fuel", labelKey: "stations.fuel", max: 300, isFuel: true },
  ],
  cgEnvelope: box(35, 47),
}

describe("buildLoadAdvice", () => {
  it("gives no advice when the takeoff is within limits", () => {
    expect(buildLoadAdvice(trainer, { pilot: "200", fuel: "100" })).toBeNull()
  })

  it("tells how much is over and what to offload when overweight", () => {
    // 1000 + 800 + 100 + 200 = 2100 lbs
    const advice = buildLoadAdvice(trainer, { pilot: "800", baggage: "100", fuel: "200" })
    expect(advice.overweightBy).toBe(100)
    expect(advice.cgForwardBy).toBeNull()
    expect(advice.cgAftBy).toBeNull()
    expect(advice.options).toEqual([
      { kind: "remove", station: "baggage", amount: 100 },
      { kind: "remove", station: "fuel", amount: 100 },
    ])
  })

  it("does not offload fuel needed for the planned taxi and burn", () => {
    const weights = { pilot: "800", baggage: "100", fuel: "200" }
    // 200 loaded − 120 burn − 30 taxi leaves 50 lbs to spare; taxi brings the excess to 70
    const advice = buildLoadAdvice(trainer, weights, 120, 30)
    expect(advice.overweightBy).toBe(70)
    expect(advice.options).toEqual([{ kind: "remove", station: "baggage", amount: 70 }])
  })

  it("suggests adding aft load when the CG is forward of the limit", () => {
    const aircraft = { ...trainer, cgEnvelope: box(39, 47) }
    // W = 1600, M = 62200, CG = 38.875"
    const advice = buildLoadAdvice(aircraft, { pilot: "600" })
    expect(advice.overweightBy).toBeNull()
    expect(advice.cgForwardBy).toBeCloseTo(0.125, 6)
    // baggage (95"): d ≥ 200 / 56 = 3.57; fuel (48"): d ≥ 200 / 9 = 22.2
    expect(advice.options).toEqual([
      { kind: "add", station: "baggage", amount: 4 },
      { kind: "add", station: "fuel", amount: 23 },
    ])
  })

  it("steps in whole kilograms when asked to", () => {
    const aircraft = { ...trainer, cgEnvelope: box(39, 47) }
    const advice = buildLoadAdvice(aircraft, { pilot: "600" }, 0, 0, 1 / KG_PER_LB)
    // 3.57 lbs = 1.62 kg -> 2 kg
    expect(advice.options[0].amount * KG_PER_LB).toBeCloseTo(2, 9)
  })

  it("suggests offloading or moving baggage when the CG is aft of the limit", () => {
    const aircraft = {
      ...trainer,
      cgEnvelope: box(35, 42),
      stations: { ...trainer.stations, nose: 20 },
      loadStations: [...trainer.loadStations, { key: "nose", label: "Nose bay", max: 50 }],
    }
    // W = 1270, M = 55790, CG = 43.93"
    const advice = buildLoadAdvice(aircraft, { pilot: "170", baggage: "100" })
    expect(advice.cgAftBy).toBeCloseTo(55790 / 1270 - 42, 6)
    // move to the nose bay: d ≥ 2450 / 75 = 32.7; offload: d ≥ 2450 / 53 = 46.2
    // (adding to the nose bay alone would take 112 lbs, above its 50 lbs maximum)
    expect(advice.options).toEqual([
      { kind: "move", from: "baggage", to: "nose", amount: 33 },
      { kind: "remove", station: "baggage", amount: 47 },
    ])
  })

  it("never moves load into or out of seats", () => {
    const aircraft = { ...trainer, cgEnvelope: box(35, 42) }
    const advice = buildLoadAdvice(aircraft, { pilot: "170", baggage: "100" })
    for (const option of advice.options) {
      expect(JSON.stringify(option)).not.toContain("pilot")
    }
  })

  it("returns no options when nothing but seats can change", () => {
    const aircraft = {
      ...trainer,
      cgEnvelope: box(41, 47),
      stations: { pilot: 37 },
      loadStations: [{ key: "pilot", labelKey: "stations.pilot" }],
    }
    const advice = buildLoadAdvice(aircraft, { pilot: "200" })
    expect(advice.cgForwardBy).toBeGreaterThan(0)
    expect(advice.options).toEqual([])
  })

  it("gives no advice below the bottom of the envelope", () => {
    const aircraft = { ...trainer, emptyWeight: 700 }
    expect(buildLoadAdvice(aircraft, { pilot: "100" })).toBeNull()
  })

  it("only offers options that pass the full calculation, smallest first", () => {
    const c172 = aircraftData["cessna-172s"]
    const weights = {
      pilot: "200",
      copilot: "200",
      passenger1: "170",
      passenger2: "170",
      baggage1: "50",
      fuel: "318",
    }
    const advice = buildLoadAdvice(c172, weights, 60, 8)
    expect(advice.overweightBy).toBeGreaterThan(0)
    expect(advice.options.length).toBeGreaterThan(0)
    expect(advice.options.length).toBeLessThanOrEqual(MAX_ADVICE_OPTIONS)
    const amounts = advice.options.map((option) => option.amount)
    expect(amounts).toEqual([...amounts].sort((a, b) => a - b))

    for (const option of advice.options) {
      const changed = { ...weights }
      if (option.kind === "move") {
        changed[option.from] = String(Number(weights[option.from]) - option.amount)
        changed[option.to] = String(Number(weights[option.to]) + option.amount)
      } else {
        const sign = option.kind === "add" ? 1 : -1
        changed[option.station] = String(Number(weights[option.station]) + sign * option.amount)
      }
      const phases = calculateFlightPhases(c172, changed, 60, 8)
      expect(phases.takeoff.inEnvelope).toBe(true)
      expect(phases.takeoff.totalWeight).toBeLessThanOrEqual(c172.maxWeight)
    }
  })
})
