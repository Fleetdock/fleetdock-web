import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";

/**
 * Product screenshots, captured from a real (seeded demo) Fleetdock by
 * `scripts/screenshots.sh` in the main repository. Every shot exists in a
 * light and a dark version; the one matching the site theme is shown.
 */
export const screenshots = {
  overview:
    "Fleetdock overview: stat tiles, items needing attention and recent activity",
  servers: "Servers list with connected machines and their status",
  "server-metrics": "A server's CPU, memory, disk and connection charts",
  databases:
    "All databases grouped by database server, with engine, size and status",
  "database-detail":
    "A database's page: size, backups, connection details and access",
  "schema-history":
    "Schema history timeline showing what changed between snapshots",
  "data-browser":
    "Data browser editing table rows with foreign keys and a value panel",
  "data-browser-history":
    "Change history with undo for edits made in the data browser",
  "sql-console":
    "SQL console with a dry-run preview of the rows a statement will change",
  "explain-plan": "Explain plan tree highlighting the slowest step of a query",
  "fleet-query":
    "Fleet query results from one SQL script run on many databases",
  backups: "Backup history with sizes, durations and verification status",
  "backup-schedules": "Backup schedules with cron timing and retention",
  activity: "Activity log of backups, restores and other operations",
  "command-palette": "Command palette searching servers, databases and tables",
  "instance-detail":
    "A database server's page with live sessions and top queries",
} as const;

export type ScreenshotName = keyof typeof screenshots;

/** Captured at 1440×900 CSS pixels, 2× density. */
const WIDTH = 1440;
const HEIGHT = 900;

export function Screenshot({
  name,
  alt,
  priority,
  frame = true,
  url,
  className,
  sizes = "(min-width: 1280px) 1152px, 100vw",
  zoom,
}: {
  name: ScreenshotName;
  alt?: string;
  priority?: boolean;
  /** Draw a browser window around the image. */
  frame?: boolean;
  /** Path shown in the frame's address bar. */
  url?: string;
  className?: string;
  sizes?: string;
  /** Click to view full size (used in the docs). */
  zoom?: boolean;
}) {
  const Img = zoom ? ImageZoom : Image;
  const label = alt ?? screenshots[name];
  const images = (
    <>
      <Img
        src={`/screenshots/light/${name}.png`}
        alt={label}
        width={WIDTH}
        height={HEIGHT}
        sizes={sizes}
        priority={priority}
        className="dark:hidden block w-full h-auto"
      />
      <Img
        src={`/screenshots/dark/${name}.png`}
        alt={label}
        width={WIDTH}
        height={HEIGHT}
        sizes={sizes}
        priority={priority}
        className="hidden dark:block w-full h-auto"
      />
    </>
  );

  if (!frame) {
    return (
      <div
        className={cn(
          "shadow-sm border border-border rounded-xl overflow-hidden",
          className,
        )}
      >
        {images}
      </div>
    );
  }

  return (
    <figure
      className={cn(
        "bg-card shadow-2xl shadow-black/10 dark:shadow-black/40 m-0 border border-border-strong/70 rounded-xl ring-1 ring-black/[0.03] dark:ring-white/[0.04] overflow-hidden",
        className,
      )}
    >
      <div
        aria-hidden
        className="flex items-center gap-3 bg-background-subtle px-3.5 border-border border-b h-9"
      >
        <span className="flex gap-1.5">
          <span className="bg-border-strong rounded-full size-2.5" />
          <span className="bg-border-strong rounded-full size-2.5" />
          <span className="bg-border-strong rounded-full size-2.5" />
        </span>
        <span className="flex flex-1 justify-center items-center bg-background mx-auto px-3 border border-border rounded-md max-w-xs h-5.5 font-mono text-[11px] text-muted-foreground truncate">
          db.example.com{url ?? ""}
        </span>
        <span className="w-[42px]" />
      </div>
      {images}
    </figure>
  );
}
