import { ReactNode } from "react";

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-canvas text-ink">{children}</div>;
}
