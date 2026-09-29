"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaApple, FaGithub, FaGlobe, FaGooglePlay } from "react-icons/fa6";
import type { FeaturedProject, ProjectLink } from "@/lib/data";
import StatusBadge from "@/components/ui/status-badge";
import TechPill from "@/components/ui/tech-pill";

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

export default function ProjectCard({ project }: { project: FeaturedProject }) {
  const { title, kicker, description, tags, image, videoUrl, viewUrl, links, status } =
    project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          "--mouse-x",
          `${e.clientX - rect.left}px`
        );
        e.currentTarget.style.setProperty(
          "--mouse-y",
          `${e.clientY - rect.top}px`
        );
      }}
      className="project-card group flex h-full flex-col"
    >
      <div className="media-wrap relative aspect-[16/10] shrink-0 overflow-hidden bg-canvas">
        {videoUrl ? (
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
            className="h-full w-full object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
          />
        ) : image ? (
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-subtle">
              {kicker}
            </p>
            <h3 className="mt-1.5 text-[20px] font-semibold leading-snug tracking-[-0.015em] text-fg">
              {title}
            </h3>
          </div>
          <StatusBadge status={status} />
        </div>

        <p className="line-clamp-3 text-[15px] leading-relaxed text-fg-muted">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-2">
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
              className="inline-flex w-fit items-center gap-1.5 text-[14px] font-medium text-fg transition-colors hover:text-fg/70"
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
      </div>
    </motion.article>
  );
}
