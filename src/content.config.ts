/**
 * Content collections (Astro content layer). `guides`: one Markdown file per
 * guide and language in src/content/guides/{lang}/{slug}.md; translations
 * share a `translationKey` (see src/content/guides/registry.js).
 */
import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const guides = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/guides",
    // "es/envolvente-de-cg": unique across languages (the default id would
    // be the `slug` field, which is only unique within one language).
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string().min(10).max(70),
    description: z.string().min(50).max(170),
    lang: z.enum(["es", "en", "pt"]),
    translationKey: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    updated: z.coerce.date(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    /** Steps for schema.org HowTo (procedural guides only). */
    steps: z.array(z.object({ name: z.string(), text: z.string() })).optional(),
  }),
})

export const collections = { guides }
