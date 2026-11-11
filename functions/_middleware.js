// Cloudflare Pages Function: canonical host (checkcg.com) and the
// locale-adaptive redirect of the root page (/).
// Logic lives in src/utils/hostRedirect.js and src/utils/rootRedirect.js so it
// can be unit tested.
import { resolveHost } from "../src/utils/hostRedirect.js"
import { resolveRootRedirect } from "../src/utils/rootRedirect.js"

/** @param {{ request: Request, next: () => Promise<Response> }} context */
export async function onRequest({ request, next }) {
  const result = resolveHost(request.url)

  if (result.action === "redirect") {
    return Response.redirect(result.location, 301)
  }

  if (request.method === "GET" || request.method === "HEAD") {
    const target = resolveRootRedirect(request.url, {
      cookie: request.headers.get("Cookie"),
      acceptLanguage: request.headers.get("Accept-Language"),
    })
    if (target) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: target,
          Vary: "Accept-Language, Cookie",
          "Cache-Control": "private, no-store",
        },
      })
    }
  }

  const response = await next()
  if (result.action === "noindex") {
    const headers = new Headers(response.headers)
    headers.set("X-Robots-Tag", "noindex")
    return new Response(response.body, { status: response.status, headers })
  }
  return response
}
