/**
 * URL helpers for the localized static pages (Astro routes):
 *   /                      root calculator (x-default; redirects to the
 *                          preferred language unless it carries ?s / ?fleet)
 *   /{locale}/             localized landing + calculator
 *   /{locale}/{aircraft}/  localized page for one built-in aircraft
 *
 * Pure functions (no globals) so they can be used from Astro pages at build
 * time, from the React island and from unit tests.
 */

/** Production origin (no trailing slash). Keep in sync with astro.config.mjs `site`. */
export const SITE_URL = "https://checkcg.com"

/** Route locales, default first. Must match the i18n catalogs in src/i18n. */
export const ROUTE_LOCALES = /** @type {const} */ (["es", "en", "pt"])

/** @typedef {(typeof ROUTE_LOCALES)[number]} RouteLocale */

export const DEFAULT_ROUTE_LOCALE = /** @type {RouteLocale} */ ("es")

/**
 * @param {unknown} value
 * @returns {value is RouteLocale}
 */
export function isRouteLocale(value) {
  return (
    typeof value === "string" && /** @type {readonly string[]} */ (ROUTE_LOCALES).includes(value)
  )
}

/**
 * @param {RouteLocale} locale
 * @returns {string} e.g. "/en/"
 */
export function localePath(locale) {
  return `/${locale}/`
}

/**
 * @param {RouteLocale} locale
 * @param {string} aircraftId - key of aircraftData
 * @returns {string} e.g. "/en/cessna-172s/"
 */
export function aircraftPath(locale, aircraftId) {
  return `/${locale}/${encodeURIComponent(aircraftId)}/`
}

/**
 * Locale encoded in the first path segment, if any.
 * @param {string} pathname - e.g. window.location.pathname
 * @returns {RouteLocale | null}
 */
export function localeFromPath(pathname) {
  const first = pathname.split("/").filter(Boolean)[0]
  return isRouteLocale(first) ? first : null
}

/**
 * Absolute URL for a site path.
 * @param {string} path - must start with "/"
 * @param {string} [site]
 */
export function absoluteUrl(path, site = SITE_URL) {
  return `${site.replace(/\/$/, "")}${path}`
}

/**
 * hreflang alternates for a page that exists in every locale.
 * @param {(locale: RouteLocale) => string} pathFor - path of the page in a locale
 * @param {string} xDefaultPath - path used for hreflang="x-default"
 * @param {string} [site]
 * @returns {{ hreflang: string, href: string }[]}
 */
export function alternateLinks(pathFor, xDefaultPath, site = SITE_URL) {
  return [
    ...ROUTE_LOCALES.map((locale) => ({
      hreflang: locale,
      href: absoluteUrl(pathFor(locale), site),
    })),
    { hreflang: "x-default", href: absoluteUrl(xDefaultPath, site) },
  ]
}

/**
 * Where the language selector navigates to: the same kind of page in the
 * new language. On an aircraft page the currently selected aircraft wins
 * (when it has a page), so switching language never resets the calculation
 * to the aircraft the page was opened with.
 * @param {RouteLocale} locale - target locale
 * @param {string | null | undefined} aircraftId - built-in aircraft to keep, if any
 * @returns {string}
 */
export function localeSwitchPath(locale, aircraftId) {
  return aircraftId ? aircraftPath(locale, aircraftId) : localePath(locale)
}

/**
 * Where the root page (/) should send the visitor, or null to stay. Links
 * carrying a shared calculation (?s=) or fleet (?fleet=) must render in
 * place: they were published as /?s=... and the app consumes the params on
 * load. Otherwise go to the stored language, else the browser language,
 * else the default (first) locale, keeping any other query params.
 *
 * Self-contained on purpose (no references to module scope): it is
 * serialized with Function#toString into an inline <script> in the root
 * page's <head>, so the redirect happens before anything renders.
 * @param {string} search - location.search
 * @param {string | null} stored - persisted "wb-locale" preference
 * @param {string | null | undefined} navigatorLang - navigator.language
 * @param {readonly string[]} locales - supported locales, default first
 * @returns {string | null}
 */
export function rootRedirectTarget(search, stored, navigatorLang, locales) {
  const params = new URLSearchParams(search)
  if (params.has("s") || params.has("fleet")) return null
  const browser = (navigatorLang || "").slice(0, 2).toLowerCase()
  const locale =
    stored && locales.includes(stored) ? stored : locales.includes(browser) ? browser : locales[0]
  return `/${locale}/${search}`
}

/**
 * Localized folder of the guides section, e.g. /es/guias/, /en/guides/.
 * @type {Record<RouteLocale, string>}
 */
export const GUIDES_DIR = { es: "guias", en: "guides", pt: "guias" }

/**
 * @param {RouteLocale} locale
 * @returns {string} e.g. "/en/guides/"
 */
export function guidesIndexPath(locale) {
  return `/${locale}/${GUIDES_DIR[locale]}/`
}

/**
 * @param {RouteLocale} locale
 * @param {string} slug - localized guide slug
 * @returns {string} e.g. "/en/guides/weight-arm-and-moment/"
 */
export function guidePath(locale, slug) {
  return `${guidesIndexPath(locale)}${encodeURIComponent(slug)}/`
}
