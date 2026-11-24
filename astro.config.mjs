// @ts-check
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import AstroPWA from "@vite-pwa/astro"
import tailwindcss from "@tailwindcss/vite"
import {
  SITE_URL,
  ROUTE_LOCALES,
  DEFAULT_ROUTE_LOCALE,
  localizedPageGroups,
} from "./src/utils/routes.js"
import { PAGES_UPDATED } from "./src/content/pages/index.js"
import { readFileSync, readdirSync } from "node:fs"
import { guideTranslationGroups } from "./src/content/guides/registry.js"
import { aircraftData } from "./src/data/aircraft.js"
import { pwaManifest } from "./src/utils/pwaManifest.js"
import { guideFrontmatterDates, sitemapLastmod } from "./src/utils/sitemapLastmod.js"

// <lastmod> of every page: aircraft data verification and guide update dates.
const guidesDir = new URL("./src/content/guides/", import.meta.url)
const guideDates = readdirSync(guidesDir, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".md"))
  .map((file) => guideFrontmatterDates(readFileSync(new URL(file, guidesDir), "utf8")))
  .filter((dates) => dates !== null)
// Pages whose path differs per language (guides, glossary, methodology): the
// sitemap's automatic i18n matching only pairs identical paths.
const translationGroups = [...guideTranslationGroups(), ...localizedPageGroups()]
const lastmod = sitemapLastmod({
  aircraft: aircraftData,
  guides: guideDates,
  pages: localizedPageGroups()
    .flatMap((group) => Object.values(group))
    .map((path) => ({ path, updated: PAGES_UPDATED })),
})

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  output: "static",
  site: SITE_URL,
  // Every localized page lives in a folder: /es/cessna-172s/ -> es/cessna-172s/index.html
  build: { format: "directory" },
  i18n: {
    locales: [...ROUTE_LOCALES],
    defaultLocale: DEFAULT_ROUTE_LOCALE,
    routing: {
      // All locales are prefixed (/es/, /en/, /pt/, /it/, /fr/, /de/). The root page (/) stays a
      // working calculator (shared ?s= / ?fleet= links) and redirects to the
      // preferred language client-side, so no automatic redirect here.
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    sitemap({
      // `/` is the x-default language picker: each locale has its own home.
      filter: (page) => page !== `${SITE_URL}/`,
      i18n: {
        defaultLocale: DEFAULT_ROUTE_LOCALE,
        locales: Object.fromEntries(ROUTE_LOCALES.map((locale) => [locale, locale])),
      },
      // Localized paths (/es/guias/x/ vs /en/guides/y/) can't be paired by the
      // automatic i18n matching: set their alternates explicitly.
      serialize: (item) => {
        const date = lastmod.get(item.url.slice(SITE_URL.length))
        if (date) item.lastmod = date
        const group = translationGroups.find((paths) =>
          Object.values(paths).some((path) => `${SITE_URL}${path}` === item.url)
        )
        if (!group) return item
        return {
          ...item,
          links: ROUTE_LOCALES.map((locale) => ({
            lang: locale,
            url: `${SITE_URL}${group[locale]}`,
          })),
        }
      },
    }),
    AstroPWA({
      registerType: "autoUpdate",
      // Default manifest (root page). Localized pages link their own
      // /{lang}/manifest.webmanifest (src/pages/[lang]/manifest.webmanifest.js).
      manifest: pwaManifest({
        name: "CheckCG - Peso y balance de aeronaves",
        description:
          "Calculador de peso y balance (Weight & Balance) de aeronaves basado en datos oficiales de la FAA",
        lang: "es",
        startUrl: "/",
      }),
      workbox: {
        // Precache every page so all localized calculators work offline.
        globPatterns: ["**/*.{js,css,html,svg,ico,webmanifest}", "pwa-*.png"],
        // Offline navigations to an unknown URL fall back to the root
        // calculator (it redirects to the preferred language).
        navigateFallback: "/index.html",
        // Plain files (llms.txt, sitemaps, IndexNow key) are never app pages.
        navigateFallbackDenylist: [/\.(txt|xml|webmanifest)$/],
      },
      // Pages are built as /es/x/index.html and served as /es/x/: precache them
      // under the trailing-slash URL, otherwise every navigation misses the
      // precache and falls back to "/" (which redirects to the stored locale).
      experimental: { directoryAndTrailingSlashHandler: true },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Expose VITE_* (legacy, pre-Astro) as well as Astro's PUBLIC_* env vars.
    envPrefix: ["PUBLIC_", "VITE_"],
  },
})
