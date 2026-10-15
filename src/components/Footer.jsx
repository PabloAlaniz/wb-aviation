import { Github } from "lucide-react"
import { version } from "../../package.json"
import { activeLocale, messages as m } from "../i18n"
import { guidesIndexPath } from "../utils/routes"
import { FLEET_SHARE_ID } from "./FleetShare"

export const AUTHOR_NAME = "Pablo Alaniz"
export const AUTHOR_URL = "https://github.com/PabloAlaniz"
export const REPO_URL = "https://github.com/PabloAlaniz/wb-aviation"

/** Open the (collapsed) fleet share section the hint points to. */
function openFleetShare() {
  const details = document.getElementById(FLEET_SHARE_ID)
  if (details instanceof HTMLDetailsElement) details.open = true
}

/** App footer: author, source code, fleet sharing hint and disclaimer. */
export function Footer() {
  return (
    <footer className="print:hidden border-t border-blue-200 pt-4 pb-2 text-center text-xs text-gray-600 space-y-2">
      <p>
        <a
          href={`#${FLEET_SHARE_ID}`}
          onClick={openFleetShare}
          className="font-medium text-blue-700 hover:underline"
        >
          {m.footer.fleetHint}
        </a>
      </p>
      <p>
        <a href={guidesIndexPath(activeLocale)} className="text-blue-700 hover:underline">
          {m.guides.footerLink}
        </a>
      </p>
      <p className="mx-auto max-w-2xl">{m.footer.disclaimer}</p>
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span>
          {m.footer.madeBy}{" "}
          <a
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-800 hover:underline"
          >
            {AUTHOR_NAME}
          </a>
        </span>
        <span aria-hidden="true">·</span>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:underline"
        >
          <Github className="h-3.5 w-3.5" aria-hidden="true" />
          {m.footer.sourceCode}
        </a>
        <span aria-hidden="true">·</span>
        <span>{m.footer.version(version)}</span>
      </p>
    </footer>
  )
}
