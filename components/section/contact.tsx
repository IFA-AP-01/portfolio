"use client";

import React from "react";
import SectionHeading from "../section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { BsDiscord } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import ContactSection from "../contact-form";
import { headlineFont } from "@/lib/fontawesome";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

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
      <SectionHeading>Get in Touch</SectionHeading>
      <p className="text-gray-900 -mt-6 dark:text-white max-w-[36rem] mx-auto text-base font-bold">
        Please contact us directly at{" "}
        <Link
          className="font-black text-[#E9945B] hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          href="mailto:hi@ifateam.dev"
        >
          hi@ifateam.dev
        </Link>{" "}
        or through this form.
      </p>

      {/* Social Links */}
      <motion.div
        className="flex flex-row items-center justify-center gap-4 text-xl font-bold mt-8"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          className="bg-[#F8CB49] p-4 text-black hover:text-black flex items-center gap-2 transition cursor-pointer border-2 border-black neo-shadow hover:bg-gray-100"
          href="https://discord.gg/DaeSfrkfnS"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Join us on Discord"
        >
          <BsDiscord className="text-2xl" />
        </Link>

        <Link
          className="bg-[#F8CB49] p-4 text-black flex items-center gap-2 text-[1.35rem] cursor-pointer border-2 border-black neo-shadow dark:text-black hover:bg-gray-100"
          href="https://github.com/huyhunhngc"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View our GitHub projects"
        >
          <FaGithubSquare className="text-2xl" />
        </Link>
      </motion.div>
      <ContactSection />
      <p
        className={`${headlineFont.className} mt-8 text-black dark:text-white flex items-center justify-center gap-2 text-xl font-black uppercase tracking-wide`}
      >
        <FaMapMarkerAlt className="text-red-500" /> Danang, Vietnam
      </p>
    </motion.section>
  );
}
