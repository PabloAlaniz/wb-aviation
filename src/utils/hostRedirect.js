/**
 * Host canonicalization for the Cloudflare Pages deployment.
 *
 * The site moved from wb-aviation.pages.dev to checkcg.com. The old host and
 * www must 301 to the apex with the same path and query, so shared links
 * (`?s=`, `?fleet=`) and indexed pages keep working. Preview deployments
 * (`<hash>.wb-aviation.pages.dev`) stay reachable but are kept out of search.
 *
 * Pure function, used by functions/_middleware.js and unit tests.
 */

export const CANONICAL_HOST = "checkcg.com"

/** Hosts that permanently redirect to the canonical host. */
export const REDIRECT_HOSTS = ["wb-aviation.pages.dev", "www.checkcg.com"]

/** Preview deployments: `<hash or branch>.wb-aviation.pages.dev` */
const PREVIEW_SUFFIX = ".wb-aviation.pages.dev"

/**
 * @param {string} href - full request URL
 * @returns {{ action: "redirect", location: string } | { action: "noindex" } | { action: "pass" }}
 */
export function resolveHost(href) {
  const url = new URL(href)
  const host = url.hostname.toLowerCase()

  if (REDIRECT_HOSTS.includes(host)) {
    return {
      action: "redirect",
      location: `https://${CANONICAL_HOST}${url.pathname}${url.search}${url.hash}`,
    }
  }
  if (host.endsWith(PREVIEW_SUFFIX)) {
    return { action: "noindex" }
  }
  return { action: "pass" }
}
