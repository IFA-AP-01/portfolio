"use client";

import React from "react";
import { ScreenshotData } from "../types";
import { FontSelector } from "./FontSelector";
import { TextControl } from "./TextControl";
import { FONTS } from "../constants";

interface TypographyControlProps {
  data: ScreenshotData;
  onChange: (updates: Partial<ScreenshotData>) => void;
}

export const TypographyControl: React.FC<TypographyControlProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="space-y-4 pb-12">
      <h3 className="font-bold border-b-2 border-black dark:border-gray-600 pb-1 uppercase text-sm">
        Content
      </h3>

      {/* Title Card */}
      <div className="p-3 neo-card space-y-4">
        <h4 className="text-xs font-bold uppercase border-b border-gray-300 dark:border-gray-600 pb-1">
          Title Content
        </h4>
        <div>
          <textarea
            className="w-full p-2 border-2 border-black resize-none dark:border-gray-600 rounded-none bg-transparent focus:outline-none focus:bg-gray-50 dark:focus:bg-[#333] text-sm"
            rows={2}
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
              Font
            </label>
            <FontSelector
              fonts={FONTS}
              selectedFont={data.titleFontFamily}
              onChange={(value) => onChange({ titleFontFamily: value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
              Color
            </label>
            <div className="relative border-2 border-black neo-shadow h-9">
              <input
                type="color"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                value={data.titleColor}
                onChange={(e) => onChange({ titleColor: e.target.value })}
              />
              <div
                className="absolute inset-0 w-full h-full"
                style={{ backgroundColor: data.titleColor }}
              ></div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
            Alignment
          </label>
          <div className="flex gap-1">
            {["left", "center", "right"].map((align) => (
              <button
                key={align}
                onClick={() => onChange({ titleTextAlign: align as any })}
                className={`flex-1 p-1 border-2 border-black dark:border-gray-600 uppercase text-[10px] font-bold ${
                  data.titleTextAlign === align
                    ? "bg-[#E9945B] text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white dark:bg-[#333] hover:bg-gray-50"
                }`}
              >
                {align}
              </button>
            ))}
          </div>
        </div>

        <TextControl
          label="Title"
          fontSize={data.titleFontSize}
          fontWeight={data.titleFontWeight}
          fontStyle={data.titleFontStyle}
          textDecoration={data.titleTextDecoration}
          letterSpacing={data.titleLetterSpacing}
          lineHeight={data.titleLineHeight}
          textShadow={data.titleTextShadow}
          onChange={(updates) => {
            const mapped: any = {};
            if (updates.fontSize !== undefined)
              mapped.titleFontSize = updates.fontSize;
            if (updates.fontWeight !== undefined)
              mapped.titleFontWeight = updates.fontWeight;
            if (updates.fontStyle !== undefined)
              mapped.titleFontStyle = updates.fontStyle;
            if (updates.textDecoration !== undefined)
              mapped.titleTextDecoration = updates.textDecoration;
            if (updates.letterSpacing !== undefined)
              mapped.titleLetterSpacing = updates.letterSpacing;
            if (updates.lineHeight !== undefined)
              mapped.titleLineHeight = updates.lineHeight;
            if (updates.textShadow !== undefined)
              mapped.titleTextShadow = updates.textShadow;
            onChange(mapped);
          }}
        />
      </div>

      {/* Subtitle Card */}
      <div className="p-3 neo-card space-y-4">
        <h4 className="text-xs font-bold uppercase border-b border-gray-300 dark:border-gray-600 pb-1">
          Subtitle Content
        </h4>
        <div>
          <textarea
            className="w-full p-2 border-2 border-black resize-none dark:border-gray-600 rounded-none bg-transparent focus:outline-none focus:bg-gray-50 dark:focus:bg-[#333] text-sm"
            rows={2}
            value={data.subtitle}
            onChange={(e) => onChange({ subtitle: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
              Font
            </label>
            <FontSelector
              fonts={FONTS}
              selectedFont={data.subtitleFontFamily}
              onChange={(value) => onChange({ subtitleFontFamily: value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
              Color
            </label>
            <div className="relative border-2 border-black neo-shadow h-9">
              <input
                type="color"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                value={data.subtitleColor}
                onChange={(e) => onChange({ subtitleColor: e.target.value })}
              />
              <div
                className="absolute inset-0 w-full h-full"
                style={{ backgroundColor: data.subtitleColor }}
              ></div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
            Alignment
          </label>
          <div className="flex gap-1">
            {["left", "center", "right"].map((align) => (
              <button
                key={align}
                onClick={() => onChange({ subtitleTextAlign: align as any })}
                className={`flex-1 p-1 border-2 border-black dark:border-gray-600 uppercase text-[10px] font-bold ${
                  data.subtitleTextAlign === align
                    ? "bg-[#E9945B] text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white dark:bg-[#333] hover:bg-gray-50"
                }`}
              >
                {align}
              </button>
            ))}
          </div>
        </div>

        <TextControl
          label="Subtitle"
          fontSize={data.subtitleFontSize}
          fontWeight={data.subtitleFontWeight}
          fontStyle={data.subtitleFontStyle}
          textDecoration={data.subtitleTextDecoration}
          letterSpacing={data.subtitleLetterSpacing}
          lineHeight={data.subtitleLineHeight}
          textShadow={data.subtitleTextShadow}
          onChange={(updates) => {
            const mapped: any = {};
            if (updates.fontSize !== undefined)
              mapped.subtitleFontSize = updates.fontSize;
            if (updates.fontWeight !== undefined)
              mapped.subtitleFontWeight = updates.fontWeight;
            if (updates.fontStyle !== undefined)
              mapped.subtitleFontStyle = updates.fontStyle;
            if (updates.textDecoration !== undefined)
              mapped.subtitleTextDecoration = updates.textDecoration;
            if (updates.letterSpacing !== undefined)
              mapped.subtitleLetterSpacing = updates.letterSpacing;
            if (updates.lineHeight !== undefined)
              mapped.subtitleLineHeight = updates.lineHeight;
            if (updates.textShadow !== undefined)
              mapped.subtitleTextShadow = updates.textShadow;
            onChange(mapped);
          }}
        />
      </div>
    </div>
  );
};
