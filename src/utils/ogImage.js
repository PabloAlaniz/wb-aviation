/**
 * Pure helpers for the social preview (Open Graph) images rendered at build
 * time by src/pages/og/**. No Node or browser APIs here: the layout tree is a
 * plain satori element object, rendered to PNG by src/utils/ogRender.js.
 */

/** Open Graph image size recommended by Facebook, LinkedIn, X, WhatsApp... */
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

/** Brand palette (matches the site's theme-color / Tailwind blue-600). */
export const OG_COLORS = {
  brand: "#2563eb",
  brandSoft: "#dbeafe",
  ink: "#0f172a",
  muted: "#475569",
  grid: "#e2e8f0",
  background: "#f8fafc",
  card: "#ffffff",
}

/**
 * Site path of the OG image for a page.
 * @param {string} locale - route locale ("es", "en", "pt")
 * @param {string} [aircraftId] - built-in aircraft id; omitted for the generic image
 * @returns {string} e.g. "/og/es/cessna-152.png" or "/og/es/index.png"
 */
export function ogImagePath(locale, aircraftId) {
  const name = aircraftId ? encodeURIComponent(aircraftId) : "index"
  return `/og/${locale}/${name}.png`
}

/**
 * @typedef {{ width: number, height: number, padding?: number }} Box
 * @typedef {{ x: number, y: number }} Point
 */

/** @param {number} n */
function round1(n) {
  return Math.round(n * 10) / 10
}

/**
 * Scale CG envelope points (arm in X, weight in Y) to fit a box in SVG
 * coordinates: weight grows upwards, each axis fills the box (like the app's
 * chart). A repeated closing point is dropped; the path is closed with "Z".
 * Degenerate spans (all points on one arm or weight) are centered.
 * @param {ReadonlyArray<import('../types').EnvelopePoint>} points
 * @param {Box} box
 * @returns {Point[]}
 */
export function normalizeEnvelope(points, box) {
  if (!Array.isArray(points) || points.length === 0) return []
  const first = points[0]
  const last = points[points.length - 1]
  const open =
    points.length > 1 && first.arm === last.arm && first.weight === last.weight
      ? points.slice(0, -1)
      : points

  const padding = box.padding ?? 0
  const innerW = Math.max(box.width - 2 * padding, 0)
  const innerH = Math.max(box.height - 2 * padding, 0)
  const arms = open.map((p) => p.arm)
  const weights = open.map((p) => p.weight)
  const minArm = Math.min(...arms)
  const maxArm = Math.max(...arms)
  const minW = Math.min(...weights)
  const maxW = Math.max(...weights)
  const spanArm = maxArm - minArm
  const spanW = maxW - minW

  return open.map((p) => ({
    x: round1(padding + (spanArm > 0 ? ((p.arm - minArm) / spanArm) * innerW : innerW / 2)),
    y: round1(padding + (spanW > 0 ? (1 - (p.weight - minW) / spanW) * innerH : innerH / 2)),
  }))
}

/**
 * SVG path data ("M x y L x y ... Z") of the normalized envelope.
 * @param {ReadonlyArray<import('../types').EnvelopePoint>} points
 * @param {Box} box
 * @returns {string} empty string when there are no points
 */
export function envelopePath(points, box) {
  const scaled = normalizeEnvelope(points, box)
  if (scaled.length === 0) return ""
  const [head, ...rest] = scaled
  return [`M${head.x} ${head.y}`, ...rest.map((p) => `L${p.x} ${p.y}`), "Z"].join(" ")
}

/**
 * Font size for a single-line-ish heading so long names still fit: linear
 * shrink from `max` once the text is longer than `fitChars`, never below `min`.
 * @param {string} text
 * @param {{ max: number, min: number, fitChars: number }} opts
 * @returns {number}
 */
export function fitFontSize(text, { max, min, fitChars }) {
  const length = [...(text ?? "")].length
  if (length <= fitChars) return max
  return Math.max(min, Math.floor((max * fitChars) / length))
}

/**
 * TCDS reference as shown on the image: "TCDS# 3A19 Revision 50 (FAA)" ->
 * "TCDS 3A19 Revision 50 (FAA)".
 * @param {string} tcds
 * @returns {string}
 */
export function formatTcds(tcds) {
  return (tcds ?? "").replace(/^TCDS#\s*/, "TCDS ").trim()
}

/**
 * @typedef {object} OgContent
 * @property {string} title - "Peso y balance" / "Weight and balance" / ...
 * @property {string} [aircraftName] - aircraft image only
 * @property {string} [tcds] - aircraft image only (raw TCDS string)
 * @property {string} [tagline] - generic image only
 * @property {ReadonlyArray<import('../types').EnvelopePoint>} envelope - CG envelope points
 * @property {string} envelopeLabel - caption under the envelope
 * @property {string} footer - e.g. "CheckCG · checkcg.com"
 */

/** Aircraft whose envelope illustrates the generic (per-language) image. */
export const GENERIC_ENVELOPE_AIRCRAFT = "cessna-172s"

/**
 * Content of the OG image for a localized page.
 * @param {{ siteName: string, og: { title: string, tagline: string, envelope: string } }} seo - `locales[lang].seo`
 * @param {Record<string, import('../types').Aircraft>} aircraftData
 * @param {string} [aircraftId] - omitted for the generic image
 * @returns {OgContent}
 */
export function ogContent(seo, aircraftData, aircraftId) {
  const footer = `${seo.siteName} · checkcg.com`
  if (aircraftId) {
    const aircraft = aircraftData[aircraftId]
    if (!aircraft) throw new Error(`Unknown aircraft: ${aircraftId}`)
    return {
      title: seo.og.title,
      aircraftName: aircraft.name,
      tcds: aircraft.tcds,
      envelope: aircraft.cgEnvelope.points,
      envelopeLabel: seo.og.envelope,
      footer,
    }
  }
  const sample = aircraftData[GENERIC_ENVELOPE_AIRCRAFT] ?? Object.values(aircraftData)[0]
  return {
    title: seo.og.title,
    tagline: seo.og.tagline,
    envelope: sample?.cgEnvelope.points ?? [],
    envelopeLabel: seo.og.envelope,
    footer,
  }
}

/**
 * @typedef {{ type: string, props: Record<string, unknown> }} OgNode
 */

/**
 * @param {string} type
 * @param {Record<string, unknown>} style
 * @param {unknown} [children]
 * @param {Record<string, unknown>} [extra]
 * @returns {OgNode}
 */
function h(type, style, children, extra = {}) {
  return { type, props: { ...extra, style, children } }
}

const ENVELOPE_BOX = { width: 340, height: 300, padding: 18 }

/**
 * satori element tree (React-element shaped plain objects) for one OG image.
 * @param {OgContent} content
 * @returns {OgNode}
 */
export function buildOgTree(content) {
  const c = OG_COLORS
  const isAircraft = Boolean(content.aircraftName)
  const d = envelopePath(content.envelope, ENVELOPE_BOX)
  const gridLines = [1, 2, 3].flatMap((i) => {
    const x = (ENVELOPE_BOX.width / 4) * i
    const y = (ENVELOPE_BOX.height / 4) * i
    return [
      h("line", {}, undefined, {
        x1: x,
        y1: 0,
        x2: x,
        y2: ENVELOPE_BOX.height,
        stroke: c.grid,
        strokeWidth: 2,
      }),
      h("line", {}, undefined, {
        x1: 0,
        y1: y,
        x2: ENVELOPE_BOX.width,
        y2: y,
        stroke: c.grid,
        strokeWidth: 2,
      }),
    ]
  })

  const brand = h("div", { display: "flex", alignItems: "center", gap: 16 }, [
    h(
      "div",
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: c.brand,
        color: "#ffffff",
        fontSize: 26,
        fontWeight: 800,
      },
      "CG"
    ),
    h("div", { fontSize: 32, fontWeight: 800, color: c.ink }, "CheckCG"),
  ])

  const headline = isAircraft
    ? [
        h(
          "div",
          {
            fontSize: fitFontSize(content.title, { max: 64, min: 48, fitChars: 18 }),
            fontWeight: 800,
            color: c.ink,
            lineHeight: 1.1,
          },
          content.title
        ),
        h(
          "div",
          {
            fontSize: fitFontSize(content.aircraftName ?? "", { max: 60, min: 38, fitChars: 20 }),
            fontWeight: 800,
            color: c.brand,
            lineHeight: 1.1,
            marginTop: 12,
          },
          content.aircraftName
        ),
        h(
          "div",
          { fontSize: 26, fontWeight: 400, color: c.muted, marginTop: 24 },
          formatTcds(content.tcds ?? "")
        ),
      ]
    : [
        h(
          "div",
          {
            fontSize: fitFontSize(content.title, { max: 84, min: 60, fitChars: 16 }),
            fontWeight: 800,
            color: c.ink,
            lineHeight: 1.05,
          },
          content.title
        ),
        h(
          "div",
          { fontSize: 34, fontWeight: 400, color: c.muted, lineHeight: 1.3, marginTop: 24 },
          content.tagline
        ),
      ]

  const left = h(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexGrow: 1,
      flexShrink: 1,
      paddingRight: 48,
    },
    [
      brand,
      h("div", { display: "flex", flexDirection: "column" }, headline),
      h("div", { fontSize: 28, fontWeight: 700, color: c.muted }, content.footer),
    ]
  )

  const right = h(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      width: 420,
      borderRadius: 28,
      backgroundColor: c.card,
      border: `2px solid ${c.grid}`,
    },
    [
      h(
        "svg",
        {},
        [
          ...gridLines,
          h("path", {}, undefined, {
            d,
            fill: c.brandSoft,
            stroke: c.brand,
            strokeWidth: 6,
            strokeLinejoin: "round",
          }),
        ],
        {
          width: ENVELOPE_BOX.width,
          height: ENVELOPE_BOX.height,
          viewBox: `0 0 ${ENVELOPE_BOX.width} ${ENVELOPE_BOX.height}`,
        }
      ),
      h(
        "div",
        { fontSize: 24, fontWeight: 700, color: c.muted, marginTop: 20 },
        content.envelopeLabel
      ),
    ]
  )

  return h(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      backgroundColor: c.background,
      fontFamily: "Inter",
    },
    [
      h("div", { display: "flex", height: 14, backgroundColor: c.brand, flexShrink: 0 }),
      h("div", { display: "flex", flexGrow: 1, alignItems: "stretch", padding: "52px 64px 56px" }, [
        left,
        right,
      ]),
    ]
  )
}
