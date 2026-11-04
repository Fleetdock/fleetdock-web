import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/article-layout";
import { JsonLd } from "@/components/shared/json-ld";
import { getMDXComponents } from "@/mdx-components";
import { contentOgImage, createMetadata, markdownPath } from "@/lib/metadata";
import { guidesSource } from "@/lib/source";
import { article, breadcrumbs, faqPage, graph } from "@/lib/structured-data";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export default async function Guide({ params }: Props) {
  const { slug } = await params;
  const guide = guidesSource.getPage([slug]);
  if (!guide) notFound();

  const { title, description, updated, faq } = guide.data;
  const MDX = guide.data.body;
  const trail = [
    { name: "Guides", path: "/guides" },
    { name: guide.data.label, path: guide.url },
  ];
  const others = guidesSource.getPages().filter((g) => g.url !== guide.url);

  return (
    <>
      <JsonLd
        data={graph(
          article({
            type: "TechArticle",
            title,
            description: description ?? "",
            path: guide.url,
            image: contentOgImage("guides", guide.slugs, title).url,
            dateModified: updated,
          }),
          breadcrumbs(trail),
          ...(faq.length ? [faqPage(faq)] : []),
        )}
      />
      <ArticleLayout
        trail={trail}
        eyebrow="Guide"
        title={title}
        description={description}
        meta={
          <>
            Updated <time dateTime={updated}>{formatDate(updated)}</time>
          </>
        }
        faq={faq}
        related={others.map((g) => ({
          href: g.url,
          title: g.data.title,
          description: g.data.description,
          kicker: g.data.label,
        }))}
        relatedTitle="More guides"
      >
        <MDX components={getMDXComponents()} />
      </ArticleLayout>
    </>
  );
}

export function generateStaticParams() {
  return guidesSource.getPages().map((g) => ({ slug: g.slugs[0] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesSource.getPage([slug]);
  if (!guide) notFound();
  return createMetadata({
    title: guide.data.title,
    description: guide.data.description ?? "",
    path: guide.url,
    type: "article",
    image: contentOgImage("guides", guide.slugs, guide.data.title),
    markdownPath: markdownPath(guide.url),
  });
}
