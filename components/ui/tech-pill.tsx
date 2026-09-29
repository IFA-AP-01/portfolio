import type { ReactNode } from "react";

export default function TechPill({ children }: { children: ReactNode }) {
  return <span className="tech-pill">{children}</span>;
}
