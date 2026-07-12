import type { Metadata } from "next";
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
} from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { DatabaseOperations } from "@/components/marketing/database-operations";
import { FeatureGrid, type FeatureItem } from "@/components/marketing/feature-grid";
import { ComparisonSection } from "@/components/marketing/comparison-section";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Provisioning, monitoring, backups, restores, migrations, scheduling, alerting, RBAC, and live database administration for MariaDB, MySQL, and PostgreSQL — from one control plane.",
  alternates: { canonical: "/features" },
};

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
    body: "Create, list, and revoke API tokens scoped like sessions for automation and CI, without sharing user passwords.",
  },
  {
    icon: Database,
    title: "Live database administration",
    body: "Manage database users and grants for MariaDB, MySQL, and PostgreSQL directly from the dashboard, including grant and revoke of schema privileges.",
  },
  {
    icon: TableProperties,
    title: "Tables, data & SQL console",
    body: "Browse tables with a paginated row viewer, run queries in a SQL console, and export a database to CSV — per database, per instance.",
  },
  {
    icon: ScrollText,
    title: "Audit log",
    body: "Mutating actions are recorded in an audit log, and every asynchronous action is tracked as an operation with status, progress, and errors.",
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
