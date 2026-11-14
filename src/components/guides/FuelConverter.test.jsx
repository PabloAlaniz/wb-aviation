import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import FuelConverter from "./FuelConverter"

const shown = (/** @type {string} */ unit) =>
  screen.getByTestId(`fuel-converter-${unit}`).textContent

describe("FuelConverter", () => {
  it("starts with 100 L of AVGAS in every other unit", () => {
    render(<FuelConverter lang="es" />)

    expect(shown("usGal")).toBe("26,4 gal US")
    expect(shown("lb")).toBe("158,5 lb")
    expect(shown("kg")).toBe("71,9 kg")
    expect(screen.queryByTestId("fuel-converter-l")).not.toBeInTheDocument()
  })

  it("converts with Jet A density and from any unit", () => {
    render(<FuelConverter lang="en" />)

    fireEvent.click(screen.getByRole("button", { name: "Jet A (6.7 lb/US gal)" }))
    expect(shown("lb")).toBe("177 lb")

    fireEvent.change(screen.getByLabelText("Unit"), { target: { value: "usGal" } })
    fireEvent.change(screen.getByLabelText("Amount"), { target: { value: "50" } })
    expect(shown("lb")).toBe("335 lb")
    expect(shown("l")).toBe("189.3 L")
  })

  it("shows dashes for an empty or negative amount", () => {
    render(<FuelConverter lang="pt" />)

    fireEvent.change(screen.getByLabelText("Quantidade"), { target: { value: "" } })
    expect(shown("lb")).toBe("— lb")
  })

  it("draws the conversion diagram for the selected fuel", () => {
    render(<FuelConverter lang="es" />)
    const edge = (/** @type {string} */ id) => screen.getByTestId(`fuel-edge-${id}`).textContent

    expect(edge("usGal-lb")).toBe("6,00")
    expect(edge("l-kg")).toBe("0,719")
    expect(edge("impGal-usGal")).toBe("1,20")

    fireEvent.click(screen.getByRole("button", { name: "Jet A (6,7 lb/gal US)" }))
    expect(edge("usGal-lb")).toBe("6,70")
    expect(edge("l-kg")).toBe("0,803")
    // unit-only factors don't change with the fuel
    expect(edge("impGal-usGal")).toBe("1,20")
    expect(screen.getByRole("img", { name: /Jet A/ })).toBeInTheDocument()
  })
})
