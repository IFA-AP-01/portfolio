"use client";

import { featuredProjects } from "@/lib/data";
import ProjectCard from "@/components/card/project-card";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/section-heading";

export default function FeaturedProjects() {
  return (
    <Section tone="paper" id="projects" className="py-section">
      <Container>
        <div className="max-w-2xl">
          <SectionHeading eyebrow="Selected work">
            Products the community loves
          </SectionHeading>
          <p className="mt-5 text-[16px] leading-relaxed text-ink/70">
            A selection of shipped work — from real-time voice tooling to publishing
            infrastructure and edge caching systems.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-x-8 gap-y-12 pr-[10px] md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
