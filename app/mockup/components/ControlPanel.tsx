"use client";

import React, { useState } from "react";
import { ScreenshotData, Template } from "../types";
import { AssetUploader } from "./AssetUploader";
import { TextControl } from "./TextControl";
import { FontSelector } from "./FontSelector";
import Checkbox from "@/components/common/check-box";
import { BsAndroid2, BsApple } from "react-icons/bs";

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

  const [activeTab, setActiveTab] = useState<"ios" | "android">("ios");

  const filteredTemplates = templates.filter((t) => t.platform === activeTab);

  return (
    <div className="flex flex-col gap-6 h-full mb-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black dark:border-gray-600 pb-1">
          <h3 className="font-bold uppercase text-sm">Device</h3>
          <div className="flex border-2 rounded-full border-black neo-shadow overflow-hidden">
            <button
              onClick={() => setActiveTab("ios")}
              className={`flex flex-row items-center px-4 py-1 text-xs font-bold transition-colors
              ${
                activeTab === "ios"
                  ? "bg-[#E9945B] text-black"
                  : "bg-transparent text-gray-400"
              }`}
            >
              <BsApple /> <span className="ml-2">iOS</span>
            </button>

            <button
              onClick={() => setActiveTab("android")}
              className={`flex flex-row items-center px-4 py-1 text-xs font-bold transition-colors border-l-2 border-black
              ${
                activeTab === "android"
                  ? "bg-[#E9945B] text-black"
                  : "bg-transparent text-gray-400"
              }`}
            >
              <BsAndroid2 /> <span className="ml-2">Android</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-xs items-center">
        <Checkbox
          checked={data.showNotch}
          onChange={(checked) => onChange({ showNotch: checked })}
        />
        <span>Show {activeTab === "ios" ? "Dynamic Island" : "Camera"}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {filteredTemplates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelectTemplate(t.id)}
            className={`p-2 text-xs neo-shadow font-bold border-2 border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
              selectedTemplateId === t.id
                ? "bg-[#E9945B]"
                : "bg-white dark:bg-[#333] hover:bg-gray-50"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-bold border-b-2 border-black dark:border-gray-600 pb-1 uppercase text-sm">
          Layout
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "text-top", label: "Text Top" },
            { id: "text-bottom", label: "Text Bottom" },
            { id: "phone-left", label: "Phone Left" },
            { id: "phone-right", label: "Phone Right" },
          ].map((layout) => (
            <button
              key={layout.id}
              onClick={() => onChange({ layout: layout.id as any })}
              className={`p-2 text-xs neo-shadow font-bold border-2 border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase ${
                data.layout === layout.id
                  ? "bg-[#E9945B]"
                  : "bg-white dark:bg-[#333] hover:bg-gray-50"
              }`}
            >
              {layout.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
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
                fonts={fonts}
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
                fonts={fonts}
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

      <div className="space-y-4">
        <h3 className="font-bold border-b-2 border-black dark:border-gray-600 pb-1 uppercase text-sm">
          Style
        </h3>
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
        <div className="flex gap-4 w-full flex-col md:flex-row">
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
    </div>
  );
};
