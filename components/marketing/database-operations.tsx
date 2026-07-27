import Link from "next/link";
import {
  Boxes,
  Activity,
  DatabaseBackup,
  RotateCcw,
  ArrowRightLeft,
  KeyRound,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/section";

const operations = [
  {
    icon: Boxes,
    title: "Provision",
    body: "Launch isolated MariaDB, MySQL, or PostgreSQL instances with a generated root password, a named data volume, and a published port — as a Docker container on a connected server.",
    href: "/docs/database-instances",
  },
  {
    icon: Activity,
    title: "Monitor",
    body: "Track node availability, CPU, memory, disk, and connection metrics from 30-second heartbeats, plus per-instance health and a fleet-wide overview.",
    href: "/docs/nodes",
  },
  {
    icon: DatabaseBackup,
    title: "Back up",
    body: "Run manual or scheduled backups with each engine's native dump tool — gzipped and checksummed — streamed to S3, Cloudflare R2, or any S3-compatible bucket with retention.",
    href: "/docs/backups",
  },
  {
    icon: RotateCcw,
    title: "Restore",
    body: "Restore from any backup through a tracked operation that verifies the artifact checksum before touching the target and reports the restored table count.",
    href: "/docs/restores",
  },
  {
    icon: ArrowRightLeft,
    title: "Migrate",
    body: "Move a database to another instance or server with a backup → restore → verify saga — no hand-assembling dump, transfer, and import scripts.",
    href: "/docs/migrations",
  },
  {
    icon: KeyRound,
    title: "Manage credentials",
    body: "Create application credentials with scoped profiles for external apps. Instance and storage secrets are encrypted at rest; public access routes through the Fleetdock Gateway.",
    href: "/docs/external-access",
  },
  {
    icon: Globe,
    title: "External access",
    body: "Expose databases to applications outside your private network through the Fleetdock Gateway — one stable port per database, CIDR allowlists, and disabled by default.",
    href: "/docs/external-access",
  },
];

export function DatabaseOperations() {
  return (
    <Section id="operations" className="border-b border-border bg-background-subtle/40">
      <Container>
        <SectionHeading
          eyebrow="Core operations"
          title="The database workflows your team runs, standardized."
          description="Every day-to-day operation becomes a consistent, tracked action instead of a bespoke shell script — the same way on every server."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {operations.map(({ icon: Icon, title, body, href }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-6 transition-colors hover:border-border-strong hover:bg-elevated"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="flex items-center gap-1.5 text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-accent">
                Learn more
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
