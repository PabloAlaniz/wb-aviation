/**
 * HTTP security headers for every response of the Cloudflare Pages deployment
 * (pages, assets, redirects and the events endpoint).
 *
 * Pure functions, used by functions/_middleware.js and unit tests.
 */

/** Cloudflare Web Analytics: beacon script and its reporting endpoint. */
const CLOUDFLARE_INSIGHTS_SCRIPT = "https://static.cloudflareinsights.com"
const CLOUDFLARE_INSIGHTS_REPORT = "https://cloudflareinsights.com"
/** Optional Plausible analytics (src/analytics.js). */
const PLAUSIBLE = "https://plausible.io"

/**
 * Content Security Policy directives.
 *
 * Scripts and styles keep 'unsafe-inline': Astro inlines the island hydration
 * runtime and the root page's language redirect, and the charts render inline
 * style attributes. Everything else is locked to this origin, so the policy
 * still blocks foreign scripts, plugins, framing, `<base>` hijacking and form
 * posts to other sites.
 * @type {Record<string, string[]>}
 */
export const CSP_DIRECTIVES = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", CLOUDFLARE_INSIGHTS_SCRIPT, PLAUSIBLE],
  "style-src": ["'self'", "'unsafe-inline'"],
  // data:/blob: cover the share QR code and the printable load sheet.
  "img-src": ["'self'", "data:", "blob:"],
  "font-src": ["'self'", "data:"],
  "connect-src": ["'self'", CLOUDFLARE_INSIGHTS_REPORT, PLAUSIBLE],
  "worker-src": ["'self'"],
  "manifest-src": ["'self'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
  // No upgrade-insecure-requests: the site has no http:// resources (HSTS
  // covers the rest) and it breaks `wrangler pages dev` over plain http.
}

/** @param {Record<string, string[]>} [directives] */
export function buildCsp(directives = CSP_DIRECTIVES) {
  return Object.entries(directives)
    .map(([name, sources]) => [name, ...sources].join(" "))
    .join("; ")
}

/** Browser features the app never uses. */
const PERMISSIONS_POLICY = [
  "accelerometer",
  "browsing-topics",
  "camera",
  "geolocation",
  "gyroscope",
  "magnetometer",
  "microphone",
  "payment",
  "usb",
]
  .map((feature) => `${feature}=()`)
  .join(", ")

/** @type {Readonly<Record<string, string>>} */
export const SECURITY_HEADERS = Object.freeze({
  "Content-Security-Policy": buildCsp(),
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": PERMISSIONS_POLICY,
  "Cross-Origin-Opener-Policy": "same-origin",
})

/**
 * Set the security headers on a Headers object (in place).
 * @param {Headers} headers
 * @returns {Headers}
 */
export function applySecurityHeaders(headers) {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) headers.set(name, value)
  return headers
}
