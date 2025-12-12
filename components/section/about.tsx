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
      className="mb-16 sm:mb-28 max-w-[50rem] leading-8 sm:leading-8 scroll-mt-28 sm:mx-[16px] flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading highlight="About">About</SectionHeading>
      {/* Mobile-Optimized About Cards */}
      <div className="mt-6 sm:mt-8 w-full max-w-4xl">
        <div className="grid gap-4 sm:gap-6 md:gap-8">
          <motion.div
            className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-white/10 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-200 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl overflow-hidden p-2">
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
                  className={`${headlineFont.className} font-semibold text-base sm:text-lg text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors`}
                >
                  5+ Years of Experience
                </h4>
                <p
                  className={`${headlineFont.className} text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed`}
                >
                  We have participated in complex business projects, projects
                  with stringent security requirements, and several IoT
                  projects.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-white/10 hover:shadow-xl transition-all duration-300"
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-200 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-xl">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl overflow-hidden p-2">
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
                  className={`${headlineFont.className} font-semibold text-base sm:text-lg text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-teal-500 dark:group-hover:text-green-300 transition-colors`}
                >
                  Collaborative Approach
                </h4>
                <p
                  className={`${headlineFont.className} text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed`}
                >
                  We have experience working with marketing and design teams to
                  optimize products for end users.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-white/10 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-200 to-red-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-xl overflow-hidden">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl overflow-hidden">
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
                  className={`${headlineFont.className} font-semibold text-base sm:text-lg text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors`}
                >
                  Innovation Focused
                </h4>
                <p
                  className={`${headlineFont.className} text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed`}
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
        className={`${headlineFont.className} font-bold mt-8 sm:mt-12 text-base sm:text-lg text-center px-2 sm:px-0`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        The technologies we used
      </motion.h3>

      {/* Mobile-Optimized Skills List */}
      <ul className="flex flex-wrap justify-center gap-2 sm:gap-2 text-lg text-gray-800 mt-3 sm:mt-4 px-2 sm:px-0">
        {skillsData.map((skill, index) => (
          <motion.li
            className="bg-white borderBlack rounded-md text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 dark:bg-white/10 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/20 transition-colors flex items-center gap-1.5 sm:gap-2"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
          >
            {/* Render the icon if it exists */}
            {skillIcons[skill] || <span className="w-4 h-4" />}
            <span className="whitespace-nowrap">{skill}</span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
