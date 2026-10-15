import { describe, it, expect, vi, beforeEach } from "vitest"
import { useState } from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { StationForm } from "./StationForm"

const aircraft = {
  loadStations: [
    { key: "pilot", labelKey: "stations.pilot", placeholder: "200" },
    { key: "copilot", labelKey: "stations.copilot", placeholder: "200" },
    { key: "fuel", labelKey: "stations.fuel", placeholder: "1500", fullWidth: true },
  ],
}

/** Stateful wrapper so tests can type into controlled inputs. */
function Harness({ units, initial = {}, onWeightChange = () => {} }) {
  const [weights, setWeights] = useState(initial)
  return (
    <>
      <StationForm
        aircraft={aircraft}
        weights={weights}
        units={units}
        onWeightChange={(key, value) => {
          onWeightChange(key, value)
          setWeights((prev) => ({ ...prev, [key]: value }))
        }}
      />
      <output data-testid="state">{JSON.stringify(weights)}</output>
    </>
  )
}

describe("StationForm", () => {
  beforeEach(() => {
    window.localStorage.removeItem("wb-fuel-input-mode")
  })

  it("renders one input per load station with translated labels", () => {
    render(<StationForm aircraft={aircraft} weights={{}} onWeightChange={() => {}} />)

    expect(screen.getByLabelText("Piloto (lbs)")).toBeInTheDocument()
    expect(screen.getByLabelText("Copiloto (lbs)")).toBeInTheDocument()
    expect(screen.getByLabelText("Combustible (lbs)")).toBeInTheDocument()
  })

  it("falls back to the raw label for unknown/custom stations", () => {
    const custom = {
      loadStations: [
        { key: "cargo", label: "Bodega", placeholder: "50" },
        { key: "extra", labelKey: "stations.doesNotExist", label: "Extra" },
        { key: "bare" },
      ],
    }
    render(<StationForm aircraft={custom} weights={{}} onWeightChange={() => {}} />)

    expect(screen.getByLabelText("Bodega (lbs)")).toBeInTheDocument()
    expect(screen.getByLabelText("Extra (lbs)")).toBeInTheDocument()
    expect(screen.getByLabelText("bare (lbs)")).toBeInTheDocument()
  })

  it("shows the station max in the label, converted to the display unit", () => {
    const limited = {
      loadStations: [{ key: "baggage1", labelKey: "stations.baggageArea1", max: 120 }],
    }
    const { rerender } = render(
      <StationForm aircraft={limited} weights={{}} onWeightChange={() => {}} />
    )
    expect(screen.getByLabelText("Equipaje área 1 (lbs, máx 120)")).toBeInTheDocument()

    rerender(
      <StationForm aircraft={limited} weights={{}} onWeightChange={() => {}} units="metric" />
    )
    expect(screen.getByLabelText("Equipaje área 1 (kg, máx 54)")).toBeInTheDocument()
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

  describe("metric mode", () => {
    it("labels inputs in kg and converts placeholders", () => {
      render(
        <StationForm aircraft={aircraft} weights={{}} onWeightChange={() => {}} units="metric" />
      )

      expect(screen.getByLabelText("Piloto (kg)")).toHaveAttribute("placeholder", "91")
      expect(screen.getByLabelText("Combustible (kg)")).toBeInTheDocument()
    })

    it("shows stored lbs converted to kg", () => {
      render(
        <StationForm
          aircraft={aircraft}
          weights={{ pilot: "180" }}
          onWeightChange={() => {}}
          units="metric"
        />
      )

      expect(screen.getByLabelText("Piloto (kg)")).toHaveValue(81.6)
    })

    it("stores kg input as lbs and keeps the typed value", () => {
      const onWeightChange = vi.fn()
      render(<Harness units="metric" onWeightChange={onWeightChange} />)

      fireEvent.change(screen.getByLabelText("Piloto (kg)"), { target: { value: "80" } })

      const [key, lbs] = onWeightChange.mock.calls[0]
      expect(key).toBe("pilot")
      expect(Number(lbs)).toBeCloseTo(176.37, 2)
      expect(screen.getByLabelText("Piloto (kg)")).toHaveValue(80)
    })
  })

  describe("fuel by volume", () => {
    it("converts US gallons to lbs at 6 lb/gal", () => {
      const onWeightChange = vi.fn()
      render(<Harness units="imperial" onWeightChange={onWeightChange} />)

      fireEvent.click(screen.getByRole("button", { name: "Volumen (gal)" }))
      fireEvent.change(screen.getByLabelText("Combustible (gal)"), { target: { value: "50" } })

      expect(onWeightChange).toHaveBeenLastCalledWith("fuel", "300")
      expect(screen.getByText(/Equivale a 300\.0 lbs/)).toBeInTheDocument()
      expect(screen.getByText(/6\.0 lb\/gal/)).toBeInTheDocument()
    })

    it("converts litres to lbs in metric mode", () => {
      const onWeightChange = vi.fn()
      render(<Harness units="metric" onWeightChange={onWeightChange} />)

      fireEvent.click(screen.getByRole("button", { name: "Volumen (L)" }))
      fireEvent.change(screen.getByLabelText("Combustible (L)"), { target: { value: "100" } })

      const lbs = Number(onWeightChange.mock.calls.at(-1)[1])
      // 100 L / 3.785411784 L/gal * 6 lb/gal
      expect(lbs).toBeCloseTo(158.5, 1)
      expect(screen.getByText(/Equivale a 71\.9 kg/)).toBeInTheDocument()
      expect(screen.getByText(/0\.72 kg\/L/)).toBeInTheDocument()
    })

    it("shows an existing fuel weight as volume", () => {
      render(<Harness units="imperial" initial={{ fuel: "318" }} />)

      fireEvent.click(screen.getByRole("button", { name: "Volumen (gal)" }))

      expect(screen.getByLabelText("Combustible (gal)")).toHaveValue(53)
    })

    it("only offers volume entry for the fuel station", () => {
      render(<StationForm aircraft={aircraft} weights={{}} onWeightChange={() => {}} />)

      expect(screen.getAllByRole("button", { name: /Volumen/ })).toHaveLength(1)
    })
  })
})
