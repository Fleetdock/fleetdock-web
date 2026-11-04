import { Container } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { FaqList } from "@/components/shared/faq-list";
import { FinalCta } from "@/components/marketing/final-cta";
import { CardGrid, type CardItem } from "@/components/content/card-grid";

/**
 * Shared frame for blog posts, guides and comparisons: breadcrumbs, the
 * heading block, a prose body, an optional FAQ and related pages.
 */
export function ArticleLayout({
  trail,
  eyebrow,
  title,
  description,
  meta,
  lead,
  children,
  faq,
  related,
  relatedTitle = "Keep reading",
}: {
  trail: { name: string; path: string }[];
  eyebrow: string;
  title: string;
  description?: string;
  /** A small line under the description, e.g. date and author. */
  meta?: React.ReactNode;
  /** Content between the header and the body, e.g. a verdict and a table. */
  lead?: React.ReactNode;
  children: React.ReactNode;
  faq?: { q: string; a: string }[];
  related?: CardItem[];
  relatedTitle?: string;
}) {
  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-border">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-70" />
          <Container className="relative flex max-w-3xl flex-col gap-5 py-12 sm:py-16">
            <Breadcrumbs trail={trail} />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{eyebrow}</span>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>
            ) : null}
            {meta ? <div className="text-sm text-muted-foreground">{meta}</div> : null}
          </Container>
        </header>

        <Container className="max-w-3xl py-12 sm:py-14">
          {lead}
          <div className="prose max-w-none prose-headings:scroll-mt-24">{children}</div>

          {faq?.length ? (
            <section aria-labelledby="faq" className="mt-14">
              <h2 id="faq" className="mb-5 text-2xl font-semibold tracking-tight text-foreground">
                Frequently asked questions
              </h2>
              <FaqList items={faq} headingLevel={3} />
            </section>
          ) : null}
        </Container>
      </article>

      {related?.length ? (
        <Container className="max-w-5xl pb-4">
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">{relatedTitle}</h2>
          <CardGrid items={related} />
        </Container>
      ) : null}

      <FinalCta />
    </>
  );
}
