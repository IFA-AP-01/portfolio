"use client";

import React from "react";
import SectionHeading from "../section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { BsDiscord } from "react-icons/bs";
import { FaGithubSquare, FaPhone } from "react-icons/fa";
import ContactSection from "../contact-form";
import { headlineFont } from "@/lib/fontawesome";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-16 sm:mb-18 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading highlight="Touch">Get in Touch</SectionHeading>
      <p className="text-gray-700 -mt-6 dark:text-white/80">
        Please contact us directly at{" "}
        <a
          className="font-bold text-primary dark:text-primary/80 hover:underline"
          href="mailto:hi@ifateam.dev"
        >
          hi@ifateam.dev
        </a>{" "}
        or through this form.
      </p>

      {/* Social Links */}
      <motion.div
        className="flex flex-row items-center justify-center gap-3 text-lg font-medium mt-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <a
          className="bg-white p-4 text-gray-700 hover:text-primary flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/70 dark:hover:text-white"
          href="https://discord.gg/MdtF7raJ"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Join us on Discord"
        >
          <BsDiscord className="text-xl" />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-primary active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/70 dark:hover:text-white"
          href="https://github.com/IFA-AP-01"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View our GitHub projects"
        >
          <FaGithubSquare />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-primary active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/70 dark:hover:text-white"
          href="tel:+84859885874"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Call us"
        >
          <FaPhone />
        </a>
      </motion.div>
      <ContactSection />
      <p
        className={`${headlineFont.className} mt-4 text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2 text-lg`}
      >
        <FaMapMarkerAlt className="text-tertiary dark:text-primary " /> Danang,
        Vietnam
      </p>
    </motion.section>
  );
}
