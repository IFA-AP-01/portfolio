"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { FaApple, FaGithub, FaGlobe, FaGooglePlay } from "react-icons/fa6";
import type { FeaturedProject, ProjectLink } from "@/lib/data";
import StatusBadge from "@/components/ui/status-badge";
import TechPill from "@/components/ui/tech-pill";

const spanClasses: Record<number, string> = {
  8: "md:col-span-8",
  4: "md:col-span-4",
  6: "md:col-span-6",
  12: "md:col-span-12",
};

const linkIcons: Record<ProjectLink["kind"], typeof FaGithub> = {
  github: FaGithub,
  play: FaGooglePlay,
  appstore: FaApple,
  site: FaGlobe,
};

function ProjectLinks({ links }: { links: readonly ProjectLink[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((link) => {
        const Icon = linkIcons[link.kind] ?? FaGlobe;
        return (
          <a
            key={`${link.kind}-${link.href}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <Icon aria-hidden="true" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

export default function ProjectCard({
  project,
  index,
  engaged,
  onEngage,
}: {
  project: FeaturedProject;
  index: number;
  engaged: boolean;
  onEngage: (slug: string | null) => void;
}) {
  const { title, kicker, description, tags, image, videoUrl, viewUrl, links, status, span } =
    project;
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const isEngaged = hovered || engaged;
  // Neighbours drift apart when a sibling is engaged, mirroring the split-showcase seam.
  const shift = reduceMotion ? 0 : engaged ? 10 : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ x: shift, scale: isEngaged && !reduceMotion ? 0.99 : 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 24,
        opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }}
      onMouseEnter={() => {
        setHovered(true);
        onEngage(project.slug);
      }}
      onMouseLeave={() => {
        setHovered(false);
        onEngage(null);
      }}
      onFocus={() => onEngage(project.slug)}
      onBlur={() => onEngage(null)}
      className={clsx(
        "project-card group isolate overflow-hidden",
        spanClasses[span],
        isEngaged && "z-10"
      )}
    >
      <span
        aria-hidden="true"
        className="project-seam hidden md:block"
        style={{
          opacity: engaged ? 0 : 1,
          left: index % 2 === 1 ? "auto" : "-10px",
          right: index % 2 === 1 ? "-10px" : "auto",
        }}
      />
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
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : image ? (
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
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

        {links && links.length > 0 && <ProjectLinks links={links} />}

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
