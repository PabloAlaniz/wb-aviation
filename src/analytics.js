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

/**
 * Send a custom event to Plausible. No-ops when the script is not loaded
 * (analytics disabled, blocked or still loading), so callers never need to
 * guard it.
 * @param {string} name - Event name (e.g. "share_link")
 * @param {Record<string, string | number | boolean>} [props] - Custom properties
 */
export function trackEvent(name, props) {
  if (typeof window === "undefined") return
  const plausible = /** @type {any} */ (window).plausible
  if (typeof plausible !== "function") return
  try {
    plausible(name, props ? { props } : undefined)
  } catch {
    // analytics must never break the app
  }
}
