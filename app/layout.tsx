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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#faf8f1" />
        <title>IFA Team - Application Development Experts</title>
        <meta
          name="description"
          content="Welcome to The IFA Team! We are experts in application development, delivering high-quality solutions for web, mobile, and enterprise platforms."
        />
        <meta
          property="og:title"
          content="The IFA Team - Application Development Experts"
        />
        <meta
          property="og:description"
          content="Welcome to The IFA Team! We are experts in application development, delivering high-quality solutions for web, mobile, and enterprise platforms."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ifateam.dev" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/huyhunhngc/image/upload/v1745678359/logo_jmvj9s.webp"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${bodyFont.className} bg-[#faf8f1] text-gray-950 relative dark:bg-[#131313] dark:text-gray-50 dark:text-opacity-90 transition-colors duration-300`}
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
