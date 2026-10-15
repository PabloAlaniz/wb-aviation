import { describe, it, expect, afterEach, vi } from "vitest"
import { initAnalytics, trackEvent } from "./analytics"

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

describe("trackEvent", () => {
  afterEach(() => {
    delete window.plausible
  })

  it("no-ops when Plausible is not loaded", () => {
    expect(() => trackEvent("pdf_export")).not.toThrow()
  })

  it("forwards the event and its props to Plausible", () => {
    const plausible = vi.fn()
    window.plausible = plausible

    trackEvent("pdf_export", { units: "metric" })
    trackEvent("other")

    expect(plausible).toHaveBeenCalledWith("pdf_export", { props: { units: "metric" } })
    expect(plausible).toHaveBeenCalledWith("other", undefined)
  })
})
