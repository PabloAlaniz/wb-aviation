/**
 * Body of /llms.txt (https://llmstxt.org): a plain Markdown map of the site
 * for AI assistants and crawlers, generated from the same data as the pages.
 * Pure: the endpoint (src/pages/llms.txt.ts) feeds it the guides.
 */
import { absoluteUrl, aircraftPath, localePath } from "./routes.js"

/**
 * @param {{
 *   locale: import("./routes.js").RouteLocale,
 *   description: string,
 *   aircraft: Record<string, { name: string, tcds: string }>,
 *   guides: { title: string, description: string, path: string }[],
 *   pages?: { title: string, description: string, path: string }[],
 *   languages: { name: string, path: string }[],
 * }} input - `locale`: language the listed pages are in
 */
export function llmsTxt({ locale, description, aircraft, guides, pages = [], languages }) {
  /** @param {{ title: string, description: string, path: string }} page */
  const link = (page) => `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`
  const lines = [
    "# CheckCG",
    "",
    `> ${description}`,
    "",
    "CheckCG is a free, open source (MIT) aircraft weight and balance calculator that runs in the browser, offline and without sign-up. Each aircraft page holds reference data (maximum weight, station arms, CG envelope vertices) with its source documents and verification status. Reference values never replace the weight and balance report and the POH/AFM of the actual airframe.",
    "",
    "## Calculator",
    "",
    `- [Weight and balance calculator](${absoluteUrl(localePath(locale))}): interactive calculator for every supported aircraft, with takeoff, landing and zero-fuel CG and a printable load sheet`,
    "",
    "## Aircraft reference data",
    "",
    ...Object.entries(aircraft).map(
      ([id, data]) =>
        `- [${data.name} weight and balance](${absoluteUrl(aircraftPath(locale, id))}): station arms, limits and CG envelope from ${data.tcds}`
    ),
    "",
    "## Guides",
    "",
    ...guides.map(link),
    ...(pages.length > 0 ? ["", "## Reference", "", ...pages.map(link)] : []),
    "",
    "## Languages",
    "",
    ...languages.map(({ name, path }) => `- [${name}](${absoluteUrl(path)})`),
    "",
    "## Optional",
    "",
    "- [Source code](https://github.com/PabloAlaniz/wb-aviation): aircraft data, calculations and tests",
    `- [Sitemap](${absoluteUrl("/sitemap-index.xml")})`,
    "",
  ]
  return lines.join("\n")
}
