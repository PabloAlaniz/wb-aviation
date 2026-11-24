import { describe, expect, it } from "vitest"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import process from "node:process"
import { indexNowPayload, sitemapLocs } from "./indexnow.mjs"

describe("IndexNow submission", () => {
  it("reads the locations of a sitemap", () => {
    const xml =
      "<urlset><url><loc>https://checkcg.com/es/</loc><lastmod>2026-11-05</lastmod></url>" +
      "<url><loc> https://checkcg.com/en/ </loc></url></urlset>"
    expect(sitemapLocs(xml)).toEqual(["https://checkcg.com/es/", "https://checkcg.com/en/"])
  })

  it("submits only this site's URLs, once each", () => {
    const payload = indexNowPayload([
      "https://checkcg.com/es/",
      "https://checkcg.com/es/",
      "https://example.com/",
    ])
    expect(payload.host).toBe("checkcg.com")
    expect(payload.urlList).toEqual(["https://checkcg.com/es/"])
  })

  it("serves the key file IndexNow verifies", () => {
    const { key, keyLocation } = indexNowPayload([])
    expect(keyLocation).toBe(`https://checkcg.com/${key}.txt`)
    const file = path.join(process.cwd(), "public", `${key}.txt`)
    expect(existsSync(file)).toBe(true)
    expect(readFileSync(file, "utf8")).toBe(key)
  })
})
