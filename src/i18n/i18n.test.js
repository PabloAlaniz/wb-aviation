import { describe, it, expect } from "vitest"
import { resolveLocale, locales, localeNames, localeOptions, DEFAULT_LOCALE } from "./index"
import { es } from "./es"

describe("resolveLocale", () => {
  it("prefers a valid stored preference over the browser language", () => {
    expect(resolveLocale("en", "es-AR")).toBe("en")
    expect(resolveLocale("es", "en-US")).toBe("es")
  })

  it("falls back to the browser language when there is no stored preference", () => {
    expect(resolveLocale(null, "en-US")).toBe("en")
    expect(resolveLocale(undefined, "es-AR")).toBe("es")
  })

  it("ignores an unsupported stored preference", () => {
    expect(resolveLocale("fr", "en-GB")).toBe("en")
  })

  it("defaults when neither preference nor browser language is supported", () => {
    expect(resolveLocale(null, "fr-FR")).toBe(DEFAULT_LOCALE)
    expect(resolveLocale(null, null)).toBe(DEFAULT_LOCALE)
  })
})

describe("locale catalog", () => {
  it("exposes one named option per locale", () => {
    expect(localeOptions.map((o) => o.value).sort()).toEqual(Object.keys(locales).sort())
    expect(localeOptions.every((o) => typeof o.label === "string" && o.label.length > 0)).toBe(true)
  })

  it("has a display name for every locale", () => {
    for (const code of Object.keys(locales)) {
      expect(localeNames[code]).toBeTruthy()
    }
  })
})

/** Recursively collect the shape (keys + leaf typeof) of a messages object. */
function shapeOf(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return value && typeof value === "object" ? shapeOf(value, path) : [`${path}:${typeof value}`]
  })
}

describe("locale parity", () => {
  const reference = shapeOf(es).sort()

  for (const [code, catalog] of Object.entries(locales)) {
    it(`"${code}" mirrors the Spanish structure (same keys and value kinds)`, () => {
      expect(shapeOf(catalog).sort()).toEqual(reference)
    })
  }
})
