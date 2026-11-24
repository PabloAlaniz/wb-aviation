import { describe, expect, it } from "vitest"
import { locales } from "../i18n"
import { ROUTE_LOCALES } from "./routes"
import { localizedManifest, manifestPath } from "./pwaManifest"

describe("localized web app manifests", () => {
  it("starts each language at its own home", () => {
    const manifest = localizedManifest("en", locales.en.seo)
    expect(manifest.start_url).toBe("/en/")
    expect(manifest.lang).toBe("en")
    expect(manifest.name).toBe("CheckCG - Weight and balance")
    expect(manifestPath("en")).toBe("/en/manifest.webmanifest")
  })

  it("keeps one app identity across languages", () => {
    const ids = ROUTE_LOCALES.map((locale) => {
      const manifest = localizedManifest(locale, locales[locale].seo)
      expect(manifest.description.length).toBeGreaterThan(20)
      return `${manifest.id} ${manifest.scope} ${manifest.short_name}`
    })
    expect(new Set(ids).size).toBe(1)
  })
})
