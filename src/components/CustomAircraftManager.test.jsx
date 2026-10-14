import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { CustomAircraftManager } from "./CustomAircraftManager"
import { validateCustomAircraft } from "../utils/customAircraft"

const records = [
  { baseModelId: "cessna-172s", registration: "LV-ABC", emptyWeight: 1700, emptyArm: 40.5 },
]

/** onSave double that validates like the real hook */
function makeOnSave() {
  return vi.fn((input) => {
    const errors = validateCustomAircraft(input)
    return { id: Object.keys(errors).length ? null : "custom:LV-NEW", errors }
  })
}

function fillForm({ registration = "lv-new", emptyWeight = "1650", emptyArm = "39.8" } = {}) {
  fireEvent.change(screen.getByLabelText("Matrícula"), { target: { value: registration } })
  fireEvent.change(screen.getByLabelText("Peso vacío (lbs)"), { target: { value: emptyWeight } })
  fireEvent.change(screen.getByLabelText("Brazo del peso vacío (in)"), {
    target: { value: emptyArm },
  })
}

describe("CustomAircraftManager", () => {
  it("shows an empty state when there are no saved aircraft", () => {
    render(<CustomAircraftManager records={[]} onSave={makeOnSave()} onRemove={() => {}} />)

    expect(screen.getByText("Todavía no guardaste ninguna aeronave.")).toBeInTheDocument()
  })

  it("lists saved aircraft with their base model and weighing data", () => {
    render(<CustomAircraftManager records={records} onSave={makeOnSave()} onRemove={() => {}} />)

    expect(screen.getByText("LV-ABC")).toBeInTheDocument()
    expect(screen.getByText(/Cessna 172S Skyhawk/)).toBeInTheDocument()
    expect(screen.getByText(/1700 lbs @ 40.5"/)).toBeInTheDocument()
  })

  it("submits the form values and clears it on success", () => {
    const onSave = makeOnSave()
    render(<CustomAircraftManager records={[]} onSave={onSave} onRemove={() => {}} />)

    // elegir el modelo base en el select
    fireEvent.click(screen.getByLabelText("Modelo base"))
    fireEvent.click(screen.getByRole("option", { name: "Cessna 172S Skyhawk" }))
    fillForm()
    fireEvent.click(screen.getByRole("button", { name: /Guardar aeronave/ }))

    expect(onSave).toHaveBeenCalledWith({
      baseModelId: "cessna-172s",
      registration: "lv-new",
      emptyWeight: "1650",
      emptyArm: "39.8",
    })
    expect(screen.getByLabelText("Matrícula")).toHaveValue("")
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
  })

  it("shows localized validation errors and keeps the input", () => {
    render(<CustomAircraftManager records={[]} onSave={makeOnSave()} onRemove={() => {}} />)

    fillForm({ registration: "", emptyWeight: "0", emptyArm: "" })
    fireEvent.click(screen.getByRole("button", { name: /Guardar aeronave/ }))

    expect(screen.getByText("Ingresá la matrícula.")).toBeInTheDocument()
    expect(screen.getByText("Ingresá un peso vacío mayor a 0.")).toBeInTheDocument()
    expect(screen.getByText("Ingresá un brazo mayor a 0.")).toBeInTheDocument()
    expect(screen.getByLabelText("Peso vacío (lbs)")).toHaveValue(0)
    expect(screen.getByLabelText("Matrícula")).toHaveAttribute("aria-invalid", "true")
  })

  it("rejects an empty weight above the base model max weight", () => {
    render(<CustomAircraftManager records={[]} onSave={makeOnSave()} onRemove={() => {}} />)

    fireEvent.click(screen.getByLabelText("Modelo base"))
    fireEvent.click(screen.getByRole("option", { name: "Cessna 172S Skyhawk" }))
    fillForm({ emptyWeight: "3000" })
    fireEvent.click(screen.getByRole("button", { name: /Guardar aeronave/ }))

    expect(
      screen.getByText("El peso vacío debe ser menor al peso máximo del modelo.")
    ).toBeInTheDocument()
  })

  it("calls onRemove with the custom id", () => {
    const onRemove = vi.fn()
    render(<CustomAircraftManager records={records} onSave={makeOnSave()} onRemove={onRemove} />)

    fireEvent.click(screen.getByRole("button", { name: "Eliminar LV-ABC" }))

    expect(onRemove).toHaveBeenCalledWith("custom:LV-ABC")
  })
})
