"use client";

import { useState, useCallback, memo } from "react";
import { membersData } from "@/lib/data";
import Image from "next/image";
import { motion } from "framer-motion";
import { headlineFont } from "@/lib/fontawesome";

type MemberProps = (typeof membersData)[number];

const Member = memo(function Member({
  title,
  description,
  tags,
  imageUrl,
}: MemberProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      className="group mb-6 sm:mb-8 last:mb-0 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Simplified background glow - only show on hover */}
      {isHovered && (
        <div className="absolute -inset-2 bg-orange-500/5 rounded-3xl opacity-100 transition-opacity duration-300" />
      )}

      <motion.section
        className="glass-member relative bg-white/50 dark:bg-white/5 rounded-3xl overflow-hidden max-w-[50rem] transition-all duration-300 hover:bg-white/30 dark:hover:bg-white/10 hover:border-white/50 dark:hover:border-white/20"
        whileHover={{
          y: -4,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
      >
        {/* Simplified top highlight */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/30 to-transparent" />

        <div className="flex flex-row items-center sm:h-[16rem] relative z-10">
          {/* Content Section */}
          <motion.div
            className="pt-6 pb-6 px-6 sm:pl-8 sm:pr-4 sm:pt-8 sm:max-w-[70%] flex flex-col h-full relative"
            animate={{
              x: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Desktop Title */}
            <motion.h3
              className={`${headlineFont.className} text-xl font-bold hidden sm:block text-gray-900 dark:text-white mb-1`}
            >
              {title}
            </motion.h3>

            {/* Mobile Layout */}
            <div className="flex sm:hidden items-center gap-4 mb-4">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Image
                  className="relative w-[4rem] h-[4rem] rounded-2xl object-cover ring-2 ring-white/20 dark:ring-white/10"
                  src={imageUrl}
                  alt="Profile"
                  loading="lazy"
                />
              </motion.div>
              <h3
                className={`${headlineFont.className} text-lg font-bold text-gray-900 dark:text-white`}
              >
                {title}
              </h3>
            </div>

            {/* Description */}
            <p className="leading-relaxed text-gray-800 dark:text-gray-300 text-sm sm:text-base mb-6 sm:mb-auto">
              {description}
            </p>

            {/* Tech Stack Pills - Simplified */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-black/10 dark:bg-white/10 rounded-xl p-2 hover:bg-white/40 dark:hover:bg-white/15 transition-colors duration-200"
                >
                  <Image
                    className="w-8 h-8 rounded-lg object-cover"
                    src={tag}
                    alt={`Tech ${index}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Desktop Profile Image - Simplified */}
          <div className="hidden sm:block absolute right-8 top-1/2 transform -translate-y-1/2">
            <motion.div
              className="relative"
              animate={{
                scale: isHovered ? 1.03 : 1,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Profile image container */}
              <div className="bg-white/30 dark:bg-white/10 rounded-2xl p-1">
                <Image
                  className="w-[8.5rem] h-[8.5rem] object-cover rounded-xl"
                  src={imageUrl}
                  alt="Profile"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
});

export default Member;
