"use client";

import React from "react";
import { ScreenshotData, Template } from "../types";
import { AssetUploader } from "./AssetUploader";
import { TextControl } from "./TextControl";
import { FontSelector } from "./FontSelector";

interface ControlPanelProps {
  data: ScreenshotData;
  onChange: (data: Partial<ScreenshotData>) => void;
  templates: Template[];
  onSelectTemplate: (templateId: string) => void;
  selectedTemplateId: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  data,
  onChange,
  templates,
  onSelectTemplate,
  selectedTemplateId,
}) => {
  const fonts = [
    { name: "Inter", value: "Inter, sans-serif" },
    { name: "Roboto", value: "'Roboto', sans-serif" },
    { name: "Open Sans", value: "'Open Sans', sans-serif" },
    { name: "Lato", value: "'Lato', sans-serif" },
    { name: "Montserrat", value: "'Montserrat', sans-serif" },
    { name: "Oswald", value: "'Oswald', sans-serif" },
    { name: "Raleway", value: "'Raleway', sans-serif" },
    { name: "Poppins", value: "'Poppins', sans-serif" },
    { name: "Noto Sans", value: "'Noto Sans', sans-serif" },
    { name: "Source Sans 3", value: "'Source Sans 3', sans-serif" },
    { name: "Merriweather", value: "'Merriweather', serif" },
    { name: "Roboto Mono", value: "'Roboto Mono', monospace" },
    { name: "Playfair Display", value: "'Playfair Display', serif" },
    { name: "Ubuntu", value: "'Ubuntu', sans-serif" },
    { name: "Mulish", value: "'Mulish', sans-serif" },
    { name: "Lora", value: "'Lora', serif" },
    { name: "Work Sans", value: "'Work Sans', sans-serif" },
    { name: "Nunito", value: "'Nunito', sans-serif" },
    { name: "Titillium Web", value: "'Titillium Web', sans-serif" },
    { name: "Quicksand", value: "'Quicksand', sans-serif" },
    { name: "Inconsolata", value: "'Inconsolata', monospace" },
  ];

  return (
    <div className="flex flex-col gap-6 h-full mb-6">
      <div className="space-y-4">
        <h3 className="font-bold border-b-2 border-black dark:border-gray-600 pb-1 uppercase text-sm">
          Template
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTemplate(t.id)}
              className={`p-2 text-xs font-bold border-2 border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                selectedTemplateId === t.id
                  ? "bg-[#E9945B] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]"
                  : "bg-white dark:bg-[#333] hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold border-b-2 border-black dark:border-gray-600 pb-1 uppercase text-sm">
          Content
        </h3>
        <div>
          <label className="block text-xs font-bold mb-1 uppercase">
            Title
          </label>
          <textarea
            className="w-full p-2 border-2 border-black dark:border-gray-600 rounded-none bg-transparent focus:outline-none focus:bg-gray-50 dark:focus:bg-[#333]"
            rows={2}
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1 uppercase">
            Subtitle
          </label>
          <textarea
            className="w-full p-2 border-2 border-black dark:border-gray-600 rounded-none bg-transparent focus:outline-none focus:bg-gray-50 dark:focus:bg-[#333]"
            rows={2}
            value={data.subtitle}
            onChange={(e) => onChange({ subtitle: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold border-b-2 border-black dark:border-gray-600 pb-1 uppercase text-sm">
          Typography
        </h3>

        {/* Font Family & Alignment */}
        <div className="space-y-3">
          <div>
            <FontSelector
              fonts={fonts}
              selectedFont={data.fontFamily}
              onChange={(value) => onChange({ fontFamily: value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 uppercase">
              Alignment
            </label>
            <div className="flex gap-2">
              {["left", "center", "right"].map((align) => (
                <button
                  key={align}
                  onClick={() => onChange({ textAlign: align as any })}
                  className={`flex-1 p-2 border-2 border-black dark:border-gray-600 uppercase text-xs font-bold ${
                    data.textAlign === align
                      ? "bg-[#E9945B] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
                      : "bg-white dark:bg-[#333] hover:bg-gray-50"
                  }`}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Controls */}
        <div className="space-y-4 pt-2">
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
              // Map generic updates to specific title fields
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
              // Map generic updates to specific subtitle fields
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

      <div className="space-y-4">
        <h3 className="font-bold border-b-2 border-black dark:border-gray-600 pb-1 uppercase text-sm">
          Style
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold mb-1 uppercase">
              Title Color
            </label>
            <div className="relative border-2 border-black dark:border-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] h-10">
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
          <div>
            <label className="block text-xs font-bold mb-1 uppercase">
              Subtitle Color
            </label>
            <div className="relative border-2 border-black dark:border-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] h-10">
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
          <label className="block text-xs font-bold mb-1 uppercase">
            Background
          </label>
          <div className="relative border-2 border-black dark:border-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] h-10">
            <input
              type="color"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
              value={data.backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
            />
            <div
              className="absolute inset-0 w-full h-full"
              style={{ backgroundColor: data.backgroundColor }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pb-6">
        <h3 className="font-bold border-b-2 border-black dark:border-gray-600 pb-1 uppercase text-sm">
          Assets
        </h3>
        <AssetUploader
          label="App Screenshot"
          imageSrc={data.screenshotImage}
          onImageChange={(img) => onChange({ screenshotImage: img })}
          onRemove={() => onChange({ screenshotImage: undefined })}
        />
        <AssetUploader
          label="Background Image"
          imageSrc={data.backgroundImage}
          onImageChange={(img) => onChange({ backgroundImage: img })}
          onRemove={() => onChange({ backgroundImage: undefined })}
        />
      </div>
    </div>
  );
};
