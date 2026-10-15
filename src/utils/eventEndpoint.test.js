import { describe, it, expect, vi } from "vitest"
import { onRequest, onRequestPost } from "../../functions/api/e.js"

/**
 * @param {string} body
 * @param {Record<string, string>} [headers]
 */
function post(body, headers = {}) {
  const request = new Request("https://checkcg.com/api/e", { method: "POST", body, headers })
  return Object.assign(request, { cf: { country: "UY" } })
}

describe("functions/api/e", () => {
  it("writes a data point and returns 204 for a valid event", async () => {
    const writeDataPoint = vi.fn()
    const response = await onRequestPost({
      request: post(JSON.stringify({ n: "share_link", ref: "flyer" })),
      env: { EVENTS: { writeDataPoint } },
    })

    expect(response.status).toBe(204)
    expect(response.headers.get("Cache-Control")).toBe("no-store")
    expect(writeDataPoint).toHaveBeenCalledWith({
      indexes: ["share_link"],
      blobs: ["share_link", "", "", "", "flyer", "UY", "{}"],
      doubles: [1],
    })
  })

  it("returns 204 without the binding (local / not configured)", async () => {
    const response = await onRequestPost({
      request: post(JSON.stringify({ n: "pdf_export" })),
      env: {},
    })
    expect(response.status).toBe(204)
  })

  it("returns 400 for invalid events and does not write", async () => {
    const writeDataPoint = vi.fn()
    const response = await onRequestPost({
      request: post(JSON.stringify({ n: "nope" })),
      env: { EVENTS: { writeDataPoint } },
    })

    expect(response.status).toBe(400)
    expect(writeDataPoint).not.toHaveBeenCalled()
  })

  it("returns 400 when Content-Length is over the limit", async () => {
    const response = await onRequestPost({
      request: post(JSON.stringify({ n: "pdf_export" }), { "Content-Length": "999999" }),
      env: {},
    })
    expect(response.status).toBe(400)
  })

  it("answers other methods with 405", () => {
    const response = onRequest()
    expect(response.status).toBe(405)
    expect(response.headers.get("Allow")).toBe("POST")
  })
})
