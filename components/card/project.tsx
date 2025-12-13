"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { headlineFont } from "@/lib/fontawesome";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  timeline,
  description,
  tags,
  imageUrl,
  videoUrl,
  viewUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-12 last:mb-0"
    >
      <section className="neo-card neo-hover max-w-[60rem] overflow-hidden relative transition">
        <div className="flex flex-col sm:flex-row">
          {/* Mobile Image/Video */}
          {videoUrl ? (
            <div className="sm:hidden w-full h-48 border-b-2 border-black dark:border-white relative">
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover object-top"
                controls={false}
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          ) : (
            <div className="w-full h-48 sm:hidden relative border-b-2 border-black dark:border-white">
              <Image
                src={imageUrl}
                alt="Project I worked on"
                quality={95}
                className="object-cover object-top w-full h-full"
                fill
              />
            </div>
          )}

          {/* Content */}
          <div className="pt-6 pb-8 px-6 sm:pl-10 sm:pr-4 sm:pt-10 flex flex-col sm:w-1/2 z-10 relative">
            <h3
              className={`${headlineFont.className} text-2xl sm:text-3xl font-black text-black dark:text-white uppercase tracking-tight`}
            >
              {title}
            </h3>

            <p className="font-bold mt-2 leading-relaxed text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider border-l-4 border-black dark:border-white pl-3">
              {timeline}
            </p>

            <p className="mt-4 leading-relaxed text-gray-900 dark:text-gray-100 text-sm sm:text-base font-medium">
              {description}
            </p>

            {viewUrl && (
              <div className="mt-6">
                <a
                  href={viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-button inline-flex items-center gap-2 text-sm bg-[#E9945B] hover:bg-[#d6854f] transform active:translate-y-1 active:shadow-none"
                >
                  <span className="uppercase tracking-wider">Explore</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 stroke-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            )}

            <ul className="flex flex-wrap mt-6 gap-2">
              {tags.map((tag, index) => (
                <li
                  className="bg-[#E9945B] text-black px-3 py-1 text-[11px] uppercase tracking-wider font-bold border border-black"
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Image/Video */}
          <div className="hidden sm:block sm:w-1/2 relative overflow-hidden">
            {videoUrl ? (
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                controls={false}
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : (
              <Image
                src={imageUrl}
                alt="Project I worked on"
                quality={95}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                fill
              />
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
