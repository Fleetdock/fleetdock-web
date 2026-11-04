import { siteConfig } from "@/lib/site-config";
import {
  alternativesSource,
  blogSource,
  guidesSource,
  source,
} from "@/lib/source";

/**
 * Plain-Markdown versions of the content pages for AI assistants and agents:
 * served at `<page>.md` and concatenated into /llms-full.txt. Fields the page
 * template renders from frontmatter (verdict, comparison table, FAQ) are
 * written out here too, so the Markdown says everything the page says.
 */
export const markdownSections = {
  docs: source,
  blog: blogSource,
  guides: guidesSource,
  alternatives: alternativesSource,
} as const;

export type MarkdownSection = keyof typeof markdownSections;

export function isMarkdownSection(value: string): value is MarkdownSection {
  return value in markdownSections;
}

type FaqItem = { q: string; a: string };

function faqMarkdown(faq: FaqItem[] | undefined): string {
  if (!faq?.length) return "";
  return ["## Frequently asked questions", ...faq.map((f) => `### ${f.q}\n\n${f.a}`)].join("\n\n");
}

function cell(text: string) {
  return text.replaceAll("|", "\\|");
}

/** Markdown for one page, or null for generated API pages (no prose). */
export async function pageMarkdown(
  section: MarkdownSection,
  slugs: string[],
): Promise<string | null> {
  const page = markdownSections[section].getPage(slugs);
  if (!page || page.type === "openapi") return null;

  const data = page.data as typeof page.data & {
    description?: string;
    date?: string;
    updated?: string;
    author?: string;
    verdict?: string;
    competitor?: string;
    comparison?: { feature: string; fleetdock: string; competitor: string }[];
    faq?: FaqItem[];
  };

  const head: string[] = [`# ${data.title}`, ""];
  if (data.description) head.push(`> ${data.description}`, "");
  head.push(`Source: ${siteConfig.url}${page.url}`);
  if (data.date) head.push(`Published: ${data.date}${data.author ? ` by ${data.author}` : ""}`);
  if (data.updated) head.push(`Updated: ${data.updated}`);
  head.push("");

  if (data.verdict) head.push(`**Verdict:** ${data.verdict}`, "");
  if (data.comparison?.length && data.competitor) {
    head.push(
      `| | ${siteConfig.name} | ${cell(data.competitor)} |`,
      "| --- | --- | --- |",
      ...data.comparison.map(
        (row) => `| ${cell(row.feature)} | ${cell(row.fleetdock)} | ${cell(row.competitor)} |`,
      ),
      "",
    );
  }

  const body = await data.getText("processed");
  return [head.join("\n"), body.trim(), faqMarkdown(data.faq)].filter(Boolean).join("\n\n") + "\n";
}

/** Every slug of a section that has a Markdown version. */
export function markdownParams(section: MarkdownSection): string[][] {
  return markdownSections[section]
    .getPages()
    .filter((page) => page.type !== "openapi")
    .map((page) => page.slugs);
}
