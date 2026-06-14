import "@testing-library/jest-dom/vitest"

// Pin the UI locale so tests are deterministic regardless of jsdom's
// navigator.language. Must run before any module reads the i18n messages.
window.localStorage.setItem("wb-locale", "es")

// Recharts' ResponsiveContainer requires ResizeObserver, not available in jsdom
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = globalThis.ResizeObserver || ResizeObserverMock
