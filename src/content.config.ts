import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

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

export const collections = { team, faq, services };
