"use client";

import { useTheme } from "@/context/theme-context";
import React, { useEffect } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

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
    <button
      className="sm:hidden fixed right-5 bottom-5 bg-white w-10 h-10 border-2 border-black flex items-center justify-center dark:bg-black dark:border-white z-50 text-black dark:text-white"
      onClick={toggleTheme}
      style={{ WebkitTapHighlightColor: "transparent" }}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <BsSun className="text-xl" />
      ) : (
        <BsMoon className="text-xl" />
      )}
    </button>
  );
}
