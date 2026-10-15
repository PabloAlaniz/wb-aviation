import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { ShareButton } from "./ShareButton"

vi.mock("qrcode", () => ({
  toString: vi.fn(async (text) => `<svg data-text="${text}"></svg>`),
}))

const URL_TO_SHARE = "https://wb.example.com/?s=abc"

describe("ShareButton", () => {
  beforeEach(() => {
    window.plausible = vi.fn()
  })

  afterEach(() => {
    delete navigator.share
    delete navigator.clipboard
    delete window.plausible
  })

  it("renders nothing when there is no shareable URL", () => {
    const { container } = render(<ShareButton url={null} />)

    expect(container).toBeEmptyDOMElement()
  })

  it("uses the Web Share API when available", async () => {
    navigator.share = vi.fn().mockResolvedValue(undefined)
    render(<ShareButton url={URL_TO_SHARE} title="W&B" />)

    fireEvent.click(screen.getByRole("button", { name: "Compartir enlace a este cálculo" }))

    await waitFor(() =>
      expect(navigator.share).toHaveBeenCalledWith({ title: "W&B", url: URL_TO_SHARE })
    )
    expect(window.plausible).toHaveBeenCalledWith("share_link", { props: { method: "native" } })
  })

  it("does nothing else when the user cancels the share sheet", async () => {
    const abort = Object.assign(new Error("cancel"), { name: "AbortError" })
    navigator.share = vi.fn().mockRejectedValue(abort)
    navigator.clipboard = { writeText: vi.fn() }
    render(<ShareButton url={URL_TO_SHARE} />)

    fireEvent.click(screen.getByRole("button", { name: "Compartir enlace a este cálculo" }))

    await waitFor(() => expect(navigator.share).toHaveBeenCalled())
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled()
    expect(window.plausible).not.toHaveBeenCalled()
  })

  it("falls back to the clipboard and confirms the copy", async () => {
    navigator.clipboard = { writeText: vi.fn().mockResolvedValue(undefined) }
    render(<ShareButton url={URL_TO_SHARE} />)

    fireEvent.click(screen.getByRole("button", { name: "Compartir enlace a este cálculo" }))

    expect(await screen.findByText("Enlace copiado")).toBeInTheDocument()
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(URL_TO_SHARE)
    expect(window.plausible).toHaveBeenCalledWith("share_link", { props: { method: "clipboard" } })
  })

  it("reports a failed copy", async () => {
    navigator.clipboard = { writeText: vi.fn().mockRejectedValue(new Error("denied")) }
    render(<ShareButton url={URL_TO_SHARE} />)

    fireEvent.click(screen.getByRole("button", { name: "Compartir enlace a este cálculo" }))

    expect(await screen.findByText("No se pudo copiar el enlace")).toBeInTheDocument()
    expect(window.plausible).not.toHaveBeenCalled()
  })

  it("toggles a QR code of the link (lazy-loaded)", async () => {
    render(<ShareButton url={URL_TO_SHARE} />)

    fireEvent.click(screen.getByRole("button", { name: "Mostrar QR" }))

    const img = await screen.findByAltText("Código QR con el enlace a este cálculo")
    expect(img.getAttribute("src")).toMatch(/^data:image\/svg\+xml/)
    expect(decodeURIComponent(img.getAttribute("src") ?? "")).toContain(URL_TO_SHARE)

    fireEvent.click(screen.getByRole("button", { name: "Ocultar QR" }))
    expect(screen.queryByAltText("Código QR con el enlace a este cálculo")).toBeNull()
  })
})
