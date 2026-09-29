"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import type { FeaturedProject } from "@/lib/data";
import StatusBadge from "@/components/ui/status-badge";
import TechPill from "@/components/ui/tech-pill";

const spanClasses: Record<number, string> = {
  8: "md:col-span-8",
  4: "md:col-span-4",
  6: "md:col-span-6",
};

export default function ProjectCard({ project }: { project: FeaturedProject }) {
  const { title, kicker, description, tags, image, videoUrl, viewUrl, status, span } =
    project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={clsx("bento-card group overflow-hidden", spanClasses[span])}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-canvas">
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : image ? (
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-subtle">
              {kicker}
            </p>
            <h3 className="mt-1.5 text-[22px] font-semibold leading-snug tracking-[-0.015em] text-fg">
              {title}
            </h3>
          </div>
          <StatusBadge status={status} />
        </div>

        <p className="text-[15px] leading-relaxed text-fg-muted">{description}</p>

        <div className="flex flex-wrap items-center gap-2">
          {tags.slice(0, 4).map((tag) => (
            <TechPill key={tag}>{tag}</TechPill>
          ))}
        </div>

        {viewUrl && (
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-1.5 text-[14px] font-medium text-fg transition-colors hover:text-fg/70"
          >
            View project
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        )}
      </div>
    </motion.article>
  );
}
