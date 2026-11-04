import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/article-layout";
import { ComparisonTable } from "@/components/content/comparison-table";
import { JsonLd } from "@/components/shared/json-ld";
import { getMDXComponents } from "@/mdx-components";
import { contentOgImage, createMetadata, markdownPath } from "@/lib/metadata";
import { alternativesSource } from "@/lib/source";
import { article, breadcrumbs, faqPage, graph } from "@/lib/structured-data";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export default async function Comparison({ params }: Props) {
  const { slug } = await params;
  const page = alternativesSource.getPage([slug]);
  if (!page) notFound();

  const { title, description, competitor, competitorUrl, verdict, comparison, updated, faq } =
    page.data;
  const MDX = page.data.body;
  const trail = [
    { name: "Compare", path: "/alternatives" },
    { name: `vs ${competitor}`, path: page.url },
  ];
  const others = alternativesSource.getPages().filter((p) => p.url !== page.url);

  return (
    <>
      <JsonLd
        data={graph(
          {
            ...article({
              type: "Article",
              title,
              description: description ?? "",
              path: page.url,
              image: contentOgImage("alternatives", page.slugs, title).url,
              dateModified: updated,
            }),
            mentions: [
              { "@type": "SoftwareApplication", name: competitor, url: competitorUrl },
            ],
          },
          breadcrumbs(trail),
          ...(faq.length ? [faqPage(faq)] : []),
        )}
      />
      <ArticleLayout
        trail={trail}
        eyebrow="Compare"
        title={title}
        description={description}
        meta={
          <>
            Updated <time dateTime={updated}>{formatDate(updated)}</time>
          </>
        }
        lead={
          <div className="mb-12 flex flex-col gap-8">
            <div className="rounded-xl border border-accent/30 bg-accent/[0.06] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">Short answer</p>
              <p className="mt-2 text-pretty leading-relaxed text-foreground">{verdict}</p>
            </div>
            {comparison.length ? (
              <ComparisonTable competitor={competitor} rows={comparison} />
            ) : null}
          </div>
        }
        faq={faq}
        related={others.map((p) => ({
          href: p.url,
          title: p.data.title,
          description: p.data.verdict,
          kicker: p.data.competitor,
        }))}
        relatedTitle="Other comparisons"
      >
        <MDX components={getMDXComponents()} />
      </ArticleLayout>
    </>
  );
}

export function generateStaticParams() {
  return alternativesSource.getPages().map((p) => ({ slug: p.slugs[0] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = alternativesSource.getPage([slug]);
  if (!page) notFound();
  return createMetadata({
    title: page.data.title,
    description: page.data.description ?? "",
    path: page.url,
    type: "article",
    image: contentOgImage("alternatives", page.slugs, page.data.title),
    markdownPath: markdownPath(page.url),
  });
}
