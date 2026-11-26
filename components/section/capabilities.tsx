"use client";

import { capabilityGroups } from "@/lib/data";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/section-heading";
import TechPill from "@/components/ui/tech-pill";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { useSectionInView } from "@/lib/hooks";

export default function Capabilities() {
  const { ref } = useSectionInView("Stack");

  return (
    <Section id="stack" ref={ref}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow="What we do">
            Your full-stack product team
          </SectionHeading>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">
            One team covering the full stack — interfaces, infrastructure and the design
            craft that ties them together.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {capabilityGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.08} className="h-full">
              <div className="card flex h-full flex-col">
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <h3 className="font-heading text-[20px] font-bold leading-none tracking-[-0.05em]">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                    {group.blurb}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {group.items.map((item) => (
                      <TechPill key={item.name}>{item.name}</TechPill>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
