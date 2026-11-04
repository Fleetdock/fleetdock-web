import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/article-layout";
import { JsonLd } from "@/components/shared/json-ld";
import { getMDXComponents } from "@/mdx-components";
import { contentOgImage, createMetadata, markdownPath } from "@/lib/metadata";
import { blogSource, getBlogPosts } from "@/lib/source";
import { article, breadcrumbs, graph } from "@/lib/structured-data";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogSource.getPage([slug]);
  if (!post) notFound();

  const { title, description, date, updated, author, tags } = post.data;
  const MDX = post.data.body;
  const trail = [
    { name: "Blog", path: "/blog" },
    { name: title, path: post.url },
  ];
  const others = getBlogPosts().filter((p) => p.url !== post.url).slice(0, 3);

  return (
    <>
      <JsonLd
        data={graph(
          {
            ...article({
              type: "BlogPosting",
              title,
              description: description ?? "",
              path: post.url,
              image: contentOgImage("blog", post.slugs, title).url,
              datePublished: date,
              dateModified: updated,
              author,
            }),
            keywords: tags.join(", "),
          },
          breadcrumbs(trail),
        )}
      />
      <ArticleLayout
        trail={trail}
        eyebrow="Blog"
        title={title}
        description={description}
        meta={
          <>
            <time dateTime={date}>{formatDate(date)}</time>
            {updated ? (
              <>
                {" · Updated "}
                <time dateTime={updated}>{formatDate(updated)}</time>
              </>
            ) : null}
            {` · ${author}`}
          </>
        }
        related={others.map((p) => ({
          href: p.url,
          title: p.data.title,
          description: p.data.description,
          kicker: formatDate(p.data.date),
        }))}
        relatedTitle="More from the blog"
      >
        <MDX components={getMDXComponents()} />
      </ArticleLayout>
    </>
  );
}

export function generateStaticParams() {
  return blogSource.getPages().map((post) => ({ slug: post.slugs[0] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogSource.getPage([slug]);
  if (!post) notFound();

  const metadata = createMetadata({
    title: post.data.title,
    description: post.data.description ?? "",
    path: post.url,
    type: "article",
    image: contentOgImage("blog", post.slugs, post.data.title),
    markdownPath: markdownPath(post.url),
  });
  metadata.openGraph = {
    ...metadata.openGraph,
    type: "article",
    publishedTime: post.data.date,
    modifiedTime: post.data.updated ?? post.data.date,
    authors: [post.data.author],
    tags: post.data.tags,
  };
  return metadata;
}
