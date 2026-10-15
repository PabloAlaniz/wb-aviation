import process from "node:process"
import { describe, it, expect, vi, afterEach } from "vitest"
import {
  NA,
  eventsSql,
  fmt,
  formatReport,
  main,
  markdownTable,
  reportWindow,
  rumRequest,
  rumTotals,
  sqlRows,
  sumTraffic,
} from "./stats.mjs"

const now = new Date("2026-10-19T12:00:00Z")

describe("reportWindow", () => {
  it("covers the 7 days before now", () => {
    const w = reportWindow(now)
    expect(w.start.toISOString()).toBe("2026-10-12T12:00:00.000Z")
    expect(w.label).toBe("2026-10-12 → 2026-10-19")
  })
})

describe("sumTraffic", () => {
  const days = [
    { timestamp: "2026-10-10T00:00:00Z", count: 100, uniques: 50 },
    { timestamp: "2026-10-12T00:00:00Z", count: 3, uniques: 2 },
    { timestamp: "2026-10-18T00:00:00Z", count: 4, uniques: 1 },
  ]

  it("sums the daily buckets from the window's first UTC day", () => {
    expect(sumTraffic(days, reportWindow(now).start)).toEqual({ count: 7, uniques: 3 })
  })

  it("returns null for a missing response", () => {
    expect(sumTraffic(undefined, now)).toBeNull()
  })
})

describe("rumTotals", () => {
  it("reads visits and page views", () => {
    const body = {
      data: {
        viewer: {
          accounts: [{ rumPageloadEventsAdaptiveGroups: [{ count: 120, sum: { visits: 45 } }] }],
        },
      },
      errors: null,
    }
    expect(rumTotals(body)).toEqual({ visits: 45, pageviews: 120 })
  })

  it("is zero when there is no traffic", () => {
    const body = { data: { viewer: { accounts: [{ rumPageloadEventsAdaptiveGroups: [] }] } } }
    expect(rumTotals(body)).toEqual({ visits: 0, pageviews: 0 })
  })

  it("is null on GraphQL errors or an unexpected shape", () => {
    expect(rumTotals({ data: null, errors: [{ message: "nope" }] })).toBeNull()
    expect(rumTotals({})).toBeNull()
    expect(rumTotals(null)).toBeNull()
  })
})

describe("rumRequest", () => {
  const w = reportWindow(now)

  it("filters by host by default", () => {
    const req = rumRequest({ accountId: "acc" }, w, { host: "checkcg.com" })
    expect(req.query).toContain("rumPageloadEventsAdaptiveGroups")
    expect(req.query).toContain("{ requestHost: $site }")
    expect(req.variables).toEqual({
      accountTag: "acc",
      start: "2026-10-12T12:00:00.000Z",
      end: "2026-10-19T12:00:00.000Z",
      site: "checkcg.com",
    })
  })

  it("filters by site tag when given", () => {
    const req = rumRequest({ accountId: "acc" }, w, { host: "checkcg.com", siteTag: "tag" })
    expect(req.query).toContain("{ siteTag: $site }")
    expect(req.variables.site).toBe("tag")
  })
})

describe("Analytics Engine", () => {
  it("builds sampled SQL over the events dataset", () => {
    expect(eventsSql("events")).toMatch(
      /SELECT blob1 AS event, SUM\(_sample_interval\) AS count FROM checkcg_events .*INTERVAL '7' DAY GROUP BY event/
    )
    expect(eventsSql("refs")).toMatch(/blob5 AS ref.*blob5 != ''.*LIMIT 10 FORMAT JSON/)
  })

  it("parses rows, converting stringified integers", () => {
    const body = {
      meta: [],
      data: [
        { event: "pdf_export", count: "12" },
        { event: "", count: 2.4 },
      ],
      rows: 2,
    }
    expect(sqlRows(body, "event")).toEqual([
      ["pdf_export", 12],
      ["(none)", 2],
    ])
    expect(sqlRows({ errors: ["x"] }, "event")).toBeNull()
  })
})

describe("formatting", () => {
  it("formats numbers or n/d", () => {
    expect(fmt(1234)).toBe("1,234")
    expect(fmt(null)).toBe(NA)
    expect(fmt(undefined)).toBe(NA)
  })

  it("renders a Markdown table, escaping pipes", () => {
    expect(markdownTable(["A", "B"], [["x|y", 1]])).toBe("| A | B |\n| --- | --- |\n| x\\|y | 1 |")
  })

  it("renders every section, degrading to n/d", () => {
    const report = formatReport({
      window: "w",
      repo: { stars: 10, forks: 2 },
      views: null,
      clones: { count: 5, uniques: 3 },
      web: null,
      events: [["pdf_export", 4]],
      refs: null,
      meta: { repo: "o/r", host: "checkcg.com" },
    })
    expect(report).toContain("# CheckCG weekly stats (w)")
    expect(report).toContain("| Stars | 10 |  |")
    expect(report).toContain("| Views (7 d) | n/d | n/d |")
    expect(report).toContain("| Clones (7 d) | 5 | 3 |")
    expect(report).toContain("| Visits | n/d |")
    expect(report).toContain("| pdf_export | 4 |")
    expect(report).toMatch(/### Top refs\n\nn\/d/)
  })
})

describe("main", () => {
  afterEach(() => vi.unstubAllGlobals())

  it("degrades gracefully without credentials or network, never printing secrets", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError("offline"))
    vi.stubGlobal("fetch", fetchMock)
    const stderr = vi.spyOn(process.stderr, "write").mockImplementation(() => true)

    const report = await main({}, now)

    expect(report).toContain("| Stars | n/d |")
    expect(report).toContain("| Visits | n/d |")
    // only the public repo endpoint is tried without a token
    expect(
      fetchMock.mock.calls.every(
        ([url]) => url === "https://api.github.com/repos/PabloAlaniz/wb-aviation"
      )
    ).toBe(true)
    stderr.mockRestore()
  })

  it("never echoes tokens in the report or diagnostics", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 403, json: async () => ({}) })
    )
    const writes = []
    const stderr = vi.spyOn(process.stderr, "write").mockImplementation((chunk) => {
      writes.push(String(chunk))
      return true
    })

    const env = {
      GITHUB_TOKEN: "ghp_secret",
      CLOUDFLARE_API_TOKEN: "cf_secret",
      CLOUDFLARE_ACCOUNT_ID: "acc",
    }
    const report = await main(env, now)

    for (const text of [report, ...writes]) {
      expect(text).not.toContain("ghp_secret")
      expect(text).not.toContain("cf_secret")
    }
    expect(report).toContain("| Page views | n/d |")
    stderr.mockRestore()
  })
})
