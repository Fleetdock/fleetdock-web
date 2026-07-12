import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArchitectureDiagram } from "./architecture-diagram";

const points = [
  {
    title: "Fleetdock Manager",
    body: "The central control plane. It serves the dashboard and API, tracks every operation, and stores fleet metadata in PostgreSQL.",
  },
  {
    title: "Fleetdock Agent",
    body: "A lightweight service on each database node. It enrolls with a single-use token, heartbeats health, and executes approved operations locally.",
  },
  {
    title: "Database nodes",
    body: "Your own servers. Provisioned MariaDB, MySQL, and PostgreSQL instances run in isolated Docker containers; the Manager never touches a node except through its agent.",
  },
];

export function ArchitectureSection() {
  return (
    <Section id="architecture" className="border-b border-border">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Architecture"
              title="One manager. Multiple database nodes."
              description="Fleetdock separates the control plane from the servers that run your databases, so you operate the whole fleet from one place without opening shells."
            />
            <ul className="flex flex-col gap-4">
              {points.map((p) => (
                <li key={p.title} className="flex flex-col gap-1 border-l-2 border-accent/40 pl-4">
                  <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/architecture"
              className={cn(buttonVariants({ variant: "outline", size: "md" }), "w-fit")}
            >
              Explore the architecture
              <ArrowRight aria-hidden />
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-background-subtle/50 p-5 sm:p-8">
            <ArchitectureDiagram />
          </div>
        </div>
      </Container>
    </Section>
  );
}
