"use client";

import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function Tools() {
  const tools = [
    {
      title: "App Screenshot Generator",
      description: "Create App Store and Play Store Screenshots in seconds.",
      promotionText: "Faster than using Canva",
      video: "https://cdn.ifateam.dev/appscreenshot.mp4",
      link: "/mockup",
    },
    {
      title: "Link Shorter",
      description: "Shorten your links and track their performance.",
      promotionText: "Turn into powerful links",
      video: "https://cdn.ifateam.dev/link-shorter.mp4",
      link: "/shorten-link",
    },
  ];

  return (
    <section
      id="tools"
      className="flex flex-col items-center justify-center w-full max-w-5xl pb-24"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ToolCard({
  title,
  description,
  promotionText,
  video,
  image,
  link,
}: {
  title: string;
  description: string;
  promotionText: string;
  video?: string;
  image?: string;
  link: string;
}) {
  return (
    <div className="neo-card rounded-none bg-white dark:bg-[#252526]">
      {/* Video wrapper */}
      <div className="aspect-video w-full overflow-hidden relative">
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={0}
            height={0}
            className="w-full h-full object-cover"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-lg font-bold font-mono uppercase text-white">
            {title}
          </h3>

          <p className="text-sm text-white line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="p-4 flex items-center gap-4">
        <Link
          href={link}
          className="neo-button inline-flex items-center justify-center gap-2 self-start bg-[#E9945B] text-black hover:gap-3 transition-all"
        >
          Try Now <FaArrowRight className="w-3 h-3" />
        </Link>
        <span className="text-sm font-bold">{promotionText}</span>
      </div>
    </div>
  );
}
