import { notFound } from "next/navigation";
import { renderOgImage } from "@/lib/og";
import { alternativesSource, blogSource, guidesSource } from "@/lib/source";

export const dynamic = "force-static";

const sections = {
  blog: { source: blogSource, label: "Blog" },
  guides: { source: guidesSource, label: "Guide" },
  alternatives: { source: alternativesSource, label: "Compare" },
} as const;

type Section = keyof typeof sections;

/** Social image for a blog post, guide or comparison, e.g. /og/blog/<slug>/image.png. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ section: string; slug: string[] }> },
) {
  const { section, slug } = await params;
  if (!(section in sections)) notFound();
  const { source, label } = sections[section as Section];
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return renderOgImage({
    title: page.data.title,
    description: page.data.description,
    label,
  });
}

export function generateStaticParams() {
  return (Object.keys(sections) as Section[]).flatMap((section) =>
    sections[section].source
      .getPages()
      .map((page) => ({ section, slug: [...page.slugs, "image.png"] })),
  );
}
