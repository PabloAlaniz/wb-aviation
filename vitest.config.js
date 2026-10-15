import process from "node:process"
import { defineConfig, configDefaults } from "vitest/config"
import react from "@vitejs/plugin-react"

// Unit/component tests run the React app directly (no Astro pages involved).
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // enables @testing-library/react auto-cleanup between tests
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    exclude: [...configDefaults.exclude, ".claude/**", ".astro/**"],
    // Node 22+ ships its own localStorage global, which shadows jsdom's
    execArgv: process.allowedNodeEnvironmentFlags.has("--no-experimental-webstorage")
      ? ["--no-experimental-webstorage"]
      : [],
    coverage: {
      include: ["src/**"],
      exclude: ["src/pages/**", "src/layouts/**", "src/**/*.astro", "src/components/AppIsland.jsx"],
    },
  },
})
