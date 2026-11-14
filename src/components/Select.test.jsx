import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { SimpleSelect } from "./Select"

const options = [
  { value: "e90", label: "King Air E90" },
  { value: "c172", label: "Cessna 172" },
]

function renderSelect(onValueChange = () => {}) {
  render(
    <SimpleSelect
      id="aircraft"
      value="e90"
      onValueChange={onValueChange}
      placeholder="Selecciona"
      options={options}
    />
  )
}

describe("SimpleSelect", () => {
  it("shows the selected option label", () => {
    renderSelect()

    expect(screen.getByRole("button")).toHaveTextContent("King Air E90")
  })

  it("opens the listbox on click with correct aria state", () => {
    renderSelect()
    const trigger = screen.getByRole("button")

    expect(trigger).toHaveAttribute("aria-expanded", "false")
    fireEvent.click(trigger)

    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(screen.getAllByRole("option")).toHaveLength(2)
  })

  it("selects an option on click and closes", () => {
    const onValueChange = vi.fn()
    renderSelect(onValueChange)

    fireEvent.click(screen.getByRole("button"))
    fireEvent.click(screen.getByText("Cessna 172"))

    expect(onValueChange).toHaveBeenCalledWith("c172")
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("selects an option with the keyboard (Enter)", () => {
    const onValueChange = vi.fn()
    renderSelect(onValueChange)

    fireEvent.click(screen.getByRole("button"))
    fireEvent.keyDown(screen.getByText("Cessna 172"), { key: "Enter" })

    expect(onValueChange).toHaveBeenCalledWith("c172")
  })

  it("closes with Escape", () => {
    renderSelect()

    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    fireEvent.keyDown(screen.getByRole("button"), { key: "Escape" })

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("lists grouped options under their group heading", () => {
    render(
      <SimpleSelect
        id="aircraft"
        value="c172"
        onValueChange={() => {}}
        options={[
          { value: "c152", label: "Cessna 152", group: "Livianos" },
          { value: "c172", label: "Cessna 172", group: "Livianos" },
          { value: "e90", label: "King Air E90", group: "6 plazas o más" },
        ]}
      />
    )
    fireEvent.click(screen.getByRole("button"))

    const groups = screen.getAllByRole("group")
    expect(groups.map((group) => group.getAttribute("aria-label"))).toEqual([
      "Livianos",
      "6 plazas o más",
    ])
    expect(groups[0]).toHaveTextContent("Cessna 152")
    expect(groups[0]).toHaveTextContent("Cessna 172")
    expect(groups[1]).toHaveTextContent("King Air E90")
    expect(screen.getAllByRole("option")).toHaveLength(3)
  })
})
