"use client";

import { siteMeta } from "@/lib/data";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/ui/reveal";
import ContactForm from "@/components/contact-form";
import ProfileLinks from "@/components/ui/profile-links";
import { useSectionInView } from "@/lib/hooks";
import { BsDiscord } from "react-icons/bs";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <Section id="contact" ref={ref}>
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Contact">
              Got a project?
              <br />
              We have the skills to make it happen.
            </SectionHeading>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-muted">
              Tell us about the product, the timeline and the platform. We reply to
              every serious enquiry.
            </p>

            <a
              href={`mailto:${siteMeta.email}`}
              className="btn btn-primary mt-8"
            >
              {siteMeta.email}
            </a>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <ProfileLinks />
              {siteMeta.socials
                .filter((social) => social.label === "Discord")
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <BsDiscord aria-hidden="true" className="text-[15px]" />
                    {social.label}
                  </a>
                ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
