import {
  alternativesSource,
  getBlogPosts,
  guidesSource,
  source,
} from "@/lib/source";
import { siteConfig } from "@/lib/site-config";
import {
  productAudience,
  productFacts,
  productFeatures,
  productLimits,
  productSummary,
} from "@/lib/product-facts";

export const dynamic = "force-static";

type Linkable = { url: string; data: { title?: string; description?: string } };

function link(page: Linkable, markdown = true) {
  const url = `${siteConfig.url}${page.url}${markdown ? ".md" : ""}`;
  return `- [${page.data.title}](${url})${page.data.description ? `: ${page.data.description}` : ""}`;
}

/**
 * llms.txt (https://llmstxt.org): what Fleetdock is, in facts an assistant can
 * quote, then links to the Markdown version of every content page. The
 * generated per-endpoint API pages are summarised by one link to the API
 * reference so they don't drown out everything else.
 */
export function GET() {
  const docs = source.getPages().filter((page) => page.type !== "openapi");

  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${productSummary}`,
    "",
    ...productFacts.map((f) => `- ${f.label}: ${f.value}`),
    "",
    "## What it does",
    "",
    ...productFeatures.map((f) => `- ${f}`),
    "",
    "## What it does not do",
    "",
    ...productLimits.map((f) => `- ${f}`),
    "",
    "## Who it is for",
    "",
    ...productAudience.map((f) => `- ${f}`),
    "",
    "## Product",
    "",
    `- [Overview](${siteConfig.url}/): The product in one page, with screenshots and FAQ`,
    `- [Features](${siteConfig.url}/features): Everything Fleetdock does`,
    `- [Pricing](${siteConfig.url}/pricing): Free and open source; what it costs to run`,
    `- [Use cases](${siteConfig.url}/use-cases): SaaS, ERP/CRM, hosting providers, agencies`,
    `- [Architecture](${siteConfig.url}/architecture): Manager, Agent, Gateway and how operations run`,
    `- [Security](${siteConfig.url}/security): Trust boundaries, privileges and compromise scenarios`,
    `- [About](${siteConfig.url}/about): Fact sheet`,
    "",
    "## Docs",
    "",
    ...docs.map((page) => link(page)),
    `- [OpenAPI specification](${siteConfig.links.github}/blob/main/backend/internal/openapi/openapi.yaml): Every Manager API endpoint`,
    "",
    "## Guides",
    "",
    ...guidesSource.getPages().map((page) => link(page)),
    "",
    "## Comparisons",
    "",
    ...alternativesSource.getPages().map((page) => link(page)),
    "",
    "## Blog",
    "",
    ...getBlogPosts().map((page) => link(page)),
    "",
    "## Optional",
    "",
    `- [Full text of the docs, guides and comparisons](${siteConfig.url}/llms-full.txt)`,
    `- [Source code](${siteConfig.links.github})`,
    `- [Changelog](${siteConfig.links.changelog})`,
    `- [Roadmap](${siteConfig.links.roadmap})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
