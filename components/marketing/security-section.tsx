import Link from "next/link";
import {
  ArrowRight,
  KeyRound,
  Lock,
  ShieldCheck,
  ScrollText,
  RefreshCw,
  UserCheck,
  Globe,
  Info,
  Cookie,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const properties = [
  {
    icon: KeyRound,
    title: "Single-use enrollment",
    body: "Agents register with short-lived, single-use tokens, then authenticate with their own bearer token — revocable and rotatable per server.",
  },
  {
    icon: Cookie,
    title: "HttpOnly sessions",
    body: "The dashboard session lives in an HttpOnly, SameSite=Strict cookie with CSRF protection, out of reach of page script.",
  },
  {
    icon: Lock,
    title: "Secrets encrypted at rest",
    body: "Instance passwords and storage keys are envelope-encrypted with a key you control, and re-wrapped on rotation.",
  },
  {
    icon: ShieldCheck,
    title: "Presigned backup access",
    body: "Backups stream to object storage through time-limited presigned URLs — agents never receive your storage credentials.",
  },
  {
    icon: UserCheck,
    title: "Role-based access control",
    body: "Owner, admin, operator, and viewer roles plus custom roles from a permission catalog, with scoped API tokens.",
  },
  {
    icon: Globe,
    title: "CIDR-gated public access",
    body: "External database access routes through the Fleetdock Gateway with CIDR allowlists — disabled by default, with application credentials instead of root passwords.",
  },
  {
    icon: ScrollText,
    title: "Tracked operations & audit",
    body: "Every mutating action is a tracked operation with status and history, alongside an audit log of changes.",
  },
  {
    icon: RefreshCw,
    title: "Rotation & revocation",
    body: "Rotate the encryption and JWT secrets, revoke API tokens, and suspend accounts to cut off sessions immediately.",
  },
];

export function SecuritySection() {
  return (
    <Section id="security" className="border-b border-border">
      <Container>
        <SectionHeading
          eyebrow="Security"
          title="Database infrastructure requires more than a login screen."
          description="Fleetdock holds credentials for your entire fleet, so its security model is explicit — including the boundaries it does not yet cover."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
            >
              <span className="grid size-9 place-items-center rounded-lg border border-border bg-background text-accent">
                <Icon className="size-4.5" aria-hidden />
              </span>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-warning/25 bg-warning/[0.06] p-5 sm:flex-row sm:items-start">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-warning/10 text-warning">
            <Info className="size-4.5" aria-hidden />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-foreground">
              Known limitations in the current release
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              SSO/OIDC and 2FA are on the roadmap, not yet available. The agent runs as root
              (required to drive Docker) inside a sandboxed systemd unit. Gateway TLS is
              passthrough only in the current MVP. See the security documentation for the full
              trust model and mitigations.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/docs/security"
            className={cn(buttonVariants({ variant: "outline", size: "md" }))}
          >
            Read the security documentation
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
