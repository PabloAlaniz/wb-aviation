/**
 * Guides registry: the localized slug of every guide, per translation key.
 * The Markdown files (src/content/guides/{lang}/{slug}.md) hold the content
 * and must declare the same `translationKey` / `slug` (checked in
 * guides.test.js). Plain data, so astro.config.mjs (sitemap alternates) can
 * use it without the content layer.
 */
import { ROUTE_LOCALES, guidePath, guidesIndexPath } from "../../utils/routes.js"

/** @typedef {import("../../utils/routes.js").RouteLocale} RouteLocale */

/**
 * @typedef {object} GuideEntry
 * @property {string} key - translationKey shared by the translations
 * @property {Record<RouteLocale, string>} slugs - localized slug per locale
 */

/** @type {GuideEntry[]} In display order. */
export const GUIDES = [
  {
    key: "how-to-calculate",
    slugs: {
      es: "como-calcular-peso-y-balance",
      en: "how-to-calculate-weight-and-balance",
      pt: "como-calcular-peso-e-balanceamento",
    },
  },
  {
    key: "weight-arm-moment",
    slugs: {
      es: "peso-brazo-y-momento",
      en: "weight-arm-and-moment",
      pt: "peso-braco-e-momento",
    },
  },
  {
    key: "cg-envelope",
    slugs: {
      es: "envolvente-de-cg",
      en: "cg-envelope-explained",
      pt: "envelope-de-cg",
    },
  },
]

/**
 * @param {string} key - translationKey
 * @returns {GuideEntry | undefined}
 */
export function findGuide(key) {
  return GUIDES.find((guide) => guide.key === key)
}

/**
 * Groups of equivalent paths across locales (guide index + every guide), used
 * for hreflang alternates where the localized paths differ (the sitemap's
 * automatic i18n matching only pairs identical paths).
 * @returns {Record<RouteLocale, string>[]}
 */
export function guideTranslationGroups() {
  /** @param {(locale: RouteLocale) => string} pathFor */
  const group = (pathFor) =>
    /** @type {Record<RouteLocale, string>} */ (
      Object.fromEntries(ROUTE_LOCALES.map((locale) => [locale, pathFor(locale)]))
    )
  return [
    group(guidesIndexPath),
    ...GUIDES.map((guide) => group((locale) => guidePath(locale, guide.slugs[locale]))),
  ]
}
