import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ResultsPanel, TakeoffVerdict } from "./ResultsPanel"

const okResults = {
  totalWeight: 8000,
  centerOfGravity: 152.25,
  isWeightOk: true,
  isCgOk: true,
}

describe("ResultsPanel", () => {
  it("shows total weight and CG values", () => {
    render(<ResultsPanel results={okResults} />)

    expect(screen.getByText("8000.0 lbs")).toBeInTheDocument()
    expect(screen.getByText('152.25"')).toBeInTheDocument()
  })

  it("shows OK badges when within limits", () => {
    render(<ResultsPanel results={okResults} />)

    expect(screen.getAllByText("OK")).toHaveLength(2)
  })

  it("shows EXCESO badge when overweight", () => {
    render(<ResultsPanel results={{ ...okResults, isWeightOk: false }} />)

    expect(screen.getByText("EXCESO")).toBeInTheDocument()
  })

  it("shows FUERA DE LÍMITES badge when CG is out of envelope", () => {
    render(<ResultsPanel results={{ ...okResults, isCgOk: false }} />)

    expect(screen.getByText("FUERA DE LÍMITES")).toBeInTheDocument()
  })
})

describe("TakeoffVerdict", () => {
  it("approves takeoff when weight and CG are ok", () => {
    render(<TakeoffVerdict results={okResults} />)

    expect(screen.getByText(/AERONAVE LISTA PARA DESPEGUE/)).toBeInTheDocument()
  })

  it("rejects takeoff when overweight", () => {
    render(<TakeoffVerdict results={{ ...okResults, isWeightOk: false }} />)

    expect(screen.getByText(/NO APTO PARA DESPEGUE/)).toBeInTheDocument()
    expect(screen.getByText(/Peso excedido/)).toBeInTheDocument()
  })

  it("rejects takeoff when CG is out of limits", () => {
    render(<TakeoffVerdict results={{ ...okResults, isCgOk: false }} />)

    expect(screen.getByText(/NO APTO PARA DESPEGUE/)).toBeInTheDocument()
    expect(screen.getByText(/Centro de gravedad fuera de límites/)).toBeInTheDocument()
  })
})
