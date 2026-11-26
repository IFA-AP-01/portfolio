import { ReactNode } from "react";

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-canvas text-ink">{children}</div>;
}
