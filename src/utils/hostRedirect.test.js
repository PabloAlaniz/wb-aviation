import { describe, it, expect } from "vitest"
import { resolveHost } from "./hostRedirect"

describe("resolveHost", () => {
  it("redirects the old pages.dev host to checkcg.com keeping path and query", () => {
    expect(resolveHost("https://wb-aviation.pages.dev/es/cessna-152/?s=abc")).toEqual({
      action: "redirect",
      location: "https://checkcg.com/es/cessna-152/?s=abc",
    })
  })

  it("keeps fleet links working from the root", () => {
    expect(resolveHost("https://wb-aviation.pages.dev/?fleet=xyz")).toEqual({
      action: "redirect",
      location: "https://checkcg.com/?fleet=xyz",
    })
  })

  it("redirects www to the apex", () => {
    expect(resolveHost("https://www.checkcg.com/en/")).toEqual({
      action: "redirect",
      location: "https://checkcg.com/en/",
    })
  })

  it("marks preview deployments as noindex without redirecting", () => {
    expect(resolveHost("https://3f2a1b.wb-aviation.pages.dev/es/")).toEqual({ action: "noindex" })
  })

  it("passes the canonical host and local hosts through", () => {
    expect(resolveHost("https://checkcg.com/es/")).toEqual({ action: "pass" })
    expect(resolveHost("http://localhost:4321/")).toEqual({ action: "pass" })
  })
})
