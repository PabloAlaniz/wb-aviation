import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CGEnvelopeChart } from "./CGEnvelopeChart"
import { aircraftData } from "../data/aircraft"
import { messages as m } from "../i18n"

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
})
