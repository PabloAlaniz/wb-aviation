import { StrictMode } from "react"
import App from "../App.jsx"
import { ErrorBoundary } from "./ErrorBoundary.jsx"
import { startAttribution } from "../analytics"

// Once per page load, before the app reads the URL: keep `?ref=` for this
// visit (first-party events) and track PWA installs.
startAttribution()

/**
 * Client-only React island mounted by the Astro pages
 * (`<AppIsland client:only="react" />`). The app state lives in
 * localStorage, so it never renders on the server.
 * @param {{ initialAircraft?: string, locale?: string }} props
 */
export default function AppIsland({ initialAircraft, locale }) {
  return (
    <StrictMode>
      <ErrorBoundary>
        <App initialAircraft={initialAircraft} locale={locale} />
      </ErrorBoundary>
    </StrictMode>
  )
}
