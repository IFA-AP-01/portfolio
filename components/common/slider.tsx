import React from "react";

type NeoBrutalSliderProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

export const NeoBrutalSlider: React.FC<NeoBrutalSliderProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full flex items-center h-6">
      <div className="relative w-full h-3 bg-white border-2 border-black">
        {/* Filled track */}
        <div
          className="absolute top-0 left-0 h-full bg-[#E9945B]"
          style={{ width: `${percent}%` }}
        />

        {/* Thumb */}
        <div
          className="absolute top-1/2 w-4 h-4 bg-white border-2 border-black shadow-[3px_3px_0_0_#000] -translate-y-1/2"
          style={{ left: `calc(${percent}% - 10px)` }}
        />
      </div>

      {/* Native input (invisible, for interaction) */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
    </div>
  );
};
