import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type CardItem = {
  href: string;
  title: string;
  description?: string;
  /** Small line above the title, e.g. a date or "Comparison". */
  kicker?: string;
};

/** Linked cards for hub pages and "keep reading" sections. */
export function CardGrid({ items }: { items: CardItem[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-6 transition-colors hover:border-border-strong"
          >
            {item.kicker ? (
              <span className="text-xs font-medium uppercase tracking-wider text-accent">{item.kicker}</span>
            ) : null}
            <span className="text-base font-semibold text-foreground">{item.title}</span>
            {item.description ? (
              <span className="text-sm leading-relaxed text-muted-foreground">{item.description}</span>
            ) : null}
            <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-accent">
              Read
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
