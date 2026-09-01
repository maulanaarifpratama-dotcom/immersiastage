import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

/**
 * Asserts over the built Astro output rather than over components.
 *
 * These exist because phase 4 shipped a regression that every component test
 * passed straight through: swapping the layout's metadata source marked all
 * eleven article and publication pages `noindex` and stripped their canonical,
 * while the sitemap went on listing them. Nothing failed. The build was green.
 *
 * A page can only be wrong in these ways once.
 */

const DIST = path.resolve("dist-astro");
const SITE = "https://immersia.id";

if (!existsSync(DIST)) {
  throw new Error(
    `${DIST} not found. Run \`npm run build:astro\` before this suite, or use \`npm run test:artifacts\`.`,
  );
}

const pages = readdirSync(DIST).filter((f) => f.endsWith(".html"));
const read = (f) => readFileSync(path.join(DIST, f), "utf8");
const attr = (html, re) => html.match(re)?.[1] ?? null;

const canonicalOf = (html) =>
  attr(html, /rel="canonical"\s+href="([^"]+)"/);
const robotsOf = (html) =>
  attr(html, /name="robots"\s+content="([^"]+)"/);

const urlFor = (file) => (file === "index.html" ? `${SITE}/` : `${SITE}/${file}`);

describe("built pages", () => {
  it("produces every expected page", () => {
    expect(pages.length).toBeGreaterThanOrEqual(24);
    for (const required of [
      "index.html",
      "404.html",
      "about.html",
      "news.html",
      "publications.html",
      "project-records.html",
      "request-proposal.html",
    ]) {
      expect(pages).toContain(required);
    }
  });

  it("keeps the .html URLs — no directory-style output", () => {
    const nested = readdirSync(DIST, { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name !== "_astro" && d.name !== "assets")
      .filter((d) => existsSync(path.join(DIST, d.name, "index.html")));
    expect(nested).toEqual([]);
  });

  it.each(pages.filter((p) => p !== "404.html"))(
    "%s is indexable and points its canonical at itself",
    (file) => {
      const html = read(file);
      expect(robotsOf(html)).toBe("index, follow");
      expect(canonicalOf(html)).toBe(urlFor(file));
    },
  );

  it("marks 404 noindex and gives it no canonical", () => {
    const html = read("404.html");
    expect(robotsOf(html)).toMatch(/^noindex/);
    expect(canonicalOf(html)).toBeNull();
  });

  it.each(pages)("%s carries its social metadata", (file) => {
    const html = read(file);
    const head = html.slice(0, html.indexOf("</head>"));
    for (const probe of [
      "<title>",
      'name="description"',
      'property="og:title"',
      'property="og:description"',
      'property="og:image"',
      'name="twitter:card"',
    ]) {
      expect(head).toContain(probe);
    }
  });

  it("renders metadata into the HTML, not at runtime", () => {
    // The point of the migration: a crawler that runs no JS still sees it.
    const html = read("article-choose-impact-assessment-method.html");
    expect(html).toMatch(/<title>SROI, MSC, CSI/);
    expect(html).toContain('"@type":"Article"');
  });
});

describe("sitemap", () => {
  const sitemap = read("sitemap-0.xml");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  it("lists every page except 404", () => {
    const listed = new Set(
      locs.map((u) => {
        const p = new URL(u).pathname;
        return p === "/" ? "index.html" : p.slice(1);
      }),
    );
    const expected = pages.filter((p) => p !== "404.html");
    for (const file of expected) expect(listed).toContain(file);
    expect(listed.size).toBe(expected.length);
  });

  it("uses .html URLs, matching build.format", () => {
    for (const u of locs) {
      if (u === `${SITE}/`) continue;
      expect(u.endsWith(".html")).toBe(true);
    }
  });

  it("never lists a page that tells crawlers to ignore it", () => {
    for (const u of locs) {
      const p = new URL(u).pathname;
      const file = p === "/" ? "index.html" : p.slice(1);
      expect(robotsOf(read(file))).toBe("index, follow");
    }
  });
});

describe("robots.txt", () => {
  it("points at the sitemap the build actually produces", () => {
    const robots = readFileSync(path.join(DIST, "robots.txt"), "utf8");
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap-index.xml`);
    expect(existsSync(path.join(DIST, "sitemap-index.xml"))).toBe(true);
  });
});

describe("javascript payload", () => {
  it("loads no external script on any page", () => {
    for (const file of pages) {
      expect(read(file)).not.toMatch(/<script[^>]*\ssrc=/);
    }
  });
});
