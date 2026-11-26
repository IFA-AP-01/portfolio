"use client";

import { featuredProjects } from "@/lib/data";
import ProjectCard from "@/components/card/project-card";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/section-heading";

export default function FeaturedProjects() {
  return (
    <Section id="projects">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow="Selected work">
            Products the community loves
          </SectionHeading>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">
            A selection of shipped work — from real-time voice tooling to publishing
            infrastructure and edge caching systems.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
