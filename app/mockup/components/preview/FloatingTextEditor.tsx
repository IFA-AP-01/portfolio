import React from "react";
import { FONTS } from "@/lib/constants";

interface FloatingTextEditorProps {
  data: any; // Using any for subset of ScreenshotData
  field: "title" | "subtitle";
  onChange: (updates: any) => void;
  interactionScale: number;
}

export const FloatingTextEditor: React.FC<FloatingTextEditorProps> = ({
  data,
  field,
  onChange,
  interactionScale,
}) => {
  const fontFamily = data[`${field}FontFamily`];
  const fontSize = data[`${field}FontSize`];
  const color = data[`${field}Color`];
  const opacity = data[`${field}Opacity`] ?? 1;
  const textAlign = data[`${field}TextAlign`];

  const handleStopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="absolute top-full left-1/2 mt-4 bg-white dark:bg-[#252526] border-2 border-black dark:border-gray-600 p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2 z-50 w-[240px] rounded-sm export-exclude"
      style={{
        transform: `translateX(-50%) scale(${1 / interactionScale})`,
        transformOrigin: "top center",
        cursor: "default",
      }}
      onMouseDown={handleStopPropagation}
      onClick={handleStopPropagation}
    >
      {/* Font Family */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] uppercase font-bold text-gray-500">
          Font
        </label>
        <select
          value={fontFamily}
          onChange={(e) => onChange({ [`${field}FontFamily`]: e.target.value })}
          className="w-full text-xs p-1 border border-gray-300 dark:border-gray-600 bg-transparent rounded-none focus:outline-none"
        >
          {FONTS.map((font) => (
            <option key={font.name} value={font.name}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* Size & Color */}
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">
            Size
          </label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) =>
              onChange({ [`${field}FontSize`]: Number(e.target.value) })
            }
            className="w-full text-xs p-1 border border-gray-300 dark:border-gray-600 bg-transparent rounded-none focus:outline-none"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">
            Color
          </label>
          <div className="relative border border-gray-300 dark:border-gray-600 h-[26px]">
            <input
              type="color"
              value={color}
              onChange={(e) => onChange({ [`${field}Color`]: e.target.value })}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="w-full h-full"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>
      </div>

      {/* Opacity */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <label className="text-[10px] uppercase font-bold text-gray-500">
            Opacity
          </label>
          <span className="text-[10px] font-bold">
            {Math.round(opacity * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={opacity}
          onChange={(e) =>
            onChange({ [`${field}Opacity`]: Number(e.target.value) })
          }
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
        />
      </div>

      {/* Alignment */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] uppercase font-bold text-gray-500">
          Align
        </label>
        <div className="flex border border-gray-300 dark:border-gray-600">
          {["left", "center", "right"].map((align) => (
            <button
              key={align}
              onClick={() => onChange({ [`${field}TextAlign`]: align })}
              className={`flex-1 p-1 text-[10px] uppercase font-bold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                textAlign === align ? "bg-gray-200 dark:bg-gray-600" : ""
              }`}
            >
              {align.charAt(0)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
