import type { ReactNode } from "react";
import SiteNav from "@/components/ui/site-nav";
import Footer from "@/components/footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      {children}
      <Footer />
    </>
  );
}
