#!/usr/bin/env node
/**
 * Printed pieces: renders the HTML templates in marketing/templates/ (flyer
 * A5, schools one-pager A4; Spanish and Portuguese) to PDF in docs/ and PNG
 * previews in marketing/previews/, using headless Chrome.
 *
 *   npm run marketing
 *   CHROME_PATH=/usr/bin/google-chrome npm run marketing
 *
 * Not part of the site build or CI: run it by hand when the copy, the
 * aircraft list or the design change, and commit the results.
 */
import { execFileSync } from "node:child_process"
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import QRCode from "qrcode"
import { aircraftData } from "../src/data/aircraft.js"
import { envelopePath } from "../src/utils/ogImage.js"
import { flyer, schools } from "./copy.mjs"

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, "..")
const require = createRequire(import.meta.url)

const CHROME_PATH =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const OUT_PDF = join(root, "docs")
const OUT_PREVIEW = join(here, "previews")
const WORK = join(here, ".build")

/** Page sizes in CSS px (96 dpi) for the screenshots. */
const SIZES = {
  a5: { width: 560, height: 794 },
  a4: { width: 794, height: 1123 },
}

/** @param {string} value */
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

/**
 * Minimal templating: {{key}} is escaped, {{{key}}} is inserted raw and
 * <!-- font-faces --> receives the embedded fonts.
 * @param {string} template
 * @param {Record<string, string>} values
 */
function render(template, values) {
  return template
    .replace("<!-- font-faces -->", values.fontFaces ?? "")
    .replace(/\{\{\{(\w+)\}\}\}/g, (_, key) => values[key] ?? "")
    .replace(/\{\{(\w+)\}\}/g, (_, key) => escapeHtml(values[key] ?? ""))
}

/** Inter (SIL OFL 1.1, @fontsource/inter) embedded as data URIs. */
function fontFaces() {
  const faces = [400, 600, 700, 800].map((weight) => {
    const file = require.resolve(`@fontsource/inter/files/inter-latin-${weight}-normal.woff2`)
    const data = readFileSync(file).toString("base64")
    return `@font-face{font-family:"Inter";font-style:normal;font-weight:${weight};font-display:block;src:url(data:font/woff2;base64,${data}) format("woff2");}`
  })
  return `<style>${faces.join("")}</style>`
}

/** @param {string} url */
async function qrSvg(url) {
  return QRCode.toString(url, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#0f172a", light: "#ffffff" },
  })
}

/** Decorative CG envelope (Cessna 172S) for the header. */
function envelopeSvg() {
  const box = { width: 120, height: 108, padding: 6 }
  const d = envelopePath(aircraftData["cessna-172s"].cgEnvelope.points, box)
  return `<svg class="envelope" viewBox="0 0 ${box.width} ${box.height}" aria-hidden="true"><path d="${d}" fill="rgba(255,255,255,0.18)" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"/><circle cx="74" cy="52" r="5" fill="#ffffff"/></svg>`
}

/** Aircraft names without the trailing qualifier: "Cessna 152", "Diamond DA40". */
function shortNames() {
  return Object.values(aircraftData).map((a) => a.name.replace(/\s*\(.*\)\s*$/, ""))
}

/** @param {string[][]} items */
function numberedItems(items) {
  return items
    .map(
      ([title, text], i) =>
        `<li><span class="num">${i + 1}</span><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></div></li>`
    )
    .join("")
}

/**
 * Render one piece to PDF + PNG preview.
 * @param {string} name - output basename
 * @param {string} html
 * @param {{ width: number, height: number }} size
 */
function print(name, html, size) {
  const htmlPath = join(WORK, `${name}.html`)
  writeFileSync(htmlPath, html)
  const url = pathToFileURL(htmlPath).href
  const common = ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars"]
  execFileSync(
    CHROME_PATH,
    [
      ...common,
      "--no-pdf-header-footer",
      "--virtual-time-budget=2000",
      `--print-to-pdf=${join(OUT_PDF, `${name}.pdf`)}`,
      url,
    ],
    { stdio: "pipe" }
  )
  execFileSync(
    CHROME_PATH,
    [
      ...common,
      "--force-device-scale-factor=1.5",
      `--window-size=${size.width},${size.height}`,
      "--virtual-time-budget=2000",
      `--screenshot=${join(OUT_PREVIEW, `${name}.png`)}`,
      url,
    ],
    { stdio: "pipe" }
  )
  console.log(`✓ docs/${name}.pdf  marketing/previews/${name}.png`)
}

async function main() {
  mkdirSync(OUT_PDF, { recursive: true })
  mkdirSync(OUT_PREVIEW, { recursive: true })
  mkdirSync(WORK, { recursive: true })

  const fonts = fontFaces()
  const envelope = envelopeSvg()
  const names = shortNames()
  const flyerTemplate = readFileSync(join(here, "templates", "flyer.html"), "utf8")
  const schoolsTemplate = readFileSync(join(here, "templates", "escuelas.html"), "utf8")

  for (const copy of Object.values(flyer)) {
    const html = render(flyerTemplate, {
      ...copy,
      fontFaces: fonts,
      envelopeSvg: envelope,
      benefits: numberedItems(copy.benefits)
        .replaceAll("<h3>", "<h2>")
        .replaceAll("</h3>", "</h2>"),
      aircraftList: Object.values(aircraftData)
        .map((a) => `<li>${escapeHtml(a.name)}</li>`)
        .join(""),
      qrSvg: await qrSvg(copy.qrUrl),
    })
    print(copy.file, html, SIZES.a5)
  }

  for (const copy of Object.values(schools)) {
    const [first, ...rest] = copy.included(names.length)
    const included = [
      `<li><span>${escapeHtml(first)}<span class="fleet">${escapeHtml(names.join(" · "))}</span></span></li>`,
      ...rest.map((item) => `<li><span>${escapeHtml(item)}</span></li>`),
    ].join("")
    const html = render(schoolsTemplate, {
      ...copy,
      included,
      fontFaces: fonts,
      envelopeSvg: envelope,
      steps: numberedItems(copy.steps),
      qrSvg: await qrSvg(copy.qrUrl),
    })
    print(copy.file, html, SIZES.a4)
  }

  rmSync(WORK, { recursive: true, force: true })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
