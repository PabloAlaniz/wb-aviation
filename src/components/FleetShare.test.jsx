import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { FleetShare } from "./FleetShare"
import { decodeFleet, readFleetParam } from "../utils/fleetLink"

const records = [
  { baseModelId: "cessna-172s", registration: "LV-ABC", emptyWeight: 1700, emptyArm: 40.5 },
]

/** @param {unknown} value */
function setNavigator(/** @type {string} */ key, value) {
  Object.defineProperty(navigator, key, { value, configurable: true, writable: true })
}

describe("FleetShare", () => {
  /** @type {ReturnType<typeof vi.fn>} */
  let writeText
  /** @type {ReturnType<typeof vi.fn>} */
  let plausible

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined)
    setNavigator("clipboard", { writeText })
    setNavigator("share", undefined)
    plausible = vi.fn()
    Object.assign(window, { plausible })
  })

  afterEach(() => {
    setNavigator("clipboard", undefined)
    setNavigator("share", undefined)
    Reflect.deleteProperty(window, "plausible")
  })

  it("asks to save aircraft first when there are none", () => {
    render(<FleetShare records={[]} />)

    expect(
      screen.getByText("Guardá al menos una aeronave por matrícula para compartir tu flota.")
    ).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: "Compartir flota" })).not.toBeInTheDocument()
  })

  it("copies a fleet link with the school name and tracks the event", async () => {
    render(<FleetShare records={records} />)

    fireEvent.change(screen.getByLabelText("Escuela o aeroclub (opcional)"), {
      target: { value: "Aeroclub X" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Compartir flota" }))

    expect(await screen.findByText("Link de la flota copiado al portapapeles.")).toBeInTheDocument()
    expect(writeText).toHaveBeenCalledTimes(1)
    const url = new URL(writeText.mock.calls[0][0])
    expect(decodeFleet(readFleetParam(url.search))).toEqual({ name: "Aeroclub X", records })
    expect(plausible).toHaveBeenCalledWith("share_link", { props: { kind: "fleet" } })
  })

  it("uses the Web Share API when available", async () => {
    const share = vi.fn().mockResolvedValue(undefined)
    setNavigator("share", share)
    render(<FleetShare records={records} />)

    fireEvent.click(screen.getByRole("button", { name: "Compartir flota" }))

    expect(await screen.findByText("Link de la flota compartido.")).toBeInTheDocument()
    expect(share).toHaveBeenCalledWith(expect.objectContaining({ url: expect.any(String) }))
    expect(writeText).not.toHaveBeenCalled()
  })

  it("shows the link to copy by hand when the clipboard fails", async () => {
    writeText.mockRejectedValue(new Error("denied"))
    render(<FleetShare records={records} />)

    fireEvent.click(screen.getByRole("button", { name: "Compartir flota" }))

    const input = await screen.findByLabelText("Link de la flota")
    expect(/** @type {HTMLInputElement} */ (input).value).toContain("?fleet=")
  })
})
