import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/section";

const steps = [
  {
    title: "Get a Linux server",
    body: "2 vCPU and 4 GB of RAM is enough to start, with ports 80 and 443 open. A domain is optional: the installer can give you a free sslip.io name with HTTPS.",
    href: "/docs/manager",
  },
  {
    title: "Run one command",
    body: "The installer asks for a domain and an admin email, installs Docker if needed and starts Fleetdock behind automatic HTTPS. It prints your login at the end.",
    href: "/docs/getting-started",
  },
  {
    title: "Connect your databases",
    body: "Add any MariaDB, MySQL or PostgreSQL server Fleetdock can reach (hosted ones like RDS too), or install the agent on a machine to create database containers there.",
    href: "/docs/database-instances",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-b border-border bg-background-subtle/40">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Running in about five minutes."
          description="No Kubernetes, no cloud account, no sign-up. Day to day, the fleetdock command handles status, updates and diagnostics."
        />

        <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Link
                href={step.href}
                className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-border-strong hover:bg-elevated"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-8 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-sm font-semibold text-accent tabular-nums">
                    {i + 1}
                  </span>
                  <ArrowRight
                    className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden
                  />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
