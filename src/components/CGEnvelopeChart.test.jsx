import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CGEnvelopeChart } from "./CGEnvelopeChart"
import { aircraftData } from "../data/aircraft"

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
})
