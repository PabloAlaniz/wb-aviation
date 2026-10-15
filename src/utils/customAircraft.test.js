import { describe, it, expect } from "vitest"
import { aircraftData } from "../data/aircraft"
import { calculateWeightBalance } from "./calculations"
import {
  CUSTOM_ID_PREFIX,
  createCustomAircraft,
  customAircraftId,
  customAircraftOptions,
  deserializeCustomAircraft,
  hydrateCustomAircraft,
  isCustomAircraftId,
  isStoredCustomAircraftList,
  normalizeRegistration,
  removeCustomAircraftRecord,
  sanitizeCustomAircraftRecords,
  serializeCustomAircraft,
  toCustomAircraftRecord,
  upsertCustomAircraftRecord,
  validateCustomAircraft,
} from "./customAircraft"

const validInput = {
  baseModelId: "cessna-172s",
  registration: " lv-abc ",
  emptyWeight: "1700",
  emptyArm: "40.5",
}

describe("normalizeRegistration", () => {
  it("trims, uppercases and removes inner whitespace", () => {
    expect(normalizeRegistration(" lv-abc ")).toBe("LV-ABC")
    expect(normalizeRegistration("n 123 45")).toBe("N12345")
  })

  it("returns an empty string for non-strings", () => {
    expect(normalizeRegistration(undefined)).toBe("")
    expect(normalizeRegistration(42)).toBe("")
  })
})

describe("custom ids", () => {
  it("builds ids from the normalized registration", () => {
    expect(customAircraftId("lv-abc")).toBe(`${CUSTOM_ID_PREFIX}LV-ABC`)
  })

  it("recognizes custom ids only", () => {
    expect(isCustomAircraftId("custom:LV-ABC")).toBe(true)
    expect(isCustomAircraftId("custom:")).toBe(false)
    expect(isCustomAircraftId("cessna-172s")).toBe(false)
    expect(isCustomAircraftId(null)).toBe(false)
  })
})

describe("validateCustomAircraft", () => {
  it("accepts valid input", () => {
    expect(validateCustomAircraft(validInput)).toEqual({})
  })

  it("requires a registration", () => {
    expect(validateCustomAircraft({ ...validInput, registration: "  " }).registration).toBe(
      "registrationRequired"
    )
  })

  it("rejects malformed registrations", () => {
    expect(validateCustomAircraft({ ...validInput, registration: "LV_ABC!" }).registration).toBe(
      "registrationInvalid"
    )
    expect(validateCustomAircraft({ ...validInput, registration: "X" }).registration).toBe(
      "registrationInvalid"
    )
  })

  it("rejects an unknown base model", () => {
    expect(validateCustomAircraft({ ...validInput, baseModelId: "nope" }).baseModelId).toBe(
      "baseModelUnknown"
    )
    // no confundir propiedades heredadas con modelos
    expect(validateCustomAircraft({ ...validInput, baseModelId: "toString" }).baseModelId).toBe(
      "baseModelUnknown"
    )
  })

  it.each(["", "abc", "0", "-10", Number.NaN])("rejects empty weight %s", (emptyWeight) => {
    expect(validateCustomAircraft({ ...validInput, emptyWeight }).emptyWeight).toBe(
      "emptyWeightInvalid"
    )
  })

  it("rejects an empty weight at or above the base model max weight", () => {
    const max = aircraftData["cessna-172s"].maxWeight
    expect(validateCustomAircraft({ ...validInput, emptyWeight: max }).emptyWeight).toBe(
      "emptyWeightAboveMax"
    )
  })

  it.each(["", "x", "0", "-1"])("rejects empty arm %s", (emptyArm) => {
    expect(validateCustomAircraft({ ...validInput, emptyArm }).emptyArm).toBe("emptyArmInvalid")
  })
})

describe("toCustomAircraftRecord", () => {
  it("normalizes valid input into a persisted record", () => {
    expect(toCustomAircraftRecord({ ...validInput, name: "  Mi Skyhawk " })).toEqual({
      baseModelId: "cessna-172s",
      registration: "LV-ABC",
      emptyWeight: 1700,
      emptyArm: 40.5,
      name: "Mi Skyhawk",
    })
  })

  it("returns null for invalid input", () => {
    expect(toCustomAircraftRecord({ ...validInput, emptyWeight: "" })).toBeNull()
  })
})

describe("createCustomAircraft", () => {
  it("clones the base model with the aircraft's own empty weight and arm", () => {
    const base = aircraftData["cessna-172s"]
    const aircraft = createCustomAircraft(validInput)

    expect(aircraft.name).toBe(`LV-ABC (${base.name})`)
    expect(aircraft.emptyWeight).toBe(1700)
    expect(aircraft.emptyArm).toBe(40.5)
    expect(aircraft.maxWeight).toBe(base.maxWeight)
    expect(aircraft.cgEnvelope).toEqual(base.cgEnvelope)
    expect(aircraft.loadStations).toEqual(base.loadStations)
    expect(aircraft.stations).toEqual(base.stations)
  })

  it("marks the metadata as user-provided data", () => {
    const { metadata } = createCustomAircraft(validInput)

    expect(metadata.userProvided).toBe(true)
    expect(metadata.registration).toBe("LV-ABC")
    expect(metadata.baseModelId).toBe("cessna-172s")
    expect(metadata.dataReliability).toBe("verified-partial")
    expect(metadata.aircraftSpecific?.registrationExample).toBe("LV-ABC")
    expect(metadata.sourceDocuments.length).toBe(
      aircraftData["cessna-172s"].metadata.sourceDocuments.length + 1
    )
  })

  it("uses the custom name when provided", () => {
    expect(createCustomAircraft({ ...validInput, name: "Mi Skyhawk" }).name).toBe(
      "LV-ABC (Mi Skyhawk)"
    )
  })

  it("never mutates the catalog", () => {
    const before = structuredClone(aircraftData["cessna-172s"])
    const aircraft = createCustomAircraft(validInput)
    aircraft.cgEnvelope.points[0].arm = 999
    aircraft.loadStations.push({ key: "x", label: "x" })

    expect(aircraftData["cessna-172s"]).toEqual(before)
  })

  it("throws on invalid input", () => {
    expect(() => createCustomAircraft({ ...validInput, baseModelId: "nope" })).toThrow()
  })

  it("feeds the calculations with the overridden empty weight", () => {
    const aircraft = createCustomAircraft(validInput)
    const results = calculateWeightBalance(aircraft, { pilot: "170" })

    expect(results?.totalWeight).toBe(1870)
  })
})

describe("serialization", () => {
  const record = /** @type {any} */ (toCustomAircraftRecord(validInput))

  it("round-trips a list of records", () => {
    const other = toCustomAircraftRecord({ ...validInput, registration: "LV-XYZ" })
    const list = [record, other]

    expect(deserializeCustomAircraft(serializeCustomAircraft(list))).toEqual(list)
  })

  it("deduplicates by registration (last wins)", () => {
    const updated = { ...record, emptyWeight: 1710 }

    expect(JSON.parse(serializeCustomAircraft([record, updated]))).toEqual([updated])
  })

  it("tolerates empty, corrupt and non-array payloads", () => {
    expect(deserializeCustomAircraft(null)).toEqual([])
    expect(deserializeCustomAircraft("{not json")).toEqual([])
    expect(deserializeCustomAircraft('{"a":1}')).toEqual([])
  })

  it("drops entries whose base model is missing or that are invalid", () => {
    const json = JSON.stringify([
      record,
      { ...record, registration: "LV-OLD", baseModelId: "removed-model" },
      { ...record, registration: "LV-BAD", emptyWeight: -5 },
      null,
      "garbage",
    ])

    expect(deserializeCustomAircraft(json)).toEqual([record])
  })

  it("re-normalizes stored values", () => {
    expect(sanitizeCustomAircraftRecords([{ ...record, registration: "lv-abc" }])).toEqual([record])
  })

  it("validates the stored list loosely", () => {
    expect(isStoredCustomAircraftList([])).toBe(true)
    expect(isStoredCustomAircraftList({})).toBe(false)
    expect(isStoredCustomAircraftList("x")).toBe(false)
  })
})

describe("hydrateCustomAircraft", () => {
  it("rebuilds full aircraft keyed by custom id", () => {
    const record = toCustomAircraftRecord(validInput)
    const hydrated = hydrateCustomAircraft([
      record,
      { ...record, registration: "LV-OLD", baseModelId: "removed-model" },
    ])

    expect(Object.keys(hydrated)).toEqual(["custom:LV-ABC"])
    expect(hydrated["custom:LV-ABC"].emptyWeight).toBe(1700)
  })

  it("builds selector options labelled with registration and model", () => {
    const hydrated = hydrateCustomAircraft([toCustomAircraftRecord(validInput)])

    expect(customAircraftOptions(hydrated)).toEqual([
      { value: "custom:LV-ABC", label: "LV-ABC (Cessna 172S Skyhawk)" },
    ])
  })
})

describe("list updates", () => {
  const a = /** @type {any} */ (toCustomAircraftRecord(validInput))
  const b = /** @type {any} */ (toCustomAircraftRecord({ ...validInput, registration: "LV-XYZ" }))

  it("upserts by registration", () => {
    const updated = { ...a, emptyArm: 41 }

    expect(upsertCustomAircraftRecord([a, b], updated)).toEqual([b, updated])
  })

  it("removes by custom id", () => {
    expect(removeCustomAircraftRecord([a, b], "custom:LV-ABC")).toEqual([b])
  })
})
