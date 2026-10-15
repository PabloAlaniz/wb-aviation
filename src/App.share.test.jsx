import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import App from "./App"
import { encodeSharedCalculation } from "./utils/shareLink"

/** @param {string} search */
function openUrl(search) {
  window.history.replaceState(null, "", `/${search}`)
}

describe("App: shared calculation links", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    openUrl("")
  })

  it("loads a shared calculation from ?s= and removes the param from the URL", () => {
    const s = encodeSharedCalculation({
      aircraftId: "cessna-172s",
      weights: { pilot: "180" },
      fuelBurn: "60",
      units: "imperial",
    })
    openUrl(`?s=${s}&keep=1`)

    render(<App />)

    expect(screen.getByText(/Cessna 172S Skyhawk - Peso y Centrado/)).toBeInTheDocument()
    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(180)
    // 1663 + 180
    expect(screen.getByText("1843.0 lbs")).toBeInTheDocument()
    expect(screen.getByLabelText(/Combustible a consumir/)).toHaveValue(60)
    expect(screen.getByText("Se cargó un cálculo compartido.")).toBeInTheDocument()
    expect(window.location.search).toBe("?keep=1")

    // persisted locally, so a reload without the param keeps it
    expect(JSON.parse(window.localStorage.getItem("wb-selected-aircraft") ?? "null")).toBe(
      "cessna-172s"
    )
  })

  it("applies the shared units", () => {
    openUrl(
      `?s=${encodeSharedCalculation({ aircraftId: "cessna-172s", weights: {}, fuelBurn: "", units: "metric" })}`
    )

    render(<App />)

    expect(screen.getByLabelText("Piloto (kg)")).toBeInTheDocument()
  })

  it("saves and selects an embedded custom aircraft", () => {
    openUrl(
      `?s=${encodeSharedCalculation({
        aircraftId: "custom:LV-ABC",
        weights: { pilot: "100" },
        fuelBurn: "",
        units: "imperial",
        customRecords: [
          { baseModelId: "cessna-172s", registration: "LV-ABC", emptyWeight: 1700, emptyArm: 40 },
        ],
      })}`
    )

    render(<App />)

    expect(screen.getByText(/LV-ABC \(Cessna 172S Skyhawk\) - Peso y Centrado/)).toBeInTheDocument()
    expect(screen.getByText("1800.0 lbs")).toBeInTheDocument()
    expect(window.localStorage.getItem("wb-custom-aircraft")).toContain("LV-ABC")
  })

  it("never overwrites a saved aircraft with different weighing data", () => {
    window.localStorage.setItem(
      "wb-custom-aircraft",
      JSON.stringify([
        { baseModelId: "cessna-172s", registration: "LV-ABC", emptyWeight: 1650, emptyArm: 39 },
      ])
    )
    openUrl(
      `?s=${encodeSharedCalculation({
        aircraftId: "custom:LV-ABC",
        weights: {},
        fuelBurn: "",
        units: "imperial",
        customRecords: [
          { baseModelId: "cessna-172s", registration: "LV-ABC", emptyWeight: 1700, emptyArm: 40 },
        ],
      })}`
    )

    render(<App />)

    expect(screen.getByText(/ya tenés guardada/)).toBeInTheDocument()
    expect(screen.getByText(/King Air Echo 90.*Peso y Centrado/)).toBeInTheDocument()
    expect(window.localStorage.getItem("wb-custom-aircraft")).toContain("1650")
    expect(window.location.search).toBe("")
  })

  it("ignores an invalid link, keeps local state and the notice can be dismissed", () => {
    window.localStorage.setItem("wb-weights", JSON.stringify({ pilot: "150" }))
    openUrl("?s=not-a-valid-payload")

    render(<App />)

    expect(
      screen.getByText("El enlace compartido no es válido o está incompleto.")
    ).toBeInTheDocument()
    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(150)
    expect(window.location.search).toBe("")

    fireEvent.click(screen.getByRole("button", { name: "Cerrar aviso" }))
    expect(screen.queryByText(/no es válido/)).toBeNull()
  })

  it("does nothing without a share param", () => {
    render(<App />)

    expect(screen.queryByRole("button", { name: "Cerrar aviso" })).toBeNull()
  })

  it("offers a share button for the current calculation", () => {
    render(<App />)

    expect(
      screen.getByRole("button", { name: "Compartir enlace a este cálculo" })
    ).toBeInTheDocument()
  })
})
