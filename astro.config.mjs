// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

/**
 * SPIKE CONFIG — Astro migration, phase 1.
 *
 * Deliberately isolated from the live Vite app so both can build from one
 * checkout:
 *   srcDir  ./src-astro   because src/pages/ already holds the React page
 *                         components, and Astro would treat every one of them
 *                         as a route.
 *   outDir  ./dist-astro  because `vite build` owns ./dist.
 *
 * Neither of these is the intended end state. See the report.
 */
export default defineConfig({
  site: "https://immersia.id",
  output: "static",

  srcDir: "./src-astro",
  outDir: "./dist-astro",
  publicDir: "./public",

  // The whole point of the spike. Every live URL ends in `.html`; Astro's
  // default (`directory`) would emit dist/about/index.html and serve /about/.
  build: { format: "file" },
  trailingSlash: "never",

  integrations: [react()],
});
