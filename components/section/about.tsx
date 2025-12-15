"use client";

import React from "react";
import SectionHeading from "../section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { skillsData } from "@/lib/data";
import {
  SiAndroid,
  SiApple,
  SiKotlin,
  SiSwift,
  SiFlutter,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiSupabase,
  SiFirebase,
  SiGraphql,
  SiRedux,
  SiPython,
  SiDjango,
  SiWordpress,
  SiWoocommerce,
  SiVercel,
  SiSpring,
  SiNestjs,
} from "react-icons/si";
import { headlineFont } from "@/lib/fontawesome";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CodeCard from "../card/code-card";

const skillIcons: { [key: string]: JSX.Element } = {
  Android: <SiAndroid />,
  iOS: <SiApple />,
  KMP: <SiKotlin />,
  Spring: <SiSpring />,
  NestJs: <SiNestjs />,
  Kotlin: <SiKotlin />,
  Swift: <SiSwift />,
  Flutter: <SiFlutter />,
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  React: <SiReact />,
  "Next.js": <SiNextdotjs />,
  Vue: <SiVuedotjs />,
  "Node.js": <SiNodedotjs />,
  Express: <SiExpress />,
  MongoDB: <SiMongodb />,
  MySQL: <SiMysql />,
  Supabase: <SiSupabase />,
  Firebase: <SiFirebase />,
  GraphQL: <SiGraphql />,
  Redux: <SiRedux />,
  Python: <SiPython />,
  Django: <SiDjango />,
  WordPress: <SiWordpress />,
  WooCommerce: <SiWoocommerce />,
  Vercel: <SiVercel />,
};

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.8,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.05 * index,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  }),
};

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-16 sm:mb-28 max-w-4xl leading-8 sm:leading-8 scroll-mt-28 sm:mx-[16px] flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About</SectionHeading>
      {/* Mobile-Optimized About Cards */}
      <div className="mt-6 sm:mt-8 w-full max-w-4xl">
        <div className="grid gap-6 sm:gap-8 md:gap-10">
          <motion.div
            className="group p-4 sm:p-6 bg-pink-100 dark:bg-pink-900/20 neo-card neo-hover transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-pink-300 flex items-center justify-center text-white text-xl font-bold neo-shadow border-2 border-black">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 overflow-hidden p-2">
                  <DotLottieReact
                    src="coder.lottie"
                    loop
                    autoplay
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`${headlineFont.className} font-black text-lg sm:text-xl text-black dark:text-white mb-1 sm:mb-2 uppercase tracking-wide`}
                >
                  5+ Years of Experience
                </h4>
                <p
                  className={`${headlineFont.className} text-sm sm:text-base text-gray-900 dark:text-gray-100 leading-relaxed font-medium`}
                >
                  We have participated in complex business projects, projects
                  with stringent security requirements, and several IoT
                  projects.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="group p-4 sm:p-6 bg-green-100 dark:bg-green-900/20 neo-card neo-hover transition-all duration-300"
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-300 flex items-center justify-center text-white text-xl neo-shadow border-2 border-black">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 overflow-hidden p-2">
                  <DotLottieReact
                    src="handshake.lottie"
                    loop
                    autoplay
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`${headlineFont.className} font-black text-lg sm:text-xl text-black dark:text-white mb-1 sm:mb-2 uppercase tracking-wide`}
                >
                  Collaborative Approach
                </h4>
                <p
                  className={`${headlineFont.className} text-sm sm:text-base text-gray-900 dark:text-gray-100 leading-relaxed font-medium`}
                >
                  We have experience working with marketing and design teams to
                  optimize products for end users.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="group p-4 sm:p-6 bg-blue-100 dark:bg-blue-900/20 neo-card neo-hover transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-300 flex items-center justify-center text-white text-xl overflow-hidden neo-shadow border-2 border-black">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 overflow-hidden">
                  <DotLottieReact
                    src="spaceship.lottie"
                    loop
                    autoplay
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`${headlineFont.className} font-black text-lg sm:text-xl text-black dark:text-white mb-1 sm:mb-2 uppercase tracking-wide`}
                >
                  Innovation Focused
                </h4>
                <p
                  className={`${headlineFont.className} text-sm sm:text-base text-gray-900 dark:text-gray-100 leading-relaxed font-medium`}
                >
                  Passionate about exploring and catching up with new technology
                  trends, and always experimenting with personal projects.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.h3
        className={`${headlineFont.className} font-black mt-12 sm:mt-16 text-lg sm:text-xl text-center px-2 sm:px-0 uppercase`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        The technologies we used
      </motion.h3>

      {/* Mobile-Optimized Skills List */}
      <ul className="flex flex-wrap justify-center gap-3 sm:gap-4 text-base text-gray-800 mt-6 sm:mt-8 px-2 sm:px-0">
        {skillsData.map((skill, index) => (
          <motion.li
            className="bg-white border-2 border-black text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2 dark:bg-white/10 dark:text-white hover:bg-[#E9945B] dark:hover:bg-[#E9945B] transition-all neo-shadow flex items-center gap-2 transform hover:-translate-y-1 font-bold hover:text-white"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
          >
            {/* Render the icon if it exists */}
            {skillIcons[skill] || <span className="w-4 h-4" />}
            <span className="whitespace-nowrap uppercase tracking-wide">
              {skill}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
