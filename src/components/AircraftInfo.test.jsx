import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AircraftInfo } from "./AircraftInfo"
import { aircraftData } from "../data/aircraft"

const aircraft = aircraftData["king-air-echo-90"]

describe("AircraftInfo", () => {
  it("shows weights in lbs and CG limits in inches by default", () => {
    render(<AircraftInfo aircraft={aircraft} />)

    expect(screen.getByText("Peso vacío: 6682 lbs")).toBeInTheDocument()
    expect(screen.getByText("Peso máximo: 10100 lbs")).toBeInTheDocument()
    expect(screen.getByText('CG límites: 144.7" - 160"')).toBeInTheDocument()
  })

  it("shows weights in kg and CG limits in mm in metric mode", () => {
    render(<AircraftInfo aircraft={aircraft} units="metric" />)

    // 6682 lbs = 3030.9 kg; 10100 lbs = 4581.3 kg; 144.7" = 3675.4 mm; 160" = 4064 mm
    expect(screen.getByText("Peso vacío: 3030.9 kg")).toBeInTheDocument()
    expect(screen.getByText("Peso máximo: 4581.3 kg")).toBeInTheDocument()
    expect(screen.getByText("CG límites: 3675.4 mm - 4064 mm")).toBeInTheDocument()
  })
})
