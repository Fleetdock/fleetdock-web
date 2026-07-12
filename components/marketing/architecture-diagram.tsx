import { Server, Database, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const managerNodes = [
  { name: "db-node-eu-01", instances: ["MariaDB A", "MariaDB B"] },
  { name: "db-node-eu-02", instances: ["MariaDB C", "MariaDB D"] },
  { name: "db-node-eu-03", instances: ["MariaDB E"] },
];

function NodeCard({
  name,
  instances,
}: {
  name: string;
  instances: string[];
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-md border border-border bg-background text-muted-foreground">
          <Cpu className="size-3.5" aria-hidden />
        </span>
        <div className="flex flex-col">
          <span className="text-[11px] font-medium uppercase tracking-wide text-accent">
            Fleetdock Agent
          </span>
          <span className="font-mono text-xs text-foreground">{name}</span>
        </div>
      </div>
      <ul className="flex flex-col gap-1.5">
        {instances.map((db) => (
          <li
            key={db}
            className="flex items-center gap-2 rounded-md border border-border/70 bg-background px-2.5 py-1.5 text-xs text-muted-foreground"
          >
            <Database className="size-3.5 text-accent/80" aria-hidden />
            <span className="font-mono text-foreground">{db}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Responsive Manager → Agent → Database Node topology (no bitmap). */
export function ArchitectureDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      {/* Manager */}
      <div className="mx-auto max-w-md rounded-xl border border-accent/30 bg-accent/[0.06] p-5 text-center shadow-sm">
        <div className="flex items-center justify-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent">
            <Server className="size-5" aria-hidden />
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">Fleetdock Manager</p>
            <p className="text-xs text-muted-foreground">Control plane · UI · API · worker</p>
          </div>
        </div>
      </div>

      {/* Connector: desktop bracket */}
      <div aria-hidden className="relative hidden h-10 md:block">
        <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-border-strong" />
        <span className="absolute left-[16.666%] right-[16.666%] top-5 h-px bg-border-strong" />
        <span className="absolute left-[16.666%] top-5 h-5 w-px -translate-x-1/2 bg-border-strong" />
        <span className="absolute left-1/2 top-5 h-5 w-px -translate-x-1/2 bg-border-strong" />
        <span className="absolute left-[83.333%] top-5 h-5 w-px -translate-x-1/2 bg-border-strong" />
      </div>

      {/* Connector: mobile stem */}
      <div aria-hidden className="mx-auto h-6 w-px bg-border-strong md:hidden" />

      {/* Nodes */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {managerNodes.map((node) => (
          <NodeCard key={node.name} {...node} />
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Agents enroll over a single outbound HTTPS connection and execute only approved
        operations on their own node.
      </p>
    </div>
  );
}
