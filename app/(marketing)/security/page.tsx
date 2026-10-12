import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Server, Cpu, Container as ContainerIcon, Network, Info, Lock, KeyRound } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { FinalCta } from "@/components/marketing/final-cta";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Security",
  description:
    "Fleetdock's security model in plain terms: trust boundaries, Manager and Agent privileges, encrypted secrets, public endpoints, and compromise scenarios.",
  path: "/security",
});

const boundaries = [
  {
    icon: Server,
    title: "Manager privileges",
    body: "The Manager stores encrypted credentials for the whole fleet and can enqueue operations on every node. It is the highest-value component — protect it accordingly.",
  },
  {
    icon: Cpu,
    title: "Agent privileges",
    body: "Each agent runs as root on its node today and executes approved operations locally. Its authority is scoped to that single node and the databases on it.",
  },
  {
    icon: ContainerIcon,
    title: "Docker socket access",
    body: "Provisioning uses Docker on the node, so the agent can create and remove database containers and their data volumes on that host.",
  },
  {
    icon: Network,
    title: "External database access",
    body: "For external instances, the control plane connects directly to the database host and port using stored admin credentials. Prefer private network paths.",
  },
  {
    icon: Lock,
    title: "Public database endpoints",
    body: "Exposing a database to the internet is off by default and enabled per database. Traffic passes through the gateway on a dedicated port with a CIDR allowlist enforced at the proxy — never by publishing the database port directly.",
  },
  {
    icon: KeyRound,
    title: "Application credentials",
    body: "External apps connect with scoped users (readonly, readwrite, or admin on one database), created and revoked from the dashboard. Instance root credentials are never exposed for public use.",
  },
];

const scenarios = [
  {
    title: "Manager compromise",
    body: "The largest blast radius: an attacker could reach every stored credential and command every agent. Keep it behind TLS, restrict access, and monitor the operations log.",
  },
  {
    title: "Agent compromise",
    body: "Limited to that node's databases and Docker host, but the data on that node is exposed. Isolate nodes and use least-privilege database users.",
  },
  {
    title: "Database credential exposure",
    body: "Store least-privilege admin users so a leaked credential cannot do more than its grants allow. Rotate the credential and re-test the connection.",
  },
  {
    title: "Backup credential exposure",
    body: "Storage keys are encrypted at rest on the Manager and never handed to agents; presigned URLs are time-limited. Rotate keys and keep buckets private.",
  },
];

const protections = [
  "Single-use, short-lived agent registration tokens",
  "Envelope-encrypted secrets with operator-controlled key rotation",
  "Changing a password invalidates that user's existing sessions everywhere",
  "SSRF-resistant outbound HTTP — webhooks cannot reach loopback or cloud metadata",
  "Public database access off by default, with CIDR allowlists at the proxy",
  "Presigned-URL backups — agents never receive storage credentials",
  "Role-based access control and scoped, revocable API tokens",
  "Login rate limiting, security headers, and health/readiness probes",
  "Automatic HTTPS, with the API reachable only through the proxy",
  "Production mode that refuses to boot with default secrets",
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Database infrastructure requires more than a login screen."
        description="Fleetdock holds the keys to your database fleet, so its security model is documented in the open — including the boundaries it does not yet cover."
      />

      <Section className="border-b border-border">
        <Container>
          <SectionHeading
            eyebrow="Trust boundaries"
            title="Know what each component can do."
            description="Understanding where trust lives is the first step to deploying Fleetdock safely."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {boundaries.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-xl border border-border bg-card p-6"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-background text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-b border-border bg-background-subtle/40">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <SectionHeading
                eyebrow="Compromise scenarios"
                title="Plan for the bad day, honestly."
                description="We document the impact of each failure mode instead of hiding it. This is what to reason about before exposing the control plane."
              />
            </div>
            <ul className="flex flex-col gap-4">
              {scenarios.map((s) => (
                <li
                  key={s.title}
                  className="flex gap-3 rounded-xl border border-border bg-card p-5"
                >
                  <ShieldAlert className="size-5 shrink-0 text-warning" aria-hidden />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="border-b border-border">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow="Protections in place"
                title="What the current release already does."
              />
              <ul className="flex flex-col gap-2.5">
                {protections.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 rounded-xl border border-warning/25 bg-warning/[0.06] p-6">
              <span className="grid size-9 place-items-center rounded-lg bg-warning/10 text-warning">
                <Info className="size-4.5" aria-hidden />
              </span>
              <h3 className="text-sm font-semibold text-foreground">
                Current limitations
              </h3>
              <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
                <li>
                  The dashboard stores its session token in{" "}
                  <code className="font-mono text-xs">localStorage</code>, which is exposed to
                  XSS. Deploy behind TLS on a trusted network.
                </li>
                <li>SSO/OIDC and 2FA are on the roadmap, not yet available.</li>
                <li>The agent runs as root via systemd today.</li>
                <li>
                  Closed-port access to external databases (Cloudflare Tunnel / TCP proxy) is on
                  the roadmap, not in the current release.
                </li>
              </ul>
              <div className="mt-1 flex flex-wrap gap-3">
                <Link
                  href="/docs/security"
                  className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
                >
                  Security documentation
                  <ArrowRight aria-hidden />
                </Link>
                <a
                  href={siteConfig.links.security}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  Report a vulnerability
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
