import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, fireEvent, within } from "@testing-library/react"
import App from "../App"
import { SAVED_LOADS_STORAGE_KEY } from "../utils/savedLoads"

const saveLoad = (/** @type {string} */ name) => {
  fireEvent.change(screen.getByLabelText("Nombre de la carga"), { target: { value: name } })
  fireEvent.click(screen.getByRole("button", { name: "Guardar carga actual" }))
}

describe("saved loads (integración)", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("saves the current load and applies it again after clearing", () => {
    render(<App initialAircraft="cessna-172s" />)
    fireEvent.change(screen.getByLabelText("Piloto (lbs)"), { target: { value: "170" } })
    fireEvent.change(screen.getByLabelText(/^Combustible \(lbs/), { target: { value: "180" } })
    fireEvent.change(screen.getByLabelText(/^Combustible a consumir en vuelo/), {
      target: { value: "60" },
    })

    saveLoad("Solo local")
    fireEvent.click(screen.getByRole("button", { name: "Limpiar pesos" }))
    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(null)

    fireEvent.click(screen.getByRole("button", { name: "Aplicar Solo local" }))

    expect(screen.getByLabelText("Piloto (lbs)")).toHaveValue(170)
    expect(screen.getByLabelText(/^Combustible \(lbs/)).toHaveValue(180)
    expect(screen.getByLabelText(/^Combustible a consumir en vuelo/)).toHaveValue(60)
  })

  it("asks for a name and for something to save", () => {
    render(<App initialAircraft="cessna-172s" />)

    saveLoad("")
    expect(screen.getByText("Ingresá un nombre para la carga.")).toBeInTheDocument()

    saveLoad("Vacía")
    expect(screen.getByText("Ingresá al menos un peso antes de guardar.")).toBeInTheDocument()
    expect(screen.getByText("Todavía no guardaste cargas para esta aeronave.")).toBeInTheDocument()
  })

  it("lists only the loads of the selected aircraft and deletes them", () => {
    window.localStorage.setItem(
      SAVED_LOADS_STORAGE_KEY,
      JSON.stringify([
        { aircraftId: "cessna-172s", name: "Dual", weights: { pilot: "170", copilot: "180" } },
        { aircraftId: "cessna-152", name: "Otro avión", weights: { pilot: "150" } },
      ])
    )
    render(<App initialAircraft="cessna-172s" />)

    const list = screen.getByRole("list", { name: "Cargas guardadas de esta aeronave" })
    expect(within(list).getAllByRole("listitem")).toHaveLength(1)
    expect(within(list).getByText("350 lbs cargados")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Eliminar Dual" }))

    expect(screen.getByText("Todavía no guardaste cargas para esta aeronave.")).toBeInTheDocument()
    expect(JSON.parse(window.localStorage.getItem(SAVED_LOADS_STORAGE_KEY))).toEqual([
      expect.objectContaining({ aircraftId: "cessna-152", name: "Otro avión" }),
    ])
  })

  it("survives corrupt stored data", () => {
    window.localStorage.setItem(SAVED_LOADS_STORAGE_KEY, '[{"name":3},null,"x"]')
    render(<App initialAircraft="cessna-172s" />)
    expect(screen.getByText("Todavía no guardaste cargas para esta aeronave.")).toBeInTheDocument()
  })
})
