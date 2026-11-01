import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { Screenshot, type ScreenshotName } from "@/components/shared/screenshot";

type Feature = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  shot: ScreenshotName;
  url: string;
  href: string;
};

const features: Feature[] = [
  {
    eyebrow: "Data browser",
    title: "Edit data like a spreadsheet, with an undo button.",
    body: "Open any table on any server and change rows in place. Every save is journaled, so a mistake is one click to undo, even days later.",
    points: ["Follow foreign keys between tables", "Import and export CSV or SQL", "Compare a table with a backup and restore single rows"],
    shot: "data-browser",
    url: "/data",
    href: "/docs/data-browser",
  },
  {
    eyebrow: "SQL console",
    title: "See what a query will change before it runs.",
    body: "Preview shows the rows an UPDATE or DELETE will touch, before and after, without committing. Explain draws the query plan as a tree and points at the slow step.",
    points: ["Autocomplete from the live schema", "History and saved queries", "Index health: unused and redundant indexes"],
    shot: "sql-console",
    url: "/data",
    href: "/docs/sql-console",
  },
  {
    eyebrow: "Fleet query",
    title: "One SQL script, hundreds of databases.",
    body: "Run a migration, a fix or a report on up to 500 databases at once, and see what each one returned, with a CSV export of everything.",
    points: ["Pick targets by name pattern, server and engine", "Cancel mid-run, or retry only the failures", "Scoped to what the user is allowed to touch"],
    shot: "fleet-query",
    url: "/fleet",
    href: "/docs/fleet-query",
  },
  {
    eyebrow: "Schema history",
    title: "Know exactly what changed in your schema, and when.",
    body: "Fleetdock snapshots each database's schema and shows a timeline of what changed, with a script to go back to any earlier version. Compare two databases to get the script that makes them match.",
    points: ["A notification when a schema changes", "Before and after of every changed object", "Compare databases across servers"],
    shot: "schema-history",
    url: "/databases",
    href: "/docs/schema-history",
  },
  {
    eyebrow: "Backups",
    title: "Backups you have actually tested.",
    body: "Schedule backups to your own S3, R2 or MinIO bucket with retention, then let Fleetdock restore each one into a scratch database to prove it works.",
    points: ["Retention cleans up old backups for you", "One-click restore, or download a .sql.gz", "Alerts by email, Slack or webhook when one fails"],
    shot: "backups",
    url: "/backups",
    href: "/docs/backups",
  },
  {
    eyebrow: "Monitoring",
    title: "Every server's health on one screen.",
    body: "CPU, memory, disk and connections for each machine, plus live sessions and the slowest statements on every database server.",
    points: ["Offline detection within two minutes", "Kill a runaway query", "History charts for the last 7 days"],
    shot: "instance-detail",
    url: "/instances",
    href: "/docs/performance",
  },
];

export function FeatureShowcase() {
  return (
    <Section id="features" className="border-b border-border">
      <Container>
        <SectionHeading
          align="center"
          className="mx-auto"
          eyebrow="What you get"
          title="Everything you'd SSH in for, in the browser."
          description="Real screenshots from a Fleetdock install. No mock-ups."
        />

        <div className="mt-16 flex flex-col gap-20 sm:gap-28">
          {features.map((f, i) => (
            <article
              key={f.shot}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14"
            >
              <div className={cn("flex flex-col gap-4", i % 2 === 1 && "lg:order-2")}>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{f.eyebrow}</span>
                <h3 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{f.title}</h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">{f.body}</p>
                <ul className="mt-1 flex flex-col gap-2.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={f.href}
                  className="group mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Read the docs
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
              <Screenshot
                name={f.shot}
                url={f.url}
                className={cn(i % 2 === 1 && "lg:order-1")}
                sizes="(min-width: 1024px) 680px, 100vw"
              />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
