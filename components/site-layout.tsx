"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();
  const isFullPage = pathname === "/mockup" || pathname === "/diagram";

  return (
    <>
      {!isFullPage && <Header />}
      {children}
      {!isFullPage && <Footer />}
    </>
  );
}
