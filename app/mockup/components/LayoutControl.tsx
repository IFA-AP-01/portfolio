"use client";

import React from "react";
import { ScreenshotData } from "../types";
import { LAYOUT_OPTIONS } from "../constants";

interface LayoutControlProps {
  data: ScreenshotData;
  onChange: (updates: Partial<ScreenshotData>) => void;
}

export const LayoutControl: React.FC<LayoutControlProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold border-b-2 border-black dark:border-gray-600 pb-1 uppercase text-sm">
        Layout
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {LAYOUT_OPTIONS.map((layout) => (
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
  );
};
