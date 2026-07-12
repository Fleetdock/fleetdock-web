import * as React from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * The Fleetdock mark: a control-plane frame holding three managed database
 * instances, the top one highlighted as the active node.
 */
export function LogoMark({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      role="img"
      aria-label={`${siteConfig.name} logo`}
      className={cn("size-7 text-foreground", className)}
      {...props}
    >
      <rect
        x="2.5"
        y="2.5"
        width="23"
        height="23"
        rx="6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.9"
      />
      <rect className="fill-accent" x="7" y="7" width="14" height="3.4" rx="1.7" />
      <rect
        x="7"
        y="12.3"
        width="14"
        height="3.4"
        rx="1.7"
        fill="currentColor"
        opacity="0.55"
      />
      <rect
        x="7"
        y="17.6"
        width="14"
        height="3.4"
        rx="1.7"
        fill="currentColor"
        opacity="0.3"
      />
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
