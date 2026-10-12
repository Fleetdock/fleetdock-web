import { source } from "@/lib/source";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

/** llms.txt index (https://llmstxt.org) so AI search tools can find the docs. */
export function GET() {
  const pages = source
    .getPages()
    .map(
      (page) =>
        `- [${page.data.title}](${siteConfig.url}${page.url})${
          page.data.description ? `: ${page.data.description}` : ""
        }`,
    );

  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.metaDescription}`,
    "",
    `Source code: ${siteConfig.links.github}`,
    `Full documentation text: ${siteConfig.url}/llms-full.txt`,
    "",
    "## Docs",
    "",
    ...pages,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
