import "@testing-library/jest-dom/vitest"

// Recharts' ResponsiveContainer requires ResizeObserver, not available in jsdom
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = globalThis.ResizeObserver || ResizeObserverMock
