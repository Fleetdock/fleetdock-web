import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Questions and answers as native disclosure widgets: readable without
 * JavaScript and fully present in the HTML for crawlers. Text between
 * backticks is shown as code.
 */
export function FaqList({
  items,
  className,
  headingLevel,
}: {
  items: { q: string; a: string }[];
  className?: string;
  /** Wrap each question in a heading of this level for the page outline. */
  headingLevel?: 3;
}) {
  return (
    <div className={cn("divide-y divide-border rounded-xl border border-border bg-card", className)}>
      {items.map((f) => (
        <details key={f.q} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-foreground">
            {headingLevel ? <h3 className="text-base font-medium">{f.q}</h3> : f.q}
            <ChevronDown
              className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
            {f.a.split("`").map((part, i) =>
              i % 2 === 1 ? (
                <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">
                  {part}
                </code>
              ) : (
                part
              ),
            )}
          </p>
        </details>
      ))}
    </div>
  );
}
