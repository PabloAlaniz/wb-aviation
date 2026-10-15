import { describe, it, expect } from "vitest"
import {
  KG_PER_LB,
  MM_PER_IN,
  L_PER_US_GAL,
  AVGAS_LB_PER_US_GAL,
  AVGAS_KG_PER_L,
  DEFAULT_UNITS,
  UNIT_SYSTEMS,
  isUnitSystem,
  unitSymbols,
  armSuffix,
  weightToDisplay,
  weightFromDisplay,
  armToDisplay,
  armFromDisplay,
  momentToDisplay,
  momentFromDisplay,
  fuelVolumeToLbs,
  lbsToFuelVolume,
  trimNumber,
  formatWeight,
  formatArm,
  lbsTextToInput,
  inputToLbsText,
} from "./units"

describe("conversion constants", () => {
  it("uses the exact international definitions", () => {
    expect(KG_PER_LB).toBe(0.45359237)
    expect(MM_PER_IN).toBe(25.4)
    expect(L_PER_US_GAL).toBe(3.785411784)
  })

  it("uses 6.0 lb/US gal AVGAS density (~0.72 kg/L)", () => {
    expect(AVGAS_LB_PER_US_GAL).toBe(6)
    expect(AVGAS_KG_PER_L).toBeCloseTo(0.719, 3)
    expect(Math.round(AVGAS_KG_PER_L * 100) / 100).toBe(0.72)
  })
})

describe("unit system helpers", () => {
  it("defaults to imperial and validates values", () => {
    expect(DEFAULT_UNITS).toBe("imperial")
    expect(UNIT_SYSTEMS).toEqual(["imperial", "metric"])
    expect(isUnitSystem("metric")).toBe(true)
    expect(isUnitSystem("imperial")).toBe(true)
    expect(isUnitSystem("si")).toBe(false)
    expect(isUnitSystem(null)).toBe(false)
  })

  it("exposes unit symbols and arm suffix", () => {
    expect(unitSymbols("imperial")).toEqual({
      weight: "lbs",
      arm: "in",
      volume: "gal",
      moment: "lb-in",
    })
    expect(unitSymbols("metric")).toEqual({ weight: "kg", arm: "mm", volume: "L", moment: "kg·mm" })
    expect(armSuffix("imperial")).toBe('"')
    expect(armSuffix("metric")).toBe(" mm")
  })
})

describe("weight", () => {
  it("converts known values", () => {
    expect(weightToDisplay(1, "metric")).toBe(0.45359237)
    expect(weightToDisplay(2204.62262, "metric")).toBeCloseTo(1000, 3)
    expect(weightFromDisplay(1, "metric")).toBeCloseTo(2.20462262, 8)
  })

  it("is the identity in imperial", () => {
    expect(weightToDisplay(8000, "imperial")).toBe(8000)
    expect(weightFromDisplay(8000, "imperial")).toBe(8000)
  })

  it("round-trips", () => {
    for (const lbs of [0, 1, 170, 6682, 10100, 123.456]) {
      expect(weightFromDisplay(weightToDisplay(lbs, "metric"), "metric")).toBeCloseTo(lbs, 9)
    }
  })
})

describe("arm", () => {
  it("converts known values", () => {
    expect(armToDisplay(1, "metric")).toBe(25.4)
    expect(armToDisplay(144.7, "metric")).toBeCloseTo(3675.38, 6)
    expect(armFromDisplay(254, "metric")).toBe(10)
    expect(armToDisplay(152.25, "imperial")).toBe(152.25)
  })

  it("round-trips", () => {
    for (const inches of [0, 35, 47.3, 151.0415, 310]) {
      expect(armFromDisplay(armToDisplay(inches, "metric"), "metric")).toBeCloseTo(inches, 9)
    }
  })
})

describe("moment", () => {
  it("converts lb-in to kg·mm", () => {
    expect(momentToDisplay(1, "metric")).toBeCloseTo(0.45359237 * 25.4, 12)
    expect(momentToDisplay(1000, "imperial")).toBe(1000)
  })

  it("round-trips", () => {
    const lbIn = 6682 * 151.0415
    expect(momentFromDisplay(momentToDisplay(lbIn, "metric"), "metric")).toBeCloseTo(lbIn, 6)
    expect(momentFromDisplay(lbIn, "imperial")).toBe(lbIn)
  })
})

describe("fuel volume", () => {
  it("converts US gallons to lbs at 6.0 lb/gal", () => {
    expect(fuelVolumeToLbs(1, "imperial")).toBe(6)
    expect(fuelVolumeToLbs(53, "imperial")).toBe(318)
    expect(lbsToFuelVolume(318, "imperial")).toBe(53)
  })

  it("converts litres to lbs (1 US gal = 3.785411784 L)", () => {
    expect(fuelVolumeToLbs(3.785411784, "metric")).toBeCloseTo(6, 12)
    expect(lbsToFuelVolume(6, "metric")).toBeCloseTo(3.785411784, 12)
    // 100 L of AVGAS ≈ 71.9 kg
    expect(weightToDisplay(fuelVolumeToLbs(100, "metric"), "metric")).toBeCloseTo(
      100 * AVGAS_KG_PER_L,
      9
    )
  })

  it("round-trips", () => {
    for (const lbs of [0, 60, 318, 1500, 2844]) {
      for (const units of /** @type {const} */ (["imperial", "metric"])) {
        expect(fuelVolumeToLbs(lbsToFuelVolume(lbs, units), units)).toBeCloseTo(lbs, 9)
      }
    }
  })
})

describe("formatting", () => {
  it("trims numbers", () => {
    expect(trimNumber(80.00001)).toBe("80")
    expect(trimNumber(79.44)).toBe("79.4")
    expect(trimNumber(176.36981, 4)).toBe("176.3698")
    expect(trimNumber(NaN)).toBe("")
  })

  it("formats weights", () => {
    expect(formatWeight(8000, "imperial")).toBe("8000.0 lbs")
    expect(formatWeight(8000, "metric")).toBe("3628.7 kg")
    expect(formatWeight(6682, "metric", 0)).toBe("3031 kg")
  })

  it("formats arms", () => {
    expect(formatArm(152.25, "imperial")).toBe('152.25"')
    expect(formatArm(152, "metric")).toBe("3860.8 mm")
    expect(formatArm(144.7, "imperial", 1)).toBe('144.7"')
  })
})

describe("form input conversion", () => {
  it("passes imperial weights through untouched", () => {
    expect(inputToLbsText("180", "imperial")).toBe("180")
    expect(inputToLbsText("180.", "imperial")).toBe("180.")
    expect(lbsTextToInput("180", "imperial")).toBe("180")
  })

  it("handles empty values", () => {
    expect(inputToLbsText("", "metric")).toBe("")
    expect(lbsTextToInput("", "metric")).toBe("")
    expect(lbsTextToInput(undefined, "metric")).toBe("")
  })

  it("converts kg input to lbs state and back", () => {
    const stored = inputToLbsText("80", "metric")
    expect(Number(stored)).toBeCloseTo(176.3698, 4)
    expect(lbsTextToInput(stored, "metric")).toBe("80")
    expect(lbsTextToInput("180", "metric")).toBe("81.6")
  })

  it("converts fuel volume input to lbs state and back", () => {
    expect(inputToLbsText("53", "imperial", "volume")).toBe("318")
    expect(lbsTextToInput("318", "imperial", "volume")).toBe("53")
    const stored = inputToLbsText("200", "metric", "volume")
    expect(Number(stored)).toBeCloseTo(317.0065, 4)
    expect(lbsTextToInput(stored, "metric", "volume")).toBe("200")
  })

  it("ignores non-numeric text", () => {
    expect(inputToLbsText("abc", "metric")).toBe("")
    expect(lbsTextToInput("abc", "metric")).toBe("")
  })
})
