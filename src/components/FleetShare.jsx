import { useState } from "react"
import { Share2 } from "lucide-react"
import { Input, Label } from "./Input"
import { messages as m } from "../i18n"
import { trackEvent } from "../analytics"
import { MAX_FLEET_AIRCRAFT, MAX_FLEET_NAME_LENGTH, buildFleetUrl } from "../utils/fleetLink"

/** Anchor id used by the footer hint to point to this section. */
export const FLEET_SHARE_ID = "fleet-share"

/**
 * @typedef {{ kind: "copied" | "shared" } | { kind: "failed", url: string } | null} ShareStatus
 */

/**
 * "School mode": share the aircraft saved by registration as a link that
 * students can import (see utils/fleetLink).
 * @param {{
 *   records: import("../utils/customAircraft").CustomAircraftRecord[],
 * }} props
 */
export function FleetShare({ records }) {
  const [schoolName, setSchoolName] = useState("")
  const [status, setStatus] = useState(/** @type {ShareStatus} */ (null))

  const handleShare = async () => {
    const url = buildFleetUrl(records, schoolName, window.location.href)
    if (!url) return
    trackEvent("share_link", { kind: "fleet" })

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: schoolName.trim() || m.fleet.shareButton, url })
        setStatus({ kind: "shared" })
        return
      } catch (error) {
        // the user closed the share sheet: nothing else to do
        if (error instanceof DOMException && error.name === "AbortError") return
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setStatus({ kind: "copied" })
    } catch {
      setStatus({ kind: "failed", url })
    }
  }

  return (
    <details id={FLEET_SHARE_ID} className="print:hidden rounded-md border border-gray-200 p-3">
      <summary className="cursor-pointer text-sm font-medium">{m.fleet.shareTitle}</summary>

      <div className="mt-3 space-y-3">
        <p className="text-xs text-gray-600">{m.fleet.shareDescription}</p>

        {records.length === 0 ? (
          <p className="text-xs text-gray-500">{m.fleet.shareEmpty}</p>
        ) : (
          <>
            <div className="space-y-1">
              <Label htmlFor="fleet-school-name">{m.fleet.schoolNameLabel}</Label>
              <Input
                id="fleet-school-name"
                value={schoolName}
                maxLength={MAX_FLEET_NAME_LENGTH}
                placeholder={m.fleet.schoolNamePlaceholder}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>

            {records.length > MAX_FLEET_AIRCRAFT && (
              <p className="text-xs text-amber-700">{m.fleet.truncated(MAX_FLEET_AIRCRAFT)}</p>
            )}

            <button
              type="button"
              onClick={handleShare}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-blue-600 px-3 py-2 text-sm text-blue-700 hover:bg-blue-50"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              {m.fleet.shareButton}
            </button>

            {status && (
              <div role="status" className="text-xs text-gray-700 space-y-1">
                {status.kind === "failed" ? (
                  <>
                    <Label htmlFor="fleet-link" className="text-xs">
                      {m.fleet.copyFailed}
                    </Label>
                    <Input
                      id="fleet-link"
                      readOnly
                      value={status.url}
                      aria-label={m.fleet.linkLabel}
                      onFocus={(e) => e.target.select()}
                    />
                  </>
                ) : (
                  <p>{status.kind === "shared" ? m.fleet.shared : m.fleet.copied}</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </details>
  )
}
