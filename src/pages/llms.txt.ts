/** /llms.txt: Markdown map of the site for AI assistants (see utils/llmsTxt.js). */
import { aircraftData } from "../data/aircraft"
import { locales, localeNames } from "../i18n"
import { guidesFor } from "../components/guides/collection"
import { pagesContent } from "../content/pages"
import { ROUTE_LOCALES, aboutPath, glossaryPath, guidePath, localePath } from "../utils/routes"
import { llmsTxt } from "../utils/llmsTxt"

export async function GET() {
  const { entries } = await guidesFor("en")
  const body = llmsTxt({
    locale: "en",
    description: locales.en.seo.appDescription,
    aircraft: aircraftData,
    guides: entries.map(({ data }) => ({
      title: data.title,
      description: data.description,
      path: guidePath("en", data.slug),
    })),
    pages: [
      { ...pagesContent.en.glossary, path: glossaryPath("en") },
      { ...pagesContent.en.about, path: aboutPath("en") },
    ].map(({ h1, description, path }) => ({ title: h1, description, path })),
    languages: ROUTE_LOCALES.map((locale) => ({
      name: localeNames[locale],
      path: localePath(locale),
    })),
  })
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
