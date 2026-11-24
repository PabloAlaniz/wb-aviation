/**
 * Content of the glossary and methodology pages, per language. Kept out of
 * the i18n catalogs (src/i18n) on purpose: those are bundled with the
 * calculator, while this text is only rendered at build time.
 */
import { es } from "./es.js"
import { en } from "./en.js"
import { pt } from "./pt.js"
import { it } from "./it.js"
import { fr } from "./fr.js"
import { de } from "./de.js"

/** @type {Record<import("../../utils/routes.js").RouteLocale, typeof es>} */
export const pagesContent = { es, en, pt, it, fr, de }

/** Last content update of both pages (sitemap lastmod, dateModified). */
export const PAGES_UPDATED = "2026-11-24"

/**
 * Glossary terms in display order, with the guide (translationKey in
 * src/content/guides/registry.js) that explains each one in depth.
 * @type {{ id: keyof typeof es.glossary.terms, guide?: string }[]}
 */
export const GLOSSARY_TERMS = [
  { id: "datum", guide: "weight-arm-moment" },
  { id: "arm", guide: "weight-arm-moment" },
  { id: "moment", guide: "weight-arm-moment" },
  { id: "cg", guide: "how-to-calculate" },
  { id: "envelope", guide: "cg-envelope" },
  { id: "station" },
  { id: "empty-weight", guide: "how-to-calculate" },
  { id: "useful-load" },
  { id: "mtow" },
  { id: "ramp-weight" },
  { id: "mlw" },
  { id: "mzfw" },
  { id: "usable-fuel", guide: "fuel-conversions" },
  { id: "mac" },
  { id: "tcds" },
  { id: "poh" },
]

/** Sections of the methodology page, in display order. */
export const ABOUT_SECTIONS = /** @type {const} */ ([
  "data",
  "reliability",
  "method",
  "limits",
  "privacy",
  "contact",
])
