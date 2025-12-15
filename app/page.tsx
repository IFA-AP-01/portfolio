import About from "@/components/section/about";
import Contact from "@/components/section/contact";
import Intro from "@/components/section/intro";
import Members from "@/components/section/members";
import Projects from "@/components/section/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/section/skills";
import SectionNavigation from "@/components/section-navigation";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <About />
      <Skills />
      <Members />
      <Projects />
      <Contact />
      <SectionNavigation />
    </main>
  );
}
