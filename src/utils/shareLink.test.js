import { describe, it, expect } from "vitest"
import {
  encodeSharedCalculation,
  decodeSharedCalculation,
  buildShareUrl,
  readShareParam,
  withoutShareParam,
  MAX_SHARE_PARAM_LENGTH,
} from "./shareLink"

/** Encode an arbitrary payload exactly like the module does. */
function rawEncode(value) {
  const json = typeof value === "string" ? value : JSON.stringify(value)
  const bytes = new TextEncoder().encode(json)
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

const C172_RECORD = {
  baseModelId: "cessna-172s",
  registration: "LV-ABC",
  emptyWeight: 1700,
  emptyArm: 40,
}

describe("encodeSharedCalculation / decodeSharedCalculation", () => {
  it("round-trips a catalog aircraft calculation", () => {
    const encoded = encodeSharedCalculation({
      aircraftId: "king-air-echo-90",
      weights: { pilot: "180", copilot: "", fuel: "1500.5", baggage1: "0" },
      fuelBurn: "800",
      units: "metric",
    })

    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(decodeSharedCalculation(encoded)).toEqual({
      aircraftId: "king-air-echo-90",
      customRecord: null,
      weights: { pilot: "180", fuel: "1500.5" },
      fuelBurn: "800",
      units: "metric",
    })
  })

  it("keeps the payload compact: drops empty stations, burn and default units", () => {
    const encoded = encodeSharedCalculation({
      aircraftId: "cessna-172s",
      weights: { pilot: "", copilot: "" },
      fuelBurn: "",
      units: "imperial",
    })

    expect(JSON.parse(atob(encoded))).toEqual({ v: 1, a: "cessna-172s" })
    expect(decodeSharedCalculation(encoded)).toEqual({
      aircraftId: "cessna-172s",
      customRecord: null,
      weights: {},
      fuelBurn: "",
      units: null,
    })
  })

  it("rounds weights to 2 decimals (metric input converted to lbs)", () => {
    const encoded = encodeSharedCalculation({
      aircraftId: "cessna-172s",
      weights: { pilot: "220.46226218487757" },
      fuelBurn: "",
      units: "metric",
    })

    expect(decodeSharedCalculation(encoded)?.weights).toEqual({ pilot: "220.46" })
  })

  it("embeds and round-trips a custom aircraft record", () => {
    const encoded = encodeSharedCalculation({
      aircraftId: "custom:LV-ABC",
      weights: { pilot: "170" },
      fuelBurn: "",
      units: "imperial",
      customRecords: [{ ...C172_RECORD, name: "Club 172" }],
    })

    expect(decodeSharedCalculation(encoded)).toEqual({
      aircraftId: "custom:LV-ABC",
      customRecord: { ...C172_RECORD, name: "Club 172" },
      weights: { pilot: "170" },
      fuelBurn: "",
      units: null,
    })
  })

  it("does not encode unknown aircraft or custom aircraft without their record", () => {
    const base = { weights: {}, fuelBurn: "", units: /** @type {const} */ ("imperial") }
    expect(encodeSharedCalculation({ ...base, aircraftId: "concorde" })).toBeNull()
    expect(encodeSharedCalculation({ ...base, aircraftId: "custom:GONE" })).toBeNull()
  })

  it("stays short for a fully loaded aircraft", () => {
    const encoded = encodeSharedCalculation({
      aircraftId: "king-air-echo-90",
      weights: {
        pilot: "200",
        copilot: "200",
        passenger1: "170",
        passenger2: "170",
        passenger3: "170",
        passenger4: "170",
        baggage1: "100",
        baggage2: "100",
        fuel: "2500",
      },
      fuelBurn: "1200",
      units: "metric",
    })

    expect(encoded.length).toBeLessThan(300)
  })
})

describe("decodeSharedCalculation: strict validation", () => {
  const valid = { v: 1, a: "cessna-172s", w: { pilot: 170 } }

  it("accepts a well-formed payload", () => {
    expect(decodeSharedCalculation(rawEncode(valid))).not.toBeNull()
  })

  it.each([
    ["missing param", undefined],
    ["non-string", 42],
    ["empty", ""],
    ["not base64url", "abc$%^"],
    ["padding / std base64 chars", "eyJ2IjoxfQ=="],
    ["base64 of non-JSON", rawEncode("not json")],
    ["base64 of invalid UTF-8", btoa("\xff\xfe\xfd").replace(/\//g, "_")],
    ["oversize", "A".repeat(MAX_SHARE_PARAM_LENGTH + 1)],
  ])("rejects garbage input: %s", (_label, input) => {
    expect(decodeSharedCalculation(input)).toBeNull()
  })

  it.each([
    ["JSON array", [1, 2]],
    ["JSON null", null],
    ["JSON string", "hello"],
    ["unknown version", { ...valid, v: 2 }],
    ["missing version", { a: "cessna-172s" }],
    ["unknown aircraft", { ...valid, a: "concorde" }],
    ["prototype key as aircraft", { ...valid, a: "__proto__" }],
    ["aircraft id not a string", { ...valid, a: ["cessna-172s"] }],
    ["unknown station", { ...valid, w: { cockpitBar: 10 } }],
    ["prototype station", JSON.parse('{"v":1,"a":"cessna-172s","w":{"__proto__":10}}')],
    ["string weight", { ...valid, w: { pilot: "170" } }],
    ["negative weight", { ...valid, w: { pilot: -5 } }],
    ["huge weight", { ...valid, w: { pilot: 1e9 } }],
    ["weights not an object", { ...valid, w: [170] }],
    ["bad fuel burn", { ...valid, b: "lots" }],
    ["negative fuel burn", { ...valid, b: -1 }],
    ["bad units", { ...valid, u: "cubits" }],
    ["custom record on a catalog aircraft", { ...valid, c: {} }],
  ])("rejects invalid payload: %s", (_label, payload) => {
    expect(decodeSharedCalculation(rawEncode(payload))).toBeNull()
  })

  describe("custom aircraft", () => {
    const custom = {
      v: 1,
      a: "custom:LV-ABC",
      c: { m: "cessna-172s", r: "LV-ABC", e: 1700, x: 40 },
    }

    it("accepts a valid embedded record", () => {
      expect(decodeSharedCalculation(rawEncode(custom))?.customRecord).toEqual(C172_RECORD)
    })

    it.each([
      ["missing record", { v: 1, a: "custom:LV-ABC" }],
      ["id/registration mismatch", { ...custom, a: "custom:LV-XYZ" }],
      ["unknown base model", { ...custom, c: { ...custom.c, m: "concorde" } }],
      ["empty weight above max", { ...custom, c: { ...custom.c, e: 99999 } }],
      ["empty weight as string", { ...custom, c: { ...custom.c, e: "1700" } }],
      ["zero arm", { ...custom, c: { ...custom.c, x: 0 } }],
      [
        "invalid registration",
        { ...custom, a: "custom:<SCRIPT>", c: { ...custom.c, r: "<script>" } },
      ],
      ["oversize name", { ...custom, c: { ...custom.c, n: "x".repeat(200) } }],
      ["station of another model", { ...custom, w: { passenger3: 170 } }],
    ])("rejects %s", (_label, payload) => {
      expect(decodeSharedCalculation(rawEncode(payload))).toBeNull()
    })
  })
})

describe("URL helpers", () => {
  const state = {
    aircraftId: "cessna-172s",
    weights: { pilot: "170" },
    fuelBurn: "",
    units: /** @type {const} */ ("imperial"),
  }

  it("builds a share URL on the current path, dropping other params and the hash", () => {
    const url = buildShareUrl("https://wb.example.com/app/?foo=1#x", state)

    expect(url).toMatch(/^https:\/\/wb\.example\.com\/app\/\?s=[A-Za-z0-9_-]+$/)
    const param = readShareParam(new URL(url).search)
    expect(decodeSharedCalculation(param)?.weights).toEqual({ pilot: "170" })
  })

  it("returns null when the state cannot be shared", () => {
    expect(buildShareUrl("https://wb.example.com/", { ...state, aircraftId: "nope" })).toBeNull()
  })

  it("reads and strips the share param", () => {
    expect(readShareParam("?s=abc&x=1")).toBe("abc")
    expect(readShareParam("")).toBeNull()
    expect(withoutShareParam("https://wb.example.com/p?x=1&s=abc#h")).toBe("/p?x=1#h")
    expect(withoutShareParam("https://wb.example.com/?s=abc")).toBe("/")
  })
})
