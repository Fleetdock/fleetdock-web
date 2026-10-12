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
import { createMetadata, docsOgImage } from "@/lib/metadata";
import { JsonLd } from "@/components/shared/json-ld";
import { OpenAPIPage } from "@/components/api-page";
import { getPageSlug, resolveDocsSlug } from "@/lib/versions";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const { version, slug } = resolveDocsSlug(params.slug);
  const page = source.getPage(getPageSlug(version, slug));
  if (!page) notFound();

  const jsonLd = <JsonLd data={docsJsonLd(page)} />;

  if (page.type === "openapi") {
    return (
      <DocsPage toc={page.data.toc} full>
        {jsonLd}
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <OpenAPIPage {...page.data.getOpenAPIPageProps()} />
        </DocsBody>
      </DocsPage>
    );
  }

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      {jsonLd}
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
  const { version, slug } = resolveDocsSlug(params.slug);
  const page = source.getPage(getPageSlug(version, slug));
  if (!page) notFound();

  const title = page.data.title ?? siteConfig.name;
  return createMetadata({
    title,
    description: page.data.description ?? siteConfig.description,
    path: page.url,
    type: "article",
    image: docsOgImage(page.slugs, title),
  });
}

type DocsPageEntry = NonNullable<ReturnType<typeof source.getPage>>;

/** TechArticle + BreadcrumbList structured data for a docs page. */
function docsJsonLd(page: DocsPageEntry) {
  const url = `${siteConfig.url}${page.url}`;
  const title = page.data.title ?? siteConfig.name;

  // Home → Documentation → any existing parent pages → this page.
  const trail: { name: string; url: string }[] = [{ name: siteConfig.name, url: siteConfig.url }];
  for (let i = 0; i <= page.slugs.length; i++) {
    const crumb = source.getPage(page.slugs.slice(0, i));
    if (crumb) {
      trail.push({
        name: i === 0 ? "Documentation" : (crumb.data.title ?? siteConfig.name),
        url: `${siteConfig.url}${crumb.url}`,
      });
    }
  }

  const lastModified =
    "lastModified" in page.data && page.data.lastModified instanceof Date
      ? page.data.lastModified.toISOString()
      : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: title,
        description: page.data.description ?? siteConfig.description,
        url,
        mainEntityOfPage: url,
        inLanguage: "en",
        image: `${siteConfig.url}${docsOgImage(page.slugs, title).url}`,
        ...(lastModified ? { dateModified: lastModified } : {}),
        isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
        publisher: {
          "@type": "Organization",
          name: siteConfig.maintainer.name,
          url: siteConfig.maintainer.url,
          logo: `${siteConfig.url}/logo.png`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      },
    ],
  };
}
