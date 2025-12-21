"use client";

import React, { useState } from "react";
import { ScreenshotData, Template, Platform } from "../types";
import { BsAndroid2, BsApple } from "react-icons/bs";
import Checkbox from "@/components/common/check-box";

interface DeviceControlProps {
  data: ScreenshotData;
  onChange: (updates: Partial<ScreenshotData>) => void;
  templates: Template[];
  onSelectTemplate: (templateId: string) => void;
  selectedTemplateId: string;
}

export const DeviceControl: React.FC<DeviceControlProps> = ({
  data,
  onChange,
  templates,
  onSelectTemplate,
  selectedTemplateId,
}) => {
  const [platform, setPlatform] = useState<Platform>("ios");
  const filteredTemplates = templates.filter((t) => t.platform === platform);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b-2 border-black dark:border-gray-600 pb-1">
        <h3 className="font-bold uppercase text-sm">Device</h3>
        <div className="flex border-2 rounded-full border-black neo-shadow overflow-hidden">
          <button
            onClick={() => setPlatform("ios")}
            className={`flex flex-row items-center px-4 py-1 text-xs font-bold transition-colors uppercase ${
              platform === "ios"
                ? "bg-[#E9945B] text-black"
                : "bg-white dark:bg-[#333] text-gray-400"
            }`}
          >
            <BsApple className="mr-2" /> iOS
          </button>
          <button
            onClick={() => setPlatform("android")}
            className={`flex flex-row items-center px-4 py-1 text-xs font-bold transition-colors border-l-2 border-black uppercase ${
              platform === "android"
                ? "bg-[#E9945B] text-black"
                : "bg-white dark:bg-[#333] text-gray-400"
            }`}
          >
            <BsAndroid2 className="mr-2" /> Android
          </button>
        </div>
      </div>

      <div className="flex gap-2 text-xs items-center">
        <Checkbox
          checked={data.showNotch}
          onChange={(checked) => onChange({ showNotch: checked })}
        />
        <span>Show {platform === "ios" ? "Dynamic Island" : "Camera"}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`p-2 text-xs neo-shadow font-bold border-2 border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase
              ${
                selectedTemplateId === template.id
                  ? "bg-[#E9945B] text-black"
                  : "bg-white dark:bg-[#333] hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
};
