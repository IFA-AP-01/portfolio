"use client";

import { capabilityGroups } from "@/lib/data";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/section-heading";
import TechPill from "@/components/ui/tech-pill";
import Reveal from "@/components/ui/reveal";
import { useSectionInView } from "@/lib/hooks";

export default function Capabilities() {
  const { ref } = useSectionInView("Stack");

  return (
    <section id="stack" ref={ref} className="scroll-mt-[96px] py-section">
      <Container>
        <div className="max-w-2xl">
          <SectionHeading eyebrow="What we do">Tech Stack &amp; Capabilities</SectionHeading>
          <p className="mt-4 text-[16px] leading-relaxed text-fg-muted">
            One team covering the full stack — interfaces, infrastructure and the design
            craft that ties them together.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {capabilityGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.08} className="h-full">
              <div className="bento-card flex h-full flex-col p-6">
                <h3 className="text-[20px] font-semibold tracking-[-0.015em] text-fg">
                  {group.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
                  {group.blurb}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechPill key={item.name}>{item.name}</TechPill>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
