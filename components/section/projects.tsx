"use client";

import React from "react";
import SectionHeading from "../section-heading";
import { projectsData } from "@/lib/data";
import Project from "../card/project";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.1);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading highlight="projects">Our projects</SectionHeading>
      <p className="text-gray-900 mb-8 dark:text-white max-w-[36rem] text-center mx-auto text-base font-black uppercase tracking-wide">
        Check out our latest work! We have worked on a variety of freelance
        projects, including mobile apps, web applications, and more. 😊
      </p>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
