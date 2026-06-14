/**
 * Privacy-friendly analytics loader (Plausible-compatible: cookieless, no
 * personal data, GDPR-friendly).
 *
 * No-ops unless a site domain is configured via the VITE_PLAUSIBLE_DOMAIN
 * env var, so local development and forks never phone home. To enable in
 * production, set VITE_PLAUSIBLE_DOMAIN at build time (see .env.example).
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
