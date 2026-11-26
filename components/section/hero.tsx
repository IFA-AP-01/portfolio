"use client";

import { availability, heroStats } from "@/lib/data";
import metacamPoster from "@/public/metacamHeaderPoster.webp";
import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { ArrowRight } from "@/components/ui/button";
import ProfileLinks from "@/components/ui/profile-links";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Hero() {
  const { ref } = useSectionInView("Home");
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <Section id="home" ref={ref} className="!pb-4 !pt-16 sm:!pb-6 sm:!pt-24">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow">
            {availability.label} · {availability.period}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-[760px] font-heading text-[40px] font-bold leading-[1.02] tracking-[-0.05em] sm:text-[52px] lg:text-[60px]">
            We are IFA Team.
            <br />
            We build products that ship.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-[600px] text-[16px] leading-[1.45] tracking-[-0.01em] text-ink-muted sm:text-[17px]">
            A product studio crafting web, mobile and edge infrastructure — from
            real-time voice translation to globally-cached asset delivery.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              onClick={() => {
                setActiveSection("Contact");
                setTimeOfLastClick(Date.now());
              }}
              className="btn btn-accent group"
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
              className="btn btn-secondary"
            >
              View work
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            <span className="text-[14px] font-medium text-ink/55">Find us on</span>
            <ProfileLinks className="justify-center" />
          </div>
        </Reveal>

        <Reveal delay={0.26} className="mt-12 w-full max-w-[1100px]">
          <div className="overflow-hidden rounded-card bg-black">
            <video
              src="https://cdn.ifateam.dev/header-metacam.mp4"
              poster={metacamPoster.src}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              preload="metadata"
              aria-label="MetaCam photos with EXIF frames hanging on a string"
              className="aspect-[4/3] w-full object-cover sm:aspect-[21/9]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.28} className="mt-5 w-full max-w-[1100px]">
          <dl className="card grid grid-cols-2 gap-y-8 p-6 text-left sm:grid-cols-4 sm:p-8">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end sm:px-2">
                <dt className="mt-2 text-[14px] text-ink/60">{stat.label}</dt>
                <dd className="font-heading text-[32px] font-bold leading-none tracking-[-0.05em] sm:text-[36px]">
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
