import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { Container, Section } from "@/components/shared/section";
import { CardGrid } from "@/components/content/card-grid";
import { JsonLd } from "@/components/shared/json-ld";
import { FinalCta } from "@/components/marketing/final-cta";
import { createMetadata } from "@/lib/metadata";
import { alternativesSource } from "@/lib/source";
import { absoluteUrl, breadcrumbs, graph } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Fleetdock vs other database tools",
  description:
    "Honest comparisons of Fleetdock with phpMyAdmin, pgAdmin, Adminer, ClusterControl and Percona PMM: what each tool is for, and when to pick which.",
  path: "/alternatives",
});

export default function AlternativesIndex() {
  const pages = alternativesSource.getPages();
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "CollectionPage",
            name: "Fleetdock compared with other database tools",
            url: absoluteUrl("/alternatives"),
            hasPart: pages.map((p) => ({ "@type": "Article", headline: p.data.title, url: absoluteUrl(p.url) })),
          },
          breadcrumbs([{ name: "Compare", path: "/alternatives" }]),
        )}
      />
      <PageHero
        eyebrow="Compare"
        title="Fleetdock and the tools you already know."
        description="Where Fleetdock overlaps with database GUIs and monitoring platforms, where it doesn't, and when another tool is the better choice."
      />
      <Section className="py-14 sm:py-16">
        <Container>
          <CardGrid
            items={pages.map((p) => ({
              href: p.url,
              title: p.data.title,
              description: p.data.verdict,
              kicker: p.data.competitor,
            }))}
          />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
