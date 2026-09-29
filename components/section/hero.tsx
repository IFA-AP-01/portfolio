"use client";

import { availability, heroStats } from "@/lib/data";
import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Hero() {
  const { ref } = useSectionInView("Home");
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      id="home"
      ref={ref}
      className="scroll-mt-[96px] pt-[112px] sm:pt-[144px]"
    >
      <Container>
        <div className="mx-auto max-w-hero">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden />
              <span className="font-mono text-[12px] font-medium tracking-[0.04em] text-fg-muted">
                {availability.label}
              </span>
              <span className="font-mono text-[12px] text-fg-subtle">· {availability.period}</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 text-[42px] font-bold leading-[1.05] tracking-[-0.035em] text-fg sm:text-[56px] lg:text-[68px]">
              We build
              <br />
              <span className="bg-gradient-to-r from-white to-fg-muted bg-clip-text text-transparent">
                products that ship.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[560px] text-[18px] leading-relaxed text-fg-muted">
              IFA Team is a product studio crafting web, mobile and edge infrastructure —
              from real-time voice translation to globally-cached asset delivery.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                onClick={() => {
                  setActiveSection("Contact");
                  setTimeOfLastClick(Date.now());
                }}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-[15px] font-semibold text-canvas transition-colors duration-200 hover:bg-fg/90"
              >
                Start a project
              </a>
              <a
                href="#projects"
                onClick={() => {
                  setActiveSection("Projects");
                  setTimeOfLastClick(Date.now());
                }}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-2.5 text-[15px] font-medium text-fg transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.06]"
              >
                View work
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-[13px] uppercase tracking-[0.08em] text-fg-subtle">
                    {stat.label}
                  </dt>
                  <dd className="mt-1.5 text-[28px] font-semibold tracking-[-0.02em] text-fg">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
