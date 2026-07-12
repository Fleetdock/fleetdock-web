import * as React from "react";
import { cn } from "@/lib/utils";

/** Constrained, horizontally-padded content column. */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

/** Vertical rhythm wrapper for a page section. */
export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-20 sm:py-24", className)} {...props}>
      {children}
    </section>
  );
}

/** Small uppercase label that introduces a section. */
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-accent/50" />
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Consistent eyebrow + heading + lede block used across marketing sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
