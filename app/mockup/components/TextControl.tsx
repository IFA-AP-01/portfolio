"use client";

import Checkbox from "@/components/common/check-box";
import React from "react";

export interface TextControlProps {
  label: string;
  fontSize: number;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  letterSpacing: number;
  lineHeight: number;
  textShadow: boolean;
  onChange: (updates: {
    fontSize?: number;
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
    letterSpacing?: number;
    lineHeight?: number;
    textShadow?: boolean;
  }) => void;
}

export const TextControl: React.FC<TextControlProps> = ({
  label,
  fontSize,
  fontWeight,
  fontStyle,
  textDecoration,
  letterSpacing,
  lineHeight,
  textShadow,
  onChange,
}) => {
  return (
    <div className="space-y-3 p-3 neo-card">
      <h4 className="text-xs font-bold uppercase border-b border-gray-300 dark:border-gray-600 pb-1 mb-2">
        {label} Style
      </h4>

      {/* Font Size */}
      <div>
        <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
          Size (px)
        </label>
        <input
          type="number"
          className="w-full p-1 border border-black dark:border-gray-600 rounded-none bg-white dark:bg-[#252526] text-xs"
          value={fontSize}
          onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
        />
      </div>

      {/* Format Toggles */}
      <div>
        <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
          Format
        </label>
        <div className="flex gap-1">
          <button
            onClick={() =>
              onChange({
                fontWeight: fontWeight === "bold" ? "normal" : "bold",
              })
            }
            className={`flex-1 p-2 border border-black dark:border-gray-600 text-xs font-bold ${
              fontWeight === "bold"
                ? "bg-[#E9945B] text-white"
                : "bg-white dark:bg-[#252526]"
            }`}
            title="Bold"
          >
            B
          </button>
          <button
            onClick={() =>
              onChange({
                fontStyle: fontStyle === "italic" ? "normal" : "italic",
              })
            }
            className={`flex-1 p-2 border border-black dark:border-gray-600 text-xs italic ${
              fontStyle === "italic"
                ? "bg-[#E9945B] text-white"
                : "bg-white dark:bg-[#252526]"
            }`}
            title="Italic"
          >
            I
          </button>
          <button
            onClick={() =>
              onChange({
                textDecoration:
                  textDecoration === "underline" ? "none" : "underline",
              })
            }
            className={`flex-1 p-2 border border-black dark:border-gray-600 text-xs underline ${
              textDecoration === "underline"
                ? "bg-[#E9945B] text-white"
                : "bg-white dark:bg-[#252526]"
            }`}
            title="Underline"
          >
            U
          </button>
        </div>
      </div>

      {/* Spacing */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500 flex justify-between">
            <span>Letter Spacing</span>
            <span>{letterSpacing}</span>
          </label>
          <input
            type="range"
            min="-0.1"
            max="0.5"
            step="0.01"
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E9945B]"
            value={letterSpacing}
            onChange={(e) =>
              onChange({ letterSpacing: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500 flex justify-between">
            <span>Line Height</span>
            <span>{lineHeight}</span>
          </label>
          <input
            type="range"
            min="0.8"
            max="2.5"
            step="0.1"
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E9945B]"
            value={lineHeight}
            onChange={(e) => onChange({ lineHeight: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Effects */}
      <div>
        <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
          Effects
        </label>
        <div className="flex gap-2 text-xs items-center">
          <Checkbox
            checked={textShadow}
            onChange={(checked) => onChange({ textShadow: checked })}
          />
          <span
            className="cursor-pointer"
            onClick={() => onChange({ textShadow: !textShadow })}
          >
            Shadow
          </span>
        </div>
      </div>
    </div>
  );
};
