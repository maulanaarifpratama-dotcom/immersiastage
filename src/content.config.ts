import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

/**
 * Astro 7 content collections.
 *
 * The legacy `type: "content" | "data"` API is gone in this version — every
 * collection needs a `loader`, and there is no `legacy.collections` escape
 * hatch. Verified against the installed package, not the docs.
 *
 * These three are data collections, so they use `file()` against a single JSON
 * array per collection. Each entry needs a unique `id` field; the loader keys
 * the store by it.
 *
 * The schemas are deliberately strict. Every field below was previously a bare
 * string sitting inside a JSX file where nothing could check it — a typo in a
 * domain label or a missing portrait shipped silently. Now the build stops.
 */

const team = defineCollection({
  loader: file("src/content/team.json"),
  schema: z.object({
    order: z.number().int().positive(),
    name: z.string().min(1),
    role: z.string().min(1),
    portrait: z.string().startsWith("/assets/"),
    bio: z.string().min(40),
  }),
});

const faq = defineCollection({
  loader: file("src/content/faq.json"),
  schema: z.object({
    order: z.number().int().positive(),
    title: z.string().min(1),
    items: z
      .array(
        z.object({
          // Questions end in a question mark. Trivial, but it is the kind of
          // consistency that drifts once several people edit the file.
          q: z.string().min(1).endsWith("?"),
          a: z.string().min(1),
          /** Present on the three questions the homepage surfaces. */
          homeOrder: z.number().int().positive().optional(),
        }),
      )
      .min(1),
  }),
});

const engagement = z.object({
  image: z.string().startsWith("/assets/"),
  domain: z.enum(["Organization", "Program / Project", "People"]),
  name: z.string().min(1),
  desc: z.string().min(1),
  note: z.string().optional(),
  soon: z.boolean().optional(),
});

const services = defineCollection({
  loader: file("src/content/services.json"),
  schema: z.object({
    order: z.number().int().positive(),
    label: z.string().min(1),
    title: z.string().min(1),
    /** Card copy on services.html. Kept short on purpose. */
    summary: z.string().min(1).max(120),
    cardImage: z.string().startsWith("/assets/"),
    banner: z.string().startsWith("/assets/"),
    products: z.array(z.object({ title: z.string().min(1) })).min(1),
    engagements: z.array(engagement).min(1),
  }),
});

/**
 * Articles. Markdown so the body is editable by a CMS later; the `id` that the
 * glob loader derives from the filename IS the public slug, so there is no
 * separate `slug` field to drift out of sync with the file it names.
 *
 * `pubDate` deliberately has no value for any of the five articles: no
 * publication date exists in the source data, in the page components, or in
 * git (all five entered the repository in one commit, which is a repository
 * timestamp and not an editorial date). Rather than launder that into a
 * `pubDate`, the schema records the uncertainty and is fail-closed on the part
 * that matters — you cannot mark an article `confirmed` without supplying a
 * date, so no unverified date can reach a page or the structured data.
 */
const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z
    .object({
      title: z.string().min(1),
      label: z.string().min(1),
      category: z.enum(["Insight"]),
      author: z.string().min(1),

      dateStatus: z.enum(["confirmed", "unknown"]),
      pubDate: z.coerce.date().optional(),

      lead: z.string().min(1),
      /** Short teaser for the homepage card. Falls back to `lead`. */
      excerpt: z.string().max(220).optional(),

      hero: z.string().startsWith("/assets/"),
      figure: z.string().startsWith("/assets/").optional(),
      /** The card image is not always the hero image — it differs for two of
       *  the five articles, which a single `image` field would have lost. */
      card: z.object({ image: z.string().startsWith("/assets/") }),

      heroSize: z.enum(["normal", "long"]).default("normal"),
      hasReferences: z.boolean().default(false),

      /** Both fall back to title / truncated lead, matching what the SPA's
       *  resolveMeta() already computed. */
      seoTitle: z.string().min(1).max(70).optional(),
      seoDescription: z.string().min(1).max(180).optional(),

      cta: z.object({
        title: z.string().min(1),
        desc: z.string().min(1),
        label: z.string().min(1),
      }),
    })
    .refine((d) => d.dateStatus !== "confirmed" || d.pubDate instanceof Date, {
      message: 'dateStatus "confirmed" requires a pubDate',
      path: ["pubDate"],
    }),
});

/**
 * The nineteen Indonesian articles the WordPress site published between 10 and
 * 26 March 2026 and the SPA migration dropped without redirects.
 *
 * Deliberately a separate collection from `articles` rather than a locale
 * dimension on it. These are an archive, not a second edition: they are
 * noindex, kept out of the sitemap and out of every feed on the live site, and
 * nothing new will be written into them. Folding them into `articles` would
 * have forced every field the live articles need — label, hero, card image,
 * CTA — onto records that have none of them, and would have put archive
 * entries one filter away from appearing on the homepage.
 *
 * Every field here came out of each page's Yoast schema graph in the Wayback
 * capture, not out of the visible HTML: the rendered page repeats all five
 * category links and three sidebar thumbnails on every article, so scraping
 * what a reader sees gives all nineteen the same categories and the same
 * images.
 */
const legacy = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legacy" }),
  schema: z.object({
    title: z.string().min(1),
    /** Authoritative: schema.org datePublished, not the Indonesian date text. */
    pubDate: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    category: z.enum([
      "Impact Strategy",
      "Insight",
      "Framework & Tools",
      "Program Design",
    ]),
    author: z.string().min(1),
    /** First sentence of the body, capped at 220 characters. Never written
     *  fresh — the source has no excerpt field to recover. */
    excerpt: z.string().min(1).max(220),
    /** The WordPress URL this article was published at. The redirect list and
     *  the page are generated from this one value so they cannot drift. */
    originalPath: z
      .string()
      .regex(/^\/[a-z0-9-]+\/$/, "originalPath must look like /some-slug/"),
    /**
     * Optional, and every entry currently omits it. The images were never
     * archived: the theme lazy-loaded through `data-src`, so the crawler saw
     * no `src` to follow, and the CDX index holds no wp-content capture at
     * all. `heroImageOriginal` records the filename the post used so the
     * originals can be dropped in if the media library still exists somewhere.
     */
    heroImage: z.string().startsWith("/assets/").optional(),
    heroImageOriginal: z.string().min(1).optional(),
  }),
});

const publications = defineCollection({
  loader: file("src/content/publications.json"),
  schema: z.object({
    order: z.number().int().positive(),
    label: z.string().min(1),
    title: z.string().min(1),
    cover: z.string().startsWith("/assets/"),
  }),
});

const projects = defineCollection({
  loader: file("src/content/projects.json"),
  schema: z.object({
    order: z.number().int().positive(),
    name: z.string().min(1),
    desc: z.string().min(1),
    domain: z.enum(["organization", "program-project", "people"]),
    status: z.enum(["active", "founding-team", "coming-soon"]),
    image: z.string().startsWith("/assets/"),
    /** Present on the six records the homepage surfaces. */
    homeOrder: z.number().int().positive().optional(),
  }),
});

const featured = defineCollection({
  loader: file("src/content/featured.json"),
  schema: z.object({
    order: z.number().int().positive(),
    client: z.string().min(1),
    engagement: z.string().min(1),
    label: z.string().min(1),
    image: z.string().startsWith("/assets/"),
  }),
});

/**
 * Client logos. `name` is optional because there is no source for it: the
 * files are numbered 1..26 and no institution names appear anywhere in the
 * codebase. That is honest rather than harmful — the marquee is a single
 * role="img" region with a summary label and the images carry alt="", which is
 * correct for decorative marks. Fill `name` in and the alt text improves.
 */
const clients = defineCollection({
  loader: file("src/content/clients.json"),
  schema: z.object({
    order: z.number().int().positive(),
    logo: z.string().startsWith("/assets/"),
    name: z.string().min(1).optional(),
    url: z.string().url().optional(),
  }),
});

export const collections = {
  team,
  faq,
  services,
  articles,
  legacy,
  publications,
  projects,
  featured,
  clients,
};
