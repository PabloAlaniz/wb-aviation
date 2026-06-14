import { describe, it, expect, afterEach } from "vitest"
import { initAnalytics } from "./analytics"

afterEach(() => {
  document.head.querySelectorAll("script[data-domain]").forEach((el) => el.remove())
})

describe("initAnalytics", () => {
  it("does nothing when no domain is configured", () => {
    expect(initAnalytics(undefined)).toBe(false)
    expect(document.head.querySelector("script[data-domain]")).toBeNull()
  })

  it("injects the analytics script when a domain is given", () => {
    expect(initAnalytics("wb-aviation.pages.dev")).toBe(true)

    const script = document.head.querySelector("script[data-domain]")
    expect(script).not.toBeNull()
    expect(script?.getAttribute("data-domain")).toBe("wb-aviation.pages.dev")
    expect(script?.getAttribute("src")).toBe("https://plausible.io/js/script.js")
  })

  it("supports a custom (self-hosted) script URL", () => {
    initAnalytics("wb-aviation.pages.dev", "https://stats.example.com/js/script.js")

    expect(document.head.querySelector("script[data-domain]")?.getAttribute("src")).toBe(
      "https://stats.example.com/js/script.js"
    )
  })

  it("does not inject twice", () => {
    initAnalytics("wb-aviation.pages.dev")
    expect(initAnalytics("wb-aviation.pages.dev")).toBe(false)
    expect(document.head.querySelectorAll("script[data-domain]")).toHaveLength(1)
  })
})
