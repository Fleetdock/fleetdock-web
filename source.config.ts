import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { pageSchema } from "fumadocs-core/source/schema";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    // Plain-text Markdown for /llms-full.txt and /docs/<page>.md.
    postprocess: { includeProcessedMarkdown: true },
  },
});

/** A question and its answer, rendered on the page and as FAQPage JSON-LD. */
const faqSchema = z
  .array(z.object({ q: z.string(), a: z.string() }))
  .default([]);

/** Calendar date written as YYYY-MM-DD in frontmatter. */
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

/** Blog posts: content/blog/<slug>.mdx → /blog/<slug>. */
export const blog = defineDocs({
  dir: "content/blog",
  docs: {
    postprocess: { includeProcessedMarkdown: true },
    schema: pageSchema.extend({
      date: isoDate,
      updated: isoDate.optional(),
      author: z.string().default("The Fleetdock team"),
      tags: z.array(z.string()).default([]),
    }),
  },
});

/** How-to guides: content/guides/<slug>.mdx → /guides/<slug>. */
export const guides = defineDocs({
  dir: "content/guides",
  docs: {
    postprocess: { includeProcessedMarkdown: true },
    schema: pageSchema.extend({
      /** Short label for cards and the hub page. */
      label: z.string(),
      updated: isoDate,
      faq: faqSchema,
    }),
  },
});

/** Comparisons: content/alternatives/<slug>.mdx → /alternatives/<slug>. */
export const alternatives = defineDocs({
  dir: "content/alternatives",
  docs: {
    postprocess: { includeProcessedMarkdown: true },
    schema: pageSchema.extend({
      /** The other product's name, e.g. "phpMyAdmin". */
      competitor: z.string(),
      competitorUrl: z.string().url(),
      /** One or two sentences: who should pick which. Shown at the top. */
      verdict: z.string(),
      updated: isoDate,
      /** Side-by-side rows; keep values short and factual. */
      comparison: z
        .array(
          z.object({
            feature: z.string(),
            fleetdock: z.string(),
            competitor: z.string(),
          }),
        )
        .default([]),
      faq: faqSchema,
    }),
  },
});

export default defineConfig({
  // Git commit dates for sitemap <lastmod> and article dateModified.
  plugins: [lastModified()],
});
