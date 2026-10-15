import { describe, it, expect } from "vitest"
import { EVENT_NAMES, MAX_BODY_BYTES, parseEvent, sanitizeProps, sanitizeRef } from "./eventIngest"

const body = (value) => JSON.stringify(value)

describe("parseEvent", () => {
  it("builds an Analytics Engine data point for a valid event", () => {
    const result = parseEvent(
      body({
        n: "pdf_export",
        p: { units: "metric" },
        path: "/es/cessna-152/",
        lang: "es",
        aircraft: "cessna-152",
        ref: "Flyer-AR",
      }),
      { country: "AR" }
    )

    expect(result).toEqual({
      ok: true,
      point: {
        indexes: ["pdf_export"],
        blobs: [
          "pdf_export",
          "/es/cessna-152/",
          "es",
          "cessna-152",
          "flyer-ar",
          "AR",
          '{"units":"metric"}',
        ],
        doubles: [1],
      },
    })
  })

  it("accepts every event in the closed list with only a name", () => {
    for (const n of EVENT_NAMES) {
      const result = parseEvent(body({ n }))
      expect(result.ok).toBe(true)
      if (result.ok) expect(result.point.blobs).toEqual([n, "", "", "", "", "", "{}"])
    }
  })

  it.each([
    ["unknown event", body({ n: "pageview" })],
    ["missing name", body({ p: {} })],
    ["not JSON", "n=share_link"],
    ["JSON array", body([{ n: "share_link" }])],
    ["JSON null", "null"],
    ["empty body", ""],
    ["non-string body", undefined],
  ])("rejects %s with 400", (_, raw) => {
    expect(parseEvent(raw)).toEqual({ ok: false, status: 400 })
  })

  it("rejects bodies over the size limit", () => {
    const raw = body({ n: "share_link", p: { pad: "x".repeat(MAX_BODY_BYTES) } })
    expect(parseEvent(raw)).toEqual({ ok: false, status: 400 })
  })

  it("truncates and limits props", () => {
    const result = parseEvent(
      body({
        n: "share_link",
        p: {
          long: "y".repeat(200),
          nested: { a: 1 },
          list: [1],
          "bad key": "x",
          a: 1,
          b: true,
          c: "c",
          d: 2,
          e: 3,
          f: 4,
        },
      })
    )
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const props = JSON.parse(result.point.blobs[6])
    expect(Object.keys(props)).toEqual(["long", "a", "b", "c", "d", "e"])
    expect(props.long).toHaveLength(64)
  })

  it("drops invalid lang, aircraft, ref, country and path query strings", () => {
    const result = parseEvent(
      body({
        n: "share_link",
        path: "/es/?s=secret#x",
        lang: "<script>",
        aircraft: "../etc",
        ref: "bad ref!",
      }),
      { country: "argentina" }
    )
    expect(result.ok && result.point.blobs.slice(1, 6)).toEqual(["/es/", "", "", "", ""])
  })

  it("falls back to the page URL path when the body has none", () => {
    const result = parseEvent(body({ n: "share_link" }), {
      url: "https://checkcg.com/pt/piper-pa-28/?s=abc",
    })
    expect(result.ok && result.point.blobs[1]).toBe("/pt/piper-pa-28/")
  })

  it("never stores IPs, user agents or other identifiers from the body", () => {
    const result = parseEvent(
      body({ n: "share_link", ip: "203.0.113.7", ua: "Mozilla/5.0", id: "user-123" })
    )
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const serialized = JSON.stringify(result.point)
    expect(serialized).not.toContain("203.0.113.7")
    expect(serialized).not.toContain("Mozilla")
    expect(serialized).not.toContain("user-123")
    expect(result.point.blobs).toHaveLength(7)
  })
})

describe("sanitizeRef", () => {
  it.each([
    ["Flyer-AR", "flyer-ar"],
    ["  school.lv_abc ", "school.lv_abc"],
    ["a".repeat(48), "a".repeat(48)],
    ["a".repeat(49), ""],
    ["bad ref", ""],
    ["ñandú", ""],
    ["", ""],
    [null, ""],
    [42, ""],
  ])("%j → %j", (input, expected) => {
    expect(sanitizeRef(input)).toBe(expected)
  })
})

describe("sanitizeProps", () => {
  it("returns an empty object for non-objects", () => {
    expect(sanitizeProps(null)).toEqual({})
    expect(sanitizeProps("x")).toEqual({})
    expect(sanitizeProps([1, 2])).toEqual({})
  })

  it("drops non-finite numbers", () => {
    expect(sanitizeProps({ a: Infinity, b: NaN, c: 1.5 })).toEqual({ c: 1.5 })
  })
})
