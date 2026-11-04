import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { FaqList } from "@/components/shared/faq-list";
import { InstallCommand } from "@/components/shared/install-command";
import { JsonLd } from "@/components/shared/json-ld";
import { FinalCta } from "@/components/marketing/final-cta";
import { createMetadata } from "@/lib/metadata";
import { productFeatures } from "@/lib/product-facts";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, breadcrumbs, faqPage, graph } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  description:
    "Fleetdock is free and open source under Apache-2.0, with no paid edition and no per-database fees. You run it on your own server and pay only for that machine.",
  path: "/pricing",
});

const costs = [
  {
    title: "The server Fleetdock runs on",
    body: "Any Linux machine with Docker. 2 vCPU and 4 GB of RAM is enough to start; a small cloud VM does the job.",
  },
  {
    title: "Backup storage",
    body: "Backups go to your own S3, Cloudflare R2 or S3-compatible bucket, billed by your storage provider. One-off backups can also be downloaded without any storage.",
  },
  {
    title: "Your databases",
    body: "Fleetdock manages databases you already run or creates them on your servers. It adds no fee per server, database, user or backup.",
  },
];

const faq = [
  {
    q: "Is Fleetdock really free?",
    a: `Yes. Fleetdock is open source under the ${siteConfig.license.name} license. Every feature is in the free version; there is no paid edition, no license key and no limit on servers, databases or users.`,
  },
  {
    q: "Is there a hosted (SaaS) version?",
    a: "No. Fleetdock is self-hosted only: it runs on your server, so your data and credentials never pass through a vendor.",
  },
  {
    q: "Can I use it commercially?",
    a: `Yes. ${siteConfig.license.name} allows commercial use, modification and redistribution, including running Fleetdock for your customers.`,
  },
  {
    q: "How do I get help?",
    a: "Read the documentation, or open an issue on GitHub; it's the fastest way to reach the maintainers.",
  },
  {
    q: "Does Fleetdock send telemetry?",
    a: "No. It sends no usage data anywhere.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "WebPage",
            name: "Fleetdock pricing",
            url: absoluteUrl("/pricing"),
            about: {
              "@type": "SoftwareApplication",
              "@id": `${siteConfig.url}/#software`,
              name: siteConfig.name,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
          },
          breadcrumbs([{ name: "Pricing", path: "/pricing" }]),
          faqPage(faq),
        )}
      />
      <PageHero
        eyebrow="Pricing"
        title="Free. Open source. Every feature."
        description={`Fleetdock costs nothing to use. It's ${siteConfig.license.name}-licensed software you run on your own server — no paid tier, no per-database pricing, no seat limits.`}
      />

      <Section className="py-14 sm:py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-6 rounded-2xl border border-accent/30 bg-card p-7 sm:p-9">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-semibold tracking-tight text-foreground">$0</span>
              <span className="text-muted-foreground">forever, for any number of databases</span>
            </div>
            <ul className="grid grid-cols-1 gap-2.5 text-sm text-foreground/90">
              {productFeatures.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
            <InstallCommand />
            <p className="text-sm text-muted-foreground">
              Need a guided start? Follow{" "}
              <Link href="/docs/getting-started" className="text-accent hover:underline">
                Getting started
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <SectionHeading title="What you do pay for" />
            {costs.map((c) => (
              <div key={c.title} className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-foreground">{c.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border py-14 sm:py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <SectionHeading eyebrow="FAQ" title="Questions about cost and licensing." />
          <FaqList items={faq} />
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
