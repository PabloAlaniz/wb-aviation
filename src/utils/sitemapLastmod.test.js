import { describe, expect, it } from "vitest"
import { guideFrontmatterDates, sitemapLastmod } from "./sitemapLastmod"

const aircraft = {
  "cessna-152": { dataValidation: { lastUpdated: "2026-01-10" } },
  "cessna-172s": { dataValidation: { lastUpdated: "2026-03-02" } },
  unknown: { dataValidation: {} },
}
const guides = [
  { lang: "en", slug: "fuel-conversions", updated: "2026-11-05" },
  { lang: "en", slug: "cg-envelope-explained", updated: "2026-10-15" },
  { lang: "es", slug: "envolvente-de-cg", updated: "2026-02-01" },
]

describe("sitemap lastmod", () => {
  const dates = sitemapLastmod({
    aircraft,
    guides,
    pages: [{ path: "/en/glossary/", updated: "2026-11-24" }],
    locales: ["es", "en"],
  })

  it("dates aircraft pages by their data and guides by their update", () => {
    expect(dates.get("/en/cessna-152/")).toBe("2026-01-10")
    expect(dates.get("/es/cessna-172s/")).toBe("2026-03-02")
    expect(dates.get("/en/guides/fuel-conversions/")).toBe("2026-11-05")
    expect(dates.has("/en/unknown/")).toBe(false)
    expect(dates.get("/en/glossary/")).toBe("2026-11-24")
  })

  it("dates index pages by the newest thing they list", () => {
    expect(dates.get("/en/guides/")).toBe("2026-11-05")
    expect(dates.get("/en/")).toBe("2026-11-05")
    expect(dates.get("/es/guias/")).toBe("2026-02-01")
    expect(dates.get("/es/")).toBe("2026-03-02")
  })

  it("reads the dates of a guide from its frontmatter", () => {
    const markdown = '---\ntitle: "T: x"\nlang: en\nslug: a-b\nupdated: 2026-10-15\n---\n\nBody'
    expect(guideFrontmatterDates(markdown)).toEqual({
      lang: "en",
      slug: "a-b",
      updated: "2026-10-15",
    })
    expect(guideFrontmatterDates("no frontmatter")).toBeNull()
  })
})
