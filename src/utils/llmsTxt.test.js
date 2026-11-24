import { describe, expect, it } from "vitest"
import { aircraftData } from "../data/aircraft"
import { llmsTxt } from "./llmsTxt"

describe("llms.txt", () => {
  const text = llmsTxt({
    locale: "en",
    description: "Free calculator.",
    aircraft: aircraftData,
    guides: [
      {
        title: "Fuel conversions",
        description: "Liters to pounds.",
        path: "/en/guides/fuel-conversions/",
      },
    ],
    languages: [{ name: "Español", path: "/es/" }],
  })

  it("starts with the title and summary the format requires", () => {
    expect(text.startsWith("# CheckCG\n\n> Free calculator.\n")).toBe(true)
  })

  it("links every aircraft, the guides and the other languages with absolute URLs", () => {
    for (const id of Object.keys(aircraftData)) {
      expect(text).toContain(`(https://checkcg.com/en/${id}/)`)
    }
    expect(text).toContain(
      "- [Fuel conversions](https://checkcg.com/en/guides/fuel-conversions/): Liters to pounds."
    )
    expect(text).toContain("- [Español](https://checkcg.com/es/)")
    expect(text).not.toContain("## Reference")
  })
})
