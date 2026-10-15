import { describe, it, expect, beforeEach } from "vitest"
import { REF_STORAGE_KEY, captureAttribution, getStoredRef, readAttribution } from "./attribution"

describe("readAttribution", () => {
  it("reads ?ref= and removes it, keeping other params and the hash", () => {
    expect(readAttribution("https://checkcg.com/es/?s=abc&ref=Flyer-AR&fleet=xyz#top")).toEqual({
      ref: "flyer-ar",
      cleanUrl: "https://checkcg.com/es/?s=abc&fleet=xyz#top",
    })
  })

  it("falls back to utm_source and drops utm_* params", () => {
    expect(
      readAttribution("https://checkcg.com/?utm_source=newsletter&utm_medium=email&utm_campaign=x")
    ).toEqual({ ref: "newsletter", cleanUrl: "https://checkcg.com/" })
  })

  it("prefers ref over utm_source", () => {
    expect(readAttribution("https://checkcg.com/?utm_source=a&ref=b").ref).toBe("b")
  })

  it("strips invalid refs from the URL without keeping them", () => {
    expect(readAttribution("https://checkcg.com/en/?ref=%3Cscript%3E")).toEqual({
      ref: "",
      cleanUrl: "https://checkcg.com/en/",
    })
  })

  it("leaves URLs without attribution untouched", () => {
    expect(readAttribution("https://checkcg.com/es/cessna-152/?s=abc")).toEqual({
      ref: "",
      cleanUrl: null,
    })
  })
})

describe("captureAttribution", () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  it("stores the ref for the session", () => {
    const result = captureAttribution("https://checkcg.com/?ref=School1")

    expect(result.ref).toBe("school1")
    expect(window.sessionStorage.getItem(REF_STORAGE_KEY)).toBe("school1")
    expect(getStoredRef()).toBe("school1")
  })

  it("keeps the stored ref on later page loads without params", () => {
    captureAttribution("https://checkcg.com/?ref=school1")

    expect(captureAttribution("https://checkcg.com/en/")).toEqual({
      ref: "school1",
      cleanUrl: null,
    })
  })

  it("survives unavailable storage", () => {
    const broken = /** @type {Storage} */ (
      /** @type {unknown} */ ({
        getItem: () => {
          throw new Error("denied")
        },
        setItem: () => {
          throw new Error("denied")
        },
      })
    )

    expect(captureAttribution("https://checkcg.com/?ref=x", broken)).toEqual({
      ref: "x",
      cleanUrl: "https://checkcg.com/",
    })
    expect(getStoredRef(broken)).toBe("")
  })
})
