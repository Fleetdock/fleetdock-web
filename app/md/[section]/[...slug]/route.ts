import { notFound } from "next/navigation";
import {
  fromMarkdownFileSlug,
  isMarkdownSection,
  markdownFiles,
  pageMarkdown,
} from "@/lib/markdown";

export const dynamic = "force-static";

/**
 * A content page as plain Markdown, exported as a real `.md` file:
 * /md/docs/backups.md, /md/docs/index.md (the section's index page).
 * scripts/postexport.mjs then moves them next to their pages, so the public
 * URLs are /docs/backups.md, /docs.md, /blog/<post>.md and so on.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ section: string; slug: string[] }> },
) {
  const { section, slug } = await params;
  if (!isMarkdownSection(section)) notFound();

  const markdown = await pageMarkdown(section, fromMarkdownFileSlug(slug));
  if (markdown === null) notFound();

  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

export function generateStaticParams() {
  return markdownFiles();
}
