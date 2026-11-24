/**
 * Web app manifest per language (/{lang}/manifest.webmanifest): name,
 * description and start_url in the language of the page it is installed from.
 */
import { locales } from "../../i18n"
import { ROUTE_LOCALES } from "../../utils/routes"
import { localizedManifest } from "../../utils/pwaManifest"

export function getStaticPaths() {
  return ROUTE_LOCALES.map((lang) => ({ params: { lang } }))
}

/** @param {{ params: { lang: import("../../utils/routes").RouteLocale } }} context */
export function GET({ params }) {
  const manifest = localizedManifest(params.lang, locales[params.lang].seo)
  return new Response(JSON.stringify(manifest), {
    headers: { "Content-Type": "application/manifest+json; charset=utf-8" },
  })
}
