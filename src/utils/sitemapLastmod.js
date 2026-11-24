/**
 * Last modification date of every indexable page, for the sitemap's
 * <lastmod>. Pure: astro.config.mjs feeds it the aircraft data and the
 * guides' frontmatter dates.
 *   - aircraft page: when its reference data was last verified
 *   - guide: its `updated` date
 *   - other pages (glossary, methodology): the date given in `pages`
 *   - home and guides index of a language: the newest of what they list
 */
import { ROUTE_LOCALES, aircraftPath, guidePath, guidesIndexPath, localePath } from "./routes.js"

/** @param {(string | undefined | null)[]} dates - ISO dates (YYYY-MM-DD) */
function newest(dates) {
  const known = /** @type {string[]} */ (dates.filter(Boolean))
  return known.length > 0 ? known.sort().at(-1) : undefined
}

/**
 * @param {{
 *   aircraft: Record<string, { dataValidation: { lastUpdated?: string } }>,
 *   guides: { lang: string, slug: string, updated: string }[],
 *   pages?: { path: string, updated: string }[],
 *   locales?: readonly import("./routes.js").RouteLocale[],
 * }} input
 * @returns {Map<string, string>} site path -> ISO date
 */
export function sitemapLastmod({ aircraft, guides, pages = [], locales = ROUTE_LOCALES }) {
  /** @type {Map<string, string>} */
  const dates = new Map()
  /** @param {string} path @param {string | undefined} date */
  const set = (path, date) => {
    if (date) dates.set(path, date)
  }
  const newestAircraft = newest(Object.values(aircraft).map((a) => a.dataValidation.lastUpdated))

  for (const locale of locales) {
    for (const [id, data] of Object.entries(aircraft)) {
      set(aircraftPath(locale, id), data.dataValidation.lastUpdated)
    }
    const own = guides.filter((guide) => guide.lang === locale)
    for (const guide of own) set(guidePath(locale, guide.slug), guide.updated)
    const newestGuide = newest(own.map((guide) => guide.updated))
    set(guidesIndexPath(locale), newestGuide)
    set(localePath(locale), newest([newestAircraft, newestGuide]))
  }
  for (const page of pages) set(page.path, page.updated)
  return dates
}

/**
 * `lang`, `slug` and `updated` of a guide, read from its Markdown frontmatter
 * (astro.config.mjs cannot use the content layer).
 * @param {string} markdown
 * @returns {{ lang: string, slug: string, updated: string } | null}
 */
export function guideFrontmatterDates(markdown) {
  const frontmatter = /^---\n([\s\S]*?)\n---/.exec(markdown)?.[1]
  if (!frontmatter) return null
  /** @param {string} key */
  const field = (key) => new RegExp(`^${key}:\\s*"?([^"\\n]+?)"?\\s*$`, "m").exec(frontmatter)?.[1]
  const lang = field("lang")
  const slug = field("slug")
  const updated = field("updated")
  return lang && slug && updated ? { lang, slug, updated } : null
}
