/**
 * Open Graph image per built-in aircraft and locale, prerendered at build
 * time: /og/{lang}/{aircraft}.png (1200x630).
 */
import { aircraftData } from "../../../data/aircraft"
import { locales } from "../../../i18n"
import { ROUTE_LOCALES } from "../../../utils/routes"
import { ogContent } from "../../../utils/ogImage"
import { pngResponse, renderOgPng } from "../../../utils/ogRender"

export function getStaticPaths() {
  return ROUTE_LOCALES.flatMap((lang) =>
    Object.keys(aircraftData).map((aircraft) => ({ params: { lang, aircraft } }))
  )
}

/**
 * @param {{ params: { lang: import("../../../utils/routes").RouteLocale, aircraft: string } }} context
 */
export async function GET({ params }) {
  const content = ogContent(locales[params.lang].seo, aircraftData, params.aircraft)
  return pngResponse(await renderOgPng(content))
}
