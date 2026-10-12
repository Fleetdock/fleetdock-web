import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/marketing/page-hero";
import { useCases } from "@/components/marketing/use-cases-section";
import { Container, Section } from "@/components/shared/section";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = createMetadata({
  title: "Use cases",
  description:
    "How SaaS platforms, ERP and CRM vendors, hosting providers, and agencies use Fleetdock to run many isolated database instances across their servers.",
  path: "/use-cases",
});

export default function UseCasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Use cases"
        title="Built for teams running database fleets."
        description="Fleetdock is designed for one specific, hard problem: operating many isolated database instances across many servers — especially a database per customer."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {useCases.map(({ icon: Icon, title, summary, detail }) => (
              <article
                key={title}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="size-5.5" aria-hidden />
                  </span>
                  <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                </div>
                <p className="text-sm font-medium text-foreground/90">{summary}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
