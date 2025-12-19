"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsDiscord, BsMailbox2 } from "react-icons/bs";
import { FaGithubSquare, FaMapMarkerAlt } from "react-icons/fa";
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
      className="min-h-screen w-full flex items-center justify-center py-16 sm:py-12"
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="w-full grid xl:grid-cols-2 gap-12 items-center">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full flex flex-col space-y-4 sm:space-y-6"
          >
            {/* Hero Image Wrapper */}
            <div className="w-full flex items-center justify-center lg:justify-start">
              <DotLottieReact
                src="window_layout.lottie"
                loop
                autoplay
                className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64"
              />
            </div>

            {/* Team Name */}
            <div className="w-full text-center lg:text-left space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
                <span className="text-black dark:text-white">
                  <span className="inline-flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                    <span className={`${headlineFont.className} relative z-10`}>
                      Hi, we're <span className="text-[#E9945B]">IFA Team</span>
                    </span>
                    <DotLottieReact
                      src="hand_wave.lottie"
                      loop
                      autoplay
                      className="w-10 h-10 sm:w-12 sm:h-12 neo-shadow border-2 border-black rounded-full p-1 bg-[#E9945B]"
                    />
                  </span>
                </span>
              </h1>
            </div>

            <div className="w-full grid grid-cols-1 md:flex sm:flex-row sm:justify-start justify-center items-center gap-3 font-bold">
              <Link
                href="#contact"
                className="group w-full sm:w-auto bg-[#E9945B] uppercase text-black px-6 py-3 sm:px-8 flex items-center justify-center gap-3 outline-none focus:scale-110 active:scale-105 transition border-2 border-black neo-shadow hover:bg-[#d6854f] text-sm sm:text-base"
                onClick={() => {
                  setActiveSection("Contact");
                  setTimeOfLastClick(Date.now());
                }}
              >
                Start Your Project with US
                <BsArrowRight className="opacity-100 group-hover:translate-x-2 transition font-bold text-xl" />
              </Link>
            </div>
            <p
              className={`${headlineFont.className} w-full mt-8 text-black dark:text-white md:flex sm:flex-row sm:justify-start justify-center flex items-center gap-2 text-xl font-black uppercase tracking-wide`}
            >
              <FaMapMarkerAlt className="text-red-500" /> Danang, Vietnam
            </p>

            <div className="w-full flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xl font-bold">
              <Link
                className="bg-[#F8CB49] p-3 sm:p-4 text-black hover:text-black flex items-center justify-center gap-2 transition cursor-pointer border-2 border-black neo-shadow hover:bg-gray-100"
                href="https://discord.gg/DaeSfrkfnS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join us on Discord"
              >
                <BsDiscord className="text-xl sm:text-2xl" />
              </Link>

              <Link
                className="bg-[#F8CB49] p-3 sm:p-4 text-black flex items-center justify-center gap-2 cursor-pointer border-2 border-black neo-shadow dark:text-black hover:bg-gray-100"
                href="https://github.com/huyhunhngc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View our GitHub projects"
              >
                <FaGithubSquare className="text-xl sm:text-2xl" />
              </Link>

              <Link
                className="bg-[#F8CB49] p-3 sm:p-4 text-black flex items-center justify-center gap-2 cursor-pointer border-2 border-black neo-shadow dark:text-black hover:bg-gray-100"
                href="mailto:support@ifateam.dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Call us"
              >
                <BsMailbox2 className="text-xl sm:text-2xl" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Code Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <div className="w-full">
              <CodeCard />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
