"use client";

import React from "react";
import { ScreenshotData } from "../types";
import { NeoBrutalSlider } from "@/components/common/slider";

interface LayoutControlProps {
  data: ScreenshotData;
  onChange: (updates: Partial<ScreenshotData>) => void;
}

export const LayoutControl: React.FC<LayoutControlProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-end justify-between border-b-2 border-black pb-1 dark:border-gray-600">
        <h3 className="font-bold uppercase text-sm">Position</h3>
        <button
          className="w-24 border-2 border-black bg-[#E9945B] neo-shadow px-2 py-1 text-xs uppercase font-bold"
          onClick={() =>
            onChange({
              textTranslateX: 0,
              textTranslateY: 0,
              deviceTranslateX: 0,
              deviceTranslateY: 0,
              deviceRotate: 0,
              deviceScale: 1,
            })
          }
        >
          Reset
        </button>
      </div>

      {/* Text Position*/}
      <div className="flex items-end gap-4 justify-between">
        {/* Text Offset X */}
        <div className="w-full">
          <label className="text-[10px] font-bold uppercase text-gray-500">
            Text X
          </label>
          <input
            type="number"
            min={-200}
            max={200}
            step={1}
            value={data.textTranslateX}
            onChange={(e) =>
              onChange({ textTranslateX: Number(e.target.value) })
            }
            className="w-full border-2 border-black neo-shadow px-2 py-1 text-sm"
          />
        </div>

        {/* Text Offset Y */}
        <div className="w-full">
          <label className="text-[10px] font-bold uppercase text-gray-500">
            Text Y
          </label>
          <input
            type="number"
            min={-200}
            max={200}
            step={1}
            value={data.textTranslateY}
            onChange={(e) =>
              onChange({ textTranslateY: Number(e.target.value) })
            }
            className="w-full border-2 border-black neo-shadow px-2 py-1 text-sm"
          />
        </div>
      </div>

      {/* Device Position*/}
      <div className="flex items-end gap-4">
        {/* Offset X */}
        <div className="w-full">
          <label className="text-[10px] font-bold uppercase text-gray-500">
            Image X
          </label>
          <input
            type="number"
            min={-200}
            max={200}
            step={1}
            value={data.deviceTranslateX}
            onChange={(e) =>
              onChange({ deviceTranslateX: Number(e.target.value) })
            }
            className="w-full border-2 border-black neo-shadow px-2 py-1 text-sm"
          />
        </div>

        {/* Offset Y */}
        <div className="w-full">
          <label className="text-[10px] font-bold uppercase text-gray-500">
            Image Y
          </label>
          <input
            type="number"
            min={-200}
            max={200}
            step={1}
            value={data.deviceTranslateY}
            onChange={(e) =>
              onChange({ deviceTranslateY: Number(e.target.value) })
            }
            className="w-full border-2 border-black neo-shadow px-2 py-1 text-sm"
          />
        </div>
      </div>

      {/* Device Transform */}
      <div className="flex gap-4">
        {/* Rotation */}
        <div className="w-full">
          <label className="text-[10px] font-bold uppercase text-gray-500">
            Rotation
          </label>
          <div className="flex items-center gap-1 py-1">
            <NeoBrutalSlider
              min={-60}
              max={60}
              step={1}
              value={data.deviceRotate}
              onChange={(value) => onChange({ deviceRotate: value })}
            />
            <span className="w-8 text-end text-[10px] font-bold">
              {data.deviceRotate}°
            </span>
          </div>
        </div>

        {/* Scale */}
        <div className="w-full">
          <label className="text-[10px] font-bold uppercase text-gray-500">
            Scale
          </label>
          <div className="flex items-center gap-1 py-1">
            <NeoBrutalSlider
              min={1}
              max={2}
              step={0.005}
              value={data.deviceScale}
              onChange={(value) => onChange({ deviceScale: value })}
            />
            <span className="w-8 text-end text-[10px] font-bold">
              {data.deviceScale.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
