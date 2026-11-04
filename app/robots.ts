import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Rendered once at build time (static export).
export const dynamic = "force-static";

/**
 * AI search and assistant crawlers we explicitly welcome. Listing them states
 * the intent plainly (some hosts and CDNs block AI crawlers by default unless
 * the site opts in) and keeps the rules identical to everyone else's.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
  "meta-externalagent",
  "MistralAI-User",
  "cohere-ai",
  "CCBot",
  "YandexBot",
];

// /api/search is the docs search index, not a page.
const disallow = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: AI_CRAWLERS, allow: "/", disallow },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
