import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Container, Section } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon } from "@/components/shared/icons";

export function FinalCta() {
  return (
    <Section id="get-started">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots mask-radial opacity-70" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Stop managing databases one server at a time.
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Connect your infrastructure, standardize database operations, and manage every
              instance from one control plane.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href={siteConfig.links.docs}
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
              >
                <BookOpen aria-hidden />
                Read the documentation
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
                <ArrowRight aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
