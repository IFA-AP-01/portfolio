import { SoftwareApplication, WithContext } from "schema-dts";
import Script from "next/script";
import { headlineFont } from "@/lib/fontawesome";

export const metadata = {
  title: "Shorten Link - Free link shortener. Quick and easy",
  description:
    "Free link shortener. Quick and easy. No registration required. No ads.",
  keywords: [
    "shorten link",
    "link shortener",
    "free link shortener",
    "quick and easy",
    "no registration required",
    "no ads",
  ],
  openGraph: {
    title: "Shorten Link - Free link shortener. Quick and easy",
    description:
      "Free link shortener. Quick and easy. No registration required. No ads.",
    type: "website",
    siteName: "Shorten Link",
    images: [
      {
        url: "https://cdn.ifateam.dev/shorten-link.webp",
        alt: "Shorten Link",
      },
    ],
  },
  canonical: "https://www.ifateam.dev/shorten-link",
};

const jsonLd: WithContext<SoftwareApplication> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Shorten Link",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  url: "https://www.ifateam.dev/shorten-link",
  description:
    "Free link shortener. Quick and easy. No registration required. No ads.",
  image: "https://cdn.ifateam.dev/shorten-link.webp",
  keywords: [
    "shorten link",
    "link shortener",
    "free link shortener",
    "quick and easy",
    "no registration required",
    "no ads",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf8f1",
};

export default function ShortenLinkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="z-[999]">
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </header>

      <main className="min-h-screen pt-28 pb-20 justify-center">
        <h1
          className={`${headlineFont.className} text-2xl sm:text-4xl font-black mb-8 text-center text-black dark:text-white uppercase tracking-tighter`}
        >
          <span className="text-[#E9945B]">Easy</span> Link Shorter
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center pb-8">
          <span className="text-[#e9945b]">Free</span> link shortener. Quick and
          easy. No registration required.
        </p>
        {children}
      </main>
    </div>
  );
}
