import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <Link href="/" aria-label={`${siteConfig.name} home`}>
        <Logo />
      </Link>
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">404</p>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        This page could not be found.
      </h1>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for does not exist or may have moved. Head back to the
        homepage or browse the documentation.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={cn(buttonVariants({ size: "md" }))}>
          Back to home
        </Link>
        <Link
          href={siteConfig.links.docs}
          className={cn(buttonVariants({ variant: "outline", size: "md" }))}
        >
          Browse documentation
        </Link>
      </div>
    </main>
  );
}
