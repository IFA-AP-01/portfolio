import { SoftwareApplication, WithContext } from "schema-dts";
import Script from "next/script";
import { headlineFont } from "@/lib/fontawesome";

export const metadata = {
  title: "Link Shorter - Free link shorter. Quick and easy",
  description:
    "Free link shorter. Quick and easy. No registration required. No ads.",
  keywords: [
    "shorten link",
    "link shorter",
    "free link shorter",
    "quick and easy",
    "no registration required",
    "no ads",
  ],
  openGraph: {
    title: "Link Shorter - Free link shorter. Quick and easy",
    description:
      "Free link shorter. Quick and easy. No registration required. No ads.",
    type: "website",
    siteName: "Link Shorter",
    images: [
      {
        url: "https://cdn.ifateam.dev/easy-link-shorter.webp",
        alt: "Easy Link Shorter",
      },
    ],
  },
  canonical: "https://www.ifateam.dev/shorten-link",
};

const jsonLd: WithContext<SoftwareApplication> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Link Shorter",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  url: "https://www.ifateam.dev/shorten-link",
  description:
    "Free link shorter. Quick and easy. No registration required. No ads.",
  image: "https://cdn.ifateam.dev/easy-link-shorter.webp",
  keywords: [
    "shorten link",
    "link shorter",
    "free link shorter",
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
          Easy <span className="text-[#E9945B]">Link Shorter</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center pb-8">
          <span className="text-[#e9945b]">Free</span> link shorter - Quick and
          easy to share - Monitor your links.
        </p>
        {children}
      </main>
    </div>
  );
}
