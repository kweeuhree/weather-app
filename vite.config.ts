import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // sets jsdom as the test environment
    setupFiles: "./tests/setup.ts", // optional setup file path
  },
  server: {
    port: 3001,
    headers: {
      "Cache-Control": "no-store", // Disable caching for dev server
    },
  },
  build: {
    outDir: "dist",
  },
});
