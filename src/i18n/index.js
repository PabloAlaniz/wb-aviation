import { es } from "./es"
import { en } from "./en"
import { pt } from "./pt"

/**
 * Available locales. To add one: create the messages file (e.g. fr.js),
 * import it here and add it to `locales` and `localeNames`.
 */
export const locales = { es, en, pt }

/** Human-readable names for the language selector. */
export const localeNames = { es: "Español", en: "English", pt: "Português" }

/** @typedef {keyof typeof locales} Locale */

export const DEFAULT_LOCALE = /** @type {Locale} */ ("es")
const STORAGE_KEY = "wb-locale"

/**
 * Resolve the active locale from an explicit stored preference and the
 * browser language. Pure (no globals) so it can be unit-tested.
 * @param {string | null | undefined} stored - Persisted preference
 * @param {string | null | undefined} navigatorLang - e.g. navigator.language
 * @returns {Locale}
 */
export function resolveLocale(stored, navigatorLang) {
  if (stored && stored in locales) return /** @type {Locale} */ (stored)

  const prefix = (navigatorLang || "").slice(0, 2).toLowerCase()
  if (prefix && prefix in locales) return /** @type {Locale} */ (prefix)

  return DEFAULT_LOCALE
}

/** Read the persisted preference, tolerating unavailable storage. */
function storedLocale() {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/** @returns {Locale} The locale active in this session. */
export function getLocale() {
  const navigatorLang = typeof navigator !== "undefined" ? navigator.language : null
  return resolveLocale(storedLocale(), navigatorLang)
}

/**
 * Persist a language preference and load the page again so every string
 * (including the safety report built in pure functions) is regenerated in
 * the new locale.
 * @param {string} locale
 * @param {string} [href] - Localized page to navigate to (e.g. "/en/");
 *   reloads the current page when omitted
 */
export function setLocale(locale, href) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // ignore: localized pages pin their own locale; otherwise it re-resolves
  }
  if (href) window.location.assign(href)
  else window.location.reload()
}

const activeLocale = getLocale()

if (typeof document !== "undefined") {
  document.documentElement.lang = activeLocale
}

/** Options for a language selector ({ value, label }). */
export const localeOptions = Object.keys(locales).map((value) => ({
  value,
  label: localeNames[/** @type {Locale} */ (value)],
}))

/** Active UI messages, resolved once at load time. */
export const messages = locales[activeLocale]
