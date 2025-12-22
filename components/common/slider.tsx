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
  const ratio = (value - min) / (max - min);
  const thumbWidth = 16;

  return (
    <div className="relative w-full flex items-center h-6">
      <div className="relative w-full h-3 bg-white border-2 border-black">
        <div
          className="absolute top-0 left-0 h-full bg-[#E9945B] origin-left will-change-transform"
          style={{
            width: "100%",
            transform: `scaleX(${ratio})`,
          }}
        />

        <div
          className="absolute top-1/2 w-4 h-4 bg-white border-2 border-black -translate-y-1/2 will-change-[left]"
          style={{
            left: `calc((100% - ${thumbWidth}px) * ${ratio})`,
          }}
        />
      </div>

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
