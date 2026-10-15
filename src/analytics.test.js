import { describe, it, expect, afterEach, beforeEach, vi } from "vitest"
import {
  aircraftFromPath,
  initAnalytics,
  resetAttributionForTests,
  sendFirstPartyEvent,
  startAttribution,
  trackEvent,
} from "./analytics"

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

describe("sendFirstPartyEvent", () => {
  const checkcg = { hostname: "checkcg.com", pathname: "/en/cessna-152/" }
  /** @type {any} */
  let beacon

  beforeEach(() => {
    beacon = vi.fn(() => true)
    navigator.sendBeacon = beacon
    window.sessionStorage.clear()
    document.documentElement.lang = "en"
  })

  afterEach(() => {
    delete navigator.sendBeacon
    vi.unstubAllGlobals()
  })

  it("beacons the event to /api/e on checkcg.com", () => {
    window.sessionStorage.setItem("checkcg-ref", "flyer-ar")

    expect(sendFirstPartyEvent("pdf_export", { units: "metric" }, checkcg)).toBe(true)

    expect(beacon).toHaveBeenCalledTimes(1)
    const [url, body] = beacon.mock.calls[0]
    expect(url).toBe("/api/e")
    expect(JSON.parse(body)).toEqual({
      n: "pdf_export",
      p: { units: "metric" },
      path: "/en/cessna-152/",
      lang: "en",
      aircraft: "cessna-152",
      ref: "flyer-ar",
    })
  })

  it.each(["localhost", "abc123.wb-aviation.pages.dev", "wb-aviation.pages.dev"])(
    "does nothing on %s",
    (hostname) => {
      expect(sendFirstPartyEvent("pdf_export", {}, { hostname, pathname: "/" })).toBe(false)
      expect(beacon).not.toHaveBeenCalled()
    }
  )

  it("falls back to fetch with keepalive when the beacon is refused", () => {
    beacon.mockReturnValue(false)
    const fetchMock = vi.fn(() => Promise.resolve(new Response(null, { status: 204 })))
    vi.stubGlobal("fetch", fetchMock)

    expect(sendFirstPartyEvent("share_link", undefined, checkcg)).toBe(true)

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/e",
      expect.objectContaining({ method: "POST", keepalive: true })
    )
  })

  it("trackEvent sends nothing first-party off the production host (tests run on localhost)", () => {
    trackEvent("share_link")
    expect(beacon).not.toHaveBeenCalled()
  })
})

describe("aircraftFromPath", () => {
  it.each([
    ["/es/cessna-152/", "cessna-152"],
    ["/en/piper-pa-28", "piper-pa-28"],
    ["/es/", ""],
    ["/", ""],
    ["/es/guias/", ""],
    ["/es/guias/como-calcular/", ""],
  ])("%s → %j", (path, expected) => {
    expect(aircraftFromPath(path)).toBe(expected)
  })
})

describe("startAttribution", () => {
  afterEach(() => {
    resetAttributionForTests()
    window.history.replaceState(null, "", "/")
    window.sessionStorage.clear()
    delete window.plausible
  })

  it("stores ?ref=, cleans the URL and tracks PWA installs", () => {
    window.history.replaceState(null, "", "/es/?s=abc&ref=Flyer#x")
    window.plausible = vi.fn()

    startAttribution()

    expect(window.location.pathname + window.location.search + window.location.hash).toBe(
      "/es/?s=abc#x"
    )
    expect(window.sessionStorage.getItem("checkcg-ref")).toBe("flyer")

    window.dispatchEvent(new Event("appinstalled"))
    expect(window.plausible).toHaveBeenCalledWith("install_pwa", undefined)
  })
})
