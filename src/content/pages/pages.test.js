import { describe, expect, it } from "vitest"
import { findGuide } from "../guides/registry"
import { ROUTE_LOCALES } from "../../utils/routes"
import { ABOUT_SECTIONS, GLOSSARY_TERMS, PAGES_UPDATED, pagesContent } from "./index"

/** Every leaf path of an object, e.g. "glossary.terms.arm.text". */
function leafPaths(/** @type {unknown} */ value, prefix = "") {
  if (typeof value !== "object" || value === null) return [prefix]
  return Object.entries(value).flatMap(([key, child]) =>
    leafPaths(child, prefix ? `${prefix}.${key}` : key)
  )
}

describe("glossary and methodology content", () => {
  it("has the same shape in every language", () => {
    const reference = leafPaths(pagesContent.es)
    for (const locale of ROUTE_LOCALES) {
      expect(leafPaths(pagesContent[locale]), locale).toEqual(reference)
    }
  })

  it("defines every glossary term and methodology section", () => {
    for (const locale of ROUTE_LOCALES) {
      const { glossary, about } = pagesContent[locale]
      expect(Object.keys(glossary.terms)).toEqual(GLOSSARY_TERMS.map(({ id }) => id))
      for (const { id } of GLOSSARY_TERMS) {
        expect(glossary.terms[id].text.length, `${locale} ${id}`).toBeGreaterThan(80)
      }
      expect(Object.keys(about.sections)).toEqual([...ABOUT_SECTIONS])
    }
  })

  it("keeps titles and descriptions within search result limits", () => {
    for (const locale of ROUTE_LOCALES) {
      for (const page of [pagesContent[locale].glossary, pagesContent[locale].about]) {
        expect(page.title.length, `${locale} ${page.title}`).toBeLessThanOrEqual(75)
        expect(page.description.length, `${locale} ${page.title}`).toBeLessThanOrEqual(170)
        expect(page.description.length).toBeGreaterThanOrEqual(110)
      }
    }
  })

  it("links glossary terms to guides that exist", () => {
    for (const { guide } of GLOSSARY_TERMS) {
      if (guide) expect(findGuide(guide), guide).toBeDefined()
    }
    expect(PAGES_UPDATED).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
