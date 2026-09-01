// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

/**
 * Phase 1.5 foundation. Astro now owns src/pages/; the legacy React page
 * components moved to src/views/ so the two routers cannot collide.
 *
 * outDir stays separate from Vite's ./dist for as long as both stacks are
 * alive. vercel.json points the deployment at this directory explicitly, so
 * framework auto-detection never has to guess between vite and astro.
 */
export default defineConfig({
  site: "https://immersia.id",
  output: "static",

  outDir: "./dist-astro",

  // Every live URL ends in `.html`. Astro's default (`directory`) would emit
  // dist/about/index.html and serve /about/, breaking all 23 indexed URLs.
  // Verified in the phase 1 spike, not assumed.
  build: { format: "file" },
  trailingSlash: "never",

  // Scaffolding only. With prefixDefaultLocale false, English pages keep their
  // current paths and nothing is generated for `id` until src/pages/id/ exists.
  // Articles stay single-language by staying outside that tree.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "id"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  // Replaces scripts/generate-sitemap.mjs, which maintained its own hand-written
  // list of routes alongside the real ones.
  integrations: [
    react(),
    sitemap({
      // @astrojs/sitemap does not read build.format, so it emits
      // https://immersia.id/about while the page it describes is
      // /about.html. Every entry would have pointed at a URL that does not
      // exist. Put the extension back.
      serialize(item) {
        const root = "https://immersia.id/";
        if (item.url === root) return item;
        item.url = `${item.url.replace(/\/$/, "")}.html`;
        return item;
      },
    }),
  ],
});
