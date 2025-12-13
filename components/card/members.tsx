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
      className="group mb-8 sm:mb-10 last:mb-0 relative"
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
      <div className="neo-card neo-hover relative overflow-hidden max-w-[50rem]">
        <div className="flex flex-row items-center sm:h-[18rem] relative z-10">
          {/* Content Section */}
          <motion.div
            className="pt-8 pb-8 px-6 sm:pl-10 sm:pr-4 sm:pt-10 sm:max-w-[70%] flex flex-col h-full relative"
            animate={{
              x: isHovered ? 6 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Desktop Title */}
            <motion.h3
              className={`${headlineFont.className} text-3xl font-black hidden sm:block text-black dark:text-white mb-2 tracking-tight uppercase`}
            >
              {title}
            </motion.h3>

            {/* Mobile Layout */}
            <div className="flex sm:hidden items-center gap-4 mb-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Image
                  className="relative w-[4rem] h-[4rem] object-cover neo-border shadow-neo"
                  src={imageUrl}
                  alt="Profile"
                  loading="lazy"
                />
              </motion.div>
              <h3
                className={`${headlineFont.className} text-xl font-black text-black dark:text-white uppercase leading-tight`}
              >
                {title}
              </h3>
            </div>

            {/* Description */}
            <p className="leading-relaxed text-gray-900 dark:text-gray-100 text-base sm:text-lg mb-8 sm:mb-auto font-medium">
              {description}
            </p>

            {/* Tech Stack Pills - Neo-Brutalist */}
            <div className="flex flex-wrap gap-3 mt-auto">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-purple-200 dark:bg-purple-900 border-2 border-black p-2.5 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors duration-200 neo-shadow transform hover:-translate-y-1"
                >
                  <Image
                    className="w-6 h-6 object-contain rounded-full"
                    src={tag}
                    alt={`Tech ${index}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Desktop Profile Image - Neo-Brutalist */}
          <div className="hidden sm:block absolute right-10 top-1/2 transform -translate-y-1/2">
            <motion.div
              className="relative"
              animate={{
                scale: isHovered ? 1.05 : 1,
                rotate: isHovered ? 3 : 0,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Profile image container */}
              <div className="p-0 shadow-none border-2 border-black neo-shadow">
                <Image
                  className="w-[10rem] h-[10rem] object-cover"
                  src={imageUrl}
                  alt="Profile"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default Member;
