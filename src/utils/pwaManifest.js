/**
 * Web app manifest shared by the default manifest (vite-pwa, astro.config.mjs)
 * and the per-language ones (/{lang}/manifest.webmanifest). Pure data.
 */

/** Site path of the manifest of a language, e.g. "/en/manifest.webmanifest". */
export function manifestPath(/** @type {string} */ locale) {
  return `/${locale}/manifest.webmanifest`
}

/**
 * Every manifest shares `id` and `scope`, so the browser treats them as one
 * installable app whatever the language of the page it was installed from.
 * @param {{ name: string, description: string, lang: string, startUrl: string }} input
 */
export function pwaManifest({ name, description, lang, startUrl }) {
  return {
    id: "/",
    name,
    short_name: "CheckCG",
    description,
    lang,
    start_url: startUrl,
    scope: "/",
    theme_color: "#2563eb",
    background_color: "#eff6ff",
    display: "standalone",
    icons: [
      { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
      { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
      { src: "/pwa-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }
}

/**
 * Manifest of one language, from its i18n `seo` messages.
 * @param {string} locale
 * @param {{ siteName: string, appDescription: string, og: { title: string } }} seo
 */
export function localizedManifest(locale, seo) {
  return pwaManifest({
    name: `${seo.siteName} - ${seo.og.title}`,
    description: seo.appDescription,
    lang: locale,
    startUrl: `/${locale}/`,
  })
}
