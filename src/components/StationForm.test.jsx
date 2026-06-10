import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { StationForm } from "./StationForm"

const aircraft = {
  loadStations: [
    { key: "pilot", label: "Piloto (lbs)", placeholder: "200" },
    { key: "copilot", label: "Copiloto (lbs)", placeholder: "200" },
    { key: "fuel", label: "Combustible (lbs)", placeholder: "1500", fullWidth: true },
  ],
}

describe("StationForm", () => {
  it("renders one input per load station", () => {
    render(<StationForm aircraft={aircraft} weights={{}} onWeightChange={() => {}} />)

    expect(screen.getByLabelText("Piloto (lbs)")).toBeInTheDocument()
    expect(screen.getByLabelText("Copiloto (lbs)")).toBeInTheDocument()
    expect(screen.getByLabelText("Combustible (lbs)")).toBeInTheDocument()
  })

  it("shows current weight values", () => {
    render(<StationForm aircraft={aircraft} weights={{ pilot: "180" }} onWeightChange={() => {}} />)

    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(180)
  })

  it("calls onWeightChange with station key and value on input", () => {
    const onWeightChange = vi.fn()
    render(<StationForm aircraft={aircraft} weights={{}} onWeightChange={onWeightChange} />)

    fireEvent.change(screen.getByLabelText("Combustible (lbs)"), { target: { value: "500" } })

    expect(onWeightChange).toHaveBeenCalledWith("fuel", "500")
  })

  it("renders empty string for stations without value", () => {
    render(<StationForm aircraft={aircraft} weights={{}} onWeightChange={() => {}} />)

    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(null)
  })
})
