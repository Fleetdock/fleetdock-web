import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import {
  LayoutDashboard,
  CalendarClock,
  Bell,
  LineChart,
  ArrowRightLeft,
  History,
  UserCheck,
  Users,
  KeyRound,
  Database,
  TableProperties,
  ScrollText,
  SquareTerminal,
  Bookmark,
  Network,
  Layers,
  GitCompareArrows,
  Lock,
} from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { DatabaseOperations } from "@/components/marketing/database-operations";
import { FeatureGrid, type FeatureItem } from "@/components/marketing/feature-grid";
import { ComparisonSection } from "@/components/marketing/comparison-section";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = createMetadata({
  title: "Features",
  description:
    "Provisioning, monitoring, backups, restores, migrations, alerting, RBAC, a data browser, SQL across the fleet, and schema history for MariaDB, MySQL, and PostgreSQL from one control plane.",
  path: "/features",
});

const automation: FeatureItem[] = [
  {
    icon: LayoutDashboard,
    title: "Fleet overview",
    body: "A single dashboard for fleet health, instance and database counts, backup and operation status, and an automation summary.",
  },
  {
    icon: CalendarClock,
    title: "Scheduled backups",
    body: "Cron-scheduled recurring backups per database with a retention window. The worker enqueues them and prunes expired backups automatically.",
  },
  {
    icon: Bell,
    title: "Notifications & alerts",
    body: "Email, Slack, and webhook channels with alert rules on CPU, memory, disk, and connections. Backup failures and offline servers notify automatically.",
  },
  {
    icon: LineChart,
    title: "Metrics history",
    body: "Every 30-second heartbeat is stored as a time-series sample and charted per server — CPU, memory, disk, and connection usage over time.",
  },
  {
    icon: ArrowRightLeft,
    title: "Move & verify",
    body: "A background saga copies or relocates a database across servers, verifies the artifact checksum, counts restored tables, and can drop the source.",
  },
  {
    icon: History,
    title: "Retention pruning",
    body: "Expired backup objects and their metadata are removed on schedule, so storage does not grow unbounded.",
  },
];

const data: FeatureItem[] = [
  {
    icon: TableProperties,
    title: "Data browser",
    body: "Open tables in tabs with filters on any column, search and sort, inline editing with undo, frozen and hidden columns, a row panel, full screen, and a schema picker — then export the filtered rows to CSV.",
  },
  {
    icon: SquareTerminal,
    title: "SQL console",
    body: "Run multi-statement scripts with autocompletion, a confirmation before anything writes, cancel, query plans as a tree, and your own history and saved queries.",
  },
  {
    icon: Bookmark,
    title: "Saved table views",
    body: "Save a table's filters, sort, hidden and frozen columns, and widths as a named view — private or shared with everyone who can open the database — and link straight to it.",
  },
  {
    icon: Network,
    title: "ER diagram",
    body: "See every table, key, and foreign key as an entity-relationship diagram, laid out automatically. Focus on a table and its neighbours, pick schemas, and download PNG or SVG.",
  },
  {
    icon: Layers,
    title: "Fleet query",
    body: "Run one SQL script on up to 500 databases at once and read the merged results side by side, with each database's status, rows, and errors, and a CSV of the lot.",
  },
  {
    icon: GitCompareArrows,
    title: "Schema history & drift",
    body: "Record every structural change, however it was made, and get notified. Compare two databases to spot drift and generate the migration script that makes them match.",
  },
];

const administration: FeatureItem[] = [
  {
    icon: UserCheck,
    title: "Role-based access control",
    body: "System roles — owner, admin, operator, viewer — seeded from a permission catalog, with guards that prevent locking out the last owner.",
  },
  {
    icon: Users,
    title: "Custom roles",
    body: "Create roles with any subset of the permission catalog. System roles stay immutable and roles still assigned to users cannot be deleted.",
  },
  {
    icon: KeyRound,
    title: "Scoped API tokens",
    body: "API tokens scoped like sessions for automation and CI, expiring after 90 days by default. Administrators see and revoke everyone's tokens in one place.",
  },
  {
    icon: Database,
    title: "Live database administration",
    body: "Manage database users and grants for MariaDB, MySQL, and PostgreSQL directly from the dashboard, including grant and revoke of schema privileges.",
  },
  {
    icon: Lock,
    title: "Encrypted secrets",
    body: "Database passwords, SSH keys, storage keys, and notification secrets are envelope-encrypted at rest, and one command rotates the master key.",
  },
  {
    icon: ScrollText,
    title: "Audit log",
    body: "See who did what — sign-ins, access changes, backups, console writes, and data edits — with user, address, and outcome. Filter it and export CSV.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything you need to operate a database fleet."
        description="Fleetdock turns the day-to-day work of running many self-hosted databases into consistent, tracked operations — from provisioning to migration, backups to access control."
      />
      <DatabaseOperations />
      <FeatureGrid
        eyebrow="Automation & observability"
        title="Automate the operations that used to be cron jobs."
        description="Scheduling, alerting, and metrics are built in, so the fleet keeps itself visible instead of relying on someone remembering to check."
        items={automation}
      />
      <FeatureGrid
        eyebrow="Working with data"
        title="Browse, query, and compare data across the fleet."
        description="A data browser, SQL console, and ER diagram for every database, plus fleet-wide queries and schema history — no separate database client to install."
        items={data}
      />
      <FeatureGrid
        eyebrow="Access & administration"
        title="Grant the right access, and see what changed."
        description="Role-based access, scoped tokens, and live database administration replace shared SSH keys and ad-hoc SQL sessions."
        items={administration}
      />
      <ComparisonSection />
      <FinalCta />
    </>
  );
}
