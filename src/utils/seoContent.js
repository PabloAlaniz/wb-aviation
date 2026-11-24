/**
 * Build-time helpers that turn aircraft data + i18n `seo` messages into the
 * static, indexable content of the Astro pages (tables, FAQ, JSON-LD).
 * Pure: no DOM, no globals.
 */
import { resolveStationLabel } from "./stationLabel"
import { KG_PER_LB } from "./units"
import { SITE_URL } from "./routes.js"

/** Stable @id of the site (schema.org WebSite), shared by every page. */
export const WEBSITE_ID = `${SITE_URL}/#website`

/** Stable @id of the author / publisher (schema.org Person). */
export const AUTHOR_ID = `${SITE_URL}/#author`

/**
 * The author and publisher of the site. Carries its @id so every mention on
 * every page resolves to the same entity.
 */
export const AUTHOR = {
  "@type": "Person",
  "@id": AUTHOR_ID,
  name: "Pablo Alaniz",
  url: "https://github.com/PabloAlaniz",
}

/** Reference to the WebSite entity from another node. */
const WEBSITE_REF = { "@id": WEBSITE_ID }

/**
 * schema.org WebSite (one entity for the whole site; rendered on the home
 * pages and referenced by @id from everything else).
 * @param {{ name: string, description: string, locales: readonly string[] }} input
 */
export function webSiteJsonLd({ name, description, locales }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name,
    description,
    url: `${SITE_URL}/`,
    inLanguage: [...locales],
    publisher: AUTHOR,
  }
}

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
 * @param {{ name: string, description: string, url: string, locale: string,
 *   image?: string }} input - `image`: absolute URL of the social preview
 */
export function softwareApplicationJsonLd({ name, description, url, locale, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#app`,
    name,
    description,
    url,
    ...(image ? { image } : {}),
    inLanguage: locale,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: AUTHOR,
    isPartOf: WEBSITE_REF,
  }
}

/**
 * schema.org Dataset for the reference weight and balance data of one
 * aircraft (the stations and envelope tables of its page).
 * @param {{ aircraft: Aircraft, name: string, description: string, url: string,
 *   locale: string, variables: string[] }} input - `variables`: localized
 *   names of what the tables hold (arms, maximum loads, envelope points...)
 */
export function aircraftDatasetJsonLd({ aircraft, name, description, url, locale, variables }) {
  const modified = aircraft.dataValidation?.lastUpdated
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${url}#data`,
    name,
    description,
    url,
    inLanguage: locale,
    isAccessibleForFree: true,
    license: "https://opensource.org/license/mit",
    creator: AUTHOR,
    ...(modified ? { dateModified: modified } : {}),
    keywords: [aircraft.name, aircraft.tcds, aircraft.metadata.manufacturer],
    variableMeasured: variables,
    isBasedOn: aircraft.metadata.sourceDocuments,
    includedInDataCatalog: WEBSITE_REF,
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

/**
 * ISO date (YYYY-MM-DD) of a build-time date.
 * @param {Date} date
 */
export function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

/**
 * schema.org Article (guides).
 * @param {{ headline: string, description: string, url: string, locale: string,
 *   datePublished: Date, dateModified: Date, image: string }} input -
 *   `image`: absolute URL of the social preview
 */
export function articleJsonLd({
  headline,
  description,
  url,
  locale,
  datePublished,
  dateModified,
  image,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    image,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: locale,
    datePublished: isoDate(datePublished),
    dateModified: isoDate(dateModified),
    author: AUTHOR,
    publisher: AUTHOR,
    isPartOf: WEBSITE_REF,
  }
}

/**
 * schema.org HowTo (procedural guides).
 * @param {{ name: string, description: string, url: string, locale: string,
 *   steps: { name: string, text: string }[] }} input
 */
export function howToJsonLd({ name, description, url, locale, steps }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url,
    inLanguage: locale,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

/**
 * schema.org BreadcrumbList.
 * @param {{ name: string, url: string }[]} items - from the home page down
 */
export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * schema.org DefinedTermSet (glossary). Every term gets its own @id at the
 * page anchor of its definition.
 * @param {{ name: string, description: string, url: string, locale: string,
 *   terms: { id: string, term: string, text: string }[] }} input
 */
export function definedTermSetJsonLd({ name, description, url, locale, terms }) {
  const setId = `${url}#glossary`
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": setId,
    name,
    description,
    url,
    inLanguage: locale,
    isPartOf: WEBSITE_REF,
    hasDefinedTerm: terms.map(({ id, term, text }) => ({
      "@type": "DefinedTerm",
      "@id": `${url}#${id}`,
      name: term,
      description: text,
      url: `${url}#${id}`,
      inDefinedTermSet: setId,
    })),
  }
}

/**
 * schema.org AboutPage (methodology and data sources).
 * @param {{ name: string, description: string, url: string, locale: string,
 *   dateModified: string }} input - `dateModified`: ISO date
 */
export function aboutPageJsonLd({ name, description, url, locale, dateModified }) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#page`,
    name,
    description,
    url,
    inLanguage: locale,
    dateModified,
    isPartOf: WEBSITE_REF,
    about: WEBSITE_REF,
    author: AUTHOR,
  }
}
