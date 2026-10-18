import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Footer } from "./Footer"
import { FLEET_SHARE_ID } from "./FleetShare"
import { version } from "../../package.json"

describe("Footer", () => {
  afterEach(() => {
    delete window.plausible
  })

  it("links to the author and the repository", () => {
    render(<Footer />)

    expect(screen.getByRole("link", { name: "Pablo Alaniz" })).toHaveAttribute(
      "href",
      "https://github.com/PabloAlaniz"
    )
    expect(
      screen.getByRole("link", { name: "Código abierto: dale una ⭐ en GitHub" })
    ).toHaveAttribute("href", "https://github.com/PabloAlaniz/wb-aviation")
    expect(screen.getByText(/Hecho por/)).toBeInTheDocument()
  })

  it("tracks clicks on the repository link", () => {
    window.plausible = vi.fn()
    render(<Footer />)

    fireEvent.click(screen.getByRole("link", { name: /GitHub/ }))
    expect(window.plausible).toHaveBeenCalledWith("github_click", { props: { source: "footer" } })
  })

  it("links to the guides in the active language", () => {
    render(<Footer />)

    expect(screen.getByRole("link", { name: "Guías de peso y balance" })).toHaveAttribute(
      "href",
      "/es/guias/"
    )
  })

  it("shows the disclaimer and the app version", () => {
    render(<Footer />)

    expect(screen.getByText(/el POH\/AFM/)).toBeInTheDocument()
    expect(screen.getByText(`Versión ${version}`)).toBeInTheDocument()
  })

  it("points instructors to the fleet sharing section and opens it", () => {
    render(
      <>
        <details id={FLEET_SHARE_ID}>
          <summary>fleet</summary>
        </details>
        <Footer />
      </>
    )
    const hint = screen.getByRole("link", { name: "¿Sos instructor o escuela? Compartí tu flota" })
    expect(hint).toHaveAttribute("href", `#${FLEET_SHARE_ID}`)

    fireEvent.click(hint)
    expect(document.getElementById(FLEET_SHARE_ID)).toHaveAttribute("open")
  })
})
