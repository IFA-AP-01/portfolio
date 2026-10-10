"use client";

import { availability, heroStats } from "@/lib/data";
import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { ArrowRight } from "@/components/ui/button";
import ProfileLinks from "@/components/ui/profile-links";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

function HeroLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <path
          key={i}
          d={`M${900 + i * 70} 820 C ${1000 + i * 60} 520, ${1180 + i * 40} 300, ${1480 + i * 30} ${-40 + i * 20}`}
          stroke="#97A5ED"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  const { ref } = useSectionInView("Home");
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <Section
      tone="ink"
      id="home"
      ref={ref}
      className="overflow-hidden pb-20 pt-20 sm:pb-24 sm:pt-28"
    >
      <HeroLines />
      <Container className="relative">
        <div className="max-w-hero">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2.5 text-white/70">
              <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
              {availability.label} · {availability.period}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 font-heading text-[44px] font-normal leading-[1.08] tracking-[-0.02em] sm:text-[60px] lg:text-[72px]">
              We are IFA Team.
              <br />
              We <span className="text-accent-orange">build products that ship.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[560px] text-[18px] leading-relaxed text-white/75">
              A product studio crafting web, mobile and edge infrastructure — from
              real-time voice translation to globally-cached asset delivery.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                onClick={() => {
                  setActiveSection("Contact");
                  setTimeOfLastClick(Date.now());
                }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-[15px] font-medium text-ink transition-colors duration-300 ease-out hover:bg-periwinkle"
              >
                Start a project
                <ArrowRight />
              </a>
              <a
                href="#projects"
                onClick={() => {
                  setActiveSection("Projects");
                  setTimeOfLastClick(Date.now());
                }}
                className="btn-outline inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-medium"
              >
                View work
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 text-white/80">
              <span className="eyebrow text-[12px] text-white/50">Find us on</span>
              <ProfileLinks />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.28}>
          <dl className="mt-16 grid grid-cols-2 border-t border-white/20 sm:grid-cols-4">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  "flex flex-col-reverse justify-end pt-6 sm:pl-6 sm:first:pl-0 " +
                  (i > 0 ? "sm:border-l sm:border-white/20" : "")
                }
              >
                <dt className="mt-3 text-[14px] text-white/60">{stat.label}</dt>
                <dd className="font-heading text-[40px] font-normal leading-none tracking-[-0.02em] text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
