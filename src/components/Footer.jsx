import { createLucideIcon } from "lucide-react"
import { version } from "../../package.json"
import { trackEvent } from "../analytics"
import { activeLocale, messages as m } from "../i18n"
import { guidesIndexPath } from "../utils/routes"
import { FLEET_SHARE_ID } from "./FleetShare"

// lucide-react 1.x dropped brand icons; this is the outline GitHub icon it had.
const Github = createLucideIcon("github", [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "tonef",
    },
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }],
])

export const AUTHOR_NAME = "Pablo Alaniz"
export const AUTHOR_URL = "https://github.com/PabloAlaniz"
export const REPO_URL = "https://github.com/PabloAlaniz/wb-aviation"
/** New issue from the "aircraft request" form (.github/ISSUE_TEMPLATE/aircraft-request.yml). */
export const AIRCRAFT_REQUEST_URL = `${REPO_URL}/issues/new?template=aircraft-request.yml`

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
          onClick={() => trackEvent("github_click", { source: "footer" })}
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
