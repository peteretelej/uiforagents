// Minimal vitest config: adapter fixture tests run in jsdom.
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Automatic JSX runtime: generated adapters and tests carry no React import.
  esbuild: { jsx: "automatic" },
  test: {
    environment: "jsdom",
    include: ["adapters/react/*.test.jsx", "adapters/*/compile.test.mjs"],
  },
});
