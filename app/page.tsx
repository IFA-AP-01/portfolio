import Hero from "@/components/section/hero";
import FeaturedProjects from "@/components/section/featured-projects";
import Capabilities from "@/components/section/capabilities";
import Contact from "@/components/section/contact";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <FeaturedProjects />
      <Capabilities />
      <Contact />
    </main>
  );
}
