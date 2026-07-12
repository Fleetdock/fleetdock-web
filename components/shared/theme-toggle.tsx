"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "system", label: "System theme", icon: Monitor },
  { value: "dark", label: "Dark theme", icon: Moon },
] as const;

/** Compact three-way theme switcher (light / system / dark). */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  // next-themes reports `theme` as undefined on the server and on the first
  // client render, so reading it directly stays hydration-safe (no mismatch);
  // the active option lights up once its client effect resolves the theme.
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-elevated p-0.5",
        className,
      )}
      role="radiogroup"
      aria-label="Color theme"
    >
      {options.map(({ value, label, icon: Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "flex size-7 items-center justify-center rounded-full transition-colors",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
