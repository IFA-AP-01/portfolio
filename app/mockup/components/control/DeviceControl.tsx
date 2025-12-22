"use client";

import React, { useState } from "react";
import { ScreenshotData, Template, Platform } from "@/lib/types";
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
      <div className="flex items-end justify-between border-b-2 border-black dark:border-gray-600 pb-1">
        <h3 className="font-bold uppercase text-sm">Device</h3>
        <div className="flex border-2 border-black neo-shadow overflow-hidden">
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

      <div className="flex flex-col gap-3 pt-4 border-t-2 border-black dark:border-gray-600">
        <h3 className="font-bold uppercase text-sm">Dimensions</h3>
        <div className="flex flex-row flex-wrap gap-2">
          {(() => {
            const getDimensionType = () => {
              if (!data.dimensions) return "default";
              const { width, height } = data.dimensions;
              if (width === 2064 && height === 2752) return "tablet";
              if (width === 1080 && height === 1920) return "portrait";
              if (width === 1920 && height === 1080) return "landscape";
              return "custom";
            };

            const currentType = getDimensionType();

            const DIMENSION_OPTIONS = [
              { label: "Default", value: "default" },
              { label: "Tablet", value: "tablet" },
              { label: "9:16", value: "portrait" },
              { label: "16:9", value: "landscape" },
              { label: "Custom", value: "custom" },
            ] as const;

            return DIMENSION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  switch (opt.value) {
                    case "default":
                      onChange({ dimensions: undefined });
                      break;
                    case "tablet":
                      onChange({ dimensions: { width: 2064, height: 2752 } });
                      break;
                    case "portrait":
                      onChange({ dimensions: { width: 1080, height: 1920 } });
                      break;
                    case "landscape":
                      onChange({ dimensions: { width: 1920, height: 1080 } });
                      break;
                    case "custom":
                      if (!data.dimensions) {
                        const currentTemplate = templates.find(
                          (t) => t.id === selectedTemplateId
                        );
                        onChange({
                          dimensions: currentTemplate?.defaultDimensions || {
                            width: 1080,
                            height: 1080,
                          },
                        });
                      }
                      break;
                  }
                }}
                className={`p-2 text-xs neo-shadow font-bold border-2 border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase
                ${
                  currentType === opt.value
                    ? "bg-[#E9945B] text-black"
                    : "bg-white dark:bg-[#333] hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {opt.label}
              </button>
            ));
          })()}
        </div>

        {data.dimensions &&
          (data.dimensions.width !== 2064 || data.dimensions.height !== 2752) &&
          (data.dimensions.width !== 1920 ||
            data.dimensions.height !== 1080) && (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-gray-500">
                  Width
                </label>
                <input
                  type="number"
                  value={data.dimensions.width}
                  onChange={(e) =>
                    onChange({
                      dimensions: {
                        ...data.dimensions!,
                        width: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full p-2 text-xs font-bold border-2 border-black neo-shadow focus:outline-none focus:ring-2 focus:ring-[#E9945B] bg-white dark:bg-[#333]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-gray-500">
                  Height
                </label>
                <input
                  type="number"
                  value={data.dimensions.height}
                  onChange={(e) =>
                    onChange({
                      dimensions: {
                        ...data.dimensions!,
                        height: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full p-2 text-xs font-bold border-2 border-black neo-shadow focus:outline-none focus:ring-2 focus:ring-[#E9945B] bg-white dark:bg-[#333]"
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
