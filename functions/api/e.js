// Cloudflare Pages Function: first-party conversion events → Analytics Engine.
// Validation lives in src/utils/eventIngest.js so it can be unit tested.
// Privacy: no IP, user agent, cookies or identifiers are stored.
import { MAX_BODY_BYTES, parseEvent } from "../../src/utils/eventIngest.js"

const HEADERS = { "Cache-Control": "no-store" }

/**
 * @param {number} status
 * @param {Record<string, string>} [extra]
 */
function reply(status, extra = {}) {
  return new Response(null, { status, headers: { ...HEADERS, ...extra } })
}

/**
 * @param {{
 *   request: Request & { cf?: { country?: string } },
 *   env: { EVENTS?: { writeDataPoint: (point: unknown) => void } },
 * }} context
 */
export async function onRequestPost({ request, env }) {
  const length = Number(request.headers.get("Content-Length") ?? 0)
  if (length > MAX_BODY_BYTES) return reply(400)

  let body
  try {
    body = await request.text()
  } catch {
    return reply(400)
  }

  const result = parseEvent(body, {
    url: request.headers.get("Referer"),
    country: request.cf?.country,
  })
  if (!result.ok) return reply(result.status)

  try {
    env.EVENTS?.writeDataPoint(result.point)
  } catch {
    // analytics must never fail the request
  }
  return reply(204)
}

/** Any other method. */
export function onRequest() {
  return reply(405, { Allow: "POST" })
}
