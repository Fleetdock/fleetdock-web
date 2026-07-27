import Link from "next/link";
import { ArrowRight, Layers, Building2, Server, Users, Package, Wrench } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const useCases = [
  {
    icon: Layers,
    title: "Database-per-tenant SaaS",
    summary: "Manage isolated databases for every customer from one control plane.",
    detail:
      "Run hundreds or thousands of isolated customer databases across your servers. Provision a new instance per tenant, back each one up on a schedule, and see the whole fleet's health in one place — without a spreadsheet of hosts.",
  },
  {
    icon: Building2,
    title: "ERP and CRM platforms",
    summary: "Operate many customer database instances across multiple servers.",
    detail:
      "Keep each customer's data in its own isolated database and standardize backups, restores, and migrations across every deployment, regardless of which server a tenant lives on.",
  },
  {
    icon: Server,
    title: "Hosting providers",
    summary: "Provision and maintain database instances for clients.",
    detail:
      "Give each client a dedicated database instance with application credentials and stable gateway endpoints — provisioned and monitored from a single dashboard, without publishing raw database ports.",
  },
  {
    icon: Users,
    title: "Agencies",
    summary: "Manage customer databases without sharing manual server access.",
    detail:
      "Run day-to-day database operations through role-based access instead of handing out SSH keys. Operators get exactly the permissions they need, and every action is tracked.",
  },
  {
    icon: Package,
    title: "Self-hosted software vendors",
    summary: "Offer managed database operations on customer-controlled infrastructure.",
    detail:
      "Deliver a managed-database experience on servers your customers own. Provisioning, backups, and restores are standardized while the data never leaves their infrastructure.",
  },
  {
    icon: Wrench,
    title: "Internal infrastructure teams",
    summary: "Replace scripts, spreadsheets, and undocumented procedures.",
    detail:
      "Consolidate scattered cron jobs and one-off shell scripts into tracked operations with a shared history, so on-call engineers stop reverse-engineering how the last restore worked.",
  },
];

export function UseCasesSection() {
  return (
    <Section id="use-cases" className="border-b border-border">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Use cases"
            title="Built for teams running database fleets."
            description="Fleetdock is designed for the specific problem of operating many isolated database instances across many servers."
          />
          <Link
            href="/use-cases"
            className={cn(buttonVariants({ variant: "outline", size: "md" }), "shrink-0")}
          >
            All use cases
            <ArrowRight aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map(({ icon: Icon, title, summary }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
