"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import logo from "@/public/logo.webp";
import { navItems } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function NotchNav() {
  const [open, setOpen] = useState(false);
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const handleClick = (label: (typeof navItems)[number]["label"]) => {
    setActiveSection(label);
    setTimeOfLastClick(Date.now());
    setOpen(false);
  };

  return (
    <nav className="notch-nav" aria-label="Main navigation">
      <div className="mx-auto flex w-full max-w-notch items-center justify-between gap-3">
        <a
          href="#home"
          onClick={() => handleClick("Home")}
          className="flex shrink-0 items-center"
          aria-label="IFA Team - home"
        >
          <Image
            src={logo}
            alt="IFA"
            width={26}
            height={26}
            priority
            className="h-6 w-6 rounded-md object-contain"
          />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.label;
            return (
              <li key={item.label}>
                <a
                  href={item.hash}
                  onClick={() => handleClick(item.label)}
                  className={clsx(
                    "relative block px-3 py-1.5 text-[14px] transition-colors duration-200",
                    isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="notch-active"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-white/70"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={() => handleClick("Contact")}
            className="hidden rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-canvas transition-colors duration-200 hover:bg-fg/90 sm:inline-flex"
          >
            Hire us
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-fg md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              {open ? (
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden md:hidden"
          >
            <li className="pt-3">
              <a
                href="#home"
                onClick={() => handleClick("Home")}
                className="block py-2 text-[15px] text-fg-muted transition-colors hover:text-fg"
              >
                Home
              </a>
            </li>
            {navItems.slice(1).map((item) => (
              <li key={item.label}>
                <a
                  href={item.hash}
                  onClick={() => handleClick(item.label)}
                  className={clsx(
                    "block py-2 text-[15px] transition-colors",
                    activeSection === item.label
                      ? "text-fg"
                      : "text-fg-muted hover:text-fg"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pb-1 pt-2">
              <a
                href="#contact"
                onClick={() => handleClick("Contact")}
                className="inline-flex rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-canvas"
              >
                Hire us
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
