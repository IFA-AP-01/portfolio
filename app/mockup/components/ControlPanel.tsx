"use client";

import React from "react";
import { ScreenshotData, Template } from "../types";

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
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "screenshotImage" | "backgroundImage"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white dark:bg-[#252526] border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] rounded-none h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-2 uppercase tracking-wider">
        Controls
      </h2>

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

      <div className="space-y-4">
        <h3 className="font-bold border-b-2 border-black dark:border-gray-600 pb-1 uppercase text-sm">
          Assets
        </h3>
        <div>
          <label className="block text-xs font-bold mb-1 uppercase">
            App Screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-xs font-bold file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-xs file:font-bold file:bg-[#E9945B] hover:file:bg-[#d8844b] cursor-pointer"
            onChange={(e) => handleFileChange(e, "screenshotImage")}
          />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1 uppercase">
            Background Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-xs font-bold file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-xs file:font-bold file:bg-[#E9945B] hover:file:bg-[#d8844b] cursor-pointer"
            onChange={(e) => handleFileChange(e, "backgroundImage")}
          />
        </div>
      </div>
    </div>
  );
};
