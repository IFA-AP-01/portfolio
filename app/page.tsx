import Hero from "@/components/section/hero";
import FeaturedProjects from "@/components/section/featured-projects";
import Testimonials from "@/components/section/testimonials";
import Capabilities from "@/components/section/capabilities";
import Contact from "@/components/section/contact";
import { siteMeta } from "@/lib/data";

const siteUrl = "https://www.ifateam.dev";
const googlePlay = siteMeta.stores.find((s) => s.label === "Google Play")!;
const appStore = siteMeta.stores.find((s) => s.label === "App Store")!;
const github = siteMeta.socials.find((s) => s.label === "GitHub")!;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteMeta.name,
      alternateName: ["IFA", "ifateam.dev"],
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteMeta.name,
      url: siteUrl,
      logo: `${siteUrl}/ifaLogo.webp`,
      email: siteMeta.email,
      sameAs: [github.href, appStore.href],
      subOrganization: {
        "@type": "Organization",
        name: "Dotsdev",
        description: "IFA Team's Android app studio.",
        sameAs: [googlePlay.href],
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <FeaturedProjects />
      <Testimonials />
      <Capabilities />
      <Contact />
    </main>
  );
}
