import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import App from "./App"
import { encodeSharedCalculation } from "./utils/shareLink"
import { setLocale } from "./i18n"

// Navigation can't happen in jsdom: capture where the selector would go.
vi.mock("./i18n", async (importOriginal) => ({
  .../** @type {object} */ (await importOriginal()),
  setLocale: vi.fn(),
}))

/** @param {string} search */
function openUrl(search) {
  window.history.replaceState(null, "", `/${search}`)
}

/** @param {HTMLElement} container @param {string} language */
function chooseLanguage(container, language) {
  fireEvent.click(/** @type {HTMLElement} */ (container.querySelector("#locale")))
  fireEvent.click(screen.getByRole("option", { name: language }))
}

describe("App embedded in localized pages", () => {
  beforeEach(() => {
    window.localStorage.clear()
    vi.mocked(setLocale).mockClear()
  })

  afterEach(() => {
    openUrl("")
  })

  it("preselects the page's aircraft and starts from empty weights", () => {
    window.localStorage.setItem("wb-selected-aircraft", JSON.stringify("king-air-echo-90"))
    window.localStorage.setItem("wb-weights", JSON.stringify({ pilot: "200" }))

    render(<App initialAircraft="cessna-172s" locale="es" />)

    expect(screen.getByText(/Cessna 172S Skyhawk - Peso y Centrado/)).toBeInTheDocument()
    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(null)
  })

  it("keeps the stored weights when the page's aircraft is already selected", () => {
    window.localStorage.setItem("wb-selected-aircraft", JSON.stringify("cessna-172s"))
    window.localStorage.setItem("wb-weights", JSON.stringify({ pilot: "180" }))

    render(<App initialAircraft="cessna-172s" locale="es" />)

    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(180)
  })

  it("lets a ?s= shared link override the page's aircraft", () => {
    const s = encodeSharedCalculation({
      aircraftId: "king-air-echo-90",
      weights: { pilot: "190" },
      fuelBurn: "",
      units: "imperial",
    })
    openUrl(`?s=${s}`)

    render(<App initialAircraft="cessna-172s" locale="es" />)

    expect(screen.getByText(/King Air Echo 90.*Peso y Centrado/)).toBeInTheDocument()
    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(190)
  })

  it("ignores an unknown initial aircraft", () => {
    render(<App initialAircraft="no-such-plane" locale="es" />)

    expect(screen.getByText(/King Air Echo 90.*Peso y Centrado/)).toBeInTheDocument()
  })

  it("switches language to the same aircraft page in the chosen locale", () => {
    const { container } = render(<App initialAircraft="cessna-172s" locale="es" />)

    chooseLanguage(container, "English")

    expect(setLocale).toHaveBeenCalledWith("en", "/en/cessna-172s/")
  })

  it("follows the aircraft selected in the calculator when switching language", () => {
    const { container } = render(<App initialAircraft="cessna-172s" locale="es" />)
    fireEvent.click(screen.getByLabelText("Tipo de Aeronave"))
    fireEvent.click(screen.getByRole("option", { name: "King Air Echo 90 (Beechcraft)" }))

    chooseLanguage(container, "Português")

    expect(setLocale).toHaveBeenCalledWith("pt", "/pt/king-air-echo-90/")
  })

  it("switches language to the localized home from a landing page", () => {
    const { container } = render(<App locale="es" />)

    chooseLanguage(container, "English")

    expect(setLocale).toHaveBeenCalledWith("en", "/en/")
  })

  it("only reloads when not embedded in a localized page (root /)", () => {
    const { container } = render(<App />)

    chooseLanguage(container, "English")

    expect(setLocale).toHaveBeenCalledWith("en")
  })
})
