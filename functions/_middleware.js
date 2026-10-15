// Cloudflare Pages Function: canonical host (checkcg.com).
// Logic lives in src/utils/hostRedirect.js so it can be unit tested.
import { resolveHost } from "../src/utils/hostRedirect.js"

/** @param {{ request: Request, next: () => Promise<Response> }} context */
export async function onRequest({ request, next }) {
  const result = resolveHost(request.url)

  if (result.action === "redirect") {
    return Response.redirect(result.location, 301)
  }

  const response = await next()
  if (result.action === "noindex") {
    const headers = new Headers(response.headers)
    headers.set("X-Robots-Tag", "noindex")
    return new Response(response.body, { status: response.status, headers })
  }
  return response
}
