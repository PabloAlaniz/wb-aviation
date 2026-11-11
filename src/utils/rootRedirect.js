/**
 * Server-side, locale-adaptive redirect for the root page (/).
 *
 * `/` is the hreflang x-default of the localized homes. Serving its static
 * HTML (a full Spanish calculator) and redirecting only with client-side JS
 * makes it look like a duplicate of the localized homes to crawlers. Instead,
 * the Pages middleware answers plain visits with a 302 to the preferred
 * language (the pattern Google recommends for locale-adaptive x-default
 * pages). Shared links (`/?s=`, `/?fleet=`) still render in place.
 *
 * Pure functions, used by functions/_middleware.js and unit tests.
 */
import { ROUTE_LOCALES, rootRedirectTarget } from "./routes.js"

/** Cookie mirroring the "wb-locale" localStorage preference. */
export const LOCALE_COOKIE = "wb-locale"

/**
 * Value of a cookie in a Cookie request header.
 * @param {string | null | undefined} header
 * @param {string} name
 * @returns {string | null}
 */
export function readCookie(header, name) {
  if (!header) return null
  for (const part of header.split(";")) {
    const index = part.indexOf("=")
    if (index === -1) continue
    if (part.slice(0, index).trim() === name) return part.slice(index + 1).trim()
  }
  return null
}

/**
 * First supported language of an Accept-Language header, by quality.
 * @param {string | null | undefined} header - e.g. "pt-BR,pt;q=0.9,en;q=0.8"
 * @param {readonly string[]} [locales]
 * @returns {string | null}
 */
export function preferredLanguage(header, locales = ROUTE_LOCALES) {
  if (!header) return null
  const ranked = header
    .split(",")
    .map((entry, order) => {
      const [tag, ...params] = entry.trim().split(";")
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="))
      const quality = q ? Number.parseFloat(q.slice(2)) : 1
      return { lang: tag.trim().slice(0, 2).toLowerCase(), quality, order }
    })
    .filter(({ lang, quality }) => quality > 0 && locales.includes(lang))
    .sort((a, b) => b.quality - a.quality || a.order - b.order)
  return ranked[0]?.lang ?? null
}

/**
 * Where a request to the root should be redirected, or null to serve it.
 * @param {string} href - full request URL
 * @param {{ cookie?: string | null, acceptLanguage?: string | null }} headers
 * @returns {string | null} path + query of the localized home
 */
export function resolveRootRedirect(href, { cookie, acceptLanguage } = {}) {
  const url = new URL(href)
  if (url.pathname !== "/") return null
  return rootRedirectTarget(
    url.search,
    readCookie(cookie, LOCALE_COOKIE),
    preferredLanguage(acceptLanguage),
    ROUTE_LOCALES
  )
}
