"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/theme-context";

export default function Comment({ url }: { url?: string }) {
  const { theme } = useTheme();
  const isLoaded = useRef(false);

  useEffect(() => {
    // If FB SDK is already loaded, parse the XFBML to render comments
    // This handles theme changes and dynamic URL updates
    // @ts-ignore
    if (window.FB) {
      // @ts-ignore
      window.FB.XFBML.parse();
    }

    if (isLoaded.current) return;

    const script = document.createElement("script");
    script.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.nonce = "xyz"; // Optional nonce
    document.body.appendChild(script);

    isLoaded.current = true;
  }, [theme, url]); // Re-run when theme or URL changes

  return (
    <div className="w-full mt-10 p-6 neo-card bg-white dark:bg-[#1E1E1E]">
      <h3 className="text-2xl font-black mb-6 dark:text-white">Comments</h3>
      <div id="fb-root"></div>
      <div
        key={theme} // Force re-mount on theme change ensures clean render
        className="fb-comments"
        data-href={
          url || (typeof window !== "undefined" ? window.location.href : "")
        }
        data-width="100%"
        data-numposts="5"
        data-colorscheme={theme}
      ></div>
    </div>
  );
}
