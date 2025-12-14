import Image from "next/image";
import Link from "next/link";
import teamImage from "@/public/logo.webp";
import { SoftwareApplication, WithContext } from "schema-dts";
import Script from "next/script";

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
        <Link href="/">
          <Image
            src={teamImage}
            alt="IFA"
            width={50}
            height={50}
            priority
            className="w-10 object-cover fixed top-5 left-5 z-1000"
          />
        </Link>
      </header>

      <main>{children}</main>
    </div>
  );
}
