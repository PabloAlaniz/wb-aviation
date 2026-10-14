import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, fireEvent, within } from "@testing-library/react"
import App from "./App"

describe("App (integración)", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("renders the calculator with the default aircraft", () => {
    render(<App />)

    expect(screen.getByText(/King Air Echo 90.*Peso y Centrado/)).toBeInTheDocument()
    expect(screen.getByLabelText("Piloto (lbs)")).toBeInTheDocument()
  })

  it("shows empty-aircraft results on load (empty weight only)", () => {
    render(<App />)

    // Peso vacío del E90: 6682 lbs
    expect(screen.getByText("6682.0 lbs")).toBeInTheDocument()
    expect(screen.getByText(/AERONAVE LISTA PARA DESPEGUE/)).toBeInTheDocument()
  })

  it("recalculates total weight when a station weight is entered", () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText("Piloto (lbs)"), { target: { value: "180" } })

    expect(screen.getByText("6862.0 lbs")).toBeInTheDocument()
  })

  it("rejects takeoff when fuel load exceeds max weight", () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText("Combustible (lbs)"), { target: { value: "5000" } })

    expect(screen.getByText(/NO APTO PARA DESPEGUE/)).toBeInTheDocument()
    expect(screen.getByText("EXCESO")).toBeInTheDocument()
  })

  it("shows safety warning when weight approaches the limit", () => {
    render(<App />)

    // 6682 + 3100 = 9782 lbs > 95% de 10100 (9595)
    fireEvent.change(screen.getByLabelText("Combustible (lbs)"), { target: { value: "3100" } })

    expect(screen.getByText(/del máximo permitido/)).toBeInTheDocument()
  })

  it("persists entered weights across remounts", () => {
    const { unmount } = render(<App />)
    fireEvent.change(screen.getByLabelText("Piloto (lbs)"), { target: { value: "180" } })
    unmount()

    render(<App />)

    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(180)
  })

  it("switches aircraft: updates stations and resets weights", () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText("Piloto (lbs)"), { target: { value: "180" } })

    fireEvent.click(screen.getByLabelText("Tipo de Aeronave"))
    fireEvent.click(screen.getByText("Cessna 172S Skyhawk"))

    // título y estaciones del C172
    expect(screen.getByText(/Cessna 172S Skyhawk - Peso y Centrado/)).toBeInTheDocument()
    expect(screen.getByLabelText("Pasajero trasero 1 (lbs)")).toBeInTheDocument()
    // los pesos se resetean y el total es el peso vacío del C172
    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(null)
    expect(screen.getByText("1663.0 lbs")).toBeInTheDocument()
  })

  it("persists the selected aircraft across remounts", () => {
    const { unmount } = render(<App />)
    fireEvent.click(screen.getByLabelText("Tipo de Aeronave"))
    fireEvent.click(screen.getByText("Cessna 172S Skyhawk"))
    unmount()

    render(<App />)

    expect(screen.getByText(/Cessna 172S Skyhawk - Peso y Centrado/)).toBeInTheDocument()
  })

  it("clears weights with the reset button", () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText("Piloto (lbs)"), { target: { value: "180" } })

    fireEvent.click(screen.getByText("Limpiar pesos"))

    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(null)
    expect(screen.getByText("6682.0 lbs")).toBeInTheDocument()
  })
})

describe("App: fuel burn, landing and zero-fuel", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("shows landing and zero-fuel weights for a planned burn", () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText("Combustible (lbs)"), { target: { value: "1500" } })
    fireEvent.change(screen.getByLabelText(/Combustible a consumir/), { target: { value: "800" } })

    // 6682 + 1500 = 8182 al despegue; 7382 al aterrizar; 6682 sin combustible
    expect(within(screen.getByTestId("phase-takeoff")).getByText("8182.0")).toBeInTheDocument()
    expect(within(screen.getByTestId("phase-landing")).getByText("7382.0")).toBeInTheDocument()
    expect(within(screen.getByTestId("phase-zeroFuel")).getByText("6682.0")).toBeInTheDocument()
    expect(screen.getByText(/ATERRIZAJE DENTRO DE LÍMITES/)).toBeInTheDocument()
  })

  it("rejects landing when the burn exceeds the fuel loaded", () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText("Combustible (lbs)"), { target: { value: "500" } })
    fireEvent.change(screen.getByLabelText(/Combustible a consumir/), { target: { value: "800" } })

    expect(screen.getByText(/ATERRIZAJE FUERA DE LÍMITES/)).toBeInTheDocument()
    expect(screen.getByText(/supera el combustible cargado \(500 lbs\)/)).toBeInTheDocument()
  })

  it("persists the planned fuel burn across remounts", () => {
    const { unmount } = render(<App />)
    fireEvent.change(screen.getByLabelText(/Combustible a consumir/), { target: { value: "300" } })
    unmount()

    render(<App />)

    expect(screen.getByLabelText(/Combustible a consumir/)).toHaveValue(300)
  })
})
