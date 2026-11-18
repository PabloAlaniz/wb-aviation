import { describe, it, expect } from "vitest"
import {
  MAX_LOADS_PER_AIRCRAFT,
  MAX_LOAD_NAME_LENGTH,
  loadsForAircraft,
  normalizeLoadName,
  removeLoadsForAircraft,
  removeSavedLoad,
  sanitizeSavedLoads,
  savedLoadTotal,
  savedLoadWeights,
  toSavedLoad,
  upsertSavedLoad,
} from "./savedLoads"
import { aircraftData } from "../data/aircraft"

const c172 = aircraftData["cessna-172s"]

const load = (name, aircraftId = "cessna-172s", weights = { pilot: "170" }) => ({
  aircraftId,
  name,
  weights,
  fuelBurn: "",
  taxiFuel: "",
})

describe("normalizeLoadName", () => {
  it("trims, collapses whitespace and caps the length", () => {
    expect(normalizeLoadName("  Doble   comando ")).toBe("Doble comando")
    expect(normalizeLoadName("x".repeat(80))).toHaveLength(MAX_LOAD_NAME_LENGTH)
    expect(normalizeLoadName(42)).toBe("")
  })
})

describe("toSavedLoad", () => {
  it("keeps only the loaded stations, as lbs strings", () => {
    const { record, error } = toSavedLoad({
      aircraftId: "cessna-172s",
      name: " Solo ",
      weights: { pilot: "170", copilot: "", baggage1: "0", fuel: "180.5", passenger1: "-20" },
      fuelBurn: "60",
      taxiFuel: "",
    })
    expect(error).toBeNull()
    expect(record).toEqual({
      aircraftId: "cessna-172s",
      name: "Solo",
      weights: { pilot: "170", fuel: "180.5" },
      fuelBurn: "60",
      taxiFuel: "",
    })
  })

  it("requires a name", () => {
    expect(
      toSavedLoad({ aircraftId: "cessna-172s", name: "  ", weights: { pilot: "170" } })
    ).toEqual({ record: null, error: "nameRequired" })
  })

  it("requires at least one loaded station", () => {
    expect(
      toSavedLoad({ aircraftId: "cessna-172s", name: "Solo", weights: { pilot: "" } })
    ).toEqual({ record: null, error: "nothingToSave" })
    expect(toSavedLoad({ aircraftId: "cessna-172s", name: "Solo", weights: null }).error).toBe(
      "nothingToSave"
    )
  })

  it("drops non-numeric and absurd amounts", () => {
    const { record } = toSavedLoad({
      aircraftId: "cessna-172s",
      name: "Solo",
      weights: { pilot: "170", copilot: "abc", baggage1: "1e9", fuel: {} },
      fuelBurn: "NaN",
    })
    expect(record.weights).toEqual({ pilot: "170" })
    expect(record.fuelBurn).toBe("")
  })
})

describe("upsertSavedLoad", () => {
  it("replaces the load with the same name for the same aircraft, ignoring case", () => {
    const loads = upsertSavedLoad([load("Solo"), load("Dual")], {
      ...load("SOLO"),
      weights: { pilot: "200" },
    })
    expect(loads.map((l) => l.name)).toEqual(["Dual", "SOLO"])
    expect(loads[1].weights).toEqual({ pilot: "200" })
  })

  it("keeps same-named loads of different aircraft apart", () => {
    const loads = upsertSavedLoad([load("Solo")], load("Solo", "cessna-152"))
    expect(loads).toHaveLength(2)
  })

  it("drops the aircraft's oldest loads beyond the cap", () => {
    let loads = [load("Other", "cessna-152")]
    for (let i = 0; i <= MAX_LOADS_PER_AIRCRAFT; i++) loads = upsertSavedLoad(loads, load(`L${i}`))
    const mine = loadsForAircraft(loads, "cessna-172s")
    expect(mine).toHaveLength(MAX_LOADS_PER_AIRCRAFT)
    expect(mine[0].name).toBe("L1")
    expect(loadsForAircraft(loads, "cessna-152")).toHaveLength(1)
  })
})

describe("removing loads", () => {
  const loads = [load("Solo"), load("Dual"), load("Solo", "cessna-152")]

  it("removes one load by aircraft and name", () => {
    expect(removeSavedLoad(loads, "cessna-172s", "solo")).toEqual([loads[1], loads[2]])
  })

  it("removes every load of an aircraft", () => {
    expect(removeLoadsForAircraft(loads, "cessna-172s")).toEqual([loads[2]])
  })
})

describe("sanitizeSavedLoads", () => {
  it("drops invalid entries and never throws", () => {
    expect(sanitizeSavedLoads(null)).toEqual([])
    expect(sanitizeSavedLoads("nope")).toEqual([])
    expect(
      sanitizeSavedLoads([null, 3, { name: "Sin avión", weights: { pilot: "1" } }, load("Solo")])
    ).toEqual([load("Solo")])
  })

  it("keeps the last of two entries with the same name", () => {
    const loads = sanitizeSavedLoads([load("Solo"), { ...load("Solo"), weights: { pilot: "190" } }])
    expect(loads).toHaveLength(1)
    expect(loads[0].weights.pilot).toBe("190")
  })
})

describe("savedLoadWeights", () => {
  it("fills every station of the aircraft and ignores unknown ones", () => {
    const weights = savedLoadWeights(
      load("Solo", "cessna-172s", { pilot: "170", fuel: "180", ghost: "99" }),
      c172
    )
    expect(Object.keys(weights)).toEqual(c172.loadStations.map((station) => station.key))
    expect(weights.pilot).toBe("170")
    expect(weights.fuel).toBe("180")
    expect(weights.copilot).toBe("")
    expect(weights).not.toHaveProperty("ghost")
  })

  it("is not fooled by inherited property names", () => {
    const weights = savedLoadWeights(load("Solo", "x", {}), {
      ...c172,
      loadStations: [{ key: "toString", label: "Odd" }],
    })
    expect(weights.toString).toBe("")
  })
})

describe("savedLoadTotal", () => {
  it("adds up the loaded stations", () => {
    expect(savedLoadTotal(load("Solo", "cessna-172s", { pilot: "170", fuel: "180.5" }))).toBe(350.5)
  })
})
