import { describe, it, expect } from "vitest"
import {
  FUEL_UNITS,
  L_PER_IMP_GAL,
  convertFuel,
  fuelConversionTable,
  fuelDensityKgPerL,
} from "./fuelConversions"

describe("fuel conversions (AVGAS)", () => {
  const t = fuelConversionTable("avgas")

  it("matches the usual AVGAS quick-conversion factors", () => {
    // the classic AVGAS chart (specific gravity 0.72)
    expect(t.usGal.l).toBeCloseTo(3.785, 3)
    expect(t.impGal.l).toBeCloseTo(4.546, 3)
    expect(t.impGal.usGal).toBeCloseTo(1.2, 2)
    expect(t.usGal.lb).toBeCloseTo(6.0, 9)
    expect(t.l.lb).toBeCloseTo(1.585, 3)
    expect(t.impGal.lb).toBeCloseTo(7.21, 2)
    expect(t.l.kg).toBeCloseTo(0.719, 3)
    expect(t.usGal.kg).toBeCloseTo(2.72, 2)
    expect(t.impGal.kg).toBeCloseTo(3.27, 2)
    expect(t.kg.lb).toBeCloseTo(2.2046, 4)
    expect(fuelDensityKgPerL("avgas")).toBeCloseTo(0.72, 2)
  })

  it("defaults to AVGAS", () => {
    expect(fuelConversionTable()).toEqual(t)
  })

  it("is consistent: converting back gives the original amount", () => {
    for (const from of FUEL_UNITS) {
      for (const to of FUEL_UNITS) {
        expect(t[from][to] * t[to][from]).toBeCloseTo(1, 9)
      }
      expect(t[from][from]).toBeCloseTo(1, 12)
    }
    const all = convertFuel(150, "l")
    expect(convertFuel(all.lb, "lb").l).toBeCloseTo(150, 9)
  })
})

describe("fuel conversions (Jet A)", () => {
  it("uses 6.7 lb/US gal (about 0.80 kg/L)", () => {
    const t = fuelConversionTable("jet-a")
    expect(t.usGal.lb).toBeCloseTo(6.7, 9)
    expect(t.l.lb).toBeCloseTo(1.77, 2)
    expect(t.l.kg).toBeCloseTo(0.803, 3)
    expect(t.impGal.lb).toBeCloseTo(8.05, 2)
    // volume-to-volume and weight-to-weight factors don't depend on the fuel
    expect(t.impGal.l).toBe(L_PER_IMP_GAL)
    expect(t.kg.lb).toBeCloseTo(2.2046, 4)
  })

  it("weighs about 12% more than the same volume of AVGAS", () => {
    expect(convertFuel(1000, "l", "jet-a").lb / convertFuel(1000, "l", "avgas").lb).toBeCloseTo(
      6.7 / 6,
      9
    )
  })
})
