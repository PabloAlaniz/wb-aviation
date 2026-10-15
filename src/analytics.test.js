import { describe, it, expect, afterEach, vi } from "vitest"
import { initAnalytics, trackEvent } from "./analytics"

describe("trackEvent", () => {
  afterEach(() => {
    delete window.plausible
  })

  it("no-ops when Plausible is not loaded", () => {
    expect(() => trackEvent("share_link")).not.toThrow()
  })

  it("forwards the event and props to Plausible", () => {
    window.plausible = vi.fn()

    trackEvent("share_link", { method: "clipboard" })
    trackEvent("other")

    expect(window.plausible).toHaveBeenCalledWith("share_link", { props: { method: "clipboard" } })
    expect(window.plausible).toHaveBeenCalledWith("other", undefined)
  })

  it("swallows errors thrown by the analytics script", () => {
    window.plausible = () => {
      throw new Error("boom")
    }

    expect(() => trackEvent("share_link")).not.toThrow()
  })
})

afterEach(() => {
  document.head.querySelectorAll("script[data-domain]").forEach((el) => el.remove())
})

describe("initAnalytics", () => {
  it("does nothing when no domain is configured", () => {
    expect(initAnalytics(undefined)).toBe(false)
    expect(document.head.querySelector("script[data-domain]")).toBeNull()
  })

  it("injects the analytics script when a domain is given", () => {
    expect(initAnalytics("checkcg.com")).toBe(true)

    const script = document.head.querySelector("script[data-domain]")
    expect(script).not.toBeNull()
    expect(script?.getAttribute("data-domain")).toBe("checkcg.com")
    expect(script?.getAttribute("src")).toBe("https://plausible.io/js/script.js")
  })

  it("supports a custom (self-hosted) script URL", () => {
    initAnalytics("checkcg.com", "https://stats.example.com/js/script.js")

    expect(document.head.querySelector("script[data-domain]")?.getAttribute("src")).toBe(
      "https://stats.example.com/js/script.js"
    )
  })

  it("does not inject twice", () => {
    initAnalytics("checkcg.com")
    expect(initAnalytics("checkcg.com")).toBe(false)
    expect(document.head.querySelectorAll("script[data-domain]")).toHaveLength(1)
  })
})
