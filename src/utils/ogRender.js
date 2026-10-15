/// <reference types="node" />
/**
 * Build-time renderer for the Open Graph images: satori (layout + text as
 * SVG paths) -> resvg (SVG -> PNG). Node only; used by src/pages/og/**.
 */
import { readFile } from "node:fs/promises"
import { createRequire } from "node:module"
import { join } from "node:path"
import { cwd } from "node:process"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, buildOgTree } from "./ogImage.js"

// Resolve from the project root: the prerender bundle lives elsewhere.
const require = createRequire(join(cwd(), "package.json"))

/** Inter (SIL OFL 1.1, via @fontsource/inter). satori reads WOFF, not WOFF2. */
const FONT_FILES = /** @type {const} */ ([
  [400, "@fontsource/inter/files/inter-latin-400-normal.woff"],
  [700, "@fontsource/inter/files/inter-latin-700-normal.woff"],
  [800, "@fontsource/inter/files/inter-latin-800-normal.woff"],
])

/** @type {Promise<import('satori').Font[]> | undefined} */
let fontsPromise

function loadFonts() {
  fontsPromise ??= Promise.all(
    FONT_FILES.map(async ([weight, file]) => ({
      name: "Inter",
      data: await readFile(require.resolve(file)),
      weight,
      style: /** @type {const} */ ("normal"),
    }))
  )
  return fontsPromise
}

/**
 * Render an OG image to PNG.
 * @param {import('./ogImage.js').OgContent} content
 * @returns {Promise<Uint8Array>}
 */
export async function renderOgPng(content) {
  const svg = await satori(/** @type {any} */ (buildOgTree(content)), {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    fonts: await loadFonts(),
  })
  const png = new Resvg(svg, { fitTo: { mode: "width", value: OG_IMAGE_WIDTH } }).render().asPng()
  return new Uint8Array(png)
}

/**
 * Static endpoint response for a PNG.
 * @param {Uint8Array} png
 */
export function pngResponse(png) {
  return new Response(/** @type {BodyInit} */ (png), {
    headers: { "Content-Type": "image/png" },
  })
}
