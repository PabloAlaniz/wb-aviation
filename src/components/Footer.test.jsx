import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Footer } from "./Footer"
import { FLEET_SHARE_ID } from "./FleetShare"
import { version } from "../../package.json"

describe("Footer", () => {
  it("links to the author and the repository", () => {
    render(<Footer />)

    expect(screen.getByRole("link", { name: "Pablo Alaniz" })).toHaveAttribute(
      "href",
      "https://github.com/PabloAlaniz"
    )
    expect(screen.getByRole("link", { name: "Código fuente en GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/PabloAlaniz/wb-aviation"
    )
    expect(screen.getByText(/Hecho por/)).toBeInTheDocument()
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
