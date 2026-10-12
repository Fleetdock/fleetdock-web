import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const marketingRoutes = ["", "/features", "/architecture", "/use-cases", "/security"];

  const marketing: MetadataRoute.Sitemap = marketingRoutes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Only report a last-modified date when it is real (the git commit date of
  // an MDX page). A build timestamp would claim every page changed on every
  // deploy, and search engines learn to ignore the signal.
  const docs: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${base}${page.url}`,
    ...("lastModified" in page.data && page.data.lastModified instanceof Date
      ? { lastModified: page.data.lastModified }
      : {}),
    changeFrequency: "weekly",
    priority: page.url === "/docs" ? 0.8 : 0.6,
  }));

  return [...marketing, ...docs];
}
