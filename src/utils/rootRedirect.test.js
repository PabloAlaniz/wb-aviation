import { describe, it, expect } from "vitest"
import { preferredLanguage, readCookie, resolveRootRedirect } from "./rootRedirect"

describe("readCookie", () => {
  it("reads a cookie among others", () => {
    expect(readCookie("a=1; wb-locale=pt; b=2", "wb-locale")).toBe("pt")
  })

  it("returns null when missing", () => {
    expect(readCookie("a=1", "wb-locale")).toBeNull()
    expect(readCookie(null, "wb-locale")).toBeNull()
  })
})

describe("preferredLanguage", () => {
  it("picks the highest-quality supported language", () => {
    expect(preferredLanguage("fr-FR,fr;q=0.9,pt-BR;q=0.8,en;q=0.7")).toBe("pt")
  })

  it("respects explicit q ordering", () => {
    expect(preferredLanguage("en;q=0.5,it;q=0.9")).toBe("it")
  })

  it("ignores q=0 and unsupported languages", () => {
    expect(preferredLanguage("en;q=0,de")).toBeNull()
    expect(preferredLanguage("")).toBeNull()
  })
})

describe("resolveRootRedirect", () => {
  const root = "https://checkcg.com/"

  it("prefers the stored cookie over Accept-Language", () => {
    expect(resolveRootRedirect(root, { cookie: "wb-locale=it", acceptLanguage: "en-US" })).toBe(
      "/it/"
    )
  })

  it("uses Accept-Language when there is no stored preference", () => {
    expect(resolveRootRedirect(root, { acceptLanguage: "en-US,en;q=0.9" })).toBe("/en/")
  })

  it("falls back to the default locale (crawlers send no Accept-Language)", () => {
    expect(resolveRootRedirect(root, {})).toBe("/es/")
  })

  it("keeps other query params", () => {
    expect(resolveRootRedirect(`${root}?utm_source=x`, { acceptLanguage: "pt" })).toBe(
      "/pt/?utm_source=x"
    )
  })

  it("serves shared calculation and fleet links in place", () => {
    expect(resolveRootRedirect(`${root}?s=abc`, { acceptLanguage: "en" })).toBeNull()
    expect(resolveRootRedirect(`${root}?fleet=xyz`, { acceptLanguage: "en" })).toBeNull()
  })

  it("never touches other paths", () => {
    expect(resolveRootRedirect("https://checkcg.com/en/", { acceptLanguage: "es" })).toBeNull()
    expect(resolveRootRedirect("https://checkcg.com/index.html", {})).toBeNull()
  })
})
