import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import ActiveSectionContextProvider from "@/context/active-section-context";
import SiteLayout from "@/components/site-layout";
import ScrollToTop from "@/components/scroll-to-top";
import { GeistSans, GeistMono } from "@/lib/fonts";

const title = "IFA Team — Product Studio";
const description =
  "IFA Team builds web, mobile and edge software that ships — from real-time voice translation to globally-cached asset delivery.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | IFA Team",
  },
  description,
  keywords: [
    "IFA Team",
    "product studio",
    "app development",
    "web development",
    "mobile development",
  ],
  openGraph: {
    title: { default: title, template: "%s | IFA Team" },
    description,
    images: ["https://cdn.ifateam.dev/thumnail-ifa.jpg"],
    url: "https://ifateam.dev",
    siteName: title,
    locale: "en",
    type: "website",
  },
  alternates: { canonical: "https://ifateam.dev" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090A0F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} !scroll-smooth`}
    >
      <body className="bg-canvas font-sans text-fg antialiased">
        <ActiveSectionContextProvider>
          <SiteLayout>{children}</SiteLayout>
          <Toaster position="top-right" />
          <ScrollToTop />
        </ActiveSectionContextProvider>
      </body>
    </html>
  );
}
