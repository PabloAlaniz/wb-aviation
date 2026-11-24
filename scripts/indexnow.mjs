/**
 * Submit every URL of the live sitemap to IndexNow (Bing, Yandex, Seznam,
 * Naver...), so new and updated pages are picked up without waiting for a
 * crawl. Reads the deployed sitemap, so it never announces pages that are not
 * live yet. Run by .github/workflows/indexnow.yml or by hand:
 *   node scripts/indexnow.mjs            submit
 *   node scripts/indexnow.mjs --dry-run  list the URLs only
 *
 * The key is public by design: IndexNow verifies it against
 * https://checkcg.com/{key}.txt (public/{key}.txt).
 */
import process from "node:process"
import { pathToFileURL } from "node:url"

const SITE = "https://checkcg.com"
const KEY = "476b5ead93ad2df6bac34d23a2470d89"

/**
 * Every <loc> of a sitemap or sitemap index.
 * @param {string} xml
 * @returns {string[]}
 */
export function sitemapLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((match) => match[1])
}

/**
 * IndexNow request body for a list of URLs of the site.
 * @param {string[]} urls
 */
export function indexNowPayload(urls) {
  return {
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: [...new Set(urls)].filter((url) => url.startsWith(`${SITE}/`)),
  }
}

/** @param {string} url */
async function fetchText(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`)
  return response.text()
}

async function main() {
  const sitemaps = sitemapLocs(await fetchText(`${SITE}/sitemap-index.xml`))
  const pages = (await Promise.all(sitemaps.map(fetchText))).flatMap(sitemapLocs)
  const payload = indexNowPayload(pages)
  console.log(`${payload.urlList.length} URLs in the live sitemap`)

  if (process.argv.includes("--dry-run")) {
    console.log(payload.urlList.join("\n"))
    return
  }
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`IndexNow: HTTP ${response.status} ${await response.text()}`)
  console.log(`IndexNow accepted the submission (HTTP ${response.status})`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message)
    process.exit(1)
  })
}
