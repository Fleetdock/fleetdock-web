import type { Metadata } from "next";
import Link from "next/link";
import { Rss } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Container, Section } from "@/components/shared/section";
import { CardGrid } from "@/components/content/card-grid";
import { JsonLd } from "@/components/shared/json-ld";
import { createMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/source";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, breadcrumbs, graph, organizationId } from "@/lib/structured-data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Releases, practical write-ups and opinions from the people building Fleetdock, the open-source control plane for MariaDB, MySQL and PostgreSQL.",
  path: "/blog",
});

export default function BlogIndex() {
  const posts = getBlogPosts();
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "Blog",
            name: `${siteConfig.name} blog`,
            url: absoluteUrl("/blog"),
            publisher: { "@id": organizationId },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.data.title,
              url: absoluteUrl(post.url),
              datePublished: post.data.date,
            })),
          },
          breadcrumbs([{ name: "Blog", path: "/blog" }]),
        )}
      />
      <PageHero
        eyebrow="Blog"
        title="Notes from building Fleetdock."
        description="Releases, practical write-ups on running many databases, and the reasoning behind the design."
      />
      <Section className="py-14 sm:py-16">
        <Container>
          <CardGrid
            items={posts.map((post) => ({
              href: post.url,
              title: post.data.title,
              description: post.data.description,
              kicker: formatDate(post.data.date),
            }))}
          />
          <p className="mt-8 text-sm text-muted-foreground">
            <Link href="/blog/rss.xml" className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Rss className="size-4" aria-hidden />
              RSS feed
            </Link>
          </p>
        </Container>
      </Section>
    </>
  );
}
