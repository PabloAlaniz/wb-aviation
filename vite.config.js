import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "W&B Aviation - Calculador de Peso y Balance",
        short_name: "W&B Aviation",
        description:
          "Calculador de peso y balance (Weight & Balance) de aeronaves basado en datos oficiales de la FAA",
        lang: "es",
        theme_color: "#2563eb",
        background_color: "#eff6ff",
        display: "standalone",
        icons: [
          { src: "pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512.png", sizes: "512x512", type: "image/png" },
          { src: "pwa-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ],
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
