/**
 * Campaign attribution for first-party events.
 *
 * Links in flyers, posts or emails carry `?ref=<source>` (or a standard
 * `utm_source`). On first load the source is kept in sessionStorage for the
 * rest of the visit and the attribution params are removed from the address
 * bar, so shared/bookmarked URLs don't re-attribute. Other params (`s`,
 * `fleet`, …) and the hash are preserved.
 */
import { sanitizeRef } from "./eventIngest.js"

export const REF_STORAGE_KEY = "checkcg-ref"

/** Query params consumed by attribution (removed from the URL). */
const ATTRIBUTION_PARAMS = ["ref", "utm_source", "utm_medium", "utm_campaign", "utm_content"]

/**
 * @param {string} href - full URL
 * @returns {{ ref: string, cleanUrl: string | null }}
 *   ref: sanitized source ("" if none/invalid);
 *   cleanUrl: the URL without attribution params, or null if unchanged
 */
export function readAttribution(href) {
  const url = new URL(href)
  const ref = sanitizeRef(url.searchParams.get("ref") ?? url.searchParams.get("utm_source"))
  let changed = false
  for (const param of ATTRIBUTION_PARAMS) {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param)
      changed = true
    }
  }
  return { ref, cleanUrl: changed ? url.toString() : null }
}

/**
 * @param {Storage | undefined} [storage]
 * @returns {string} stored campaign ref, or ""
 */
export function getStoredRef(storage = globalThis.sessionStorage) {
  try {
    return sanitizeRef(storage?.getItem(REF_STORAGE_KEY))
  } catch {
    return ""
  }
}

/**
 * Capture the campaign ref from `href` into storage.
 * @param {string} href
 * @param {Storage | undefined} [storage]
 * @returns {{ ref: string, cleanUrl: string | null }} see readAttribution;
 *   ref falls back to the one already stored for this session
 */
export function captureAttribution(href, storage = globalThis.sessionStorage) {
  const { ref, cleanUrl } = readAttribution(href)
  if (ref) {
    try {
      storage?.setItem(REF_STORAGE_KEY, ref)
    } catch {
      // storage unavailable (private mode): attribution is best effort
    }
  }
  return { ref: ref || getStoredRef(storage), cleanUrl }
}
