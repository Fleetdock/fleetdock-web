import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { Container, Section } from "@/components/shared/section";
import { CardGrid } from "@/components/content/card-grid";
import { JsonLd } from "@/components/shared/json-ld";
import { FinalCta } from "@/components/marketing/final-cta";
import { createMetadata } from "@/lib/metadata";
import { guidesSource } from "@/lib/source";
import { absoluteUrl, breadcrumbs, graph } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Guides",
  description:
    "Step-by-step guides for running many MySQL, MariaDB and PostgreSQL databases: one dashboard for all servers, S3 backups, database-per-tenant, moving databases.",
  path: "/guides",
});

export default function GuidesIndex() {
  const guides = guidesSource.getPages();
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "CollectionPage",
            name: "Fleetdock guides",
            url: absoluteUrl("/guides"),
            hasPart: guides.map((g) => ({ "@type": "TechArticle", headline: g.data.title, url: absoluteUrl(g.url) })),
          },
          breadcrumbs([{ name: "Guides", path: "/guides" }]),
        )}
      />
      <PageHero
        eyebrow="Guides"
        title="Practical guides for database fleets."
        description="How to do the jobs that get hard once you have more than a handful of databases: managing many servers, backups, tenants and moves — by hand and with Fleetdock."
      />
      <Section className="py-14 sm:py-16">
        <Container>
          <CardGrid
            items={guides.map((g) => ({
              href: g.url,
              title: g.data.title,
              description: g.data.description,
              kicker: g.data.label,
            }))}
          />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
