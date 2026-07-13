"use client";

import { usePathname, useRouter } from "fumadocs-core/framework";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  DOC_VERSIONS,
  getEquivalentDocsPath,
  getVersionFromPath,
  showVersionSwitcher,
} from "@/lib/versions";
import { Check, ChevronDown, GitBranch } from "lucide-react";

export function DocsVersionSelect() {
  const pathname = usePathname();
  const router = useRouter();

  if (!showVersionSwitcher) return null;

  const currentVersion = getVersionFromPath(pathname);
  const currentLabel =
    DOC_VERSIONS.find((v) => v.id === currentVersion)?.label ?? currentVersion;

  return (
    <Popover>
      <PopoverTrigger
        aria-label="Choose API documentation version"
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "mb-2 w-full gap-1.5 justify-start bg-fd-secondary/50 text-fd-muted-foreground data-[state=open]:bg-fd-accent",
        )}
      >
        <GitBranch className="size-4.5 shrink-0" />
        <span className="truncate">{currentLabel}</span>
        <ChevronDown className="ms-auto size-3.5 shrink-0" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-0.5 p-1">
        <p className="p-2 text-xs font-medium text-fd-muted-foreground">
          Documentation version
        </p>
        {DOC_VERSIONS.map((version) => {
          const active = version.id === currentVersion;
          return (
            <button
              key={version.id}
              type="button"
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5 text-start text-sm transition-colors",
                active
                  ? "bg-fd-primary/10 text-fd-primary"
                  : "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground",
              )}
              onClick={() => {
                router.push(getEquivalentDocsPath(pathname, version.id));
              }}
            >
              <span className="flex-1">{version.label}</span>
              {active ? <Check className="size-3.5 shrink-0" /> : null}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
