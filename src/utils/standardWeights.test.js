import { describe, it, expect } from "vitest"
import {
  DEFAULT_STANDARD_WEIGHTS,
  isStandardWeights,
  seatKind,
  standardWeightText,
} from "./standardWeights"
import { KG_PER_LB } from "./units"

describe("seatKind", () => {
  it("tells crew, passenger and non-seat stations apart", () => {
    expect(seatKind({ key: "pilot", labelKey: "stations.pilot" })).toBe("crew")
    expect(seatKind({ key: "copilot", labelKey: "stations.copilot" })).toBe("crew")
    expect(seatKind({ key: "copilot" })).toBe("crew")
    for (const key of [
      "passenger1",
      "passenger12",
      "frontPassenger",
      "rearPassenger2",
      "patient",
    ]) {
      expect(seatKind({ key })).toBe("passenger")
    }
    for (const key of ["baggage", "baggage1", "fuel", "medicalEquipment", "pilotBag"]) {
      expect(seatKind({ key })).toBeNull()
    }
  })

  it("treats a 'copilot' key labeled as front passenger as a passenger seat", () => {
    expect(seatKind({ key: "copilot", labelKey: "stations.frontPassenger" })).toBe("passenger")
  })
})

describe("standard weights", () => {
  it("defaults to 85 / 75 / 35 kg", () => {
    expect(DEFAULT_STANDARD_WEIGHTS.crew * KG_PER_LB).toBeCloseTo(85, 9)
    expect(DEFAULT_STANDARD_WEIGHTS.adult * KG_PER_LB).toBeCloseTo(75, 9)
    expect(DEFAULT_STANDARD_WEIGHTS.child * KG_PER_LB).toBeCloseTo(35, 9)
    expect(isStandardWeights(DEFAULT_STANDARD_WEIGHTS)).toBe(true)
  })

  it.each([
    ["null", null],
    ["array", [1, 2, 3]],
    ["missing key", { crew: 187, adult: 165 }],
    ["string value", { crew: "187", adult: 165, child: 77 }],
    ["zero", { crew: 187, adult: 0, child: 77 }],
    ["absurd", { crew: 187, adult: 165, child: 5000 }],
  ])("rejects stored %s", (_label, value) => {
    expect(isStandardWeights(value)).toBe(false)
  })

  it("rounds the station text per unit system", () => {
    expect(standardWeightText(DEFAULT_STANDARD_WEIGHTS.adult, "imperial")).toBe("165.3")
    expect(standardWeightText(DEFAULT_STANDARD_WEIGHTS.adult, "metric")).toBe("165.3467")
  })
})
