"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

import { INSTALL_COMMAND } from "@/lib/install";

/** The one-line installer with a copy button. */
export function InstallCommand({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the command stays selectable */
    }
  }
  return (
    <div
      className={cn(
        "group flex w-full max-w-[40rem] items-center gap-3 rounded-xl border border-border-strong/80 bg-card/80 py-1.5 pl-4 pr-1.5 font-mono text-[13px] shadow-sm backdrop-blur sm:text-sm",
        className,
      )}
    >
      <Terminal className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-left text-foreground [scrollbar-width:none]">
        <span className="select-none text-muted-foreground">$ </span>
        {INSTALL_COMMAND}
      </code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 font-sans text-xs font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
        aria-label={copied ? "Copied" : "Copy install command"}
      >
        {copied ? <Check className="size-3.5 text-success" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
