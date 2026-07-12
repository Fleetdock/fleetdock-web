import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { siteConfig } from "@/lib/site-config";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const description = page.data.description ?? siteConfig.description;
  const url = page.url;

  return {
    title: page.data.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: page.data.title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description,
    },
  };
}
