"use client";

import React, { useState, useRef, useCallback } from "react";
import { CanvasPreview } from "./CanvasPreview";
import { ControlPanel } from "./ControlPanel";
import { SlideList } from "./SlideList";
import { TEMPLATES } from "../data/templates";
import { ScreenshotData, Platform } from "../types";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

const INITIAL_DATA: ScreenshotData = {
  title: "Keep track of your chats",
  subtitle: "Connect with friends and family instantly.",
  fontFamily: "Inter, sans-serif",
  titleColor: "#ffffff",
  subtitleColor: "#e0e0e0",
  backgroundColor: "#1a1a1a",
  templateId: TEMPLATES[0].id,
};

export const ScreenshotEditor: React.FC = () => {
  const [slides, setSlides] = useState<ScreenshotData[]>([INITIAL_DATA]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Ensure currentSlideIndex is valid
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
    ]); // Copy last template for convenience
    setCurrentSlideIndex((prev) => prev + 1);
  };

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) return;
    setSlides((prev) => prev.filter((_, i) => i !== index));
    if (currentSlideIndex >= index && currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const handleExport = useCallback(async () => {
    if (canvasRef.current === null) return;

    setIsExporting(true);
    try {
      // Ideally we would loop through all slides and export them.
      // For now, let's export the CURRENT slide.
      // TODO: Implement batch export (future task) or just alert user.
      // Given the complexity of rendering all slides invisibly,
      // we will stick to single slide export for this iteration or maybe just the current one.

      const blob = await htmlToImage.toBlob(canvasRef.current, {
        canvasWidth: currentTemplate.defaultDimensions.width,
        canvasHeight: currentTemplate.defaultDimensions.height,
        pixelRatio: 1,
      });

      if (blob) {
        saveAs(blob, `screenshot-${activeIndex + 1}-${Date.now()}.png`);
      }
    } catch (err) {
      console.error("Export failed", err);
      alert("Failed to export image.");
    } finally {
      setIsExporting(false);
    }
  }, [currentTemplate, activeIndex]);

  // Handle scaling for the preview
  const previewScale = 0.25;

  return (
    <div className="flex h-full bg-[#faf8f1] dark:bg-[#191C1E] flex-col md:flex-row overflow-hidden">
      {/* Sidebar Controls */}
      <div className="w-full md:w-[26rem] border-r-2 border-black dark:border-gray-600 h-full overflow-hidden shrink-0 z-20 flex flex-col bg-white dark:bg-[#252526]">
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <ControlPanel
            data={currentSlide}
            onChange={handleDataChange}
            templates={TEMPLATES}
            onSelectTemplate={handleTemplateSelect}
            selectedTemplateId={currentSlide.templateId}
          />
        </div>
        <div className="p-4 border-t-2 border-black dark:border-gray-600 bg-white dark:bg-[#252526]">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full py-4 bg-[#E9945B] hover:bg-[#d8844b] text-black font-black uppercase text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? "Exporting..." : "Export Current Slide"}
          </button>
          <p className="text-[10px] font-bold text-gray-500 uppercase text-center mt-3 tracking-wider">
            * Export captures the currently visible slide.
          </p>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
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
              />
            </div>
          </div>
        </div>

        {/* Slides Strip */}
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
