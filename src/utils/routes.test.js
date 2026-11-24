import { describe, it, expect } from "vitest"
import {
  ROUTE_LOCALES,
  DEFAULT_ROUTE_LOCALE,
  GUIDES_DIR,
  SITE_URL,
  guidePath,
  aboutPath,
  glossaryPath,
  guidesIndexPath,
  localizedPageGroups,
  absoluteUrl,
  aircraftPath,
  alternateLinks,
  isRouteLocale,
  localeFromPath,
  localePath,
  localeSwitchPath,
  rootRedirectTarget,
} from "./routes"
import { locales } from "../i18n"

describe("route locales", () => {
  it("match the i18n catalogs, default first", () => {
    expect([...ROUTE_LOCALES].sort()).toEqual(Object.keys(locales).sort())
    expect(ROUTE_LOCALES[0]).toBe(DEFAULT_ROUTE_LOCALE)
  })

  it("recognizes supported locales only", () => {
    expect(isRouteLocale("en")).toBe(true)
    expect(isRouteLocale("ja")).toBe(false)
    expect(isRouteLocale(undefined)).toBe(false)
  })
})

describe("paths", () => {
  it("builds localized home and aircraft paths with a trailing slash", () => {
    expect(localePath("pt")).toBe("/pt/")
    expect(aircraftPath("en", "cessna-172s")).toBe("/en/cessna-172s/")
  })

  it("reads the locale from the first path segment", () => {
    expect(localeFromPath("/en/cessna-172s/")).toBe("en")
    expect(localeFromPath("/es")).toBe("es")
    expect(localeFromPath("/")).toBeNull()
    expect(localeFromPath("/ja/x/")).toBeNull()
  })

  it("builds absolute URLs on the production site", () => {
    expect(absoluteUrl("/es/")).toBe(`${SITE_URL}/es/`)
    expect(absoluteUrl("/es/", "https://example.com/")).toBe("https://example.com/es/")
  })
})

describe("alternateLinks", () => {
  it("lists every locale plus x-default", () => {
    const links = alternateLinks((l) => aircraftPath(l, "cessna-172s"), "/es/cessna-172s/")
    expect(links).toEqual([
      { hreflang: "es", href: `${SITE_URL}/es/cessna-172s/` },
      { hreflang: "en", href: `${SITE_URL}/en/cessna-172s/` },
      { hreflang: "pt", href: `${SITE_URL}/pt/cessna-172s/` },
      { hreflang: "it", href: `${SITE_URL}/it/cessna-172s/` },
      { hreflang: "fr", href: `${SITE_URL}/fr/cessna-172s/` },
      { hreflang: "de", href: `${SITE_URL}/de/cessna-172s/` },
      { hreflang: "x-default", href: `${SITE_URL}/es/cessna-172s/` },
    ])
  })
})

describe("localeSwitchPath", () => {
  it("keeps the aircraft page when there is one", () => {
    expect(localeSwitchPath("en", "cessna-172s")).toBe("/en/cessna-172s/")
  })

  it("goes to the localized home otherwise", () => {
    expect(localeSwitchPath("pt", null)).toBe("/pt/")
    expect(localeSwitchPath("pt", undefined)).toBe("/pt/")
  })
})

describe("rootRedirectTarget", () => {
  it("stays on the root page for shared calculation and fleet links", () => {
    expect(rootRedirectTarget("?s=abc", "en", "en-US", ROUTE_LOCALES)).toBeNull()
    expect(rootRedirectTarget("?fleet=abc&x=1", null, "es-AR", ROUTE_LOCALES)).toBeNull()
  })

  it("prefers the stored language, then the browser's, then the default", () => {
    expect(rootRedirectTarget("", "pt", "en-US", ROUTE_LOCALES)).toBe("/pt/")
    expect(rootRedirectTarget("", null, "en-GB", ROUTE_LOCALES)).toBe("/en/")
    expect(rootRedirectTarget("", "ja", "nl-NL", ROUTE_LOCALES)).toBe("/es/")
    expect(rootRedirectTarget("", null, undefined, ROUTE_LOCALES)).toBe("/es/")
  })

  it("keeps unrelated query params", () => {
    expect(rootRedirectTarget("?utm_source=x", "en", null, ROUTE_LOCALES)).toBe("/en/?utm_source=x")
  })

  it("is self-contained so it can be inlined via Function#toString", () => {
    const inlined = new Function(`return (${rootRedirectTarget.toString()})`)()
    expect(inlined("", "pt", null, ["es", "en", "pt"])).toBe("/pt/")
    expect(inlined("?s=1", "pt", null, ["es", "en", "pt"])).toBeNull()
  })
})

describe("guide paths", () => {
  it("use the localized guides folder", () => {
    expect(guidesIndexPath("es")).toBe("/es/guias/")
    expect(guidesIndexPath("en")).toBe("/en/guides/")
    expect(guidesIndexPath("pt")).toBe("/pt/guias/")
    expect(guidePath("en", "weight-arm-and-moment")).toBe("/en/guides/weight-arm-and-moment/")
    expect(Object.keys(GUIDES_DIR).sort()).toEqual([...ROUTE_LOCALES].sort())
  })
})

describe("glossary and methodology paths", () => {
  it("builds localized paths", () => {
    expect(glossaryPath("es")).toBe("/es/glosario/")
    expect(glossaryPath("de")).toBe("/de/glossar/")
    expect(aboutPath("en")).toBe("/en/methodology/")
    expect(aboutPath("fr")).toBe("/fr/methodologie/")
  })

  it("groups the translations of each page, without clashing with aircraft pages", () => {
    const groups = localizedPageGroups()
    expect(groups).toHaveLength(2)
    expect(Object.keys(groups[0])).toEqual([...ROUTE_LOCALES])
    expect(groups[1].it).toBe("/it/metodologia/")
    const paths = groups.flatMap((group) => Object.values(group))
    expect(new Set(paths).size).toBe(paths.length)
  })
})
