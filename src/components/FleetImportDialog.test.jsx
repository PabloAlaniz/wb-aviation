import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, within } from "@testing-library/react"
import { FleetImportDialog } from "./FleetImportDialog"

const fleet = {
  name: "Aeroclub X",
  records: [
    { baseModelId: "cessna-172s", registration: "LV-ABC", emptyWeight: 1700, emptyArm: 40.5 },
    {
      baseModelId: "king-air-echo-90",
      registration: "LV-KAE",
      emptyWeight: 6700,
      emptyArm: 151.3,
    },
  ],
}

/** @param {Partial<Parameters<typeof FleetImportDialog>[0]>} props */
function renderDialog(props = {}) {
  const onImport = vi.fn()
  const onDismiss = vi.fn()
  render(
    <FleetImportDialog
      state={{ status: "pending", fleet }}
      onImport={onImport}
      onDismiss={onDismiss}
      {...props}
    />
  )
  return { onImport, onDismiss }
}

describe("FleetImportDialog", () => {
  it("renders nothing when idle", () => {
    const { container } = render(
      <FleetImportDialog state={{ status: "idle" }} onImport={() => {}} onDismiss={() => {}} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it("lists the shared aircraft with the school name and base model", () => {
    renderDialog()

    expect(screen.getByRole("heading", { name: "Importar flota" })).toBeInTheDocument()
    expect(screen.getByText("Aeroclub X compartió su flota con vos.")).toBeInTheDocument()
    const list = screen.getByRole("list", { name: "Aeronaves a importar" })
    expect(within(list).getByText("LV-ABC")).toBeInTheDocument()
    expect(within(list).getByText(/Cessna 172S Skyhawk · 1700\.0 lbs/)).toBeInTheDocument()
    expect(screen.getByText(/se van a reemplazar/)).toBeInTheDocument()
  })

  it("shows empty weights in metric units", () => {
    renderDialog({ units: "metric" })

    expect(screen.getByText(/771\.1 kg/)).toBeInTheDocument()
  })

  it("flags registrations that will overwrite saved aircraft", () => {
    renderDialog({ existingRegistrations: ["LV-KAE"] })

    expect(screen.getAllByText("Reemplaza la guardada")).toHaveLength(1)
  })

  it("imports or dismisses", () => {
    const { onImport, onDismiss } = renderDialog()

    fireEvent.click(screen.getByRole("button", { name: "Importar 2 aeronaves" }))
    expect(onImport).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByRole("button", { name: "Descartar" }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it("explains an invalid link", () => {
    const onDismiss = vi.fn()
    render(
      <FleetImportDialog state={{ status: "invalid" }} onImport={() => {}} onDismiss={onDismiss} />
    )

    expect(screen.getByRole("alert")).toHaveTextContent("no es válido")
    fireEvent.click(screen.getByRole("button", { name: "Cerrar" }))
    expect(onDismiss).toHaveBeenCalled()
  })

  it("confirms a finished import", () => {
    render(
      <FleetImportDialog
        state={{ status: "imported", count: 2 }}
        onImport={() => {}}
        onDismiss={() => {}}
      />
    )
    expect(screen.getByRole("status")).toHaveTextContent("Se importaron 2 aeronaves.")
  })
})
