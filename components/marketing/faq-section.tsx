import { ChevronDown } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { JsonLd } from "@/components/shared/json-ld";

export const faqs: { q: string; a: string }[] = [
  {
    q: "Is Fleetdock free?",
    a: "Yes. Fleetdock is open source under the Apache-2.0 license, and you run it on your own server. You pay only for the machine it runs on.",
  },
  {
    q: "Does any of my data leave my servers?",
    a: "No. Fleetdock runs entirely on infrastructure you control and sends no telemetry. Database passwords and storage keys are encrypted at rest with your own key, and backups go to the S3-compatible bucket you choose.",
  },
  {
    q: "Which databases does it support?",
    a: "MariaDB, MySQL and PostgreSQL: on your own servers, in Docker, or hosted ones such as Amazon RDS or Neon that Fleetdock can reach over the network.",
  },
  {
    q: "Do I need to install an agent on every server?",
    a: "No. A database Fleetdock can reach directly is connected with just its address and a login. The agent is optional: install it on a machine when you want Fleetdock to create database containers there, report the machine's CPU, memory and disk, or back up databases that aren't reachable from outside.",
  },
  {
    q: "What do I need to run it?",
    a: "A Linux server with Docker (the installer adds it if it's missing); 2 vCPU and 4 GB of RAM is enough to start. The one-line installer sets up automatic HTTPS. On a Mac or Windows PC it runs locally for evaluation.",
  },
  {
    q: "How do upgrades work?",
    a: "Run `fleetdock update`. It backs up Fleetdock's own data first, then moves to the latest release. `fleetdock doctor` checks DNS, certificates and reachability if something looks wrong.",
  },
  {
    q: "Does Fleetdock provide high availability or automatic failover?",
    a: "No. Fleetdock manages, backs up and monitors your databases, but it doesn't replicate them or fail over between servers. Keep using your existing replication setup for that.",
  },
];

export function FaqSection() {
  return (
    <Section id="faq" className="border-b border-border">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a.replaceAll("`", "") },
          })),
        }}
      />
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions people ask before installing."
          description="Can't find your answer? Open an issue on GitHub; it's the fastest way to reach the maintainers."
        />
        <div className="divide-y divide-border rounded-xl border border-border bg-card">
          {faqs.map((f) => (
            <details key={f.q} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-foreground">
                {f.q}
                <ChevronDown
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {f.a.split("`").map((part, i) =>
                  i % 2 === 1 ? (
                    <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">
                      {part}
                    </code>
                  ) : (
                    part
                  ),
                )}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
