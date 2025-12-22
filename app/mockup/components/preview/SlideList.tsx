"use client";

import React from "react";
import { ScreenshotData } from "@/lib/types";
import { CanvasPreview } from "./CanvasPreview";
import { TEMPLATES as ALL_TEMPLATES } from "@/lib/templates";
import { FaCopy } from "react-icons/fa";

interface SlideListProps {
  slides: ScreenshotData[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onAddSlide: () => void;
  onDeleteSlide: (index: number) => void;
  onDuplicateSlide: (index: number) => void;
}

export const SlideList: React.FC<SlideListProps> = ({
  slides,
  currentSlideIndex,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
  onDuplicateSlide,
}) => {
  return (
    <div className="w-full h-40 border-t border-gray-300 flex items-center gap-4 px-8 overflow-x-auto shrink-0 custom-scrollbar">
      {slides.map((slide, index) => {
        const template =
          ALL_TEMPLATES.find((t) => t.id === slide.templateId) ||
          ALL_TEMPLATES[0];
        return (
          <div
            key={index}
            className={`relative group shrink-0 w-24 h-[8.5rem] cursor-pointer border-2 overflow-hidden transition-all ${
              currentSlideIndex === index
                ? "border-[#E9945B] shadow-md ring-2 ring-[#E9945B]"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => onSelectSlide(index)}
          >
            <div className="w-full h-full pointer-events-none transform origin-top-left scale-[0.2]">
              <div
                style={{
                  width: template.defaultDimensions.width,
                  height: template.defaultDimensions.height,
                }}
              >
                <CanvasPreview data={slide} template={template} scale={0.37} />
              </div>
            </div>

            {/* Delete Button */}
            {slides.length > 1 && (
              <button
                className="absolute top-1 right-1 bg-red-500 border-2 border-black p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSlide(index);
                }}
                title="Delete Slide"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}

            {/* Duplicate Button */}
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#E9945B] border-2 border-black p-1.5 text-black opacity-0 group-hover:opacity-100 transition-opacity z-10 font-bold text-[10px]"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicateSlide(index);
              }}
              title="Duplicate Slide"
            >
              <FaCopy />
            </button>

            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-0.5">
              {index + 1}
            </div>
          </div>
        );
      })}

      <button
        onClick={onAddSlide}
        className="shrink-0 w-24 h-[8.5rem] border-2 border-dashed border-gray-400 flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-600 hover:bg-gray-100 transition-colors"
      >
        <span className="text-2xl font-bold">+</span>
        <span className="text-xs">Add Slide</span>
      </button>
    </div>
  );
};
