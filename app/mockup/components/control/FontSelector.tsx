"use client";

import React, { useState, useRef, useEffect } from "react";

interface FontOption {
  name: string;
  value: string;
}

interface FontSelectorProps {
  fonts: FontOption[];
  selectedFont: string;
  onChange: (fontValue: string) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({
  fonts,
  selectedFont,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedFontName =
    fonts.find((f) => f.value === selectedFont)?.name || "Select Font";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 neo-shadow border-2 border-black text-left flex justify-between items-center focus:outline-none"
        style={{ fontFamily: selectedFont }}
      >
        <span className="text-xs">{selectedFontName}</span>
        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full z-50 max-h-60 overflow-y-auto border-2 border-t-0 border-black dark:border-gray-600 bg-white dark:bg-[#333] shadow-lg">
          {fonts.map((font) => (
            <button
              key={font.name}
              onClick={() => {
                onChange(font.value);
                setIsOpen(false);
              }}
              className={`w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-[#444] ${
                selectedFont === font.value ? "bg-gray-100 dark:bg-[#444]" : ""
              }`}
              style={{ fontFamily: font.value }}
              title={font.name}
            >
              {font.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
