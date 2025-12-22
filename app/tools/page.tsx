import { ToolCard } from "@/components/section/tools";
import Testimonials from "@/components/section/testimonials";

const tools = [
  {
    title: "App Screenshot Generator",
    description: "Create App Store and Play Store Screenshots in seconds.",
    promotionText: "Faster than using Canva",
    video: "https://cdn.ifateam.dev/appscreenshot.mp4",
    link: "/mockup",
  },
  {
    title: "Link Shorter",
    description: "Shorten your links and track their performance.",
    promotionText: "Turn into powerful links",
    video: "https://cdn.ifateam.dev/link-shorter.mp4",
    link: "/shorten-link",
  },
  {
    title: "JSON to TOON Converter",
    description: "Convert JSON to TOON format.",
    promotionText: "Save LLM token usage with TOON",
    image: "https://cdn.ifateam.dev/json2toon.webp",
    link: "/json2toon",
  },
];

export const metadata = {
  title: "Tools for Indie Developers",
  description: "Tools for Indie Developers",
  keywords: ["Tools for Indie Developers", "Indie Developers Tools"],
  openGraph: {
    title: "Tools for Indie Developers",
    description: "Tools for Indie Developers",
    type: "website",
    locale: "en_US",
    siteName: "Tools for Indie Developers",
  },
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-28 w-full">
      <div className="flex flex-col items-center max-w-6xl mx-auto px-4 sm:px-0">
        <h1 className="max-w-4xl text-2xl sm:text-5xl font-bold mb-8 text-center text-gray-950 dark:text-gray-50">
          Tools for <span className="text-[#e9945b]">Indie Developers</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center pb-8">
          <span className="font-bold text-[#e9945b]">Productivity tools</span>{" "}
          for indie developers to save time and increase efficiency.
        </p>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {tools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </div>
        </div>
      </div>
      <Testimonials />
    </div>
  );
}
