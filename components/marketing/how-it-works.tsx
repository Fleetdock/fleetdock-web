import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/section";

const steps = [
  {
    title: "Deploy Fleetdock Manager",
    body: "Bring up the control plane with Docker Compose (a local Postgres is included) or point it at managed PostgreSQL.",
    href: "/docs/manager",
  },
  {
    title: "Add a node and generate a token",
    body: "Register a database server from the dashboard to get a single-use registration token and a ready-to-paste install command.",
    href: "/docs/nodes",
  },
  {
    title: "Install the Fleetdock Agent",
    body: "Run one curl command on the server. The agent enrolls, installs the MariaDB client tools, and appears within about 30 seconds.",
    href: "/docs/agents",
  },
  {
    title: "Provision a MariaDB instance",
    body: "Launch a new instance in an isolated container, or register a database the server already runs.",
    href: "/docs/database-instances",
  },
  {
    title: "Configure backups and monitoring",
    body: "Add a backup destination, schedule recurring backups with retention, and watch node and instance health from the overview.",
    href: "/docs/backups",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-b border-border bg-background-subtle/40">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From zero to a managed database in five steps."
          description="Each step maps to a documented procedure with the real commands from the repository."
        />

        <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
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
