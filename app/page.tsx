import About from "@/components/section/about";
import Contact from "@/components/section/contact";
import Intro from "@/components/section/intro";
import Members from "@/components/section/members";
import Projects from "@/components/section/projects";
import Skills from "@/components/section/skills";
import SectionNavigation from "@/components/section-navigation";
import Tools from "@/components/section/tools";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <Tools />
      <Skills />
      <Members />
      <About />
      <Projects />
      <Contact />
      <SectionNavigation />
    </main>
  );
}
