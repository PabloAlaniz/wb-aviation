/** Build-time access to the `guides` collection for one language. */
import { getCollection, type CollectionEntry } from "astro:content"
import { GUIDES } from "../../content/guides/registry"
import type { RouteLocale } from "../../utils/routes"

/** Guides of a language, in registry order, plus their titles by translationKey. */
export async function guidesFor(lang: RouteLocale) {
  const entries = await getCollection("guides", ({ data }) => data.lang === lang)
  const order = (entry: CollectionEntry<"guides">) =>
    GUIDES.findIndex((guide) => guide.key === entry.data.translationKey)
  entries.sort((a, b) => order(a) - order(b))
  const titles = Object.fromEntries(entries.map((e) => [e.data.translationKey, e.data.title]))
  return { entries, titles }
}

/** getStaticPaths for /{lang}/{guias|guides}/{slug}/. */
export async function guideStaticPaths(lang: RouteLocale) {
  const { entries, titles } = await guidesFor(lang)
  return entries.map((entry) => ({ params: { slug: entry.data.slug }, props: { entry, titles } }))
}
