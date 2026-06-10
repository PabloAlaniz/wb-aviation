import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ErrorBoundary } from "./ErrorBoundary"

function Bomb({ shouldThrow }) {
  if (shouldThrow) throw new Error("boom")
  return <p>contenido ok</p>
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    // React logs the caught error; keep test output clean
    vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText("contenido ok")).toBeInTheDocument()
  })

  it("shows the fallback instead of a blank screen on render error", () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(screen.getByText("Algo salió mal")).toBeInTheDocument()
  })

  it("recovers via the retry button when the error is gone", () => {
    const { rerender } = render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    )

    rerender(
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>
    )
    fireEvent.click(screen.getByText("Reintentar"))

    expect(screen.getByText("contenido ok")).toBeInTheDocument()
  })
})
