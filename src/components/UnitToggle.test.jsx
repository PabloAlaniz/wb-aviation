import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, renderHook, act } from "@testing-library/react"
import { UnitToggle } from "./UnitToggle"
import { useUnits, UNITS_STORAGE_KEY } from "../hooks/useUnits"

describe("UnitToggle", () => {
  it("marks the active unit system as pressed", () => {
    render(<UnitToggle units="metric" onUnitsChange={() => {}} />)

    expect(screen.getByRole("group", { name: "Unidades" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "kg · mm" })).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("button", { name: "lbs · in" })).toHaveAttribute(
      "aria-pressed",
      "false"
    )
  })

  it("reports the selected unit system", () => {
    const onUnitsChange = vi.fn()
    render(<UnitToggle units="imperial" onUnitsChange={onUnitsChange} />)

    fireEvent.click(screen.getByRole("button", { name: "kg · mm" }))

    expect(onUnitsChange).toHaveBeenCalledWith("metric")
  })
})

describe("useUnits", () => {
  beforeEach(() => {
    window.localStorage.removeItem(UNITS_STORAGE_KEY)
  })

  it("defaults to imperial", () => {
    const { result } = renderHook(() => useUnits())

    expect(result.current[0]).toBe("imperial")
  })

  it("persists the selection under wb-units", () => {
    const { result } = renderHook(() => useUnits())

    act(() => result.current[1]("metric"))

    expect(result.current[0]).toBe("metric")
    expect(window.localStorage.getItem(UNITS_STORAGE_KEY)).toBe('"metric"')
  })

  it("ignores invalid stored values", () => {
    window.localStorage.setItem(UNITS_STORAGE_KEY, '"cubits"')

    const { result } = renderHook(() => useUnits())

    expect(result.current[0]).toBe("imperial")
  })
})
