import { siteConfig } from "@/lib/site-config";
import { markdownParams, pageMarkdown, type MarkdownSection } from "@/lib/markdown";
import {
  productFacts,
  productFeatures,
  productLimits,
  productSummary,
} from "@/lib/product-facts";

export const dynamic = "force-static";

const ORDER: MarkdownSection[] = ["docs", "guides", "alternatives", "blog"];

/** The product summary, then every hand-written page as Markdown. */
export async function GET() {
  const intro = [
    `# ${siteConfig.name} (${siteConfig.url})`,
    "",
    productSummary,
    "",
    ...productFacts.map((f) => `- ${f.label}: ${f.value}`),
    "",
    "What it does:",
    ...productFeatures.map((f) => `- ${f}`),
    "",
    "What it does not do:",
    ...productLimits.map((f) => `- ${f}`),
  ].join("\n");

  const pages = await Promise.all(
    ORDER.flatMap((section) =>
      markdownParams(section).map((slugs) => pageMarkdown(section, slugs)),
    ),
  );

  return new Response([intro, ...pages.filter(Boolean)].join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
