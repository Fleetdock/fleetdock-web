/* eslint-disable @next/next/no-img-element -- small static SVGs, nothing for next/image to optimise */
import * as React from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/** The three shapes of the Fleetdock "F" mark, on a 196 × 196 grid (brand kit). */
export const MARK_PATHS = [
  "M12 0H56V196H12Q0 196 0 184V12Q0 0 12 0Z",
  "M68 0H184Q196 0 196 12V44Q196 56 184 56H68Z",
  "M68 74H146Q158 74 158 86V118Q158 130 146 130H68Z",
];

/** Brand colours from the logo kit. */
export const BRAND = { turquoise: "#2DD4BF", charcoal: "#101820", offWhite: "#F5F7FA" };

/**
 * The app icon: the turquoise F on a charcoal tile. Used where the full logo
 * would be too small (the logo kit asks for at least 140 px of width).
 */
export function LogoMark({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      role="img"
      aria-label={`${siteConfig.name} logo`}
      className={cn("size-7", className)}
      {...props}
    >
      <rect width="256" height="256" rx="52" fill={BRAND.charcoal} />
      <g transform="translate(48 48) scale(0.8163265306122449)" fill={BRAND.turquoise}>
        {MARK_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

/**
 * The full logo (mark and name, from the logo kit). The light-background
 * version has a dark name and the dark-background one a light name; the theme
 * picks one.
 */
export function Logo({ className }: { className?: string }) {
  // The artwork is 1016.43 × 196; 28 px high is about 145 px wide.
  const img = (src: string, cls: string) => (
    <img src={src} alt={siteConfig.name} width={145} height={28} className={cn("h-7 w-auto", cls)} />
  );
  return (
    <span className={cn("inline-flex items-center", className)}>
      {img("/logo-light.svg", "block dark:hidden")}
      {img("/logo-dark.svg", "hidden dark:block")}
    </span>
  );
}
