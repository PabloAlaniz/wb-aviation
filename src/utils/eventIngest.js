/**
 * First-party conversion events (Cloudflare Pages Function `/api/e` →
 * Workers Analytics Engine).
 *
 * Privacy: only the event name, a few short props, the page path, language,
 * aircraft, campaign `ref` and the country (from Cloudflare's edge) are kept.
 * Never IP addresses, user agents, cookies or any identifier.
 *
 * Pure functions, used by functions/api/e.js, the client and unit tests.
 */

/** Closed list of accepted event names. */
export const EVENT_NAMES = /** @type {const} */ ([
  "share_link",
  "pdf_export",
  "fleet_import",
  "custom_aircraft_created",
  "shared_link_opened",
  "fleet_link_opened",
  "units_changed",
  "install_pwa",
])

/** @typedef {(typeof EVENT_NAMES)[number]} EventName */

/** Max request body size in bytes. */
export const MAX_BODY_BYTES = 2048
/** Max number of custom props kept per event. */
export const MAX_PROPS = 6
/** Max length of a prop string value. */
export const MAX_PROP_VALUE_LENGTH = 64

const PROP_KEY_RE = /^[A-Za-z][A-Za-z0-9_]{0,23}$/
const REF_RE = /^[a-z0-9._-]{1,48}$/
const LANG_RE = /^[a-z]{2}(-[a-z]{2})?$/
const AIRCRAFT_RE = /^[a-z0-9][a-z0-9-]{0,63}$/
const COUNTRY_RE = /^[A-Z]{2}$/
const MAX_PATH_LENGTH = 128

/**
 * @param {unknown} value
 * @returns {value is EventName}
 */
export function isEventName(value) {
  return typeof value === "string" && /** @type {readonly string[]} */ (EVENT_NAMES).includes(value)
}

/**
 * Campaign reference (`?ref=` / `?utm_source=`): lowercased, `[a-z0-9._-]{1,48}`,
 * otherwise "".
 * @param {unknown} value
 * @returns {string}
 */
export function sanitizeRef(value) {
  if (typeof value !== "string") return ""
  const ref = value.trim().toLowerCase()
  return REF_RE.test(ref) ? ref : ""
}

/**
 * Up to MAX_PROPS primitive entries with short keys; strings truncated.
 * @param {unknown} value
 * @returns {Record<string, string | number | boolean>}
 */
export function sanitizeProps(value) {
  /** @type {Record<string, string | number | boolean>} */
  const props = {}
  if (value === null || typeof value !== "object" || Array.isArray(value)) return props
  let count = 0
  for (const [key, raw] of Object.entries(value)) {
    if (count >= MAX_PROPS) break
    if (!PROP_KEY_RE.test(key)) continue
    if (typeof raw === "string") props[key] = raw.slice(0, MAX_PROP_VALUE_LENGTH)
    else if (typeof raw === "number" && Number.isFinite(raw)) props[key] = raw
    else if (typeof raw === "boolean") props[key] = raw
    else continue
    count++
  }
  return props
}

/**
 * Site path only (no query/hash, which may carry shared data).
 * @param {unknown} value
 * @returns {string}
 */
export function sanitizePath(value) {
  if (typeof value !== "string" || !value.startsWith("/")) return ""
  const path = value.split(/[?#]/)[0].slice(0, MAX_PATH_LENGTH)
  return /^[A-Za-z0-9/._~%-]*$/.test(path) ? path : ""
}

/**
 * @param {unknown} value
 * @param {RegExp} re
 */
function match(value, re) {
  return typeof value === "string" && re.test(value) ? value : ""
}

/**
 * Byte length of a string (UTF-8).
 * @param {string} text
 */
function byteLength(text) {
  return new TextEncoder().encode(text).length
}

/**
 * @typedef {{ indexes: string[], blobs: string[], doubles: number[] }} DataPoint
 */

/**
 * Validate a raw event body and build an Analytics Engine data point.
 *
 * blobs: [event, path, lang, aircraft, ref, country, props JSON]
 *
 * @param {unknown} body - raw request body (JSON string)
 * @param {{ url?: string | null, country?: unknown }} [context]
 *   - url: page URL fallback for the path (e.g. the Referer)
 *   - country: ISO country code from Cloudflare (`request.cf.country`)
 * @returns {{ ok: true, point: DataPoint } | { ok: false, status: 400 }}
 */
export function parseEvent(body, { url, country } = {}) {
  /** @type {{ ok: false, status: 400 }} */
  const invalid = { ok: false, status: 400 }
  if (typeof body !== "string" || body.length === 0 || byteLength(body) > MAX_BODY_BYTES) {
    return invalid
  }

  /** @type {unknown} */
  let data
  try {
    data = JSON.parse(body)
  } catch {
    return invalid
  }
  if (data === null || typeof data !== "object" || Array.isArray(data)) return invalid

  const event = /** @type {Record<string, unknown>} */ (data)
  const name = event.n
  if (!isEventName(name)) return invalid

  let path = sanitizePath(event.path)
  if (!path && url) {
    try {
      path = sanitizePath(new URL(url).pathname)
    } catch {
      path = ""
    }
  }

  const point = {
    indexes: [name],
    blobs: [
      name,
      path,
      match(typeof event.lang === "string" ? event.lang.toLowerCase() : "", LANG_RE),
      match(event.aircraft, AIRCRAFT_RE),
      sanitizeRef(event.ref),
      match(country, COUNTRY_RE),
      JSON.stringify(sanitizeProps(event.p)),
    ],
    doubles: [1],
  }
  return { ok: true, point }
}
