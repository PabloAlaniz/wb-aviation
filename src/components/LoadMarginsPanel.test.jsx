import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { LoadMarginsPanel } from "./LoadMarginsPanel"
import { messages as m } from "../i18n"

const margins = {
  payloadAvailable: 320.9,
  extraFuel: { amount: 150.7, limitedBy: "weight" },
  fuelAtLanding: 90,
  hasFuelStation: true,
}

describe("LoadMarginsPanel", () => {
  it("renders nothing without margins", () => {
    const { container } = render(<LoadMarginsPanel margins={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it("rounds the room down and names the limiting factor", () => {
    render(<LoadMarginsPanel margins={margins} />)
    expect(screen.getByTestId("margin-payload")).toHaveTextContent("320 lbs")
    // 150.7 lbs of AVGAS = 25.1 gal
    expect(screen.getByTestId("margin-extra-fuel")).toHaveTextContent("150 lbs (25 gal)")
    expect(screen.getByTestId("margin-extra-fuel")).toHaveTextContent(m.margins.limitedBy.weight)
    expect(screen.getByTestId("margin-landing-fuel")).toHaveTextContent("90 lbs (15 gal)")
  })

  it("uses the density of Jet A and metric units", () => {
    render(<LoadMarginsPanel margins={margins} fuelType="jet-a" units="metric" />)
    // 320.9 lbs = 145.6 kg; 150.7 lbs = 68.4 kg = 85.1 L of Jet A
    expect(screen.getByTestId("margin-payload")).toHaveTextContent("145 kg")
    expect(screen.getByTestId("margin-extra-fuel")).toHaveTextContent("68 kg (85 L)")
  })

  it("shows by how much the takeoff weight is exceeded", () => {
    render(<LoadMarginsPanel margins={{ ...margins, payloadAvailable: -40.2, extraFuel: null }} />)
    expect(screen.getByTestId("margin-payload")).toHaveTextContent(m.margins.overBy(41, "lbs"))
    expect(screen.queryByTestId("margin-extra-fuel")).not.toBeInTheDocument()
  })

  it("hides the fuel rows for an aircraft without fuel station", () => {
    render(<LoadMarginsPanel margins={{ ...margins, extraFuel: null, hasFuelStation: false }} />)
    expect(screen.queryByTestId("margin-landing-fuel")).not.toBeInTheDocument()
  })
})
