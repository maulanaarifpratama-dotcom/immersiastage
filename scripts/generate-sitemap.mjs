/**
 * Generates public/sitemap.xml and public/robots.txt from the real route list.
 * Runs before every build so a new article cannot be published without also
 * appearing in the sitemap.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://immersia.id";

const { articles } = await import(
  new URL("../src/data/articles.js", import.meta.url)
);
const { publications } = await import(
  new URL("../src/data/publications.js", import.meta.url)
);

const staticPages = [
  ["", 1.0],
  ["about.html", 0.8],
  ["services.html", 0.9],
  ["integrated-advisory.html", 0.8],
  ["modular-services.html", 0.8],
  ["impact-lab.html", 0.8],
  ["project-records.html", 0.8],
  ["news.html", 0.8],
  ["publications.html", 0.7],
  ["team.html", 0.6],
  ["faq.html", 0.5],
  ["request-proposal.html", 0.7],
];

const urls = [
  ...staticPages.map(([slug, priority]) => ({ slug, priority })),
  ...Object.keys(articles).map((slug) => ({ slug, priority: 0.7 })),
  ...Object.keys(publications).map((slug) => ({ slug, priority: 0.5 })),
];

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ slug, priority }) => `  <url>
    <loc>${SITE}/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

await writeFile(path.join(root, "public", "sitemap.xml"), sitemap, "utf8");
await writeFile(path.join(root, "public", "robots.txt"), robots, "utf8");

console.log(`sitemap: ${urls.length} routes written`);
