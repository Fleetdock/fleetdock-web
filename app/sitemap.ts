import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import {
  alternativesSource,
  getBlogPosts,
  gitLastModified,
  guidesSource,
  source,
} from "@/lib/source";

type Entry = MetadataRoute.Sitemap[number];

function day(date: string | undefined): Date | undefined {
  return date ? new Date(`${date}T00:00:00Z`) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  // Only report a last-modified date when it is real: a frontmatter date, or
  // the git commit date of a docs page (see gitLastModified). A build
  // timestamp would claim every page changed on every deploy, and search
  // engines learn to ignore the signal.
  const entry = (path: string, priority: number, lastModified?: Date): Entry => ({
    url: `${base}${path}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency: "monthly",
    priority,
  });

  const marketing = [
    entry("", 1),
    ...["/features", "/pricing", "/use-cases", "/architecture", "/security"].map((p) =>
      entry(p, 0.8),
    ),
    entry("/about", 0.6),
  ];

  // Hand-written docs only. The per-endpoint API reference pages are
  // generated, thin and marked noindex; /docs/api itself stays listed.
  const docs = source
    .getPages()
    .filter((page) => page.type !== "openapi")
    .map((page) =>
      entry(page.url, page.url === "/docs" ? 0.8 : 0.6, gitLastModified(page)),
    );

  const posts = getBlogPosts();
  const blog = [
    entry("/blog", 0.6, day(posts[0]?.data.date)),
    ...posts.map((post) => entry(post.url, 0.6, day(post.data.updated ?? post.data.date))),
  ];

  const guides = [
    entry("/guides", 0.7),
    ...guidesSource.getPages().map((page) => entry(page.url, 0.7, day(page.data.updated))),
  ];

  const alternatives = [
    entry("/alternatives", 0.7),
    ...alternativesSource
      .getPages()
      .map((page) => entry(page.url, 0.7, day(page.data.updated))),
  ];

  return [...marketing, ...guides, ...alternatives, ...blog, ...docs];
}
