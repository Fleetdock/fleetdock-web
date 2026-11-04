import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { Container, Section } from "@/components/shared/section";
import { JsonLd } from "@/components/shared/json-ld";
import { FinalCta } from "@/components/marketing/final-cta";
import { createMetadata } from "@/lib/metadata";
import {
  productAudience,
  productFacts,
  productFeatures,
  productLimits,
  productSummary,
} from "@/lib/product-facts";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, breadcrumbs, graph, organizationId } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "About Fleetdock",
  description:
    "Fleetdock at a glance: an open-source, self-hosted control plane for MariaDB, MySQL and PostgreSQL. What it does, who it is for, what it doesn't do, and key facts.",
  path: "/about",
});

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-accent">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * A plain fact sheet: the page journalists, directories and AI assistants can
 * quote. Everything comes from lib/product-facts.ts.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "AboutPage",
            name: "About Fleetdock",
            url: absoluteUrl("/about"),
            description: productSummary,
            mainEntity: { "@id": `${siteConfig.url}/#software` },
            publisher: { "@id": organizationId },
          },
          breadcrumbs([{ name: "About", path: "/about" }]),
        )}
      />
      <PageHero eyebrow="About" title="Fleetdock at a glance." description={productSummary} />

      <Section className="py-14 sm:py-16">
        <Container className="flex max-w-3xl flex-col gap-12">
          <section aria-labelledby="facts">
            <h2 id="facts" className="mb-5 text-2xl font-semibold tracking-tight text-foreground">
              Key facts
            </h2>
            <dl className="divide-y divide-border rounded-xl border border-border bg-card">
              {productFacts.map((f) => (
                <div key={f.label} className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="text-sm font-medium text-foreground">{f.label}</dt>
                  <dd className="break-words text-sm text-muted-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="does">
            <h2 id="does" className="mb-5 text-2xl font-semibold tracking-tight text-foreground">
              What it does
            </h2>
            <List items={productFeatures} />
          </section>

          <section aria-labelledby="for">
            <h2 id="for" className="mb-5 text-2xl font-semibold tracking-tight text-foreground">
              Who it is for
            </h2>
            <List items={productAudience} />
          </section>

          <section aria-labelledby="not">
            <h2 id="not" className="mb-5 text-2xl font-semibold tracking-tight text-foreground">
              What it doesn&apos;t do
            </h2>
            <List items={productLimits} />
          </section>

          <section aria-labelledby="more">
            <h2 id="more" className="mb-5 text-2xl font-semibold tracking-tight text-foreground">
              Learn more
            </h2>
            <ul className="flex flex-col gap-2 text-accent">
              <li><Link href="/docs" className="hover:underline">Documentation</Link></li>
              <li><Link href="/alternatives" className="hover:underline">How Fleetdock compares with other tools</Link></li>
              <li><Link href="/guides" className="hover:underline">Guides</Link></li>
              <li><a href={siteConfig.links.github} className="hover:underline">Source code on GitHub</a></li>
              <li><a href="/llms.txt" className="hover:underline">llms.txt — this site for AI assistants</a></li>
            </ul>
          </section>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
