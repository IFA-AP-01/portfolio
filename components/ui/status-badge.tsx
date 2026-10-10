import clsx from "clsx";
import type { ProjectStatus } from "@/lib/data";

const statusConfig: Record<ProjectStatus, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-live" },
  beta: { label: "Beta", dot: "bg-beta" },
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, dot } = statusConfig[status];

  return (
    <span className="tech-pill shrink-0 text-ink/80">
      <span className={clsx("h-1.5 w-1.5 rounded-full", dot)} />
      {label}
    </span>
  );
}
