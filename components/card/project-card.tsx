"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaApple, FaGithub, FaGlobe, FaGooglePlay } from "react-icons/fa6";
import type { FeaturedProject, ProjectLink } from "@/lib/data";
import StatusBadge from "@/components/ui/status-badge";
import TechPill from "@/components/ui/tech-pill";
import { ArrowRight } from "@/components/ui/button";

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

function YouTubeMedia({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
        title={`${title} video`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title} video`}
      className="group/play absolute inset-0 flex items-center justify-center"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink shadow-[0_0_0_1px_rgba(13,15,38,0.08)] transition-colors duration-300 ease-out group-hover/play:bg-indigo group-hover/play:text-white group-focus-visible/play:bg-indigo group-focus-visible/play:text-white">
        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5" aria-hidden>
          <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
        </svg>
      </span>
    </button>
  );
}

export default function ProjectCard({ project }: { project: FeaturedProject }) {
  const {
    title,
    kicker,
    description,
    tags,
    image,
    imagePosition,
    videoUrl,
    youtubeId,
    viewUrl,
    links,
    status,
  } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div className="slab slab-interactive group flex h-full flex-col">
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b border-ink/10 bg-mist">
          {youtubeId ? (
            <YouTubeMedia id={youtubeId} title={title} />
          ) : videoUrl ? (
            <video
              src={videoUrl}
              poster={image ? image.src : undefined}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              preload="metadata"
              onContextMenu={(e) => e.preventDefault()}
              className="h-full w-full object-cover object-top"
            />
          ) : image ? (
            <Image
              src={image}
              alt={`${title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top"
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
            />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-[12px] text-ink/55">
                {kicker}
              </p>
              <h3 className="mt-2 font-heading text-[22px] font-medium leading-snug tracking-[-0.01em]">
                {title}
              </h3>
            </div>
            <StatusBadge status={status} />
          </div>

          <p className="line-clamp-3 text-[15px] leading-relaxed text-ink/70">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-ink/70">
            {tags.slice(0, 4).map((tag) => (
              <TechPill key={tag}>{tag}</TechPill>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-2">
            {links && links.length > 0 && <ProjectLinks links={links} />}

            {viewUrl && (
              <a
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 text-[15px] font-semibold text-indigo transition-colors duration-300 ease-out hover:text-ink"
              >
                View project
                <ArrowRight />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
