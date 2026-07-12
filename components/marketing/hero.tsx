import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon } from "@/components/shared/icons";
import { ProductPreview } from "./product-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Decorative backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-b" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] -z-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent) 0%, transparent 70%)",
        }}
      />

      <Container className="relative pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <a
            href={siteConfig.links.releases}
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-elevated px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <span className="size-1.5 rounded-full bg-success" aria-hidden />
              Open source
            </span>
            <span aria-hidden className="text-border-strong">
              •
            </span>
            <span>Self-hosted · {siteConfig.version}</span>
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>

          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Manage every database from one{" "}
            <span className="text-accent">control plane</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Provision, monitor, back up, restore, and migrate self-hosted database
            instances across your servers from one secure interface.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href={siteConfig.links.getStarted}
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              Get Started
              <ArrowRight aria-hidden />
            </Link>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "w-full sm:w-auto",
              )}
            >
              <GitHubIcon className="size-[18px]" />
              View on GitHub
            </a>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Open source. Self-hosted. Built for database fleets.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-5xl">
          <ProductPreview />
        </div>
      </Container>
    </section>
  );
}
