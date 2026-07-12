import { Scale, GitBranch, Heart, Tag } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { GitHubIcon } from "@/components/shared/icons";

const facts = [
  {
    icon: Scale,
    label: "License",
    value: siteConfig.license.name,
    href: siteConfig.links.license,
  },
  {
    icon: GitHubIcon,
    label: "Source",
    value: "TajBrains/fleetdock",
    href: siteConfig.links.github,
  },
  {
    icon: Tag,
    label: "Latest release",
    value: siteConfig.version,
    href: siteConfig.links.releases,
  },
  {
    icon: Heart,
    label: "Contributing",
    value: "Guide & CoC",
    href: siteConfig.links.contributing,
  },
];

export function OpenSourceSection() {
  return (
    <Section id="open-source" className="border-b border-border bg-background-subtle/40">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Open source"
              title="Open source. Self-hosted. No database infrastructure lock-in."
              description="Fleetdock is Apache-2.0 licensed and runs entirely on infrastructure you control. Read the code, file issues, and follow the roadmap in the open."
            />
            <div className="flex items-center gap-2">
              <GitBranch className="size-4 text-muted-foreground" aria-hidden />
              <p className="text-sm text-muted-foreground">
                A Go control plane and agent with a Next.js dashboard, released in the open.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {facts.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 transition-colors hover:border-border-strong hover:bg-elevated"
              >
                <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Icon className="size-3.5" aria-hidden />
                  {label}
                </span>
                <span className="text-base font-semibold text-foreground">{value}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
