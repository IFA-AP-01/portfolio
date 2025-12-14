"use client";

import React from "react";
import SectionHeading from "../section-heading";
import { skillsJob } from "@/lib/data";
import Image from "next/image";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { headlineFont } from "@/lib/fontawesome";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills", 0.3);

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[75rem] mx-auto scroll-mt-28 text-center sm:mb-40 flex flex-col items-center justify-center"
    >
      <SectionHeading>What We Do?</SectionHeading>
      <p className="text-gray-900 mb-12 dark:text-white max-w-[36rem] text-center mx-auto text-xs sm:text-base uppercase tracking-wide">
        We are a team of experienced developers with a passion for creating
        high-quality applications and solutions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {skillsJob.map((skill, index) => (
          <motion.div
            key={index}
            className="neo-card neo-hover relative overflow-hidden max-w-[25rem] bg-white transition-all duration-300 dark:bg-black"
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col h-full bg-[#f8f8f8] dark:bg-[#1a1a1a]">
              <div className="p-6 flex items-center justify-between border-b-2 border-black">
                <div className="flex items-center">
                  <div
                    className={`bg-[#F9CC47] p-0 mr-5 border-2 border-black neo-shadow`}
                  >
                    <Image
                      src={skill.imageUrl}
                      alt={skill.title}
                      width={500}
                      height={500}
                      className="object-contain w-16 h-16"
                    />
                  </div>
                  <h3
                    className={`${headlineFont.className} text-xl font-black text-left text-black dark:text-white uppercase`}
                  >
                    {skill.title}
                  </h3>
                </div>
              </div>

              <div className="px-6 py-6 text-left text-gray-900 dark:text-gray-100 flex-grow text-sm font-medium">
                <p>
                  {skill.description ||
                    `Professional ${skill.title} services tailored to your business needs.`}
                </p>
              </div>

              <div className="px-6 pb-8 flex flex-wrap gap-3">
                {skill.tags &&
                  skill.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-[#E9945B] text-black px-3 py-1 text-[0.65rem] uppercase tracking-wider font-bold border border-black"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
