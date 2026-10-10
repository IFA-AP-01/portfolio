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
    <Section tone="periwinkle" id="stack" ref={ref} className="py-section">
      <Container>
        <div className="max-w-2xl">
          <SectionHeading eyebrow="What we do">
            Your full-stack product team
          </SectionHeading>
          <p className="mt-5 text-[16px] leading-relaxed text-ink/70">
            One team covering the full stack — interfaces, infrastructure and the design
            craft that ties them together.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 pr-[10px] md:grid-cols-3">
          {capabilityGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.08} className="h-full">
              <div className="slab flex h-full flex-col">
                <div className="h-1 bg-indigo" aria-hidden />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-heading text-[24px] font-medium tracking-[-0.01em]">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                    {group.blurb}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6 text-ink/70">
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
