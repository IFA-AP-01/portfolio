import { SoftwareApplication, WithContext } from "schema-dts";
import { ScreenshotEditor } from "./components/ScreenshotEditor";
import Script from "next/script";

export const metadata = {
  title: "App Store Screenshot Generator",
  description: "Create professional app store screenshots for iOS and Android.",
  keywords: [
    "app store screenshot generator",
    "screenshot generator",
    "app store screenshots",
    "screenshot generator app",
    "app store screenshots generator",
    "screenshot generator app store",
    "app store screenshots generator app",
    "screenshot generator app store screenshots",
    "app store screenshots generator app store",
    "screenshot generator app store screenshots generator",
  ],
  openGraph: {
    title: "App Store Screenshot Generator",
    description:
      "Create professional app store screenshots for iOS and Android.",
    type: "website",
    url: "https://ifateam.dev/mockup",
    siteName: "IFA Team",
  },
};

const jsonLd: WithContext<SoftwareApplication> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "IFA Team",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  url: "https://ifateam.dev/mockup",
  description: "Create professional app store screenshots for iOS and Android.",
  image: "https://ifateam.dev/mockup/og-image.png",
  keywords: [
    "app store screenshot generator",
    "screenshot generator",
    "app store screenshots",
    "screenshot generator app",
    "app store screenshots generator",
    "screenshot generator app store",
    "app store screenshots generator app",
    "screenshot generator app store screenshots",
    "app store screenshots generator app store",
    "screenshot generator app store screenshots generator",
  ],
};

export default function MockupPage() {
  return (
    <div>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <main className="h-screen bg-[#faf8f1] dark:bg-[#191C1E] overflow-hidden">
        <ScreenshotEditor />
      </main>
    </div>
  );
}
