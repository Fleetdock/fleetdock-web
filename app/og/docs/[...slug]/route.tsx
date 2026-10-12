import { notFound } from "next/navigation";
import { source } from "@/lib/source";
import { renderOgImage } from "@/lib/og";

/** Per-page social image for the documentation, e.g. /og/docs/backups/image.png. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return renderOgImage({
    title: page.data.title ?? "Documentation",
    description: page.data.description,
    label: "Docs",
    footer: ["Documentation", "Open source", "Self-hosted"],
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: [...page.slugs, "image.png"],
  }));
}

