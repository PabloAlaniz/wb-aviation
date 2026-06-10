import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SafetyAlerts } from "./SafetyAlerts"

const emptyReport = {
  warnings: [],
  recommendations: [],
  weightPercentage: "80.0",
  cgMargins: { forward: "5.00", aft: "5.00" },
}

describe("SafetyAlerts", () => {
  it("renders nothing when there are no warnings or recommendations", () => {
    const { container } = render(<SafetyAlerts safetyChecks={emptyReport} />)

    expect(container).toBeEmptyDOMElement()
  })

  it("renders nothing when safetyChecks is null", () => {
    const { container } = render(<SafetyAlerts safetyChecks={null} />)

    expect(container).toBeEmptyDOMElement()
  })

  it("renders warnings with their message", () => {
    const report = {
      ...emptyReport,
      warnings: [
        {
          type: "weight-warning",
          message: "Peso al 96.0% del máximo permitido",
          severity: "medium",
        },
        { type: "cg-aft-warning", message: "CG muy cerca del límite posterior", severity: "high" },
      ],
    }
    render(<SafetyAlerts safetyChecks={report} />)

    expect(screen.getByText("Alertas de Seguridad")).toBeInTheDocument()
    expect(screen.getByText("Peso al 96.0% del máximo permitido")).toBeInTheDocument()
    expect(screen.getByText("CG muy cerca del límite posterior")).toBeInTheDocument()
  })

  it("renders recommendations", () => {
    const report = {
      ...emptyReport,
      recommendations: [{ type: "weight-reserve", message: "Considerar reducir peso en 100 lbs" }],
    }
    render(<SafetyAlerts safetyChecks={report} />)

    expect(screen.getByText("Considerar reducir peso en 100 lbs")).toBeInTheDocument()
  })

  it("shows weight usage and CG margins summary", () => {
    const report = {
      ...emptyReport,
      warnings: [{ type: "weight-warning", message: "Aviso", severity: "low" }],
      weightPercentage: "96.5",
    }
    render(<SafetyAlerts safetyChecks={report} />)

    expect(screen.getByText("96.5%")).toBeInTheDocument()
    expect(screen.getByText(/\+5\.00" \/ -5\.00"/)).toBeInTheDocument()
  })
})
