import { describe, it, expect } from "vitest"
import { resolveStationLabel } from "./stationLabel"
import { es } from "../i18n/es"
import { en } from "../i18n/en"
import { pt } from "../i18n/pt"

describe("resolveStationLabel", () => {
  it("resolves labelKey in each locale", () => {
    const station = { key: "pilot", labelKey: "stations.pilot" }

    expect(resolveStationLabel(station, es)).toBe("Piloto")
    expect(resolveStationLabel(station, en)).toBe("Pilot")
    expect(resolveStationLabel(station, pt)).toBe("Piloto")
    expect(resolveStationLabel({ key: "fuel", labelKey: "stations.fuel" }, pt)).toBe("Combustível")
  })

  it("falls back to the raw label when the key is unknown or missing", () => {
    expect(resolveStationLabel({ key: "x", labelKey: "stations.nope", label: "Bodega" }, es)).toBe(
      "Bodega"
    )
    expect(resolveStationLabel({ key: "x", label: "Bodega" }, es)).toBe("Bodega")
  })

  it("does not resolve keys that point at non-string messages", () => {
    expect(resolveStationLabel({ key: "x", labelKey: "stations", label: "L" }, es)).toBe("L")
    expect(resolveStationLabel({ key: "x", labelKey: "app.title", label: "L" }, es)).toBe("L")
  })

  it("falls back to the station key as a last resort", () => {
    expect(resolveStationLabel({ key: "cargo" }, es)).toBe("cargo")
  })
})
