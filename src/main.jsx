import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { ErrorBoundary } from "./components/ErrorBoundary.jsx"
import { initAnalytics } from "./analytics"

// Opt-in, cookieless analytics. No-ops unless VITE_PLAUSIBLE_DOMAIN is set.
initAnalytics(/** @type {any} */ (import.meta).env?.VITE_PLAUSIBLE_DOMAIN)

createRoot(/** @type {HTMLElement} */ (document.getElementById("root"))).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
