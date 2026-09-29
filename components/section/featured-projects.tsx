import { featuredProjects } from "@/lib/data";
import ProjectCard from "@/components/card/project-card";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/section-heading";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="scroll-mt-[96px] py-section">
      <Container>
        <div className="max-w-2xl">
          <SectionHeading eyebrow="Selected work">Featured Projects</SectionHeading>
          <p className="mt-4 text-[16px] leading-relaxed text-fg-muted">
            A selection of shipped work — from real-time voice tooling to publishing
            infrastructure and edge caching systems.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
