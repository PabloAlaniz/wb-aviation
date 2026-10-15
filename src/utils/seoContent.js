/**
 * Build-time helpers that turn aircraft data + i18n `seo` messages into the
 * static, indexable content of the Astro pages (tables, FAQ, JSON-LD).
 * Pure: no DOM, no globals.
 */
import { resolveStationLabel } from "./stationLabel"
import { KG_PER_LB } from "./units"

/** @typedef {import("../types").Aircraft} Aircraft */
/** @typedef {typeof import("../i18n/es").es} Messages */

/**
 * @param {number} value
 * @param {string} locale - BCP 47 tag (e.g. "es")
 * @param {number} [maxFractionDigits]
 * @param {number} [minFractionDigits]
 */
export function formatNumber(value, locale, maxFractionDigits = 1, minFractionDigits = 0) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  }).format(value)
}

/**
 * "2,550 lbs (1,157 kg)" in the locale's number format.
 * @param {number} lbs
 * @param {string} locale
 */
export function formatWeight(lbs, locale) {
  return `${formatNumber(lbs, locale, 0)} lbs (${formatNumber(lbs * KG_PER_LB, locale, 0)} kg)`
}

/**
 * Arm in inches, e.g. `47.3"`.
 * @param {number} inches
 * @param {string} locale
 */
export function formatArm(inches, locale) {
  return `${formatNumber(inches, locale, 2, 1)}"`
}

/**
 * Rows of the stations table, in load-form order.
 * @param {Aircraft} aircraft
 * @param {Messages} messages
 * @returns {{ key: string, label: string, arm: number | null, max: number | null }[]}
 */
export function stationRows(aircraft, messages) {
  return aircraft.loadStations.map((station) => {
    const arm = aircraft.stations[station.key]
    return {
      key: station.key,
      label: resolveStationLabel(station, messages),
      arm: typeof arm === "number" ? arm : null,
      max: typeof station.max === "number" ? station.max : null,
    }
  })
}

/**
 * Envelope vertices without the closing point that repeats the first one.
 * @param {Aircraft} aircraft
 * @returns {import("../types").EnvelopePoint[]}
 */
export function envelopeRows(aircraft) {
  const points = aircraft.cgEnvelope.points
  if (points.length < 2) return [...points]
  const first = points[0]
  const last = points[points.length - 1]
  const closed = first.arm === last.arm && first.weight === last.weight
  return closed ? points.slice(0, -1) : [...points]
}

/**
 * Localized label for the data reliability level.
 * @param {Aircraft} aircraft
 * @param {Messages} messages
 */
export function reliabilityLabel(aircraft, messages) {
  const s = messages.seo.aircraft
  switch (aircraft.metadata.dataReliability) {
    case "verified-complete":
      return s.reliabilityVerifiedComplete
    case "verified-partial":
      return s.reliabilityVerifiedPartial
    default:
      return s.reliabilityEstimated
  }
}

/**
 * Question/answer pairs for the aircraft page (also used for FAQPage JSON-LD).
 * @param {Aircraft} aircraft
 * @param {Messages} messages
 * @param {string} locale
 * @returns {{ question: string, answer: string }[]}
 */
export function aircraftFaq(aircraft, messages, locale) {
  const s = messages.seo.aircraft
  const name = aircraft.name
  const forward = formatArm(aircraft.cgLimits.forward, locale)
  const aft = formatArm(aircraft.cgLimits.aft, locale)
  return [
    { question: s.faqWhatQ(name), answer: s.faqWhatA(name) },
    {
      question: s.faqMaxWeightQ(name),
      answer: s.faqMaxWeightA(name, formatWeight(aircraft.maxWeight, locale), aircraft.tcds),
    },
    { question: s.faqCgQ(name), answer: s.faqCgA(name, forward, aft) },
    { question: s.faqOwnQ(name), answer: s.faqOwnA(name) },
  ]
}

/**
 * schema.org SoftwareApplication (free web app).
 * @param {{ name: string, description: string, url: string, locale: string }} input
 */
export function softwareApplicationJsonLd({ name, description, url, locale }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    inLanguage: locale,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: "Pablo Alaniz", url: "https://github.com/PabloAlaniz" },
  }
}

/**
 * schema.org FAQPage.
 * @param {{ question: string, answer: string }[]} faq
 */
export function faqPageJsonLd(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }
}

/**
 * Serialize JSON-LD for a <script type="application/ld+json"> body, escaping
 * "<" so data can never close the script element.
 * @param {unknown} data
 */
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
