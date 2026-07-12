import type { LucideIcon } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface FeatureGridProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  items: FeatureItem[];
  className?: string;
}

export function FeatureGrid({
  eyebrow,
  title,
  description,
  items,
  className,
}: FeatureGridProps) {
  return (
    <Section className={cn("border-b border-border", className)}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title: itemTitle, body }) => (
            <div
              key={itemTitle}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
            >
              <span className="grid size-9 place-items-center rounded-lg border border-border bg-background text-accent">
                <Icon className="size-4.5" aria-hidden />
              </span>
              <h3 className="text-sm font-semibold text-foreground">{itemTitle}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
