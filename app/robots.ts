import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

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

// /api/ is the search and API-playground proxy; /md/ is the internal path
// behind the public <page>.md URLs.
const disallow = ["/api/", "/md/"];

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
