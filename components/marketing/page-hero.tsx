import { Container } from "@/components/shared/section";
import { Eyebrow } from "@/components/shared/section";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

/** Compact hero used at the top of marketing sub-pages. */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-70" />
      <Container className="relative py-16 sm:py-20">
        <div className="flex max-w-3xl flex-col gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
