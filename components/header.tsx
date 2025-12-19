"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/theme-context";
import teamImage from "@/public/logo.webp";
import { BsMoon, BsSun } from "react-icons/bs";
import { faLink, faExchange, faBlog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Converter",
    href: "/toonify",
    icon: faExchange,
  },
  {
    name: "Link shorter",
    href: "/shorten-link",
    icon: faLink,
  },
  {
    name: "Blog",
    href: "/blog",
    icon: faBlog,
  },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = usePathname();

  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "light" ? "#faf8f1" : "#191C1E"
      );
    }
  }, [theme]);

  return (
    <header className="z-[999] relative sm:px-4">
      <nav className="sm:neo-card border-b border-black bg-white dark:bg-[#191C1E] fixed sm:top-3 inset-x-0 max-w-5xl mx-auto flex h-16 items-center">
        <ul className="flex w-full items-center justify-between gap-1 text-[0.9rem] font-medium text-gray-500 sm:gap-3 sm:flex-nowrap">
          <Link href="/" className="flex items-center justify-center px-3">
            <div className="neo-shadow border-black border-2 w-10 h-10 flex items-center justify-center bg-[#E9945B]">
              <Image
                src={teamImage}
                alt="IFA"
                width={50}
                height={50}
                priority
                className="w-10 object-contain flex"
              />
            </div>
          </Link>
          <div className="flex items-center gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                className={clsx(
                  " relative flex items-center justify-center p-2 transition hover:text-gray-950 dark:text-gray-200 dark:hover:text-gray-300",
                  {
                    "text-gray-950 dark:text-white":
                      activeSection === item.href,
                  }
                )}
                href={item.href}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <span
                  className={`sm:hidden text-black w-6 h-6 flex items-center justify-center ${
                    activeSection === item.href ? "" : "dark:text-white"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </span>

                <span
                  className={`hidden sm:inline-flex items-center gap-2 text-black ${
                    activeSection === item.href ? "" : "dark:text-white"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  {item.name}
                </span>

                {item.href === activeSection && (
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
            ))}
          </div>
          <li
            key="theme"
            className="flex items-center justify-center px-3 sm:inline-flex"
          >
            <button
              className="w-10 h-10 border-2 border-[#E9945B] text-[#E9945B] font-bold flex items-center justify-center"
              onClick={toggleTheme}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {theme === "light" ? <BsSun /> : <BsMoon />}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
