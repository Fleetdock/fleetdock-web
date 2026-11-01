import {
  Terminal,
  FileClock,
  KeyRound,
  ArrowRightLeft,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/section";

const problems = [
  {
    icon: Terminal,
    title: "Manual SSH administration",
    body: "Every provision, backup, and fix is a shell session on a specific host. Knowledge lives in someone's terminal history.",
  },
  {
    icon: FileClock,
    title: "Scattered backup cron jobs",
    body: "Backups run from ad-hoc crontabs with no shared status. You find out a job stopped when a restore fails.",
  },
  {
    icon: KeyRound,
    title: "Unsafe credential handling",
    body: "Database passwords end up in env files, chat messages, and wikis with no rotation or central control.",
  },
  {
    icon: ArrowRightLeft,
    title: "Risky server migrations",
    body: "Moving a database means hand-assembling dump, transfer, and import steps — and hoping nothing drifts.",
  },
];

export function ProblemSection() {
  return (
    <Section id="problem" className="border-b border-border">
      <Container>
        <SectionHeading
          eyebrow="The problem"
          title="Database operations should not depend on SSH and shell scripts."
          description="When databases are spread across many servers, the operations that keep them healthy stay manual, inconsistent, and invisible. Fleetdock standardizes them."
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col gap-3 bg-card p-6">
              <span className="grid size-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground">
                <Icon className="size-4.5" aria-hidden />
              </span>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
