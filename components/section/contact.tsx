"use client";

import { siteMeta } from "@/lib/data";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/ui/reveal";
import ContactForm from "@/components/contact-form";
import { useSectionInView } from "@/lib/hooks";
import { FaGithub } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <FaGithub className="text-[18px]" />,
  Discord: <BsDiscord className="text-[18px]" />,
};

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <section id="contact" ref={ref} className="scroll-mt-[96px] py-section">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Get in touch">
              Let&apos;s build something together
            </SectionHeading>
            <p className="mt-5 text-[16px] leading-relaxed text-fg-muted">
              Tell us about the product, the timeline and the platform. We reply to
              every serious enquiry.
            </p>

            <a
              href={`mailto:${siteMeta.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 font-mono text-[14px] text-fg transition-colors duration-200 hover:border-white/25"
            >
              {siteMeta.email}
            </a>

            <div className="mt-6 flex items-center gap-3">
              {siteMeta.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-fg-muted transition-colors duration-200 hover:border-white/25 hover:text-fg"
                >
                  {socialIcons[social.label]}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
