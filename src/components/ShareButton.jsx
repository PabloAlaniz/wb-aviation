import { useEffect, useRef, useState } from "react"
import { Share2, QrCode, Check } from "lucide-react"
import { messages as m } from "../i18n"
import { trackEvent } from "../analytics"

const COPIED_FEEDBACK_MS = 2000
const BUTTON_CLASSES =
  "flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50"

/**
 * Render a URL as an SVG QR code data URI. `qrcode` is loaded on demand so it
 * stays out of the main bundle.
 * @param {string} url
 * @returns {Promise<string>}
 */
async function qrDataUri(url) {
  const QRCode = await import("qrcode")
  const svg = await QRCode.toString(url, { type: "svg", margin: 1, errorCorrectionLevel: "M" })
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/**
 * Share the current calculation: Web Share API when available, otherwise
 * copy the link to the clipboard. Also toggles a QR code of the link.
 * Renders nothing when the calculation cannot be shared (url is null).
 * @param {{ url: string | null, title?: string }} props
 */
export function ShareButton({ url, title }) {
  const [feedback, setFeedback] = useState(/** @type {"copied" | "error" | null} */ (null))
  const [showQr, setShowQr] = useState(false)
  const [qr, setQr] = useState(/** @type {{ url: string, src: string | null } | null} */ (null))
  const timer = useRef(/** @type {ReturnType<typeof setTimeout> | undefined} */ (undefined))

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {
    if (!showQr || !url) return
    let cancelled = false
    qrDataUri(url).then(
      (src) => !cancelled && setQr({ url, src }),
      () => !cancelled && setQr({ url, src: null })
    )
    return () => {
      cancelled = true
    }
  }, [showQr, url])

  if (!url) return null

  /** @param {"copied" | "error"} next */
  const flash = (next) => {
    setFeedback(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setFeedback(null), COPIED_FEEDBACK_MS)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      trackEvent("share_link", { method: "clipboard" })
      flash("copied")
    } catch {
      flash("error")
    }
  }

  const share = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url })
        trackEvent("share_link", { method: "native" })
        return
      } catch (error) {
        // the user closed the share sheet: nothing else to do
        if (error instanceof Error && error.name === "AbortError") return
      }
    }
    await copy()
  }

  const qrReady = qr && qr.url === url

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={share}
          aria-label={m.share.buttonLabel}
          className={BUTTON_CLASSES}
        >
          {feedback === "copied" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          {m.share.button}
        </button>
        <button
          type="button"
          onClick={() => setShowQr((prev) => !prev)}
          aria-pressed={showQr}
          className={BUTTON_CLASSES}
        >
          <QrCode className="h-4 w-4" />
          {showQr ? m.share.hideQr : m.share.showQr}
        </button>
      </div>
      <p role="status" aria-live="polite" className="text-xs text-gray-600 min-h-4">
        {feedback === "copied" ? m.share.copied : feedback === "error" ? m.share.copyFailed : ""}
      </p>
      {showQr &&
        qrReady &&
        (qr.src ? (
          <img
            src={qr.src}
            alt={m.share.qrAlt}
            width={160}
            height={160}
            className="rounded border border-gray-200 bg-white"
          />
        ) : (
          <p className="text-xs text-red-600">{m.share.qrFailed}</p>
        ))}
    </div>
  )
}
