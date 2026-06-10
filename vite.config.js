import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // enables @testing-library/react auto-cleanup between tests
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    coverage: {
      include: ["src/**"],
      exclude: ["src/main.jsx"],
    },
  },
})
