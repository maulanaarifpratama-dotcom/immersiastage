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
 * Component tests check what a component renders. What reaches a visitor is a
 * file in the output directory, and the layout, adapter, integrations and
 * config all sit in between.
 */

const DIST = path.resolve("dist-astro");
const SITE = "https://immersia.id";

if (!existsSync(DIST)) {
  throw new Error(
    `${DIST} not found. Run \`npm run test:artifacts\`, which builds first.`,
  );
}

/**
 * Every URL the Vite SPA served. Hard-coded rather than derived from
 * src/views/, because that directory is deleted at cutover and this guard has
 * to outlive it. If a page disappears from the build, this list notices.
 */
const LEGACY_URLS = [
  "about.html",
  "article-baseline-feasibility-study-program-design.html",
  "article-build-practical-monitoring-evaluation-system.html",
  "article-building-practical-meal-capacity.html",
  "article-choose-impact-assessment-method.html",
  "article-theory-of-change-program-design.html",
  "faq.html",
  "impact-lab.html",
  "index.html",
  "integrated-advisory.html",
  "modular-services.html",
  "news.html",
  "project-records.html",
  "publication-1.html",
  "publication-2.html",
  "publication-3.html",
  "publication-4.html",
  "publication-5.html",
  "publication-6.html",
  "publications.html",
  "request-proposal.html",
  "services.html",
  "team.html",
];

const ARTICLE_COUNT = 5;
const PUBLICATION_COUNT = 6;

const pages = readdirSync(DIST).filter((f) => f.endsWith(".html"));
const publicPages = pages.filter((f) => f !== "404.html");

/**
 * Discovery above is top-level only, which was correct while every page lived
 * at the site root. The restored Indonesian archive lives under /id/insights/,
 * so a top-level scan leaves twenty pages unchecked — and they are the pages
 * with the most unusual metadata rules on the site, the only ones that must be
 * noindex, carry no canonical, and never reach the sitemap. Walk the tree.
 */
const walk = (dir, prefix = "") =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const rel = prefix ? `${prefix}/${d.name}` : d.name;
    if (d.isDirectory())
      return d.name === "_astro" || d.name === "assets"
        ? []
        : walk(path.join(dir, d.name), rel);
    return d.name.endsWith(".html") ? [rel] : [];
  });

const allPages = walk(DIST);
const archivePages = allPages.filter((p) => p.startsWith("id/insights"));
const archiveArticles = archivePages.filter((p) => p !== "id/insights.html");

const ARCHIVE_COUNT = 19;
const read = (f) => readFileSync(path.join(DIST, f), "utf8");
const headOf = (f) => {
  const html = read(f);
  return html.slice(0, html.indexOf("</head>"));
};

const meta = (head, re) => head.match(re)?.[1] ?? null;
const title = (h) => meta(h, /<title>([\s\S]*?)<\/title>/);
const description = (h) => meta(h, /name="description"\s+content="([^"]*)"/);
const canonical = (h) => meta(h, /rel="canonical"\s+href="([^"]+)"/);
const robots = (h) => meta(h, /name="robots"\s+content="([^"]+)"/);
const og = (h, prop) =>
  meta(h, new RegExp(`property="og:${prop}"\\s+content="([^"]*)"`));
const tw = (h, name) =>
  meta(h, new RegExp(`name="twitter:${name}"\\s+content="([^"]*)"`));
const jsonLd = (f) => {
  const m = read(f).match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  return m ? JSON.parse(m[1]) : null;
};

const urlFor = (f) => (f === "index.html" ? `${SITE}/` : `${SITE}/${f}`);
const pathOf = (absoluteUrl) => absoluteUrl.slice(SITE.length);
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

/* ------------------------------------------------------------------ pages */

describe("page inventory", () => {
  it("still serves every URL the SPA served", () => {
    for (const url of LEGACY_URLS) expect(pages).toContain(url);
  });

  it("adds nothing beyond the legacy URLs except the 404 page", () => {
    const extra = pages.filter(
      (p) => !LEGACY_URLS.includes(p) && p !== "404.html",
    );
    expect(extra).toEqual([]);
  });

  it("emits each page exactly once", () => {
    expect(new Set(pages).size).toBe(pages.length);
  });

  it("keeps the .html URLs — no directory-style output", () => {
    const nested = readdirSync(DIST, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !["_astro", "assets"].includes(d.name))
      .filter((d) => existsSync(path.join(DIST, d.name, "index.html")))
      .map((d) => d.name);
    expect(nested).toEqual([]);
  });

  it("builds every article and publication", () => {
    expect(pages.filter((p) => p.startsWith("article-"))).toHaveLength(
      ARTICLE_COUNT,
    );
    expect(pages.filter((p) => p.startsWith("publication-"))).toHaveLength(
      PUBLICATION_COUNT,
    );
  });
});

/* --------------------------------------------------------------- metadata */

describe.each(publicPages)("%s metadata", (file) => {
  const head = headOf(file);
  const url = urlFor(file);

  it("has a non-empty title carrying the site name", () => {
    const t = title(head);
    expect(t).toBeTruthy();
    expect(t.trim().length).toBeGreaterThan(5);
    // The homepage title is the brand line itself and takes no suffix; every
    // other page is "<page> — Immersia".
    expect(decode(t)).toMatch(
      file === "index.html" ? /^Immersia/ : /Immersia$/,
    );
  });

  it("has a description of usable length", () => {
    const d = description(head);
    expect(d).toBeTruthy();
    expect(d.length).toBeGreaterThanOrEqual(50);
    expect(d.length).toBeLessThanOrEqual(320);
  });

  it("is indexable and its canonical points at itself", () => {
    expect(robots(head)).toBe("index, follow");
    expect(canonical(head)).toBe(url);
  });

  it("mirrors title and description into Open Graph and Twitter", () => {
    expect(og(head, "title")).toBe(title(head));
    expect(og(head, "description")).toBe(description(head));
    expect(tw(head, "title")).toBe(title(head));
    expect(tw(head, "description")).toBe(description(head));
    expect(tw(head, "card")).toBe("summary_large_image");
  });

  it("points og:url at the canonical URL", () => {
    expect(og(head, "url")).toBe(url);
  });

  it("has an og:image that is absolute and actually exists", () => {
    const image = og(head, "image");
    expect(image).toMatch(new RegExp(`^${SITE}/`));
    expect(tw(head, "image")).toBe(image);
    const asset = path.join(DIST, pathOf(image));
    expect(existsSync(asset)).toBe(true);
  });
});

describe("metadata is distinct per page", () => {
  it("gives every page its own title", () => {
    const titles = publicPages.map((f) => title(headOf(f)));
    expect(new Set(titles).size).toBe(publicPages.length);
  });

  it("gives every page its own description", () => {
    const descriptions = publicPages.map((f) => description(headOf(f)));
    expect(new Set(descriptions).size).toBe(publicPages.length);
  });
});

/* --------------------------------------------------------------- JSON-LD */

describe("structured data", () => {
  it("describes the organization on the homepage", () => {
    const node = jsonLd("index.html");
    expect(node).not.toBeNull();
    expect(node["@type"]).toBe("Organization");
    expect(node.url).toBe(`${SITE}/`.replace(/\/$/, ""));
    expect(node.name).toBe("Immersia");
  });

  it.each(pages.filter((p) => p.startsWith("article-")))(
    "%s is marked up as an Article",
    (file) => {
      const node = jsonLd(file);
      expect(node).not.toBeNull();
      expect(node["@type"]).toBe("Article");
      expect(node.headline).toBeTruthy();
      expect(node.mainEntityOfPage).toBe(urlFor(file));
      expect(node.publisher?.["@type"]).toBe("Organization");
      expect(node.image?.[0]).toMatch(new RegExp(`^${SITE}/`));
      // No date is confirmed for any article yet, so none may be claimed.
      if ("datePublished" in node) {
        expect(node.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    },
  );

  it.each(pages.filter((p) => p.startsWith("publication-")))(
    "%s is marked up as a CreativeWork",
    (file) => {
      const node = jsonLd(file);
      expect(node).not.toBeNull();
      expect(node["@type"]).toBe("CreativeWork");
      expect(node.name).toBeTruthy();
      expect(node.mainEntityOfPage).toBe(urlFor(file));
    },
  );
});

/* --------------------------------------------------------------- archive */

/**
 * The nineteen Indonesian articles restored from the Wayback capture, plus
 * their index. The whole point of this archive is that it is reachable but
 * invisible: it honours old URLs without reopening an Indonesian content
 * stream, so every assertion here is about what it must NOT do.
 */
describe("indonesian archive", () => {
  it("builds all nineteen articles and one index", () => {
    expect(archiveArticles).toHaveLength(ARCHIVE_COUNT);
    expect(archivePages).toContain("id/insights.html");
    expect(archivePages).toHaveLength(ARCHIVE_COUNT + 1);
  });

  it.each(archivePages)("%s tells crawlers not to index it", (file) => {
    expect(robots(headOf(file))).toBe("noindex, follow");
  });

  it.each(archivePages)("%s carries no canonical", (file) => {
    // A canonical on a noindex page points search engines at a URL we are
    // simultaneously telling them to ignore.
    expect(canonical(headOf(file))).toBeNull();
  });

  it.each(archivePages)("%s declares Indonesian", (file) => {
    expect(read(file)).toContain('<html lang="id">');
  });

  it.each(archivePages)("%s has a real title and description", (file) => {
    const head = headOf(file);
    expect(decode(title(head)).trim().length).toBeGreaterThan(10);
    expect(description(head).length).toBeGreaterThanOrEqual(40);
  });

  it("gives every archive page its own title and description", () => {
    const heads = archivePages.map(headOf);
    expect(new Set(heads.map(title)).size).toBe(archivePages.length);
    expect(new Set(heads.map(description)).size).toBe(archivePages.length);
  });

  it.each(archiveArticles)("%s has exactly one h1 and skips no level", (file) => {
    const html = read(file);
    const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    expect(levels[0]).toBe(1);
    // WordPress emitted no heading elements at all here -- every section title
    // was bold text -- so the conversion promotes that one level to h2. If it
    // ever lands on h3 the document skips a level for a screen reader.
    for (const l of levels.slice(1)) expect(l).toBeLessThanOrEqual(2);
  });

  it("serves no archived asset from web.archive.org", () => {
    // The pages were recovered from the archive; they must not depend on it.
    for (const file of archivePages)
      expect(read(file)).not.toContain("web.archive.org");
  });

  it("is not linked from any live page", () => {
    const linking = publicPages.filter((f) => read(f).includes("/id/insights"));
    expect(linking).toEqual([]);
  });

  it("does not leak into the sitemap", () => {
    expect(read("sitemap-0.xml")).not.toContain("/id/insights");
  });

  it("is not disallowed in robots.txt", () => {
    // Blocking the path would stop crawlers reading the noindex they need to
    // obey, which leaves the old URLs indexed forever.
    const robotsTxt = read("robots.txt");
    expect(robotsTxt).not.toMatch(/Disallow:\s*\/id/);
  });

  it("index links to every article, and nothing else", () => {
    const html = read("id/insights.html");
    const linked = new Set(
      [...html.matchAll(/href="\/id\/insights\/([^"]+)"/g)].map((m) => m[1]),
    );
    expect(linked).toEqual(
      new Set(archiveArticles.map((p) => p.split("/")[2])),
    );
  });

  it("index lists articles newest first", () => {
    const dates = [
      ...read("id/insights.html").matchAll(
        /<time datetime="(\d{4}-\d{2}-\d{2})"/g,
      ),
    ].map((m) => m[1]);
    expect(dates).toHaveLength(ARCHIVE_COUNT);
    expect([...dates].sort().reverse()).toEqual(dates);
  });
});

describe("archive redirects", () => {
  const cfg = JSON.parse(readFileSync(path.resolve("vercel.json"), "utf8"));
  const redirects = cfg.redirects ?? [];

  it("declares one permanent redirect per restored article", () => {
    expect(redirects).toHaveLength(ARCHIVE_COUNT);
    for (const r of redirects) expect(r.statusCode).toBe(301);
  });

  it("sends every old URL to a page the build actually produced", () => {
    for (const r of redirects)
      expect(existsSync(path.join(DIST, r.destination))).toBe(true);
  });

  it("covers every restored article exactly once", () => {
    const destinations = redirects.map((r) => r.destination.slice(1));
    expect(new Set(destinations)).toEqual(new Set(archiveArticles));
  });

  it("never shadows a live page", () => {
    // A redirect whose source matched a live URL would take that page off the
    // site silently -- it still builds, it just stops being reachable.
    for (const r of redirects) {
      expect(pages).not.toContain(`${r.source.slice(1)}.html`);
      expect(existsSync(path.join(DIST, r.source.slice(1)))).toBe(false);
    }
  });

  it("writes sources in the form trailingSlash:false produces", () => {
    expect(cfg.trailingSlash).toBe(false);
    for (const r of redirects) expect(r.source).toMatch(/^\/[a-z0-9-]+$/);
  });
});

/* ------------------------------------------------------------------- 404 */

describe("404", () => {
  it("is noindex and carries no canonical", () => {
    const head = headOf("404.html");
    expect(robots(head)).toMatch(/^noindex/);
    expect(canonical(head)).toBeNull();
  });
});

/* --------------------------------------------------------------- sitemap */

describe("sitemap", () => {
  const locs = [...read("sitemap-0.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => m[1],
  );
  const fileFor = (u) => {
    const p = pathOf(u);
    return p === "/" ? "index.html" : p.slice(1);
  };

  it("lists exactly the public pages", () => {
    expect(new Set(locs.map(fileFor))).toEqual(new Set(publicPages));
  });

  it("uses .html URLs, matching build.format", () => {
    for (const u of locs) {
      if (u === `${SITE}/`) continue;
      expect(u.endsWith(".html")).toBe(true);
    }
  });

  it("agrees with every page's own canonical", () => {
    for (const u of locs) expect(canonical(headOf(fileFor(u)))).toBe(u);
  });

  it("never lists a page that tells crawlers to ignore it", () => {
    for (const u of locs)
      expect(robots(headOf(fileFor(u)))).toBe("index, follow");
  });

  it("points every entry at a file that exists", () => {
    for (const u of locs)
      expect(existsSync(path.join(DIST, fileFor(u)))).toBe(true);
  });
});

describe("robots.txt", () => {
  it("points at the sitemap the build actually produces", () => {
    const robotsTxt = readFileSync(path.join(DIST, "robots.txt"), "utf8");
    expect(robotsTxt).toContain(`Sitemap: ${SITE}/sitemap-index.xml`);
    expect(existsSync(path.join(DIST, "sitemap-index.xml"))).toBe(true);
  });
});

/* ---------------------------------------------------------------- payload */

describe("javascript payload", () => {
  it("loads no external script on any page", () => {
    for (const file of allPages)
      expect(read(file)).not.toMatch(/<script[^>]*\ssrc=/);
  });

  it("keeps inline script small on every page", () => {
    for (const file of allPages) {
      const inline = [
        ...read(file).matchAll(
          /<script(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g,
        ),
      ].reduce((n, m) => n + m[1].length, 0);
      expect(inline).toBeLessThan(8_000);
    }
  });
});

/* ------------------------------------------------------------------ links */

describe("internal links", () => {
  it("never points at a file the build did not produce", () => {
    const broken = [];
    for (const file of allPages) {
      const html = read(file);
      const refs = new Set([
        ...[...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]),
        ...[...html.matchAll(/src="(\/[^"#?]*)"/g)].map((m) => m[1]),
      ]);
      for (const ref of refs) {
        const target = ref === "/" ? "/index.html" : ref;
        if (!existsSync(path.join(DIST, target)))
          broken.push(`${file} -> ${ref}`);
      }
    }
    expect(broken).toEqual([]);
  });
});
