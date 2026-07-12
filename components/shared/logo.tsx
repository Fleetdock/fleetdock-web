import * as React from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * The Fleetdock brand mark — a teal tile holding stacked database "layer" bars.
 * Mirrors the dashboard's `/logo.svg`; the brand colors are intentional and
 * fixed across light and dark themes.
 */
export function LogoMark({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label={`${siteConfig.name} logo`}
      className={cn("size-7 rounded-[7px]", className)}
      {...props}
    >
      <rect width="32" height="32" rx="7" fill="#0f766e" />
      <g fill="#ffffff">
        <rect x="11" y="7" width="10" height="3" rx="1.5" />
        <rect x="8" y="12" width="16" height="3" rx="1.5" />
        <rect x="10" y="17" width="12" height="3" rx="1.5" />
        <rect x="6" y="23" width="20" height="2.5" rx="1.25" opacity=".6" />
      </g>
    </svg>
  );
}

/** Full lockup: mark + wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-lg font-semibold tracking-tight text-foreground">
        {siteConfig.name}
      </span>
    </span>
  );
}
