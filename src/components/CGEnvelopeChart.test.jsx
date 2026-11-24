import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CGEnvelopeChart } from "./CGEnvelopeChart"
import { aircraftData } from "../data/aircraft"
import { messages as m } from "../i18n"
import { calculateFlightPhases } from "../utils/calculations"
import { buildCgTravel } from "../utils/cgTravel"

const aircraft = aircraftData["cessna-172s"]

describe("CGEnvelopeChart", () => {
  it("uses the inch datum note by default", () => {
    render(<CGEnvelopeChart aircraft={aircraft} currentCG={40} currentWeight={2200} />)

    expect(screen.getByText("C.G. Arm - Inches aft of Datum STA 0.0")).toBeInTheDocument()
  })

  it("uses the millimetre datum note in metric mode", () => {
    render(
      <CGEnvelopeChart aircraft={aircraft} currentCG={40} currentWeight={2200} units="metric" />
    )

    expect(screen.getByText("Brazo C.G. - mm detrás del Datum STA 0.0")).toBeInTheDocument()
  })

  it("renders round metric ticks and a line legend icon at a fixed size", () => {
    const { container } = render(
      <CGEnvelopeChart
        aircraft={aircraft}
        currentCG={40}
        currentWeight={2200}
        units="metric"
        size={{ width: 680, height: 320 }}
      />
    )

    const ticks = [...container.querySelectorAll(".recharts-cartesian-axis-tick-value")].map(
      (node) => node.textContent ?? ""
    )
    const xTicks = ticks.filter((t) => t.endsWith(" mm")).map((t) => parseFloat(t))
    const yTicks = ticks.filter((t) => t.endsWith(" kg")).map((t) => Number(t.replace(/\D/g, "")))
    expect(xTicks).toEqual([850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250])
    expect(yTicks).toEqual([600, 700, 800, 900, 1000, 1100, 1200])

    expect(screen.getByLabelText(`${m.chart.envelopeLimit} legend icon`)).toBeInTheDocument()
    const legend = container.querySelector(".recharts-legend-wrapper")
    expect(legend).toHaveStyle({ top: "8px" })
  })

  it("shades the allowed area", () => {
    const { container } = render(
      <CGEnvelopeChart
        aircraft={aircraft}
        currentCG={40}
        currentWeight={2200}
        size={{ width: 680, height: 320 }}
      />
    )

    const area = container.querySelector('[data-testid="envelope-area"]')
    expect(area).not.toBeNull()
    // one vertex per envelope point plus the closing one, all finite pixels
    const vertices = (area?.getAttribute("points") ?? "").split(" ")
    expect(vertices).toHaveLength(aircraft.cgEnvelope.points.length + 1)
    for (const vertex of vertices) {
      expect(vertex.split(",").map(Number).every(Number.isFinite)).toBe(true)
    }
  })

  describe("CG travel", () => {
    const weights = { pilot: "180", copilot: "170", baggage1: "60", fuel: "300" }
    const phases = calculateFlightPhases(aircraft, weights, "190")
    const travel = buildCgTravel(aircraft, weights, phases)
    const props = {
      aircraft,
      currentCG: phases.takeoff.centerOfGravity,
      currentWeight: phases.takeoff.totalWeight,
      landingCG: phases.landing.centerOfGravity,
      landingWeight: phases.landing.totalWeight,
      zeroFuelCG: phases.zeroFuel.centerOfGravity,
      zeroFuelWeight: phases.zeroFuel.totalWeight,
      travel,
      size: { width: 680, height: 320 },
    }

    it("draws the loading path only when asked", () => {
      const { rerender } = render(<CGEnvelopeChart {...props} />)
      expect(screen.queryByText(m.chart.loadingPath)).not.toBeInTheDocument()

      rerender(<CGEnvelopeChart {...props} showLoadingPath />)
      expect(screen.getByText(m.chart.loadingPath)).toBeInTheDocument()
    })

    it("keeps the scale on the envelope when the loading path is hidden", () => {
      const ticksOf = (/** @type {HTMLElement} */ container) =>
        [...container.querySelectorAll(".recharts-cartesian-axis-tick-value")].map(
          (node) => node.textContent
        )
      const plain = render(
        <CGEnvelopeChart
          aircraft={aircraft}
          currentCG={props.currentCG}
          currentWeight={props.currentWeight}
          size={props.size}
        />
      )
      const withTravel = render(<CGEnvelopeChart {...props} />)
      expect(ticksOf(withTravel.container)).toEqual(ticksOf(plain.container))
    })
  })

  it("marks the max zero-fuel weight when the aircraft declares one", () => {
    const b200 = aircraftData["king-air-b200"]
    render(
      <CGEnvelopeChart
        aircraft={b200}
        currentCG={188}
        currentWeight={11000}
        size={{ width: 680, height: 320 }}
      />
    )

    expect(screen.getByText("MZFW")).toBeInTheDocument()
    // max landing weight equals max takeoff weight: no separate line
    expect(screen.queryByText("MLW")).not.toBeInTheDocument()
  })
})
