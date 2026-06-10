import { describe, it, expect, beforeEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useLocalStorage } from "./useLocalStorage"

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("returns initial value when storage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"))

    expect(result.current[0]).toBe("default")
  })

  it("persists values to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"))

    act(() => result.current[1]("nuevo"))

    expect(result.current[0]).toBe("nuevo")
    expect(JSON.parse(window.localStorage.getItem("key"))).toBe("nuevo")
  })

  it("restores previously stored values", () => {
    window.localStorage.setItem("key", JSON.stringify({ pilot: "180" }))

    const { result } = renderHook(() => useLocalStorage("key", {}))

    expect(result.current[0]).toEqual({ pilot: "180" })
  })

  it("supports functional updates", () => {
    const { result } = renderHook(() => useLocalStorage("key", { a: 1 }))

    act(() => result.current[1]((prev) => ({ ...prev, b: 2 })))

    expect(result.current[0]).toEqual({ a: 1, b: 2 })
  })

  it("falls back to initial value on corrupt JSON", () => {
    window.localStorage.setItem("key", "{not-json")

    const { result } = renderHook(() => useLocalStorage("key", "default"))

    expect(result.current[0]).toBe("default")
  })

  it("discards stored values that fail validation", () => {
    window.localStorage.setItem("key", JSON.stringify("una-string"))

    const { result } = renderHook(() =>
      useLocalStorage("key", { a: 1 }, (v) => typeof v === "object" && v !== null)
    )

    expect(result.current[0]).toEqual({ a: 1 })
  })

  it("reset clears storage and restores initial value", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"))

    act(() => result.current[1]("nuevo"))
    act(() => result.current[2]())

    expect(result.current[0]).toBe("default")
    expect(window.localStorage.getItem("key")).toBeNull()
  })
})
