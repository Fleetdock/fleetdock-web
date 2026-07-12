import {
  Activity,
  Boxes,
  DatabaseBackup,
  Gauge,
  HardDrive,
  LayoutDashboard,
  Server,
  Cpu,
  MemoryStick,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Illustrative data — generic, non-sensitive names. Not live metrics. */
/* ------------------------------------------------------------------ */

const nav = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Servers", icon: Server },
  { label: "Instances", icon: Boxes },
  { label: "Backups", icon: DatabaseBackup },
  { label: "Operations", icon: Activity },
];

const nodes = [
  { name: "db-node-eu-01", status: "online", cpu: 34, mem: 61, disk: 48, instances: 3 },
  { name: "db-node-eu-02", status: "online", cpu: 52, mem: 44, disk: 71, instances: 2 },
  { name: "db-node-eu-03", status: "maintenance", cpu: 12, mem: 22, disk: 39, instances: 1 },
] as const;

const instances = [
  { name: "customer-001", engine: "MariaDB 11.4", health: "healthy" },
  { name: "customer-002", engine: "PostgreSQL 16", health: "healthy" },
  { name: "customer-003", engine: "MySQL 8.4", health: "degraded" },
] as const;

const operations = [
  { label: "Backup completed", detail: "customer-001 → r2-eu-backups", state: "done" },
  { label: "Migration in progress", detail: "customer-004 · eu-02 → eu-01", state: "running" },
  { label: "Instance provisioned", detail: "customer-006 on db-node-eu-01", state: "done" },
] as const;

const capacity = [
  { label: "CPU", icon: Cpu, value: 39 },
  { label: "Memory", icon: MemoryStick, value: 57 },
  { label: "Disk", icon: HardDrive, value: 52 },
] as const;

const statusColor: Record<string, string> = {
  online: "bg-success",
  maintenance: "bg-warning",
  offline: "bg-danger",
};

function StatusDot({ status }: { status: string }) {
  return (
    <span
      aria-hidden
      className={cn("size-2 rounded-full", statusColor[status] ?? "bg-muted-foreground")}
    />
  );
}

function Meter({ value, tone = "accent" }: { value: number; tone?: "accent" | "warning" }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn("h-full rounded-full", tone === "warning" ? "bg-warning" : "bg-accent")}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

/**
 * A polished, static representation of the Fleetdock Overview screen. Built
 * from semantic markup — it illustrates the product, it is not a live console.
 */
export function ProductPreview() {
  return (
    <div
      role="img"
      aria-label="Illustration of the Fleetdock overview dashboard showing database nodes, instances, recent operations, and fleet capacity."
      className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/10 ring-1 ring-black/5 dark:shadow-black/40"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-background-subtle px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success" aria-hidden />
          fleetdock.local / overview
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Preview
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[168px_1fr]">
        {/* Sidebar */}
        <aside className="hidden flex-col gap-0.5 border-r border-border bg-background-subtle/60 p-3 sm:flex">
          <div className="flex items-center gap-2 px-2 pb-3 text-xs font-semibold text-foreground">
            <span className="grid size-6 place-items-center rounded-md bg-accent/15 text-accent">
              <Boxes className="size-3.5" />
            </span>
            Fleet
          </div>
          {nav.map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px]",
                active
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
            </div>
          ))}
        </aside>

        {/* Main */}
        <div className="flex flex-col gap-4 p-4 sm:p-5">
          {/* Stat row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Servers online", value: "3 / 3", tone: "text-success" },
              { label: "DB instances", value: "24", tone: "text-foreground" },
              { label: "Backups (24h)", value: "18", tone: "text-foreground" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-background p-3">
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
                <p className={cn("mt-1 text-lg font-semibold tabular-nums", s.tone)}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Nodes */}
            <section className="rounded-lg border border-border bg-background p-3">
              <header className="mb-2.5 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-foreground">Database nodes</h3>
                <span className="text-[11px] text-muted-foreground">3 nodes</span>
              </header>
              <ul className="flex flex-col gap-2.5">
                {nodes.map((n) => (
                  <li key={n.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-2 font-mono text-foreground">
                        <StatusDot status={n.status} />
                        {n.name}
                      </span>
                      <span className="text-muted-foreground">{n.instances} inst.</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Meter value={n.cpu} tone={n.cpu > 70 ? "warning" : "accent"} />
                      <Meter value={n.mem} tone={n.mem > 70 ? "warning" : "accent"} />
                      <Meter value={n.disk} tone={n.disk > 70 ? "warning" : "accent"} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instances */}
            <section className="rounded-lg border border-border bg-background p-3">
              <header className="mb-2.5 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-foreground">Instances</h3>
                <span className="text-[11px] text-muted-foreground">showing 3 of 24</span>
              </header>
              <ul className="flex flex-col gap-1.5">
                {instances.map((i) => (
                  <li
                    key={i.name}
                    className="flex items-center justify-between rounded-md border border-border/60 bg-card px-2.5 py-2 text-[11px]"
                  >
                    <span className="flex items-center gap-2">
                      <StatusDot status={i.health === "healthy" ? "online" : "maintenance"} />
                      <span className="font-mono text-foreground">{i.name}</span>
                    </span>
                    <span className="text-muted-foreground">{i.engine}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Operations */}
            <section className="rounded-lg border border-border bg-background p-3">
              <header className="mb-2.5 flex items-center gap-2">
                <Activity className="size-3.5 text-accent" aria-hidden />
                <h3 className="text-xs font-semibold text-foreground">Recent operations</h3>
              </header>
              <ul className="flex flex-col gap-2">
                {operations.map((op) => (
                  <li key={op.label} className="flex items-start gap-2 text-[11px]">
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1 size-1.5 rounded-full",
                        op.state === "running" ? "bg-accent" : "bg-success",
                      )}
                    />
                    <span className="flex flex-col">
                      <span className="text-foreground">{op.label}</span>
                      <span className="font-mono text-muted-foreground">{op.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Capacity */}
            <section className="rounded-lg border border-border bg-background p-3">
              <header className="mb-2.5 flex items-center gap-2">
                <Gauge className="size-3.5 text-accent" aria-hidden />
                <h3 className="text-xs font-semibold text-foreground">Fleet capacity</h3>
              </header>
              <ul className="flex flex-col gap-2.5">
                {capacity.map(({ label, icon: Icon, value }) => (
                  <li key={label} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Icon className="size-3" aria-hidden />
                        {label}
                      </span>
                      <span className="tabular-nums text-foreground">{value}%</span>
                    </div>
                    <Meter value={value} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
