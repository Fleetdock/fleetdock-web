import { source } from "@/lib/source";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

/** Every hand-written docs page as plain Markdown, for LLM ingestion. */
export async function GET() {
  const sections = await Promise.all(
    source.getPages().map(async (page) => {
      if (page.type === "openapi") return null;
      const text = await page.data.getText("processed");
      return `# ${page.data.title} (${siteConfig.url}${page.url})\n\n${text}`;
    }),
  );

  return new Response(sections.filter(Boolean).join("\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
