import { GitHubIcon } from "@/components/shared/icons";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/shared/section";
import { siteConfig } from "@/lib/site-config";
import { formatCount, getLatestVersion, getStarCount } from "@/lib/release";
import { GitBranch, Heart, Scale, Tag } from "lucide-react";

function getFacts(version: string | null, stars: number | null) {
  return [
    {
      icon: Scale,
      label: "License",
      value: siteConfig.license.name,
      href: siteConfig.links.license,
    },
    {
      icon: GitHubIcon,
      label: stars !== null ? "GitHub stars" : "Source",
      value: stars !== null ? formatCount(stars) : "Fleetdock/fleetdock",
      href: siteConfig.links.github,
    },
    {
      icon: Tag,
      label: version ? "Latest release" : "Releases",
      value: version ?? "On GitHub",
      href: siteConfig.links.releases,
    },
    {
      icon: Heart,
      label: "Contributing",
      value: "Guide & CoC",
      href: siteConfig.links.contributing,
    },
  ];
}

export async function OpenSourceSection() {
  const [version, stars] = await Promise.all([getLatestVersion(), getStarCount()]);
  const facts = getFacts(version, stars);
  return (
    <Section
      id="open-source"
      className="bg-background-subtle/40 border-border border-b"
    >
      <Container>
        <div className="lg:items-center gap-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Open source"
              title="Open source. Self-hosted. No database infrastructure lock-in."
              description="Fleetdock is Apache-2.0 licensed and runs entirely on infrastructure you control. Read the code, file issues, and follow the roadmap in the open."
            />
            <div className="flex items-center gap-2">
              <GitBranch className="size-4 text-muted-foreground" aria-hidden />
              <p className="text-muted-foreground text-sm">
                A Go control plane and agent with a Next.js dashboard, released
                in the open.
              </p>
            </div>
          </div>

          <div className="gap-4 grid grid-cols-2">
            {facts.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 bg-card hover:bg-elevated p-5 border border-border hover:border-border-strong rounded-xl transition-colors"
              >
                <span className="flex items-center gap-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                  <Icon className="size-3.5" aria-hidden />
                  {label}
                </span>
                <span className="font-semibold text-foreground text-base">
                  {value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
