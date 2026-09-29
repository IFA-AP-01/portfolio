"use client";

import { useState } from "react";
import { featuredProjects } from "@/lib/data";
import ProjectCard from "@/components/card/project-card";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/section-heading";

export default function FeaturedProjects() {
  const [engaged, setEngaged] = useState<string | null>(null);

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
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              engaged={engaged !== null && engaged !== project.slug}
              onEngage={setEngaged}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
