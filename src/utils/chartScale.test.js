import { describe, it, expect } from "vitest"
import { niceScale, niceStep, niceTicks } from "./chartScale"
import { armToDisplay, weightToDisplay } from "./units"
import { aircraftData } from "../data/aircraft"

describe("niceStep", () => {
  it.each([
    [1, 1],
    [1.4, 1],
    [1.6, 2],
    [2.2, 2],
    [3.7, 5],
    [6.9, 5],
    [7.5, 10],
    [37, 50],
    [108, 100],
    [0.23, 0.2],
  ])("rounds %s to %s", (raw, expected) => {
    expect(niceStep(raw)).toBe(expected)
  })

  it("falls back to 1 for invalid input", () => {
    expect(niceStep(0)).toBe(1)
    expect(niceStep(-3)).toBe(1)
    expect(niceStep(Number.NaN)).toBe(1)
  })
})

describe("niceTicks", () => {
  it("aligns the domain to the step and covers the range", () => {
    const { domain, ticks, step } = niceTicks(889, 1201, 10)
    expect(step).toBe(50)
    expect(domain).toEqual([850, 1250])
    expect(ticks).toEqual([850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250])
  })

  it("keeps imperial C172-style axes on round values", () => {
    expect(niceTicks(1500, 2650, 6).ticks).toEqual([1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800])
    expect(niceTicks(35, 49.5, 10).ticks).toEqual([34, 36, 38, 40, 42, 44, 46, 48, 50])
  })

  it("avoids floating point noise on decimal steps", () => {
    expect(niceTicks(0.1, 0.95, 6).ticks).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1])
  })

  it("handles a degenerate (single value) range", () => {
    const { domain, ticks } = niceTicks(100, 100, 5)
    expect(domain[0]).toBeLessThan(100)
    expect(domain[1]).toBeGreaterThan(100)
    expect(ticks.length).toBeGreaterThan(1)
  })

  it("accepts reversed bounds", () => {
    expect(niceTicks(10, 0, 6)).toEqual(niceTicks(0, 10, 6))
  })
})

describe("niceScale", () => {
  it("pads the data and ignores non-finite values", () => {
    const { domain } = niceScale([10, 20, Number.NaN], { count: 6, padding: 0.1 })
    expect(domain[0]).toBeLessThan(10)
    expect(domain[1]).toBeGreaterThan(20)
  })

  it("returns a default scale with no finite data", () => {
    expect(niceScale([]).domain).toEqual([0, 1])
  })

  it("produces round metric ticks enclosing every aircraft envelope", () => {
    for (const aircraft of Object.values(aircraftData)) {
      const arms = aircraft.cgEnvelope.points.map((p) => armToDisplay(p.arm, "metric"))
      const weights = aircraft.cgEnvelope.points.map((p) => weightToDisplay(p.weight, "metric"))
      const x = niceScale(arms, { count: 10 })
      const y = niceScale(weights, { count: 6 })
      for (const scale of [x, y]) {
        const mantissa = scale.step / 10 ** Math.floor(Math.log10(scale.step))
        expect([1, 2, 5]).toContain(Math.round(mantissa))
        for (const tick of scale.ticks) expect(Number.isInteger(tick / scale.step)).toBe(true)
      }
      expect(x.domain[0]).toBeLessThan(Math.min(...arms))
      expect(x.domain[1]).toBeGreaterThan(Math.max(...arms))
      expect(y.domain[0]).toBeLessThan(Math.min(...weights))
      expect(y.domain[1]).toBeGreaterThan(Math.max(...weights))
    }
  })
})
