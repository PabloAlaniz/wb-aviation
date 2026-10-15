import { describe, it, expect } from "vitest"
import { readFileSync, readdirSync } from "node:fs"
import { dirname } from "node:path"
import { aircraftData } from "../../data/aircraft"
import { calculateFlightPhases, calculateWeightBalance } from "../../utils/calculations"
import { ROUTE_LOCALES } from "../../utils/routes"
import { GUIDES, findGuide, guideTranslationGroups } from "./registry"
import { WORKED_EXAMPLE, WORKED_EXAMPLE_EXPECTED as X, formatGuideNumber } from "./examples"

const dir = `${dirname(import.meta.filename ?? new URL(import.meta.url).pathname)}/`

/** @param {string} locale @param {string} slug */
const readGuide = (locale, slug) => readFileSync(`${dir}${locale}/${slug}.md`, "utf8")

/** Top-level `key: value` lines of the YAML frontmatter. */
function frontmatter(source) {
  const block = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ""
  return Object.fromEntries(
    block
      .split("\n")
      .map((line) => line.match(/^([a-zA-Z]+): (.+)$/))
      .filter(Boolean)
      .map((m) => [m[1], m[2].replace(/^"|"$/g, "")])
  )
}

/** Body text without frontmatter. */
const body = (source) => source.replace(/^---\n[\s\S]*?\n---\n/, "")

describe("guides registry", () => {
  it("has exactly one Markdown file per guide and locale, with matching frontmatter", () => {
    for (const locale of ROUTE_LOCALES) {
      const files = readdirSync(`${dir}${locale}`).filter((f) => f.endsWith(".md"))
      expect(files.sort()).toEqual(GUIDES.map((g) => `${g.slugs[locale]}.md`).sort())
      for (const guide of GUIDES) {
        const fm = frontmatter(readGuide(locale, guide.slugs[locale]))
        expect(fm.lang).toBe(locale)
        expect(fm.slug).toBe(guide.slugs[locale])
        expect(fm.translationKey).toBe(guide.key)
      }
    }
  })

  it("finds guides by translation key", () => {
    expect(findGuide("cg-envelope")?.slugs.en).toBe("cg-envelope-explained")
    expect(findGuide("nope")).toBeUndefined()
  })

  it("groups the localized paths of the index and every guide", () => {
    const groups = guideTranslationGroups()
    expect(groups).toHaveLength(GUIDES.length + 1)
    expect(groups[0]).toEqual({ es: "/es/guias/", en: "/en/guides/", pt: "/pt/guias/" })
    expect(groups[2].en).toBe("/en/guides/weight-arm-and-moment/")
  })
})

describe("guides content", () => {
  for (const locale of ROUTE_LOCALES) {
    for (const guide of GUIDES) {
      const source = readGuide(locale, guide.slugs[locale])
      const text = body(source)

      it(`${locale}/${guide.slugs[locale]} ends with the POH/AFM disclaimer`, () => {
        const last = text.trim().split("\n").pop() ?? ""
        expect(last).toMatch(/^> \*\*Important[e]?:\*\*/)
        expect(last).toContain("POH/AFM")
      })

      it(`${locale}/${guide.slugs[locale]} is 700-1100 words`, () => {
        const words = text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length
        expect(words).toBeGreaterThanOrEqual(700)
        expect(words).toBeLessThanOrEqual(1100)
      })

      it(`${locale}/${guide.slugs[locale]} only links to existing internal pages`, () => {
        const links = [...text.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1])
        const known = new Set([
          `/${locale}/`,
          ...Object.keys(aircraftData).map((id) => `/${locale}/${id}/`),
          ...guideTranslationGroups().map((group) => group[locale]),
        ])
        for (const link of links) expect(known, link).toContain(link)
      })
    }
  }
})

describe("worked example (Cessna 152)", () => {
  const aircraft = aircraftData[WORKED_EXAMPLE.aircraftId]
  const result = calculateWeightBalance(aircraft, WORKED_EXAMPLE.weights)
  const phases = calculateFlightPhases(aircraft, WORKED_EXAMPLE.weights, WORKED_EXAMPLE.fuelBurn)

  it("matches the calculator", () => {
    expect(result).not.toBeNull()
    if (!result || !phases) return
    expect(aircraft.emptyWeight * aircraft.emptyArm).toBeCloseTo(X.emptyMoment, 6)
    expect(result.totalWeight).toBe(X.takeoffWeight)
    expect(result.totalMoment).toBeCloseTo(X.takeoffMoment, 6)
    expect(result.totalMoment / 1000).toBeCloseTo(X.takeoffMomentPer1000, 2)
    expect(result.centerOfGravity).toBeCloseTo(X.takeoffCg, 2)
    expect(result.isWeightOk).toBe(true)
    expect(result.isCgOk).toBe(true)

    expect(phases.landing.totalWeight).toBe(X.landingWeight)
    expect(phases.landing.totalMoment).toBeCloseTo(X.landingMoment, 6)
    expect(phases.landing.centerOfGravity).toBeCloseTo(X.landingCg, 2)
    expect(phases.zeroFuel.totalWeight).toBe(X.zeroFuelWeight)
    expect(phases.zeroFuel.centerOfGravity).toBeCloseTo(X.zeroFuelCg, 2)
  })

  it("uses the forward limit interpolated from the envelope at the takeoff weight", () => {
    const [, low, high] = aircraft.cgEnvelope.points // (31.0, 1350) -> (32.65, 1670)
    const limit =
      low.arm + ((X.takeoffWeight - low.weight) * (high.arm - low.arm)) / (high.weight - low.weight)
    expect(limit).toBeCloseTo(X.forwardLimitAtTakeoff, 2)
    expect(X.takeoffCg).toBeGreaterThan(limit)
    expect(X.takeoffCg).toBeLessThan(aircraft.cgLimits.aft)
  })

  const guide = /** @type {import("./registry").GuideEntry} */ (findGuide("weight-arm-moment"))
  for (const locale of ROUTE_LOCALES) {
    it(`prints the same numbers in ${locale}/${guide.slugs[locale]}`, () => {
      const text = readGuide(locale, guide.slugs[locale])
      const f = (/** @type {number} */ v, /** @type {number} */ d = 0) =>
        formatGuideNumber(v, locale, d)
      const expected = [
        f(X.emptyMoment, 2),
        f(X.takeoffWeight),
        f(X.takeoffMoment, 2),
        f(X.takeoffMomentPer1000, 2),
        f(X.takeoffCg, 2),
        f(X.forwardLimitAtTakeoff, 2),
        f(X.landingWeight),
        f(X.landingMoment, 2),
        f(X.landingCg, 2),
        f(X.zeroFuelWeight),
        f(X.zeroFuelCg, 2),
      ]
      for (const value of expected) expect(text, value).toContain(value)
    })
  }
})
