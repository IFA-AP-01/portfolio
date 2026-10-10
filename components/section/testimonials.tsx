"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { testimonials, type Testimonial } from "@/lib/data";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/section-heading";
import { useSectionInView } from "@/lib/hooks";

// Entries without a quote yet show as a dashed slot in dev, hidden in prod.
const showPlaceholders = process.env.NODE_ENV !== "production";
const items = testimonials.filter((t) => t.quote || showPlaceholders);

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M10 4 7.2 12H10.6v8H1.5v-7.6L5.2 4H10Zm11.9 0L19 12h3.5v8h-9.1v-7.6L17.1 4h4.8Z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-accent-orange" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          className={clsx("h-3.5 w-3.5", i >= rating && "opacity-25")}
          aria-hidden
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L10 14.9l-5.25 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
        </svg>
      ))}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function TestimonialCard({ item, decorative }: { item: Testimonial; decorative?: boolean }) {
  const missing = !item.quote;

  return (
    <article
      className={clsx(
        "slab flex h-full flex-col gap-8 p-6 text-white xl:p-8",
        missing ? "bg-transparent outline-dashed outline-1 outline-white/30" : "bg-[#1b1e45]"
      )}
    >
      <blockquote className="flex flex-col items-start gap-4 text-[16px] leading-[1.6]">
        <QuoteMark className="h-7 w-7 text-accent-blue" />
        {missing ? (
          <span className="text-white/45">
            Quote missing — add it to <code>testimonials</code> in lib/data.ts.
          </span>
        ) : (
          <span>{item.quote}</span>
        )}
      </blockquote>

      <figure className="mt-auto flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-blue font-heading text-[15px] font-medium text-ink"
          aria-hidden
        >
          {initials(item.author)}
        </span>
        <figcaption className="flex min-w-0 flex-col gap-1">
          <strong className="text-[14px] font-medium">{item.author}</strong>
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-white/60">
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={decorative ? -1 : undefined}
                className="underline decoration-white/25 underline-offset-4 transition-colors duration-300 ease-out hover:text-white hover:decoration-white"
              >
                {item.role}
              </a>
            ) : (
              item.role
            )}
            {item.rating && <Stars rating={item.rating} />}
          </span>
        </figcaption>
      </figure>

      <span className="tech-pill w-fit text-white/70">{item.project}</span>
    </article>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="btn-outline flex h-11 w-11 items-center justify-center"
    >
      {children}
    </button>
  );
}

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx("h-4 w-4", direction === "prev" ? "-rotate-90" : "rotate-90")}
      aria-hidden
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

// Auto-scroll speed in px per second — slow enough to read while it moves.
const SPEED = 28;
// The list is rendered several times so the loop can wrap seamlessly.
const COPIES = 3;

export default function Testimonials() {
  const { ref } = useSectionInView("Reviews", 0.3);
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const hovering = useRef(false);
  const holdUntil = useRef(0);
  const pos = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);

  /** Slide offsets relative to the first slide, and the width of one copy. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return null;
    const slides = Array.from(track.children) as HTMLElement[];
    const origin = slides[0]?.offsetLeft ?? 0;
    const offsets = slides.map((slide) => slide.offsetLeft - origin);
    return { track, offsets, period: offsets[items.length] ?? 0 };
  }, []);

  const updateActive = useCallback(() => {
    const m = measure();
    if (!m) return;
    const left = m.track.scrollLeft;
    let nearest = 0;
    m.offsets.forEach((offset, i) => {
      if (Math.abs(offset - left) < Math.abs(m.offsets[nearest] - left)) nearest = i;
    });
    setActive(nearest % items.length);
  }, [measure]);

  useEffect(() => {
    if (paused) return;
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      const m = measure();
      if (m && m.period > 0) {
        const { track, period } = m;
        // The user scrolled (wheel, swipe, buttons): continue from there.
        if (Math.abs(track.scrollLeft - pos.current) > 2) pos.current = track.scrollLeft;
        if (!hovering.current && now >= holdUntil.current) {
          pos.current += SPEED * dt;
          if (pos.current >= period) pos.current -= period;
          track.scrollLeft = pos.current;
        } else if (track.scrollLeft >= period * (COPIES - 1)) {
          pos.current = track.scrollLeft - period;
          track.scrollLeft = pos.current;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, measure]);

  const hold = (ms: number) => {
    holdUntil.current = performance.now() + ms;
  };

  const scrollToOffset = (left: number) => {
    const track = trackRef.current;
    if (!track) return;
    hold(1500);
    track.scrollTo({ left, behavior: "smooth" });
  };

  const step = (dir: 1 | -1) => {
    const m = measure();
    if (!m) return;
    const { track, offsets, period } = m;
    let left = track.scrollLeft;
    // Jump to an identical copy first so there is always room to move.
    if (dir === -1 && left < offsets[1]) {
      left += period;
      track.scrollLeft = left;
      pos.current = left;
    }
    const target =
      dir === 1
        ? offsets.find((o) => o > left + 4)
        : [...offsets].reverse().find((o) => o < left - 4);
    if (target !== undefined) scrollToOffset(target);
  };

  const goTo = (index: number) => {
    const m = measure();
    if (!m) return;
    const copy = Math.floor(m.track.scrollLeft / (m.period || 1));
    scrollToOffset(m.offsets[copy * items.length + index] ?? m.offsets[index]);
  };

  if (items.length === 0) return null;

  const loop = Array.from({ length: COPIES }, (_, copy) =>
    items.map((item) => ({ item, copy }))
  ).flat();

  return (
    <Section
      tone="ink"
      id="reviews"
      ref={ref}
      className="overflow-hidden py-section [--slab-side:#2a2e63] [--slab-bottom:#363b7a]"
    >
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionHeading eyebrow="Reviews">What clients and users say</SectionHeading>
            <p className="mt-5 text-[16px] leading-relaxed text-white/70">
              From teams we build for to people who use our apps every day.
            </p>
          </div>
          <div className="flex gap-3">
            <CarouselButton label="Previous review" onClick={() => step(-1)}>
              <Arrow direction="prev" />
            </CarouselButton>
            <CarouselButton
              label={paused ? "Play reviews" : "Pause reviews"}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4" aria-hidden>
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              )}
            </CarouselButton>
            <CarouselButton label="Next review" onClick={() => step(1)}>
              <Arrow direction="next" />
            </CarouselButton>
          </div>
        </div>

        <ul
          ref={trackRef}
          onScroll={updateActive}
          onMouseEnter={() => (hovering.current = true)}
          onMouseLeave={() => (hovering.current = false)}
          onFocus={() => (hovering.current = true)}
          onBlur={() => (hovering.current = false)}
          onPointerDown={() => hold(3000)}
          onTouchMove={() => hold(3000)}
          onWheel={() => hold(1500)}
          className="relative -mx-4 mt-14 flex gap-6 overflow-x-auto px-4 pb-[10px] pr-[14px] [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:gap-8 [&::-webkit-scrollbar]:hidden"
          aria-label="Reviews"
        >
          {loop.map(({ item, copy }) => (
            <li
              key={`${copy}-${item.id}`}
              aria-hidden={copy > 0 || undefined}
              className="w-[85%] shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)]"
            >
              <TestimonialCard item={item} decorative={copy > 0} />
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === active}
              className={clsx(
                "h-2 w-2 rounded-full transition-colors duration-300 ease-out",
                i === active ? "bg-white" : "bg-white/25 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
