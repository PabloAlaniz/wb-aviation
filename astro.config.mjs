// @ts-check
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import AstroPWA from "@vite-pwa/astro"
import tailwindcss from "@tailwindcss/vite"
import { SITE_URL, ROUTE_LOCALES, DEFAULT_ROUTE_LOCALE } from "./src/utils/routes.js"

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
      // All locales are prefixed (/es/, /en/, /pt/). The root page (/) stays a
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
    }),
    AstroPWA({
      registerType: "autoUpdate",
      manifest: {
        name: "CheckCG - Peso y balance de aeronaves",
        short_name: "CheckCG",
        description:
          "Calculador de peso y balance (Weight & Balance) de aeronaves basado en datos oficiales de la FAA",
        lang: "es",
        start_url: "/",
        theme_color: "#2563eb",
        background_color: "#eff6ff",
        display: "standalone",
        icons: [
          { src: "pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512.png", sizes: "512x512", type: "image/png" },
          { src: "pwa-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        // Precache every page so all localized calculators work offline.
        globPatterns: ["**/*.{js,css,html,svg,ico,webmanifest}", "pwa-*.png"],
        // Offline navigations to an unknown URL fall back to the root
        // calculator (it redirects to the preferred language).
        navigateFallback: "/index.html",
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
