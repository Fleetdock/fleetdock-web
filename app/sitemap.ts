import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const marketingRoutes = ["", "/features", "/architecture", "/use-cases", "/security"];

  const marketing: MetadataRoute.Sitemap = marketingRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const docs: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${base}${page.url}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...marketing, ...docs];
}
