"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import logo from "@/public/logo.webp";
import { navItems, siteMeta } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const handleClick = (label: (typeof navItems)[number]["label"]) => {
    setActiveSection(label);
    setTimeOfLastClick(Date.now());
    setOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-navy/15 bg-white text-navy"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 w-full max-w-shell items-center justify-between gap-6 px-4 sm:px-6">
        <a
          href="#home"
          onClick={() => handleClick("Home")}
          className="flex shrink-0 items-center gap-2.5"
          aria-label="IFA Team - home"
        >
          <Image
            src={logo}
            alt="IFA"
            width={30}
            height={30}
            priority
            className="h-7 w-7 object-contain"
          />
          <span className="font-heading text-[18px] font-medium leading-none tracking-[-0.01em]">
            {siteMeta.name}
          </span>
        </a>

        <ul className="hidden items-center gap-2 md:flex">
          {navItems.slice(1).map((item) => {
            const isActive = activeSection === item.label;
            return (
              <li key={item.label}>
                <a
                  href={item.hash}
                  onClick={() => handleClick(item.label)}
                  className="relative block px-4 py-2 text-[16px] transition-colors duration-300 ease-out hover:bg-periwinkle"
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-4 bottom-0 h-[2px] bg-indigo"
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
            className="hidden rounded-full bg-ink px-5 py-2 text-[15px] font-medium text-white transition-colors duration-300 ease-out hover:bg-indigo sm:inline-flex"
          >
            Hire us
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
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
            className="overflow-hidden border-t border-navy/10 px-4 md:hidden"
          >
            {navItems.map((item) => (
              <li key={item.label} className="border-b border-navy/10">
                <a
                  href={item.hash}
                  onClick={() => handleClick(item.label)}
                  className={clsx(
                    "block py-3 text-[16px]",
                    activeSection === item.label ? "font-semibold" : "opacity-80"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a
                href="#contact"
                onClick={() => handleClick("Contact")}
                className="btn-outline inline-flex px-5 py-1.5 text-[15px]"
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
