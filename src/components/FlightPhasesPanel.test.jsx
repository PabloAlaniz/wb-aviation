import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, within } from "@testing-library/react"
import { FlightPhasesPanel, LandingVerdict } from "./FlightPhasesPanel"
import { FuelBurnInput } from "./FuelBurnInput"

const phase = (totalWeight, centerOfGravity, inEnvelope = true) => ({
  totalWeight,
  totalMoment: totalWeight * centerOfGravity,
  centerOfGravity,
  inEnvelope,
})

const phases = {
  takeoff: phase(8382, 151.4),
  landing: phase(7582, 151.1),
  zeroFuel: phase(6882, 150.8),
  fuelLoaded: 1500,
  fuelBurn: 800,
  requestedBurn: 800,
  burnExceedsFuel: false,
  hasFuelStation: true,
}

const okReport = { isLandingOk: true, errors: [], warnings: [] }

describe("FlightPhasesPanel", () => {
  it("shows weight and CG for takeoff, landing and zero fuel", () => {
    render(<FlightPhasesPanel phases={phases} report={okReport} />)

    expect(within(screen.getByTestId("phase-takeoff")).getByText("8382.0")).toBeInTheDocument()
    expect(within(screen.getByTestId("phase-landing")).getByText("7582.0")).toBeInTheDocument()
    expect(within(screen.getByTestId("phase-landing")).getByText("151.10")).toBeInTheDocument()
    expect(within(screen.getByTestId("phase-zeroFuel")).getByText("6882.0")).toBeInTheDocument()
    expect(screen.getAllByText("OK")).toHaveLength(3)
  })

  it("marks a phase out of envelope", () => {
    render(
      <FlightPhasesPanel
        phases={{ ...phases, landing: phase(7582, 162, false) }}
        report={okReport}
      />
    )

    expect(within(screen.getByTestId("phase-landing")).getByText("FUERA")).toBeInTheDocument()
  })
})

describe("LandingVerdict", () => {
  it("approves landing when there are no errors", () => {
    render(<LandingVerdict report={okReport} />)

    expect(screen.getByText(/ATERRIZAJE DENTRO DE LÍMITES/)).toBeInTheDocument()
  })

  it("rejects landing and lists the errors", () => {
    render(
      <LandingVerdict
        report={{
          isLandingOk: false,
          errors: [{ type: "landing-cg", message: "CG fuera" }],
          warnings: [{ type: "zero-fuel-cg", message: "ZFW fuera" }],
        }}
      />
    )

    expect(screen.getByText(/ATERRIZAJE FUERA DE LÍMITES/)).toBeInTheDocument()
    expect(screen.getByText("CG fuera")).toBeInTheDocument()
    expect(screen.getByText("ZFW fuera")).toBeInTheDocument()
  })
})

describe("FlightPhasesPanel in metric units", () => {
  it("converts the table and weight-based landing errors to kg/mm", () => {
    const report = {
      isLandingOk: false,
      errors: [
        {
          type: "burn-exceeds-fuel",
          message: "imperial",
          value: 2000,
          limit: 1500,
          severity: "high",
        },
      ],
      warnings: [],
    }
    render(
      <FlightPhasesPanel
        phases={{ ...phases, requestedBurn: 2000 }}
        report={report}
        units="metric"
      />
    )

    const landing = screen.getByTestId("phase-landing")
    expect(landing).toHaveTextContent("3439.1 kg")
    expect(landing).toHaveTextContent("3837.9 mm")
    expect(screen.getByText(/El consumo planificado \(907 kg\)/)).toBeInTheDocument()
  })
})

describe("FuelBurnInput", () => {
  it("takes the burn in kg and reports it in lbs", () => {
    const onChange = vi.fn()
    render(
      <FuelBurnInput value="" onChange={onChange} fuelLoaded={1500} hasFuelStation units="metric" />
    )

    expect(screen.getByText("Combustible cargado: 680 kg")).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText(/Combustible a consumir en vuelo \(kg\)/), {
      target: { value: "100" },
    })
    expect(Number(onChange.mock.calls[0][0])).toBeCloseTo(220.462, 2)
  })

  it("shows the loaded fuel and reports changes", () => {
    const onChange = vi.fn()
    render(<FuelBurnInput value="" onChange={onChange} fuelLoaded={1500} hasFuelStation />)

    expect(screen.getByText("Combustible cargado: 1500 lbs")).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText(/Combustible a consumir/), {
      target: { value: "800" },
    })
    expect(onChange).toHaveBeenCalledWith("800")
  })

  it("is disabled when the aircraft has no fuel station", () => {
    render(<FuelBurnInput value="" onChange={() => {}} fuelLoaded={0} hasFuelStation={false} />)

    expect(screen.getByLabelText(/Combustible a consumir/)).toBeDisabled()
    expect(screen.getByText(/no tiene estación de combustible/)).toBeInTheDocument()
  })
})
