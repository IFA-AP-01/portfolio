import React from "react";

interface TokenStatsProps {
  tokensSaved: number;
  jsonTokens: number;
  toonTokens: number;
}

export function TokenStats({
  tokensSaved,
  jsonTokens,
  toonTokens,
}: TokenStatsProps) {
  return (
    <div className="mt-8 w-full max-w-6xl">
      <div className="bg-white dark:bg-[#252526] p-6 neo-border neo-shadow">
        <h3 className="text-xl font-bold mb-4 uppercase">
          Token Efficiency (LLM)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              JSON Tokens
            </span>
            <span className="text-2xl font-bold">{jsonTokens}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              TOON Tokens
            </span>
            <span className="text-2xl font-bold">{toonTokens}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Tokens Saved
            </span>
            <span
              className={`text-2xl font-bold ${tokensSaved > 0 ? "text-green-600 dark:text-green-400" : "text-gray-600"}`}
            >
              {tokensSaved} (
              {jsonTokens > 0
                ? Math.round((tokensSaved / jsonTokens) * 100)
                : 0}
              %)
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          *Estimated using char/4. TOON is designed to reduce token usage for
          LLM prompts.
        </p>
      </div>
    </div>
  );
}
