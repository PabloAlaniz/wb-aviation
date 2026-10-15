import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import App from "./App"
import { encodeFleet } from "./utils/fleetLink"

const fleetRecords = [
  { baseModelId: "cessna-172s", registration: "LV-ABC", emptyWeight: 1700, emptyArm: 40.5 },
  { baseModelId: "cessna-172s", registration: "LV-XYZ", emptyWeight: 1650, emptyArm: 39.8 },
]

/** @param {string} url */
function visit(url) {
  window.history.replaceState(null, "", url)
}

describe("App: fleet link import", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    visit("/")
  })

  it("does not show the import panel without a fleet param", () => {
    render(<App />)

    expect(screen.queryByRole("heading", { name: "Importar flota" })).not.toBeInTheDocument()
  })

  it("shows the shared fleet and imports it into the aircraft selector", () => {
    visit(`/?fleet=${encodeFleet(fleetRecords, "Aeroclub X")}&ref=keep`)
    render(<App />)

    expect(screen.getByRole("heading", { name: "Importar flota" })).toBeInTheDocument()
    expect(screen.getByText("Aeroclub X compartió su flota con vos.")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Importar 2 aeronaves" }))

    expect(screen.getByText("Se importaron 2 aeronaves.")).toBeInTheDocument()
    expect(window.location.search).toBe("?ref=keep")

    fireEvent.click(screen.getByLabelText("Tipo de Aeronave"))
    expect(screen.getByText("LV-ABC (Cessna 172S Skyhawk)")).toBeInTheDocument()
    expect(screen.getByText("LV-XYZ (Cessna 172S Skyhawk)")).toBeInTheDocument()
    expect(JSON.parse(window.localStorage.getItem("wb-custom-aircraft") ?? "[]")).toEqual(
      fleetRecords
    )
  })

  it("overwrites an existing registration on import", () => {
    window.localStorage.setItem(
      "wb-custom-aircraft",
      JSON.stringify([{ ...fleetRecords[0], emptyWeight: 1500 }])
    )
    visit(`/?fleet=${encodeFleet([fleetRecords[0]])}`)
    render(<App />)

    expect(screen.getByText("Reemplaza la guardada")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "Importar 1 aeronave" }))

    expect(JSON.parse(window.localStorage.getItem("wb-custom-aircraft") ?? "[]")).toEqual([
      fleetRecords[0],
    ])
  })

  it("dismissing leaves saved aircraft untouched and clears the param", () => {
    visit(`/?fleet=${encodeFleet(fleetRecords)}`)
    render(<App />)

    fireEvent.click(screen.getByRole("button", { name: "Descartar" }))

    expect(screen.queryByRole("heading", { name: "Importar flota" })).not.toBeInTheDocument()
    expect(window.location.search).toBe("")
    expect(window.localStorage.getItem("wb-custom-aircraft")).toBeNull()
  })

  it("reports a damaged link", () => {
    visit("/?fleet=not-a-real-fleet")
    render(<App />)

    expect(screen.getByRole("alert")).toHaveTextContent("El link de flota no es válido")
  })

  it("renders the branding footer", () => {
    render(<App />)

    expect(screen.getByRole("link", { name: "Pablo Alaniz" })).toBeInTheDocument()
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
  })
})
