"use client";

import React from "react";
import { ScreenshotData } from "@/lib/types";

interface ExportDialogProps {
  slides: ScreenshotData[];
  selectedIndices: Set<number>;
  activeIndex: number;
  isExportingSingle: boolean;
  isExportingBulk: boolean;
  onClose: () => void;
  onToggleSelection: (index: number) => void;
  onSelectAll: () => void;
  onExportSingle: () => void;
  onExportSelected: () => void;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  slides,
  selectedIndices,
  activeIndex,
  isExportingSingle,
  isExportingBulk,
  onClose,
  onToggleSelection,
  onSelectAll,
  onExportSingle,
  onExportSelected,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#252526] border-4 border-black dark:border-gray-600 p-6 w-[400px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[80vh] flex flex-col">
        <h3 className="text-xl font-black uppercase mb-4 text-center border-b-2 border-black dark:border-gray-600 pb-2">
          Export Options
        </h3>

        <div className="flex-1 overflow-y-auto min-h-0 mb-4 border-2 border-black dark:border-gray-600 p-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xs font-bold uppercase">Select Slides</span>
              <button
                onClick={onSelectAll}
                className="text-xs text-[#E9945B] font-bold hover:underline"
              >
                {selectedIndices.size === slides.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>
            {slides.map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-[#333] cursor-pointer"
                onClick={() => onToggleSelection(index)}
              >
                <div
                  className={`w-5 h-5 border-2 border-black dark:border-gray-500 flex items-center justify-center ${selectedIndices.has(index) ? "bg-[#E9945B]" : "bg-transparent"}`}
                >
                  {selectedIndices.has(index) && (
                    <div className="w-2 h-2 bg-black"></div>
                  )}
                </div>
                <span className="text-sm font-bold">Slide {index + 1}</span>
                {index === activeIndex && (
                  <span className="text-[10px] bg-black text-white px-1 rounded ml-auto">
                    CURRENT
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 shrink-0">
          <button
            onClick={onExportSingle}
            disabled={isExportingSingle || isExportingBulk}
            className="w-full py-3 bg-white hover:bg-gray-50 text-black dark:bg-[#333] dark:text-white dark:hover:bg-[#444] font-bold uppercase text-sm border-2 border-black dark:border-gray-600 neo-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isExportingSingle ? "Processing..." : "Export Current Slide (PNG)"}
          </button>

          <button
            onClick={onExportSelected}
            disabled={
              isExportingBulk || isExportingSingle || selectedIndices.size === 0
            }
            className="w-full py-3 bg-[#E9945B] hover:bg-[#d8844b] text-black font-bold uppercase text-sm border-2 border-black neo-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isExportingBulk
              ? "Processing..."
              : `Export Selected (${selectedIndices.size}) (ZIP)`}
          </button>
        </div>

        <div className="mt-4 pt-2 text-center">
          <button
            onClick={onClose}
            disabled={isExportingSingle || isExportingBulk}
            className="text-xs font-bold uppercase text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
