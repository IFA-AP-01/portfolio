"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
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
  const onHome = usePathname() === "/";

  const handleClick = (label: (typeof navItems)[number]["label"]) => {
    setActiveSection(label);
    setTimeOfLastClick(Date.now());
    setOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 px-4 pt-3 text-ink sm:px-6"
      aria-label="Main navigation"
    >
      <div className="mx-auto w-full max-w-[880px] rounded-[18px] bg-surface/90 backdrop-blur-[10px]">
        <div className="flex h-14 items-center justify-between gap-6 pl-4 pr-2">
          <a
            href="/#home"
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
            <span className="font-heading text-[16px] font-semibold leading-none tracking-[-0.02em]">
              {siteMeta.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.slice(1).map((item) => {
              const isActive = onHome && activeSection === item.label;
              return (
                <li key={item.label}>
                  <a
                    href={`/${item.hash}`}
                    onClick={() => handleClick(item.label)}
                    className={clsx(
                      "relative block rounded-lg px-3 py-1.5 text-[14px] font-medium transition-colors duration-150 ease-out hover:text-ink",
                      isActive
                        ? "text-ink"
                        : "text-ink/60 hover:bg-canvas",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-canvas"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="/#contact"
              onClick={() => handleClick("Contact")}
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Hire us
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-[9px] transition-colors duration-150 hover:bg-canvas md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                {open ? (
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M2 4.5h12M2 8h12M2 11.5h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
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
              className="overflow-hidden px-2 md:hidden"
            >
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={`/${item.hash}`}
                    onClick={() => handleClick(item.label)}
                    className={clsx(
                      "block rounded-[10px] px-3 py-2.5 text-[15px] font-medium transition-colors duration-150 hover:bg-canvas",
                      onHome && activeSection === item.label
                        ? "bg-canvas text-ink"
                        : "text-ink-muted",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="px-1 pb-3 pt-2">
                <a
                  href="/#contact"
                  onClick={() => handleClick("Contact")}
                  className="btn btn-primary btn-sm"
                >
                  Hire us
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
