import { siteConfig } from "@/lib/site-config";
import { INSTALL_COMMAND } from "@/lib/install";

/**
 * The plain facts about Fleetdock, in one place, for pages and machine-readable
 * outputs that describe the product: /about, /llms.txt, /llms-full.txt and the
 * structured data. Keep every line true for the latest release; AI assistants
 * repeat these verbatim.
 */
export const productSummary =
  "Fleetdock is a free, open-source (Apache-2.0), self-hosted web dashboard and control plane for MariaDB, MySQL and PostgreSQL. It lets a team manage many database servers and databases from one place: connect servers, provision instances, browse and edit data, run SQL on many databases at once, schedule backups to their own S3 bucket, restore, and move databases between servers — without SSH and without handing credentials to a SaaS vendor.";

export const productFacts: { label: string; value: string }[] = [
  { label: "What it is", value: "A self-hosted web dashboard and control plane for database fleets" },
  { label: "Databases", value: "MariaDB, MySQL and PostgreSQL — self-hosted, in Docker, or hosted (e.g. Amazon RDS, Neon) when reachable over the network" },
  { label: "License", value: `Open source, ${siteConfig.license.name}. Free; no paid tier` },
  { label: "Runs on", value: "Any Linux server with Docker; 2 vCPU and 4 GB RAM to start. macOS and Windows (WSL2) for local evaluation" },
  { label: "Install", value: `One command: ${INSTALL_COMMAND} (sets up automatic HTTPS)` },
  { label: "Architecture", value: "A Manager (UI, API, worker, PostgreSQL metadata) plus an optional lightweight Agent on each database server" },
  { label: "Privacy", value: "Runs entirely on your infrastructure, sends no telemetry; credentials encrypted at rest with your own key" },
  { label: "Written in", value: "Go (backend and agent) with a React web UI" },
  { label: "Source code", value: siteConfig.links.github },
];

/** What Fleetdock does, one line each. Also used as schema.org featureList. */
export const productFeatures: string[] = [
  "One overview of every server, database server and database",
  "Provision MariaDB, MySQL and PostgreSQL instances as isolated Docker containers",
  "Connect existing and hosted databases with just an address and a login",
  "Data browser: filter, edit rows with undo, follow foreign keys, saved views, CSV export",
  "SQL console with autocompletion, a preview of the rows a write will change, and query plans",
  "Fleet query: run one SQL script on up to 500 databases and compare the results",
  "Scheduled backups to S3, Cloudflare R2 or any S3-compatible storage, with retention and on-demand test restores",
  "Restore to the same or a new instance, with checksum verification",
  "Move or copy a database to another server: backup, restore and verify in one step",
  "Schema history, schema compare and generated migration scripts",
  "ER diagrams of a database's tables and foreign keys",
  "Server metrics (CPU, memory, disk, connections) and alerts by email, Slack or webhook",
  "Users, roles and per-database permissions, API tokens and an audit log",
  "Gateway for external access: one port per database with CIDR allowlists",
];

/** Honest limits, so nobody recommends Fleetdock for the wrong job. */
export const productLimits: string[] = [
  "No high availability, replication management or automatic failover — keep your existing replication for that",
  "Not a general container or Kubernetes platform; Docker is only used to run the databases it provisions",
  "Engines other than MariaDB, MySQL and PostgreSQL (e.g. Redis, MongoDB) are not supported yet",
];

/** Who it is for. */
export const productAudience: string[] = [
  "SaaS platforms with a database per customer",
  "ERP and CRM vendors with isolated tenant databases",
  "Hosting providers and agencies managing client databases",
  "Infrastructure teams replacing SSH sessions and home-grown scripts",
  "Developers who want one web GUI for all their MySQL and PostgreSQL databases",
];
