import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Server, Cpu, Boxes, Radio } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { ArchitectureDiagram } from "@/components/marketing/architecture-diagram";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { FinalCta } from "@/components/marketing/final-cta";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "How Fleetdock separates the control plane from your database nodes: the Manager orchestrates and tracks operations, while a lightweight Agent on each node executes them locally.",
  alternates: { canonical: "/architecture" },
};

const components = [
  {
    icon: Server,
    title: "Fleetdock Manager",
    body: "The control plane. It serves the dashboard and API, runs the operations worker, and stores all fleet metadata — users, servers, encrypted credentials, and job history — in PostgreSQL.",
  },
  {
    icon: Cpu,
    title: "Fleetdock Agent",
    body: "A Go service installed on each database node with one command. It enrolls with a single-use token, sends health heartbeats every 30 seconds, and polls for operations to run locally.",
  },
  {
    icon: Boxes,
    title: "Database instances",
    body: "Managed instances run on your nodes — provisioned as isolated Docker containers or registered from an existing database. External instances are databases you already host elsewhere.",
  },
];

const flow = [
  {
    title: "Managed instances",
    body: "Operations are claimed and executed by that node's agent against 127.0.0.1. The Manager never opens a shell — it enqueues a job and the agent reports progress.",
  },
  {
    title: "External instances",
    body: "The control plane connects directly to the database host and port. These jobs run on the Manager's built-in worker instead of an agent.",
  },
  {
    title: "Backups & restores",
    body: "Data is streamed with each engine's native dump tool and gzip to object storage through time-limited presigned URLs. Agents move the bytes but never hold your storage credentials.",
  },
  {
    title: "Offline detection",
    body: "If a node stops heartbeating for two minutes, the Manager flips it to offline so you see capacity and availability changes without polling each host.",
  },
];

export default function ArchitecturePage() {
  return (
    <>
      <PageHero
        eyebrow="Architecture"
        title="One manager. Multiple database nodes."
        description="Fleetdock cleanly separates the control plane from the servers that run your databases. You operate the entire fleet from one interface while each node stays independent."
      />

      <Section className="border-b border-border">
        <Container>
          <div className="rounded-2xl border border-border bg-background-subtle/50 p-5 sm:p-10">
            <ArchitectureDiagram />
          </div>
        </Container>
      </Section>

      <Section className="border-b border-border">
        <Container>
          <SectionHeading
            eyebrow="Components"
            title="Three moving parts, clearly separated."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {components.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-b border-border bg-background-subtle/40">
        <Container>
          <SectionHeading
            eyebrow="How operations flow"
            title="Jobs are enqueued centrally and executed where the data lives."
            description="Every asynchronous action is a tracked job with status, progress, and errors. Managed-instance jobs are claimed by an agent; external-instance jobs run on the Manager's worker."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {flow.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-6"
              >
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Radio className="size-4 text-accent" aria-hidden />
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/docs/concepts"
              className={cn(buttonVariants({ variant: "outline", size: "md" }))}
            >
              Read the concepts documentation
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
