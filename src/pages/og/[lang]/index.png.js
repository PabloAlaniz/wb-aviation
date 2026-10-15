/**
 * Generic Open Graph image per locale (landing pages and every page without a
 * specific image), prerendered at build time: /og/{lang}/index.png (1200x630).
 */
import { aircraftData } from "../../../data/aircraft"
import { locales } from "../../../i18n"
import { ROUTE_LOCALES } from "../../../utils/routes"
import { ogContent } from "../../../utils/ogImage"
import { pngResponse, renderOgPng } from "../../../utils/ogRender"

export function getStaticPaths() {
  return ROUTE_LOCALES.map((lang) => ({ params: { lang } }))
}

/** @param {{ params: { lang: import("../../../utils/routes").RouteLocale } }} context */
export async function GET({ params }) {
  const content = ogContent(locales[params.lang].seo, aircraftData)
  return pngResponse(await renderOgPng(content))
}
