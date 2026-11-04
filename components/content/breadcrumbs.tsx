import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Visible breadcrumb trail; pair it with `breadcrumbs()` structured data. */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
        </li>
        {trail.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" aria-hidden />
            {i === trail.length - 1 ? (
              <span aria-current="page" className="text-foreground/80">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="transition-colors hover:text-foreground">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
