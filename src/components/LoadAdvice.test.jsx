import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, fireEvent, within } from "@testing-library/react"
import App from "../App"
import { LoadAdvice } from "./LoadAdvice"
import { aircraftData } from "../data/aircraft"

const c172 = aircraftData["cessna-172s"]

describe("LoadAdvice", () => {
  it("renders nothing without advice", () => {
    const { container } = render(<LoadAdvice advice={null} aircraft={c172} />)
    expect(container).toBeEmptyDOMElement()
  })

  it("describes the CG deviation and each option with station names", () => {
    const advice = {
      overweightBy: null,
      cgForwardBy: null,
      cgAftBy: 0.5,
      options: [
        { kind: "move", from: "baggage2", to: "baggage1", amount: 20 },
        { kind: "remove", station: "fuel", amount: 35 },
      ],
    }
    render(<LoadAdvice advice={advice} aircraft={c172} />)
    const box = screen.getByTestId("load-advice")
    expect(box).toHaveTextContent('El CG está 0.5" detrás del límite para este peso.')
    expect(box).toHaveTextContent("Mover 20 lbs de Equipaje área 2 a Equipaje área 1")
    expect(box).toHaveTextContent("Quitar 35 lbs de Combustible")
  })

  it("converts to metric units", () => {
    const advice = {
      overweightBy: 100,
      cgForwardBy: null,
      cgAftBy: null,
      options: [{ kind: "remove", station: "fuel", amount: 46 / 0.45359237 }],
    }
    render(<LoadAdvice advice={advice} aircraft={c172} units="metric" />)
    const box = screen.getByTestId("load-advice")
    // 100 lbs = 45.36 kg, rounded up
    expect(box).toHaveTextContent("supera el máximo por 46 kg")
    expect(box).toHaveTextContent("Quitar 46 kg de Combustible")
  })

  it("says so when no single change fixes it", () => {
    const advice = { overweightBy: null, cgForwardBy: 1, cgAftBy: null, options: [] }
    render(<LoadAdvice advice={advice} aircraft={c172} />)
    expect(screen.getByTestId("load-advice")).toHaveTextContent(/Ningún cambio único/)
  })
})

describe("load advice (integración)", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("appears with the takeoff verdict when overweight and goes away once fixed", () => {
    render(<App />)
    expect(screen.queryByTestId("load-advice")).not.toBeInTheDocument()

    // E90: 6682 + 5000 = 11682 lbs, 1582 over the 10100 lbs maximum
    fireEvent.change(screen.getByLabelText("Combustible (lbs)"), { target: { value: "5000" } })

    const box = screen.getByTestId("load-advice")
    expect(box).toHaveTextContent("supera el máximo por 1582 lbs")
    expect(within(box).getByText("Quitar 1582 lbs de Combustible")).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText("Combustible (lbs)"), { target: { value: "3418" } })
    expect(screen.queryByTestId("load-advice")).not.toBeInTheDocument()
  })
})
