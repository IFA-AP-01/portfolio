"use client";

import React, { useState, useRef, useEffect } from "react";
import { CanvasPreview } from "./CanvasPreview";
import { ControlPanel } from "./ControlPanel";
import { SlideList } from "./SlideList";
import { FontLoader } from "./FontLoader";
import { ExportDialog } from "./ExportDialog";
import { TEMPLATES } from "../data/templates";
import { ScreenshotData } from "../types";
import { useScreenshotExport } from "../hooks/useScreenshotExport";
import { INITIAL_DATA } from "../constants";

export const ScreenshotEditor: React.FC = () => {
  const [slides, setSlides] = useState<ScreenshotData[]>([INITIAL_DATA]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
    new Set()
  );

  const {
    isExportingSingle,
    isExportingBulk,
    handleExportSingle,
    handleExportSelected,
  } = useScreenshotExport();

  useEffect(() => {
    if (showExportDialog) {
      setSelectedIndices(new Set(slides.map((_, i) => i)));
    }
  }, [showExportDialog, slides]);

  const toggleSelection = (index: number) => {
    const newSet = new Set(selectedIndices);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSelectedIndices(newSet);
  };

  const handleSelectAll = () => {
    if (selectedIndices.size === slides.length) {
      setSelectedIndices(new Set());
    } else {
      setSelectedIndices(new Set(slides.map((_, i) => i)));
    }
  };

  const activeIndex = Math.min(
    Math.max(currentSlideIndex, 0),
    slides.length - 1
  );
  const currentSlide = slides[activeIndex] || INITIAL_DATA;
  const currentTemplate =
    TEMPLATES.find((t) => t.id === currentSlide.templateId) || TEMPLATES[0];

  const handleDataChange = (newData: Partial<ScreenshotData>) => {
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[activeIndex] = { ...newSlides[activeIndex], ...newData };
      return newSlides;
    });
  };

  const handleTemplateSelect = (templateId: string) => {
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[activeIndex] = { ...newSlides[activeIndex], templateId };
      return newSlides;
    });
  };

  const handleAddSlide = () => {
    setSlides((prev) => [
      ...prev,
      { ...INITIAL_DATA, templateId: prev[prev.length - 1].templateId },
    ]);
    setCurrentSlideIndex((prev) => prev + 1);
  };

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) return;
    setSlides((prev) => prev.filter((_, i) => i !== index));
    if (currentSlideIndex >= index && currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const onExportSingle = () => {
    handleExportSingle(canvasRef, currentTemplate, activeIndex).then(() => {
      setShowExportDialog(false);
    });
  };

  const onExportSelected = () => {
    handleExportSelected(slides, selectedIndices, slideRefs).then((success) => {
      if (success) setShowExportDialog(false);
    });
  };

  const previewScale = 0.25;

  return (
    <div className="flex h-full bg-[#faf8f1] dark:bg-[#191C1E] flex-col md:flex-row overflow-hidden">
      <FontLoader />
      {/* Sidebar Controls */}
      <div className="w-full md:w-[26rem] border-r-2 border-black dark:border-gray-600 h-full overflow-hidden shrink-0 z-20 flex flex-col bg-white dark:bg-[#252526]">
        <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          <ControlPanel
            data={currentSlide}
            onChange={handleDataChange}
            templates={TEMPLATES}
            onSelectTemplate={handleTemplateSelect}
            selectedTemplateId={currentSlide.templateId}
          />
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Right Export Button */}
        <div className="absolute top-6 right-6 z-30">
          <button
            onClick={() => setShowExportDialog(true)}
            className="px-6 py-3 bg-[#E9945B] hover:bg-[#d8844b] text-black font-black uppercase text-sm border-2 border-black neo-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            Export
          </button>
        </div>

        {/* Export Dialog */}
        {showExportDialog && (
          <ExportDialog
            slides={slides}
            selectedIndices={selectedIndices}
            activeIndex={activeIndex}
            isExportingSingle={isExportingSingle}
            isExportingBulk={isExportingBulk}
            onClose={() => setShowExportDialog(false)}
            onToggleSelection={toggleSelection}
            onSelectAll={handleSelectAll}
            onExportSingle={onExportSingle}
            onExportSelected={onExportSelected}
          />
        )}

        {/* Hidden Preview Area for Bulk Export */}
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
            opacity: 0,
            pointerEvents: "none",
            zIndex: -1,
          }}
        >
          {slides.map((slide, index) => {
            const t =
              TEMPLATES.find((tp) => tp.id === slide.templateId) ||
              TEMPLATES[0];
            return (
              <div
                key={`hidden-slide-${index}`}
                style={{
                  width: t.defaultDimensions.width,
                  height: t.defaultDimensions.height,
                }}
              >
                <CanvasPreview
                  ref={(el) => (slideRefs.current[index] = el)}
                  data={slide}
                  template={t}
                  scale={1}
                  priority={true}
                />
              </div>
            );
          })}
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-hidden p-10 flex items-center justify-center bg-[#faf8f1] dark:bg-[#191C1E] relative">
          <div
            className="absolute inset-0 z-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
          <div
            style={{
              width: currentTemplate.defaultDimensions.width * previewScale,
              height: currentTemplate.defaultDimensions.height * previewScale,
            }}
            className="relative shadow-2xl transition-all duration-300"
          >
            <div
              className="absolute top-0 left-0 origin-top-left transition-transform duration-300 ease-in-out"
              style={{ transform: `scale(${previewScale})` }}
            >
              <CanvasPreview
                ref={canvasRef}
                data={currentSlide}
                template={currentTemplate}
                scale={1}
                onChange={handleDataChange}
                interactionScale={previewScale}
              />
            </div>
          </div>
        </div>

        {/* Slides Strip */}
        <SlideList
          slides={slides}
          currentSlideIndex={activeIndex}
          onSelectSlide={setCurrentSlideIndex}
          onAddSlide={handleAddSlide}
          onDeleteSlide={handleDeleteSlide}
        />
      </div>
    </div>
  );
};
