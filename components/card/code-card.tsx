"use client";

import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";

const CODE = `async function buildForYou() {
  const mobile = await MobileApps.create();
  const web = await WebSolutions.syncWith(mobile);
  const ai = await AIIntegration.enhance(web);
  const seo = await SEOOptimize.boost(ai);

  await Security.enforceStrictPolicies();
  await IoT.connectIfNeeded(seo);

  return Delivery.ship(seo, { quality: "🚀" });
}`;

export default function CodeCard() {
  const [displayedCode, setDisplayedCode] = React.useState("");

  // Clean up state derived from props/constants
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= CODE.length) {
        setDisplayedCode(CODE.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 30);

    return () => clearInterval(intervalId);
  }, []);

  const currentLines = displayedCode.split("\n");
  const totalLimit = CODE.split("\n").length;
  const currentLineIndex = currentLines.length - 1;

  // Pre-calculate line numbers to render
  const linesToRender = Array.from({ length: totalLimit }, (_, i) => {
    const isCurrent = i === currentLineIndex;
    const hasContent = i < currentLines.length;
    const lineContent = hasContent ? currentLines[i] : "";

    return {
      index: i,
      lineNumber: i + 1,
      content: lineContent,
      isCurrent,
      hasContent,
    };
  });

  return (
    <div className="relative w-full mx-auto">
      <div className="relative z-10">
        <div className="relative bg-black p-0 border-2 border-black neo-shadow">
          <div className="relative overflow-hidden bg-[#1e1e1e]">
            {/* Window Header */}
            <div className="flex items-center justify-between bg-[#f0f0f0] dark:bg-[#252526] px-2 sm:px-4 py-2 sm:py-3 border-b-2 border-black">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[#ff5f56] dark:bg-[#ff5f56]/80 border border-black hover:bg-[#ff5f56]/80 transition-colors cursor-pointer" />
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[#ffbd2e] dark:bg-[#ffbd2e]/80 border border-black hover:bg-[#ffbd2e]/80 transition-colors cursor-pointer" />
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[#27c93f] dark:bg-[#27c93f]/80 border border-black hover:bg-[#27c93f]/80 transition-colors cursor-pointer" />
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-white dark:bg-[#252526] border border-black px-3 py-0.5 rounded-full">
                <div className="font-mono text-[10px] sm:text-xs text-black dark:text-white font-bold truncate max-w-[120px] sm:max-w-none">
                  build-for-you.ts
                </div>
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-600 animate-pulse" />
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-white dark:bg-[#252526] py-2 sm:py-6 px-1.5 sm:px-4 font-mono text-[11px] sm:text-sm leading-6 border-b-2 border-black">
              {linesToRender.map((line) => {
                // Highlight line content safely
                let highlighted = "";
                if (line.hasContent) {
                  try {
                    highlighted = Prism.highlight(
                      line.content,
                      Prism.languages.typescript,
                      "typescript"
                    );
                  } catch (e) {
                    highlighted = line.content; // Fallback
                  }
                }

                return (
                  <div
                    key={line.index}
                    className={`flex items-start transition-colors ${
                      line.isCurrent ? "bg-yellow-100" : ""
                    }`}
                  >
                    {/* Line Number */}
                    <div className="w-6 sm:w-8 shrink-0 text-right pr-2 sm:pr-3 select-none text-gray-400 font-bold">
                      {line.lineNumber}
                    </div>

                    {/* Code Content */}
                    <div className="flex-1 min-w-0 break-all whitespace-pre-wrap font-semibold">
                      {line.hasContent ? (
                        <>
                          <span
                            className="language-typescript !text-[11px] sm:!text-sm"
                            dangerouslySetInnerHTML={{ __html: highlighted }}
                          />
                          {line.isCurrent &&
                            displayedCode.length < CODE.length && (
                              <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 bg-gray-300 animate-pulse ml-0.5 align-middle translate-y-[-2px]" />
                            )}
                        </>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between bg-[#E9945B] px-2 sm:px-4 py-1 sm:py-2 text-[9px] sm:text-xs font-mono text-black font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="hidden sm:inline">TypeScript</span>
                <span className="sm:hidden">TS</span>
                <span>UTF-8</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <span>
                  Ln {currentLineIndex + 1}, Col{" "}
                  {currentLines[currentLineIndex]?.length || 0}
                </span>
                <span className="hidden sm:inline">Spaces: 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
