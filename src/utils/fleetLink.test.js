import { describe, it, expect } from "vitest"
import {
  FLEET_PARAM,
  MAX_FLEET_AIRCRAFT,
  MAX_FLEET_NAME_LENGTH,
  MAX_FLEET_PARAM_LENGTH,
  buildFleetUrl,
  decodeFleet,
  encodeFleet,
  readFleetParam,
  withoutFleetParam,
} from "./fleetLink"

const c172 = {
  baseModelId: "cessna-172s",
  registration: "LV-ABC",
  emptyWeight: 1700,
  emptyArm: 40.5,
}
const e90 = {
  baseModelId: "king-air-echo-90",
  registration: "LV-KAE",
  emptyWeight: 6700.25,
  emptyArm: 151.3,
  name: "King Air del club",
}

/** Encode an arbitrary payload the same way the module does. */
function rawParam(/** @type {unknown} */ payload) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload))
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

/** @param {number} i */
const regFor = (i) => `LV-A${String(i).padStart(2, "0")}`

describe("encodeFleet / decodeFleet", () => {
  it("round-trips records and the school name", () => {
    const param = encodeFleet([c172, e90], "Aeroclub San Fernando")

    expect(param).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(decodeFleet(param)).toEqual({ name: "Aeroclub San Fernando", records: [c172, e90] })
  })

  it("round-trips unicode names", () => {
    const param = encodeFleet([{ ...c172, name: "Cessna ñandú ✈" }], "Aeroclub São Paulo")

    expect(decodeFleet(param)).toEqual({
      name: "Aeroclub São Paulo",
      records: [{ ...c172, name: "Cessna ñandú ✈" }],
    })
  })

  it("omits an empty school name", () => {
    const param = /** @type {string} */ (encodeFleet([c172], "   "))
    expect(JSON.parse(atob(param.replace(/-/g, "+").replace(/_/g, "/")))).toEqual({
      v: 1,
      r: [["cessna-172s", "LV-ABC", 1700, 40.5]],
    })
    expect(decodeFleet(param)?.name).toBe("")
  })

  it("normalizes registrations and drops invalid records when encoding", () => {
    const param = encodeFleet([
      { ...c172, registration: " lv-abc " },
      { ...c172, registration: "LV-BAD", baseModelId: "unknown" },
    ])
    expect(decodeFleet(param)?.records).toEqual([c172])
  })

  it("returns null when there is nothing valid to encode", () => {
    expect(encodeFleet([])).toBeNull()
    expect(encodeFleet([{ ...c172, emptyWeight: -1 }])).toBeNull()
  })

  it(`caps the fleet at ${MAX_FLEET_AIRCRAFT} aircraft`, () => {
    const many = Array.from({ length: MAX_FLEET_AIRCRAFT + 5 }, (_, i) => ({
      ...c172,
      registration: regFor(i),
    }))
    const param = /** @type {string} */ (encodeFleet(many, "Escuela"))

    expect(param.length).toBeLessThan(MAX_FLEET_PARAM_LENGTH)
    expect(decodeFleet(param)?.records).toHaveLength(MAX_FLEET_AIRCRAFT)
  })

  it("caps and cleans the school name", () => {
    const param = encodeFleet([c172], `  Aero\u0000club ${"x".repeat(200)}`)
    const name = /** @type {string} */ (decodeFleet(param)?.name)

    expect(name.startsWith("Aeroclub ")).toBe(true)
    expect(name.length).toBeLessThanOrEqual(MAX_FLEET_NAME_LENGTH)
  })
})

describe("decodeFleet with malicious or malformed input", () => {
  it.each([
    ["undefined", undefined],
    ["null", null],
    ["a number", 42],
    ["an empty string", ""],
    ["non-base64url characters", "abc+/=="],
    ["script injection", "<script>alert(1)</script>"],
    ["base64 of non-JSON", btoa("not json").replace(/=+$/, "")],
    ["random garbage", "zzzzzzzzzzzzzz"],
  ])("returns null for %s", (_, input) => {
    expect(decodeFleet(input)).toBeNull()
  })

  it("returns null for invalid UTF-8", () => {
    expect(decodeFleet(btoa("\xff\xfe\xfd").replace(/=+$/, ""))).toBeNull()
  })

  it("returns null for an oversized param without decoding it", () => {
    expect(decodeFleet("A".repeat(MAX_FLEET_PARAM_LENGTH + 1))).toBeNull()
  })

  it.each([
    ["an array payload", [1, 2]],
    ["a primitive payload", "hello"],
    ["a missing version", { r: [["cessna-172s", "LV-ABC", 1700, 40.5]] }],
    ["an unknown version", { v: 2, r: [["cessna-172s", "LV-ABC", 1700, 40.5]] }],
    ["missing records", { v: 1 }],
    ["records that are not a list", { v: 1, r: { 0: "x" } }],
    ["an empty list", { v: 1, r: [] }],
  ])("returns null for %s", (_, payload) => {
    expect(decodeFleet(rawParam(payload))).toBeNull()
  })

  it("returns null when the list exceeds the maximum size", () => {
    const r = Array.from({ length: MAX_FLEET_AIRCRAFT + 1 }, (_, i) => [
      "cessna-172s",
      regFor(i),
      1700,
      40.5,
    ])
    expect(decodeFleet(rawParam({ v: 1, r }))).toBeNull()
  })

  it("drops invalid entries and keeps the valid ones", () => {
    const param = rawParam({
      v: 1,
      n: "Club",
      r: [
        ["cessna-172s", "LV-ABC", 1700, 40.5],
        ["unknown-model", "LV-UNK", 1700, 40.5],
        ["__proto__", "LV-PRO", 1700, 40.5],
        ["constructor", "LV-CON", 1700, 40.5],
        ["cessna-172s", "LV-STR", "1700", "40.5"],
        ["cessna-172s", "LV-NEG", -5, 40.5],
        ["cessna-172s", "LV-MAX", 99999, 40.5],
        ["cessna-172s", "LV-NAN", null, 40.5],
        ["cessna-172s", "<img src=x>", 1700, 40.5],
        ["cessna-172s", "LV-LONG", 1700, 40.5, "n", "extra"],
        { baseModelId: "cessna-172s", registration: "LV-OBJ", emptyWeight: 1700, emptyArm: 40 },
        "garbage",
        null,
      ],
    })

    expect(decodeFleet(param)).toEqual({ name: "Club", records: [c172] })
  })

  it("returns null when no entry is valid", () => {
    expect(decodeFleet(rawParam({ v: 1, r: [["unknown", "LV-ABC", 1, 1]] }))).toBeNull()
  })

  it("ignores a non-string school name and cleans record names", () => {
    const fleet = decodeFleet(
      rawParam({ v: 1, n: { evil: true }, r: [["cessna-172s", "lv-abc", 1700, 40.5, 123]] })
    )
    expect(fleet).toEqual({ name: "", records: [c172] })
  })

  it("dedupes repeated registrations (last one wins)", () => {
    const fleet = decodeFleet(
      rawParam({
        v: 1,
        r: [
          ["cessna-172s", "LV-ABC", 1600, 40],
          ["cessna-172s", "LV-ABC", 1700, 40.5],
        ],
      })
    )
    expect(fleet?.records).toEqual([c172])
  })
})

describe("URL helpers", () => {
  it("builds a fleet URL on top of the base URL, dropping query and hash", () => {
    const url = /** @type {string} */ (
      buildFleetUrl([c172], "Club", "https://wb-aviation.pages.dev/app/?ref=abc#x")
    )
    const parsed = new URL(url)

    expect(parsed.origin + parsed.pathname).toBe("https://wb-aviation.pages.dev/app/")
    expect([...parsed.searchParams.keys()]).toEqual([FLEET_PARAM])
    expect(parsed.hash).toBe("")
    expect(decodeFleet(readFleetParam(parsed.search))?.records).toEqual([c172])
  })

  it("returns null when there is nothing to share", () => {
    expect(buildFleetUrl([], "Club", "https://example.com/")).toBeNull()
  })

  it("reads the param and returns null when absent", () => {
    expect(readFleetParam("?fleet=abc&x=1")).toBe("abc")
    expect(readFleetParam("?x=1")).toBeNull()
    expect(readFleetParam("")).toBeNull()
  })

  it("removes only the fleet param, keeping others and the hash", () => {
    expect(withoutFleetParam("https://example.com/app/?fleet=abc&ref=1#top")).toBe(
      "/app/?ref=1#top"
    )
    expect(withoutFleetParam("https://example.com/?fleet=abc")).toBe("/")
  })
})
