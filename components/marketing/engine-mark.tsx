import { cn } from "@/lib/utils";

const MARKS: Record<string, { short: string; className: string }> = {
  PostgreSQL: { short: "PG", className: "bg-[#336791]" },
  MySQL: { short: "My", className: "bg-[#00758f]" },
  MariaDB: { short: "Ma", className: "bg-[#a0522d]" },
};

/** A small engine badge, matching the ones in the Fleetdock dashboard. */
export function EngineMark({ engine, className }: { engine: string; className?: string }) {
  const m = MARKS[engine] ?? { short: engine.slice(0, 2), className: "bg-muted-foreground" };
  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid h-5 min-w-7 place-items-center rounded-[5px] px-1 text-[10px] font-bold tracking-wide text-white",
        m.className,
        className,
      )}
    >
      {m.short}
    </span>
  );
}
