import { describe, it, expect } from "vitest"
import { CSP_DIRECTIVES, SECURITY_HEADERS, applySecurityHeaders, buildCsp } from "./securityHeaders"

describe("buildCsp", () => {
  it("joins directives and sources", () => {
    expect(buildCsp({ "default-src": ["'self'"], "img-src": ["'self'", "data:"] })).toBe(
      "default-src 'self'; img-src 'self' data:"
    )
  })

  it("keeps directives without sources", () => {
    expect(buildCsp({ "upgrade-insecure-requests": [] })).toBe("upgrade-insecure-requests")
  })
})

describe("content security policy", () => {
  const csp = SECURITY_HEADERS["Content-Security-Policy"]

  it("falls back to same-origin and blocks plugins, framing and <base> hijacking", () => {
    expect(csp).toContain("default-src 'self'")
    expect(csp).toContain("object-src 'none'")
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain("base-uri 'self'")
    expect(csp).toContain("form-action 'self'")
  })

  it("never allows eval or wildcard sources", () => {
    expect(csp).not.toContain("unsafe-eval")
    for (const sources of Object.values(CSP_DIRECTIVES)) {
      expect(sources).not.toContain("*")
      expect(sources).not.toContain("https:")
    }
  })

  it("only allows the analytics hosts beyond this origin", () => {
    const external = Object.values(CSP_DIRECTIVES)
      .flat()
      .filter((source) => source.startsWith("http"))
    expect([...new Set(external)].sort()).toEqual([
      "https://cloudflareinsights.com",
      "https://plausible.io",
      "https://static.cloudflareinsights.com",
    ])
  })
})

describe("applySecurityHeaders", () => {
  it("sets every header and keeps the existing ones", () => {
    const headers = applySecurityHeaders(new Headers({ "Content-Type": "text/html" }))
    expect(headers.get("Content-Type")).toBe("text/html")
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      expect(headers.get(name)).toBe(value)
    }
  })

  it("overrides weaker values", () => {
    const headers = applySecurityHeaders(new Headers({ "X-Frame-Options": "ALLOWALL" }))
    expect(headers.get("X-Frame-Options")).toBe("DENY")
    expect(headers.get("X-Content-Type-Options")).toBe("nosniff")
  })
})
