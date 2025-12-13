"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsDiscord } from "react-icons/bs";
import { FaGithubSquare, FaPhone } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { headlineFont } from "@/lib/fontawesome";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CodeCard from "../card/code-card";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="pt-12 sm:pt-24 mb-16 max-w-[60rem] text-center sm:mb-0 scroll-mt-[90rem]"
    >
      {/* Hero Image with Animation */}
      <div className="flex items-center justify-center">
        <DotLottieReact
          src="window_layout.lottie"
          loop
          autoplay
          className="w-80 h-80"
        />
      </div>

      {/* Team Name & Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-black tracking-tight text-center uppercase">
          <span className="text-black dark:text-white">
            <span className="relative inline-flex items-center gap-2 flex-wrap justify-center">
              <span className={`${headlineFont.className} relative z-10 mr-2`}>
                Hi, we're <span className="text-[#E9945B]">IFA Team</span>
              </span>
              <DotLottieReact
                src="hand_wave.lottie"
                loop
                autoplay
                style={{ width: 60, height: 60 }}
                className="w-12 h-12 sm:w-[60px] sm:h-[60px] mb-2 sm:mb-4 neo-shadow border-2 border-black rounded-full p-1 bg-[#E9945B]"
              />
            </span>
          </span>
        </h1>
      </motion.div>

      <motion.div
        className="w-full lg:min-w-[50rem] min-w-[22rem] py-12 justify-start text-left"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <CodeCard />
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="flex flex-col items-center justify-center gap-3 px-4 font-bold"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href="#contact"
          className="group bg-[#E9945B] uppercase text-black px-8 py-3 flex items-center gap-3 outline-none focus:scale-110 active:scale-105 transition border-2 border-black neo-shadow hover:bg-[#d6854f]"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Start Your Project With Us{" "}
          <BsArrowRight className="opacity-100 group-hover:translate-x-2 transition font-bold text-xl" />
        </Link>
      </motion.div>
      {/* Social Links */}
      <motion.div
        className="flex flex-row items-center justify-center gap-4 text-xl font-bold mt-8"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <a
          className="bg-[#F8CB49] p-4 text-black hover:text-black flex items-center gap-2 transition cursor-pointer border-2 border-black neo-shadow hover:bg-gray-100"
          href="https://discord.gg/MdtF7raJ"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Join us on Discord"
        >
          <BsDiscord className="text-2xl" />
        </a>

        <a
          className="bg-[#F8CB49] p-4 text-black flex items-center gap-2 text-[1.35rem] cursor-pointer border-2 border-black neo-shadow dark:text-black hover:bg-gray-100"
          href="https://github.com/IFA-AP-01"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View our GitHub projects"
        >
          <FaGithubSquare className="text-2xl" />
        </a>

        <a
          className="bg-[#F8CB49] p-4 text-black flex items-center gap-2 text-[1.35rem] cursor-pointer border-2 border-black neo-shadow dark:text-black hover:bg-gray-100"
          href="tel:+84859885874"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Call us"
        >
          <FaPhone className="text-2xl" />
        </a>
      </motion.div>
    </section>
  );
}
