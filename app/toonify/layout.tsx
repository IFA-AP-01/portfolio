import { SoftwareApplication, WithContext } from "schema-dts";
import Script from "next/script";

export const metadata = {
  title: "JSON to TOON Converter - Convert JSON to TOON Format",
  description:
    "Free JSON to TOON converter that reduces LLM token usage by 30-60% with TOON format",
  keywords: [
    "JSON to TOON converter",
    "TOON format converter",
    "LLM token reduction",
    "JSON to TOON",
    "TOON format",
    "LLM token usage",
  ],
  openGraph: {
    title: "JSON to TOON Converter - Convert JSON to TOON Format",
    description:
      "Free JSON to TOON converter that reduces LLM token usage by 30-60% with TOON format",
    type: "website",
    siteName: "JSON to TOON Converter",
    images: [
      {
        url: "https://cdn.ifateam.dev/json2toon.webp",
        alt: "JSON to TOON Converter",
      },
    ],
  },
};

const jsonLd: WithContext<SoftwareApplication> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JSON to TOON Converter",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  url: "https://www.ifateam.dev/toonify",
  description:
    "Free JSON to TOON converter that reduces LLM token usage by 30-60% with TOON format",
  image: "https://cdn.ifateam.dev/json2toon.webp",
  keywords: [
    "JSON to TOON converter",
    "TOON format converter",
    "LLM token reduction",
    "JSON to TOON",
    "TOON format",
    "LLM token usage",
  ],
};

export default function JsonConverterLayout({
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

      <main className="flex flex-col items-center justify-center min-h-screen py-28 px-4 sm:px-10">
        <h1 className="max-w-4xl text-2xl sm:text-4xl font-bold mb-8 text-center text-gray-950 dark:text-gray-50 tracking-widest">
          JSON to <span className="text-[#e9945b]">TOON</span> Converter
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center pb-8">
          Free JSON to <span className="text-[#e9945b]">TOON</span> converter
          that reduces <span className="text-[#e9945b]">LLM</span> token usage
          by 30-60% with <span className="text-[#e9945b]">TOON</span> format
        </p>
        {children}
      </main>
    </div>
  );
}
