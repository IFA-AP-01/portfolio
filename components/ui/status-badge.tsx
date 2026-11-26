import type { ProjectStatus } from "@/lib/data";

const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  beta: "Beta",
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return <span className="tech-pill shrink-0">{statusLabel[status]}</span>;
}
