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

  it("links to the aircraft request form on GitHub", () => {
    render(<App />)

    expect(
      screen.getByRole("link", { name: "¿No está tu avión? Pedilo en GitHub" })
    ).toHaveAttribute(
      "href",
      "https://github.com/PabloAlaniz/wb-aviation/issues/new?template=aircraft-request.yml"
    )
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

  it("switches to metric units: inputs in kg, results in kg/mm, same calculation", () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText("Piloto (lbs)"), { target: { value: "180" } })

    fireEvent.click(screen.getByRole("button", { name: "kg · mm" }))

    // el estado sigue en lbs: 180 lbs se muestran como 81.6 kg
    expect(screen.getByLabelText("Piloto (kg)")).toHaveValue(81.6)
    // 6862 lbs = 3112.6 kg
    expect(screen.getByText("3112.6 kg")).toBeInTheDocument()
    expect(screen.getByText(/^Peso vacío: 3030\.9 kg$/)).toBeInTheDocument()

    // ingresar en kg suma al cálculo en lbs: 6682 + 180 + 100 kg (220.46 lbs)
    fireEvent.change(screen.getByLabelText("Copiloto (kg)"), { target: { value: "100" } })
    expect(screen.getByText("3212.6 kg")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "lbs · in" }))
    expect(screen.getByText("7082.5 lbs")).toBeInTheDocument()
  })

  it("persists the unit system across remounts", () => {
    const { unmount } = render(<App />)
    fireEvent.click(screen.getByRole("button", { name: "kg · mm" }))
    unmount()

    render(<App />)

    expect(screen.getByLabelText("Piloto (kg)")).toBeInTheDocument()
    expect(window.localStorage.getItem("wb-units")).toBe('"metric"')
  })

  it("clears weights with the reset button", () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText("Piloto (lbs)"), { target: { value: "180" } })

    fireEvent.click(screen.getByText("Limpiar pesos"))

    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(null)
    expect(screen.getByText("6682.0 lbs")).toBeInTheDocument()
  })

  describe("custom aircraft by registration", () => {
    function addCustomC172(registration = "lv-abc", emptyWeight = "1700", emptyArm = "40") {
      fireEvent.click(screen.getByLabelText("Modelo base"))
      fireEvent.click(screen.getByRole("option", { name: "Cessna 172S Skyhawk" }))
      fireEvent.change(screen.getByLabelText("Matrícula"), { target: { value: registration } })
      fireEvent.change(screen.getByLabelText("Peso vacío (lbs)"), {
        target: { value: emptyWeight },
      })
      fireEvent.change(screen.getByLabelText("Brazo del peso vacío (in)"), {
        target: { value: emptyArm },
      })
      fireEvent.click(screen.getByRole("button", { name: /Guardar aeronave/ }))
    }

    it("selects a newly saved aircraft and uses its own empty weight", () => {
      render(<App />)

      addCustomC172()

      expect(
        screen.getByText(/LV-ABC \(Cessna 172S Skyhawk\) - Peso y Centrado/)
      ).toBeInTheDocument()
      expect(screen.getByLabelText("Pasajero trasero 1 (lbs)")).toBeInTheDocument()
      expect(screen.getByText("1700.0 lbs")).toBeInTheDocument()
    })

    it("offers saved aircraft in the selector and persists them across remounts", () => {
      const { unmount } = render(<App />)
      addCustomC172()
      unmount()

      render(<App />)

      expect(
        screen.getByText(/LV-ABC \(Cessna 172S Skyhawk\) - Peso y Centrado/)
      ).toBeInTheDocument()
      fireEvent.click(screen.getByLabelText("Tipo de Aeronave"))
      expect(
        screen.getByRole("option", { name: "LV-ABC (Cessna 172S Skyhawk)" })
      ).toBeInTheDocument()
    })

    it("falls back to the default aircraft when the selected one is deleted", () => {
      render(<App />)
      addCustomC172()

      fireEvent.click(screen.getByRole("button", { name: "Eliminar LV-ABC" }))

      expect(screen.getByText(/King Air Echo 90.*Peso y Centrado/)).toBeInTheDocument()
      expect(screen.getByText("6682.0 lbs")).toBeInTheDocument()
    })

    it("falls back to the default aircraft for an unknown stored custom id", () => {
      window.localStorage.setItem("wb-selected-aircraft", JSON.stringify("custom:GONE"))

      render(<App />)

      expect(screen.getByText(/King Air Echo 90.*Peso y Centrado/)).toBeInTheDocument()
    })
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
