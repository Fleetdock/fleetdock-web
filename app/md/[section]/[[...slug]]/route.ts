import { notFound } from "next/navigation";
import {
  isMarkdownSection,
  markdownParams,
  markdownSections,
  pageMarkdown,
} from "@/lib/markdown";

export const dynamic = "force-static";

/**
 * A content page as plain Markdown. Reached through the rewrites in
 * next.config.ts: /docs/backups.md, /blog/<post>.md, /guides/<guide>.md,
 * /alternatives/<page>.md (and /docs.md for the docs index).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ section: string; slug?: string[] }> },
) {
  const { section, slug = [] } = await params;
  if (!isMarkdownSection(section)) notFound();

  const markdown = await pageMarkdown(section, slug);
  if (markdown === null) notFound();

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // The HTML page is the canonical version.
      "X-Robots-Tag": "noindex",
    },
  });
}

export function generateStaticParams() {
  return (Object.keys(markdownSections) as (keyof typeof markdownSections)[]).flatMap(
    (section) => markdownParams(section).map((slug) => ({ section, slug })),
  );
}
