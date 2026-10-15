import { captureAttribution, getStoredRef } from "./utils/attribution.js"

/**
 * Privacy-friendly analytics loader (Plausible-compatible: cookieless, no
 * personal data, GDPR-friendly).
 *
 * No-ops unless a site domain is configured via PUBLIC_PLAUSIBLE_DOMAIN (or the legacy VITE_PLAUSIBLE_DOMAIN)
 * env var, so local development and forks never phone home. To enable in
 * production, set PUBLIC_PLAUSIBLE_DOMAIN at build time (see .env.example).
 *
 * @param {string | undefined} [domain] - Plausible "data-domain" (the site)
 * @param {string} [src] - Script URL (override for self-hosted instances)
 * @returns {boolean} - Whether the analytics script was injected
 */
export function initAnalytics(domain, src = "https://plausible.io/js/script.js") {
  if (!domain || typeof document === "undefined") return false
  // Avoid loading twice (e.g. React StrictMode double-invokes effects).
  if (document.querySelector("script[data-domain]")) return false

  const script = document.createElement("script")
  script.defer = true
  script.setAttribute("data-domain", domain)
  script.src = src
  document.head.appendChild(script)
  return true
}

/** Only production sends first-party events (not localhost, previews or tests). */
export const FIRST_PARTY_HOST = "checkcg.com"
export const EVENTS_ENDPOINT = "/api/e"

/** Second path segments that are not aircraft pages (e.g. guides indexes). */
const NON_AIRCRAFT_SEGMENTS = ["guias", "guides", "guia", "guide"]

/**
 * Aircraft id from an aircraft page path (`/{lang}/{aircraft}/`), else "".
 * @param {string} pathname
 */
export function aircraftFromPath(pathname) {
  const match = /^\/[a-z]{2}\/([a-z0-9-]+)\/?$/.exec(pathname)
  return match && !NON_AIRCRAFT_SEGMENTS.includes(match[1]) ? match[1] : ""
}

/**
 * Send the event to our own endpoint (Cloudflare Analytics Engine), only on
 * the production host.
 * @param {string} name
 * @param {Record<string, string | number | boolean>} [props]
 * @param {Pick<Location, "hostname" | "pathname">} [location] - injectable for tests
 * @returns {boolean} whether the event was sent
 */
export function sendFirstPartyEvent(name, props, location = window.location) {
  if (location.hostname !== FIRST_PARTY_HOST) return false
  const { pathname } = location
  const body = JSON.stringify({
    n: name,
    p: props,
    path: pathname,
    lang: document.documentElement.lang || "",
    aircraft: aircraftFromPath(pathname),
    ref: getStoredRef(),
  })
  if (typeof navigator.sendBeacon === "function" && navigator.sendBeacon(EVENTS_ENDPOINT, body)) {
    return true
  }
  if (typeof fetch !== "function") return false
  fetch(EVENTS_ENDPOINT, { method: "POST", body, keepalive: true }).catch(() => {})
  return true
}

/**
 * Track a custom event: Plausible (when its script is loaded) and our
 * first-party endpoint (only on checkcg.com). Never throws, so callers never
 * need to guard it.
 * @param {string} name - Event name (e.g. "share_link"); first-party events
 *   must be in EVENT_NAMES (src/utils/eventIngest.js)
 * @param {Record<string, string | number | boolean>} [props] - Custom properties
 */
export function trackEvent(name, props) {
  if (typeof window === "undefined") return
  const plausible = /** @type {any} */ (window).plausible
  if (typeof plausible === "function") {
    try {
      plausible(name, props ? { props } : undefined)
    } catch {
      // analytics must never break the app
    }
  }
  try {
    sendFirstPartyEvent(name, props)
  } catch {
    // analytics must never break the app
  }
}

let started = false

/**
 * App start: capture `?ref=` / `?utm_source=` for this visit, drop them from
 * the address bar and track PWA installs. Runs once per page load.
 */
export function startAttribution() {
  if (started || typeof window === "undefined") return
  started = true
  try {
    const { cleanUrl } = captureAttribution(window.location.href)
    if (cleanUrl) window.history.replaceState(window.history.state, "", cleanUrl)
  } catch {
    // best effort
  }
  window.addEventListener("appinstalled", () => trackEvent("install_pwa"))
}

/** Test helper: allow startAttribution() to run again. */
export function resetAttributionForTests() {
  started = false
}
