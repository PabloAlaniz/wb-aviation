// Cloudflare Pages Function: canonical host (checkcg.com), the
// locale-adaptive redirect of the root page (/) and the security headers of
// every response.
// Logic lives in src/utils/hostRedirect.js, src/utils/rootRedirect.js and
// src/utils/securityHeaders.js so it can be unit tested.
import { resolveHost } from "../src/utils/hostRedirect.js"
import { resolveRootRedirect } from "../src/utils/rootRedirect.js"
import { applySecurityHeaders } from "../src/utils/securityHeaders.js"

/**
 * @param {string} location
 * @param {number} status
 * @param {Record<string, string>} [headers]
 */
function redirect(location, status, headers = {}) {
  return new Response(null, {
    status,
    headers: applySecurityHeaders(new Headers({ Location: location, ...headers })),
  })
}

/** @param {{ request: Request, next: () => Promise<Response> }} context */
export async function onRequest({ request, next }) {
  const result = resolveHost(request.url)

  if (result.action === "redirect") return redirect(result.location, 301)

  if (request.method === "GET" || request.method === "HEAD") {
    const target = resolveRootRedirect(request.url, {
      cookie: request.headers.get("Cookie"),
      acceptLanguage: request.headers.get("Accept-Language"),
    })
    if (target) {
      return redirect(target, 302, {
        Vary: "Accept-Language, Cookie",
        "Cache-Control": "private, no-store",
      })
    }
  }

  const response = await next()
  const headers = applySecurityHeaders(new Headers(response.headers))
  if (result.action === "noindex") headers.set("X-Robots-Tag", "noindex")
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
