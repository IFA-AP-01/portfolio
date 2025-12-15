"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";

export default function SectionNavigation() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <div className="hidden lg:block z-[999]">
      {/* Navigation */}
      <nav
        className="fixed left-6 top-1/2 -translate-y-1/2"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <ul className="flex flex-col items-center justify-center gap-4 py-4">
          {links.map((link) => (
            <motion.li
              key={link.hash}
              className="relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <Link
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}
                className={clsx(
                  "relative flex h-10 w-10 items-center justify-center transition",
                  "text-black dark:text-white",
                  {
                    "text-black": activeSection === link.name,
                  }
                )}
              >
                <FontAwesomeIcon icon={link.icon} />

                {activeSection === link.name && (
                  <motion.span
                    className="absolute inset-0 -z-10 bg-[#E9945B] border border-black neo-shadow"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
