"use client";

import React from "react";
import { ScreenshotData } from "../types";
import { SOLID_PRESETS, GRADIENT_PRESETS, GRADIENT_ANGLES } from "../constants";
import { NeoBrutalSlider } from "@/components/common/slider";

interface BackgroundControlProps {
  data: ScreenshotData;
  onChange: (updates: Partial<ScreenshotData>) => void;
}

export const BackgroundControl: React.FC<BackgroundControlProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between border-b-2 border-black dark:border-gray-600 pb-1">
        <h3 className="font-bold uppercase text-sm">Background</h3>
        <div className="flex border-2 border-black neo-shadow overflow-hidden">
          <button
            onClick={() => onChange({ backgroundType: "solid" })}
            className={`px-4 py-1 text-xs font-bold transition-colors uppercase
            ${
              data.backgroundType === "solid"
                ? "bg-[#E9945B] text-black"
                : "bg-white dark:bg-[#333] text-gray-400"
            }`}
          >
            Solid
          </button>
          <button
            onClick={() => onChange({ backgroundType: "gradient" })}
            className={`px-4 py-1 text-xs font-bold transition-colors border-l-2 border-black uppercase
            ${
              data.backgroundType === "gradient"
                ? "bg-[#E9945B] text-black"
                : "bg-white dark:bg-[#333] text-gray-400"
            }`}
          >
            Gradient
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
          Presets
        </label>
        <div className="grid grid-cols-4 gap-2">
          {data.backgroundType === "solid"
            ? SOLID_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => onChange({ backgroundColor: color })}
                  className={`h-8 border-2 border-black neo-shadow transition-all hover:scale-105 active:scale-95 ${
                    data.backgroundColor === color
                      ? "ring-2 ring-[#E9945B] ring-offset-2"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))
            : GRADIENT_PRESETS.map((grad, i) => (
                <button
                  key={i}
                  onClick={() =>
                    onChange({
                      gradientColorFrom: grad.from,
                      gradientColorTo: grad.to,
                    })
                  }
                  className={`h-8 border-2 border-black neo-shadow transition-all hover:scale-105 active:scale-95 ${
                    data.gradientColorFrom === grad.from &&
                    data.gradientColorTo === grad.to
                      ? "ring-2 ring-[#E9945B] ring-offset-2"
                      : ""
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${grad.from}, ${grad.to})`,
                  }}
                />
              ))}
        </div>
      </div>

      {/* Color Toggles */}
      {data.backgroundType === "solid" ? (
        <div>
          <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
            Color
          </label>
          <div className="flex gap-2">
            <div className="relative border-2 border-black neo-shadow h-10 flex-1">
              <input
                type="color"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                value={data.backgroundColor}
                onChange={(e) => onChange({ backgroundColor: e.target.value })}
              />
              <div
                className="absolute inset-0 w-full h-full flex items-center justify-center font-mono text-xs font-bold"
                style={{ backgroundColor: data.backgroundColor }}
              >
                <span className="bg-white/80 px-2 rounded">
                  {data.backgroundColor.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
                From
              </label>
              <div className="relative border-2 border-black neo-shadow h-10">
                <input
                  type="color"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                  value={data.gradientColorFrom}
                  onChange={(e) =>
                    onChange({ gradientColorFrom: e.target.value })
                  }
                />
                <div
                  className="absolute inset-0 w-full h-full flex items-center justify-center font-mono text-[10px] font-bold"
                  style={{ backgroundColor: data.gradientColorFrom }}
                >
                  <span className="bg-white/80 px-1 rounded">
                    {data.gradientColorFrom.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
                To
              </label>
              <div className="relative border-2 border-black neo-shadow h-10">
                <input
                  type="color"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                  value={data.gradientColorTo}
                  onChange={(e) =>
                    onChange({ gradientColorTo: e.target.value })
                  }
                />
                <div
                  className="absolute inset-0 w-full h-full flex items-center justify-center font-mono text-[10px] font-bold"
                  style={{ backgroundColor: data.gradientColorTo }}
                >
                  <span className="bg-white/80 px-1 rounded">
                    {data.gradientColorTo.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold mb-1 uppercase text-gray-500">
              Direction
            </label>
            <div className="grid grid-cols-4 gap-2">
              {GRADIENT_ANGLES.map((angle) => (
                <button
                  key={angle}
                  onClick={() => onChange({ gradientAngle: angle })}
                  className={`h-8 border-2 border-black neo-shadow transition-all ${
                    data.gradientAngle === angle
                      ? "bg-[#E9945B]"
                      : "bg-white dark:bg-[#333]"
                  }`}
                  style={{
                    background: `linear-gradient(${angle}deg, ${data.gradientColorFrom}, ${data.gradientColorTo})`,
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[10px] font-bold uppercase text-gray-500">
                Custom Angle
              </label>
              <span className="text-[10px] font-bold">
                {data.gradientAngle}°
              </span>
            </div>
            <NeoBrutalSlider
              min={0}
              max={360}
              step={1}
              value={data.gradientAngle}
              onChange={(value) => onChange({ gradientAngle: value })}
            />
          </div>
        </div>
      )}
    </div>
  );
};
