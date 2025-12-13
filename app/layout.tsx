import Header from "@/components/header";
import "@/lib/fontawesome";
import "./globals.css";

import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import { bodyFont } from "@/lib/fontawesome";

import ScrollToTop from "@/components/scroll-to-top";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "IFA Team - Application Development Experts",
    template: "IFA Team - Application Development Experts",
  },
  description:
    "Welcome to The IFA Team! We are experts in application development, delivering high-quality solutions for web, mobile, and enterprise platforms.",
  keywords: [
    "IFA Team",
    "IFA Team - Application Development Experts",
    "IFA Team - Application Development Experts",
  ],
  openGraph: {
    title: {
      default: "IFA Team - Application Development Experts",
      template: "IFA Team - Application Development Experts",
    },
    description:
      "Welcome to The IFA Team! We are experts in application development, delivering high-quality solutions for web, mobile, and enterprise platforms.",
    images: [
      "https://res.cloudinary.com/huyhunhngc/image/upload/v1745678359/logo_jmvj9s.webp",
    ],
  },
  alternates: { canonical: "https://ifateam.dev" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf8f1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <title>IFA Team - Application Development Experts</title>
      </head>
      <body
        suppressHydrationWarning
        className={`${bodyFont.className} bg-[#faf8f1] text-gray-950 relative dark:bg-[#191C1E] dark:text-gray-50 dark:text-opacity-90 transition-colors duration-300`}
      >
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
            <Toaster position="top-right" />
            <ThemeSwitch />
            <ScrollToTop />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
