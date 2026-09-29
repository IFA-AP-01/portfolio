import type { ReactNode } from "react";
import NotchNav from "@/components/ui/notch-nav";
import Footer from "@/components/footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NotchNav />
      {children}
      <Footer />
    </>
  );
}
