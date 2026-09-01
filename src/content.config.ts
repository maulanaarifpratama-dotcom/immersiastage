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
      message: "dateStatus \"confirmed\" requires a pubDate",
      path: ["pubDate"],
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

export const collections = { team, faq, services, articles, publications };
