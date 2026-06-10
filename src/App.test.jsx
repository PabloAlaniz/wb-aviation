import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import App from "./App"

describe("App (integración)", () => {
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
})
