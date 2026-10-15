import { describe, it, expect } from "vitest"
import {
  GENERIC_ENVELOPE_AIRCRAFT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  buildOgTree,
  envelopePath,
  fitFontSize,
  formatTcds,
  normalizeEnvelope,
  ogContent,
  ogImagePath,
} from "./ogImage"
import { aircraftData } from "../data/aircraft"
import { locales } from "../i18n"
import { ROUTE_LOCALES } from "./routes"

const square = [
  { arm: 30, weight: 1000 },
  { arm: 30, weight: 2000 },
  { arm: 40, weight: 2000 },
  { arm: 40, weight: 1000 },
  { arm: 30, weight: 1000 },
]

/** Collect every text leaf of a satori tree. */
function texts(node) {
  if (node == null || typeof node === "boolean") return []
  if (typeof node === "string" || typeof node === "number") return [String(node)]
  if (Array.isArray(node)) return node.flatMap(texts)
  return texts(node.props?.children)
}

/** Find the first node of a given type. */
function find(node, type) {
  if (!node || typeof node !== "object") return null
  if (Array.isArray(node)) {
    for (const child of node) {
      const hit = find(child, type)
      if (hit) return hit
    }
    return null
  }
  if (node.type === type) return node
  return find(node.props?.children, type)
}

describe("ogImagePath", () => {
  it("points to the per-aircraft image", () => {
    expect(ogImagePath("es", "cessna-152")).toBe("/og/es/cessna-152.png")
  })

  it("falls back to the generic image of the locale", () => {
    expect(ogImagePath("pt")).toBe("/og/pt/index.png")
  })
})

describe("normalizeEnvelope", () => {
  it("drops the repeated closing point and fills the box, weight upwards", () => {
    const points = normalizeEnvelope(square, { width: 100, height: 50 })
    expect(points).toEqual([
      { x: 0, y: 50 },
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 50 },
    ])
  })

  it("applies the padding on every side", () => {
    const points = normalizeEnvelope(square, { width: 120, height: 70, padding: 10 })
    const xs = points.map((p) => p.x)
    const ys = points.map((p) => p.y)
    expect(Math.min(...xs)).toBe(10)
    expect(Math.max(...xs)).toBe(110)
    expect(Math.min(...ys)).toBe(10)
    expect(Math.max(...ys)).toBe(60)
  })

  it("centers degenerate spans instead of dividing by zero", () => {
    const line = [
      { arm: 35, weight: 1000 },
      { arm: 35, weight: 2000 },
    ]
    const points = normalizeEnvelope(line, { width: 100, height: 100 })
    expect(points.every((p) => p.x === 50)).toBe(true)
    expect(points.every((p) => Number.isFinite(p.y))).toBe(true)
  })

  it("returns no points for an empty envelope", () => {
    expect(normalizeEnvelope([], { width: 10, height: 10 })).toEqual([])
  })

  it("keeps every built-in envelope inside the box", () => {
    const box = { width: 340, height: 300, padding: 18 }
    for (const aircraft of Object.values(aircraftData)) {
      for (const { x, y } of normalizeEnvelope(aircraft.cgEnvelope.points, box)) {
        expect(x).toBeGreaterThanOrEqual(18)
        expect(x).toBeLessThanOrEqual(322)
        expect(y).toBeGreaterThanOrEqual(18)
        expect(y).toBeLessThanOrEqual(282)
      }
    }
  })
})

describe("envelopePath", () => {
  it("builds a closed SVG path", () => {
    expect(envelopePath(square, { width: 100, height: 50 })).toBe("M0 50 L0 0 L100 0 L100 50 Z")
  })

  it("is empty without points", () => {
    expect(envelopePath([], { width: 10, height: 10 })).toBe("")
  })
})

describe("fitFontSize", () => {
  const opts = { max: 60, min: 38, fitChars: 20 }

  it("keeps the maximum size for short text", () => {
    expect(fitFontSize("Cessna 152", opts)).toBe(60)
  })

  it("shrinks long text, never below the minimum", () => {
    const size = fitFontSize("Diamond DA20-C1 Eclipse (750 kg)", opts)
    expect(size).toBeLessThan(60)
    expect(size).toBeGreaterThanOrEqual(38)
    expect(fitFontSize("x".repeat(500), opts)).toBe(38)
  })
})

describe("formatTcds", () => {
  it("drops the hash after TCDS", () => {
    expect(formatTcds("TCDS# 3A19 Revision 50 (FAA)")).toBe("TCDS 3A19 Revision 50 (FAA)")
  })

  it("leaves other formats untouched", () => {
    expect(formatTcds("EASA.A.583")).toBe("EASA.A.583")
  })
})

describe("ogContent", () => {
  it("describes an aircraft image with name, TCDS and its own envelope", () => {
    const content = ogContent(locales.es.seo, aircraftData, "cessna-152")
    expect(content.title).toBe("Peso y balance")
    expect(content.aircraftName).toBe(aircraftData["cessna-152"].name)
    expect(content.tcds).toBe(aircraftData["cessna-152"].tcds)
    expect(content.envelope).toBe(aircraftData["cessna-152"].cgEnvelope.points)
    expect(content.footer).toBe("CheckCG · checkcg.com")
  })

  it("describes the generic image with the tagline and a sample envelope", () => {
    const content = ogContent(locales.pt.seo, aircraftData)
    expect(content.title).toBe("Peso e balanceamento")
    expect(content.aircraftName).toBeUndefined()
    expect(content.tagline).toBe(locales.pt.seo.og.tagline)
    expect(content.envelope).toBe(aircraftData[GENERIC_ENVELOPE_AIRCRAFT].cgEnvelope.points)
  })

  it("rejects an unknown aircraft", () => {
    expect(() => ogContent(locales.en.seo, aircraftData, "nope")).toThrow(/nope/)
  })

  it("has localized titles for every route locale", () => {
    const titles = ROUTE_LOCALES.map((lang) => ogContent(locales[lang].seo, aircraftData).title)
    expect(titles).toEqual(["Peso y balance", "Weight and balance", "Peso e balanceamento"])
  })
})

describe("buildOgTree", () => {
  it("renders a 1200x630 root with title, name, TCDS, envelope and footer", () => {
    const tree = buildOgTree(ogContent(locales.en.seo, aircraftData, "cessna-172s"))
    expect(tree.props.style).toMatchObject({ width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT })
    const all = texts(tree)
    expect(all).toContain("Weight and balance")
    expect(all).toContain("Cessna 172S Skyhawk")
    expect(all).toContain("TCDS 3A12 (FAA)")
    expect(all).toContain("CheckCG · checkcg.com")
    expect(all).toContain("CG envelope")
    const path = find(tree, "path")
    expect(path?.props.d).toMatch(/^M[\d.]+ [\d.]+ (L[\d.]+ [\d.]+ )+Z$/)
  })

  it("renders the tagline on the generic image", () => {
    const tree = buildOgTree(ogContent(locales.es.seo, aircraftData))
    expect(texts(tree)).toContain(locales.es.seo.og.tagline)
  })
})
