import { describe, it, expect } from "vitest"
import { aircraftData } from "../data/aircraft"
import { es } from "../i18n/es"
import { en } from "../i18n/en"
import {
  aircraftFaq,
  articleJsonLd,
  breadcrumbJsonLd,
  howToJsonLd,
  envelopeRows,
  faqPageJsonLd,
  formatArm,
  formatNumber,
  formatWeight,
  reliabilityLabel,
  serializeJsonLd,
  softwareApplicationJsonLd,
  stationRows,
} from "./seoContent"

const cessna = aircraftData["cessna-172s"]

describe("formatting", () => {
  it("uses the locale's decimal separator", () => {
    expect(formatNumber(47.3, "es")).toBe("47,3")
    expect(formatNumber(47.3, "en")).toBe("47.3")
    expect(formatNumber(37, "en", 2, 1)).toBe("37.0")
  })

  it("formats weights in lbs with the kg equivalent", () => {
    expect(formatWeight(2550, "en")).toBe("2,550 lbs (1,157 kg)")
  })

  it("formats arms in inches with one decimal at least", () => {
    expect(formatArm(35, "en")).toBe('35.0"')
    expect(formatArm(151.0415, "en")).toBe('151.04"')
  })
})

describe("stationRows", () => {
  it("lists every load station in form order with its arm and label", () => {
    const rows = stationRows(cessna, es)
    expect(rows.map((r) => r.key)).toEqual(cessna.loadStations.map((s) => s.key))
    expect(rows[0]).toEqual({ key: "pilot", label: "Piloto", arm: 37, max: null })
    expect(rows.find((r) => r.key === "baggage1")).toMatchObject({ arm: 95, max: 120 })
  })

  it("translates labels", () => {
    expect(stationRows(cessna, en)[0].label).toBe(en.stations.pilot)
  })
})

describe("envelopeRows", () => {
  it("drops the closing point of the polygon", () => {
    const rows = envelopeRows(cessna)
    expect(rows).toHaveLength(cessna.cgEnvelope.points.length - 1)
    expect(rows[0]).toEqual(cessna.cgEnvelope.points[0])
  })

  it("keeps open polygons untouched", () => {
    const open = {
      ...cessna,
      cgEnvelope: {
        points: [
          { arm: 1, weight: 1 },
          { arm: 2, weight: 2 },
        ],
      },
    }
    expect(envelopeRows(open)).toHaveLength(2)
  })
})

describe("reliabilityLabel", () => {
  it("maps each reliability level to its message", () => {
    expect(reliabilityLabel(cessna, es)).toBe(es.seo.aircraft.reliabilityEstimated)
    expect(reliabilityLabel(aircraftData["king-air-echo-90"], es)).toBe(
      es.seo.aircraft.reliabilityVerifiedComplete
    )
    const partial = {
      ...cessna,
      metadata: { ...cessna.metadata, dataReliability: /** @type {const} */ ("verified-partial") },
    }
    expect(reliabilityLabel(partial, es)).toBe(es.seo.aircraft.reliabilityVerifiedPartial)
  })
})

describe("aircraftFaq", () => {
  it("builds localized Q&A from the aircraft data", () => {
    const faq = aircraftFaq(cessna, en, "en")
    expect(faq).toHaveLength(4)
    expect(faq[1].question).toContain("Cessna 172S Skyhawk")
    expect(faq[1].answer).toContain("2,550 lbs")
    expect(faq[1].answer).toContain(cessna.tcds)
    expect(faq[2].answer).toContain('35.0"')
    expect(faq[2].answer).toContain('47.3"')
  })
})

describe("JSON-LD", () => {
  it("describes a free SoftwareApplication", () => {
    const data = softwareApplicationJsonLd({
      name: "CheckCG",
      description: "d",
      url: "https://example.com/en/",
      locale: "en",
    })
    expect(data["@type"]).toBe("SoftwareApplication")
    expect(data.offers).toEqual({ "@type": "Offer", price: "0", priceCurrency: "USD" })
  })

  it("maps the FAQ to a FAQPage", () => {
    const data = faqPageJsonLd([{ question: "Q?", answer: "A." }])
    expect(data.mainEntity).toEqual([
      { "@type": "Question", name: "Q?", acceptedAnswer: { "@type": "Answer", text: "A." } },
    ])
  })

  it("escapes < so the data cannot close the script tag", () => {
    const json = serializeJsonLd({ text: "</script><script>alert(1)</script>" })
    expect(json).not.toContain("<")
    expect(JSON.parse(json).text).toBe("</script><script>alert(1)</script>")
  })
})

describe("guide JSON-LD", () => {
  it("describes an Article with author, publisher and dateModified", () => {
    const data = articleJsonLd({
      headline: "H",
      description: "D",
      url: "https://checkcg.com/en/guides/x/",
      locale: "en",
      dateModified: new Date("2026-10-15"),
      siteName: "CheckCG",
      siteUrl: "https://checkcg.com/",
    })
    expect(data["@type"]).toBe("Article")
    expect(data.inLanguage).toBe("en")
    expect(data.dateModified).toBe("2026-10-15")
    expect(data.author.name).toBe("Pablo Alaniz")
    expect(data.publisher).toEqual({
      "@type": "Organization",
      name: "CheckCG",
      url: "https://checkcg.com/",
    })
    expect(data.mainEntityOfPage["@id"]).toBe("https://checkcg.com/en/guides/x/")
  })

  it("numbers the HowTo steps", () => {
    const data = howToJsonLd({
      name: "N",
      description: "D",
      url: "u",
      locale: "es",
      steps: [
        { name: "a", text: "A" },
        { name: "b", text: "B" },
      ],
    })
    expect(data["@type"]).toBe("HowTo")
    expect(data.step).toEqual([
      { "@type": "HowToStep", position: 1, name: "a", text: "A" },
      { "@type": "HowToStep", position: 2, name: "b", text: "B" },
    ])
  })

  it("builds a BreadcrumbList in order", () => {
    const data = breadcrumbJsonLd([
      { name: "Home", url: "https://checkcg.com/en/" },
      { name: "Guides", url: "https://checkcg.com/en/guides/" },
    ])
    expect(data.itemListElement.map((i) => [i.position, i.name, i.item])).toEqual([
      [1, "Home", "https://checkcg.com/en/"],
      [2, "Guides", "https://checkcg.com/en/guides/"],
    ])
  })
})
