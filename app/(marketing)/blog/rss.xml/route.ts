import { getBlogPosts } from "@/lib/source";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

function escape(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function rfc822(date: string) {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

/** RSS 2.0 feed of the blog. */
export function GET() {
  const posts = getBlogPosts();
  const items = posts.map((post) => {
    const url = `${siteConfig.url}${post.url}`;
    return [
      "    <item>",
      `      <title>${escape(post.data.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${rfc822(post.data.date)}</pubDate>`,
      `      <description>${escape(post.data.description ?? "")}</description>`,
      ...post.data.tags.map((tag) => `      <category>${escape(tag)}</category>`),
      "    </item>",
    ].join("\n");
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escape(siteConfig.name)} blog</title>`,
    `    <link>${siteConfig.url}/blog</link>`,
    `    <description>${escape(siteConfig.metaDescription)}</description>`,
    "    <language>en</language>",
    `    <atom:link href="${siteConfig.url}/blog/rss.xml" rel="self" type="application/rss+xml"/>`,
    ...(posts[0] ? [`    <lastBuildDate>${rfc822(posts[0].data.updated ?? posts[0].data.date)}</lastBuildDate>`] : []),
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
