import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react"
import { LoadSheet } from "./LoadSheet"
import { LoadSheetPanel } from "./LoadSheetPanel"
import { aircraftData, emptyWeightsFor } from "../data/aircraft"
import {
  buildLandingReport,
  buildSafetyReport,
  calculateFlightPhases,
  calculateWeightBalance,
} from "../utils/calculations"
import { createCustomAircraft } from "../utils/customAircraft"
import { LOAD_SHEET_STORAGE_KEY } from "../utils/loadSheet"

const cessna = aircraftData["cessna-172s"]

/**
 * Props for a Cessna 172S: pilot 170 lbs @ 37", fuel 240 lbs @ 48", 120 lbs burn.
 * Empty 1663 lbs @ 41" -> total 2073 lbs, moment 85993 lb-in, CG 41.48".
 * @param {import("../types").Aircraft} [aircraft]
 */
function sheetProps(aircraft = cessna) {
  const weights = { ...emptyWeightsFor(aircraft), pilot: "170", fuel: "240" }
  const results = /** @type {import("../types").WeightBalanceResult} */ (
    calculateWeightBalance(aircraft, weights)
  )
  const phases = calculateFlightPhases(aircraft, weights, "120")
  return {
    aircraft,
    weights,
    results,
    safetyChecks: buildSafetyReport(aircraft, results.totalWeight, results.centerOfGravity),
    phases,
    landingReport: phases ? buildLandingReport(aircraft, phases) : null,
  }
}

const details = {
  pilot: "Ana Pérez",
  registration: "CX-ABC",
  date: "2026-10-14",
  departure: "SUMU",
  destination: "SULS",
  remarks: "Vuelo de instrucción",
}

/** Text of each cell of a row, by test id. */
const cells = (/** @type {string} */ testId) =>
  within(screen.getByTestId(testId))
    .getAllByRole("cell")
    .map((cell) => cell.textContent)

describe("LoadSheet", () => {
  /** @param {import("../types").Aircraft} aircraft @param {Record<string, string>} weights */
  function renderWithTaxi(aircraft, weights, taxi) {
    const phases = /** @type {import("../types").FlightPhasesResult} */ (
      calculateFlightPhases(aircraft, weights, "0", taxi)
    )
    const results = /** @type {import("../types").WeightBalanceResult} */ (
      calculateWeightBalance(aircraft, weights)
    )
    render(
      <LoadSheet
        aircraft={aircraft}
        weights={weights}
        results={results}
        safetyChecks={null}
        phases={phases}
        landingReport={buildLandingReport(aircraft, phases)}
        details={details}
        units="imperial"
      />
    )
    return phases
  }

  it("checks the printed ramp row against the max ramp weight, not the envelope", () => {
    // B200: 8198 + 374 crew + 3978 fuel = 12550 lbs at the ramp, above the 12500 lbs
    // MTOW (and the envelope) but below the 12590 lbs max ramp weight
    const b200 = aircraftData["king-air-b200"]
    const phases = renderWithTaxi(
      b200,
      { ...emptyWeightsFor(b200), pilot: "187", copilot: "187", fuel: "3978" },
      "90"
    )
    expect(phases.ramp.totalWeight).toBe(12550)
    expect(phases.ramp.inEnvelope).toBe(false)
    expect(cells("sheet-phase-ramp")[3]).toBe("OK")
  })

  it("leaves the printed ramp row unassessed without a max ramp weight", () => {
    renderWithTaxi(cessna, { ...emptyWeightsFor(cessna), pilot: "170", fuel: "240" }, "12")
    expect(cells("sheet-phase-ramp")[3]).toBe("—")
  })

  it("prints the ramp total and the taxi fuel before the takeoff total", () => {
    const weights = { ...emptyWeightsFor(cessna), pilot: "170", fuel: "240" }
    const phases = /** @type {import("../types").FlightPhasesResult} */ (
      calculateFlightPhases(cessna, weights, "120", "12")
    )
    const results = /** @type {import("../types").WeightBalanceResult} */ (
      calculateWeightBalance(cessna, { ...weights, fuel: "228" })
    )
    render(
      <LoadSheet
        aircraft={cessna}
        weights={weights}
        results={results}
        safetyChecks={null}
        phases={phases}
        landingReport={buildLandingReport(cessna, phases)}
        details={details}
        units="imperial"
      />
    )

    // rampa 2073 lbs; rodaje 12 lbs @ 48" = 576 lb-in; despegue 2061 lbs
    expect(cells("sheet-ramp-total").slice(0, 2)).toEqual(["Total en rampa", "2073.0"])
    expect(cells("sheet-taxi-fuel")).toEqual(["Combustible de rodaje", "−12.0", "", "−576"])
    expect(cells("sheet-total")[1]).toBe("2061.0")
    expect(within(screen.getByTestId("sheet-phase-ramp")).getByText("2073.0")).toBeInTheDocument()
  })

  it("prints stations, totals and phases in imperial units", () => {
    render(<LoadSheet {...sheetProps()} details={details} units="imperial" />)

    expect(cells("sheet-station-empty")).toEqual([
      "Peso vacío (básico)",
      "1663.0",
      "41.00",
      "68183",
    ])
    expect(cells("sheet-station-pilot")).toEqual(["Piloto", "170.0", "37.00", "6290"])
    expect(cells("sheet-station-fuel")).toEqual(["Combustible", "240.0", "48.00", "11520"])
    expect(cells("sheet-total")).toEqual(["Total al despegue", "2073.0", "41.48", "85993"])

    expect(cells("sheet-phase-takeoff")).toEqual(["Despegue", "2073.0", "41.48", "DENTRO"])
    expect(cells("sheet-phase-landing")[1]).toBe("1953.0")
    expect(cells("sheet-phase-zeroFuel")[1]).toBe("1833.0")

    expect(screen.getByText("Peso máximo de aterrizaje")).toBeInTheDocument()
    expect(screen.getAllByText("2550.0 lbs")).toHaveLength(2) // MTOW and MLW
    expect(screen.getByText("Despegue dentro de límites")).toBeInTheDocument()
  })

  it("lists only loaded stations and says how many were left out", () => {
    render(<LoadSheet {...sheetProps()} details={details} units="imperial" />)

    // Cessna 172S: pilot and fuel loaded; copilot, 2 passengers and 2 baggage areas empty
    expect(screen.queryByTestId("sheet-station-copilot")).not.toBeInTheDocument()
    expect(screen.queryByTestId("sheet-station-baggage1")).not.toBeInTheDocument()
    expect(screen.getByTestId("sheet-omitted-stations")).toHaveTextContent(
      "5 estaciones sin carga no se listan"
    )
  })

  it("does not mention omitted stations when every station is loaded", () => {
    const props = sheetProps()
    const weights = Object.fromEntries(cessna.loadStations.map((s) => [s.key, "10"]))
    render(<LoadSheet {...props} weights={weights} details={details} units="imperial" />)

    expect(screen.queryByTestId("sheet-omitted-stations")).not.toBeInTheDocument()
  })

  it("prints the same load in metric units", () => {
    render(<LoadSheet {...sheetProps()} details={details} units="metric" />)

    expect(cells("sheet-station-pilot")).toEqual(["Piloto", "77.1", "939.8", "72469"])
    expect(cells("sheet-total")).toEqual(["Total al despegue", "940.3", "1053.7", "990747"])
    expect(screen.getByText("Unidades: peso kg, brazo mm, momento kg·mm")).toBeInTheDocument()
    expect(screen.getAllByText("1156.7 kg")).toHaveLength(2) // MTOW and MLW (2550 lbs)
  })

  it("prints the flight header, signature line and footer", () => {
    render(<LoadSheet {...sheetProps()} details={details} />)

    expect(screen.getByTestId("sheet-registration")).toHaveTextContent("CX-ABC")
    expect(screen.getByText("SUMU → SULS")).toBeInTheDocument()
    expect(screen.getByText("2026-10-14")).toBeInTheDocument()
    expect(screen.getByText("Vuelo de instrucción")).toBeInTheDocument()
    expect(screen.getByText("Firma del piloto al mando")).toBeInTheDocument()
    expect(screen.getByText(/checkcg\.com/)).toBeInTheDocument()
    expect(screen.getByText(/POH\/AFM/)).toBeInTheDocument()
  })

  it("flags a phase out of the envelope and the takeoff verdict", () => {
    const props = sheetProps()
    const weights = { ...props.weights, baggage2: "300" }
    const results = /** @type {import("../types").WeightBalanceResult} */ (
      calculateWeightBalance(cessna, weights)
    )
    render(
      <LoadSheet
        {...props}
        weights={weights}
        results={results}
        phases={null}
        landingReport={null}
        details={details}
      />
    )

    expect(cells("sheet-phase-takeoff")[3]).toBe("FUERA")
    expect(screen.getByText("DESPEGUE FUERA DE LÍMITES")).toBeInTheDocument()
  })
})

describe("LoadSheetPanel", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    delete window.plausible
  })

  it("prefills the registration of a custom aircraft", () => {
    const custom = createCustomAircraft({
      baseModelId: "cessna-172s",
      registration: "cx-abc",
      emptyWeight: 1700,
      emptyArm: 40,
    })
    render(<LoadSheetPanel {...sheetProps(custom)} />)

    expect(screen.getByLabelText("Matrícula de la aeronave")).toHaveValue("CX-ABC")
  })

  it("leaves the registration blank for a catalog aircraft and persists typed details", () => {
    render(<LoadSheetPanel {...sheetProps()} />)

    const registration = screen.getByLabelText("Matrícula de la aeronave")
    expect(registration).toHaveValue("")

    fireEvent.change(screen.getByLabelText("Piloto al mando"), { target: { value: "Ana" } })
    fireEvent.change(screen.getByLabelText("Origen (OACI)"), { target: { value: "sumu" } })

    expect(screen.getByLabelText("Origen (OACI)")).toHaveValue("SUMU")
    const stored = JSON.parse(window.localStorage.getItem(LOAD_SHEET_STORAGE_KEY) ?? "{}")
    expect(stored).toMatchObject({ pilot: "Ana", departure: "SUMU" })
    expect(stored).not.toHaveProperty("date")
  })

  it("defaults the date to today", () => {
    render(<LoadSheetPanel {...sheetProps()} />)

    const today = new Date()
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`
    expect(screen.getByLabelText("Fecha")).toHaveValue(iso)
  })

  it("mounts the sheet, tracks pdf_export and opens the print dialog", async () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => {})
    const plausible = vi.fn()
    window.plausible = plausible
    render(<LoadSheetPanel {...sheetProps()} units="metric" />)

    expect(screen.queryByTestId("load-sheet")).toBeNull()

    fireEvent.click(screen.getByRole("button", { name: /Imprimir hoja de carga/ }))

    expect(plausible).toHaveBeenCalledWith("pdf_export", { props: { units: "metric" } })
    expect(screen.getByTestId("load-sheet")).toBeInTheDocument()
    await waitFor(() => expect(print).toHaveBeenCalledTimes(1))
  })

  it("mounts the sheet when the browser prints without the button", () => {
    render(<LoadSheetPanel {...sheetProps()} />)

    window.dispatchEvent(new Event("beforeprint"))

    expect(screen.getByTestId("load-sheet")).toBeInTheDocument()
  })
})
