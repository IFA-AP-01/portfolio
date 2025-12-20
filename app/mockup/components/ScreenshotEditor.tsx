"use client";

import React, { useState, useRef, useCallback } from "react";
import { CanvasPreview } from "./CanvasPreview";
import { ControlPanel } from "./ControlPanel";
import { SlideList } from "./SlideList";
import { FontLoader } from "./FontLoader";
import { TEMPLATES } from "../data/templates";
import { ScreenshotData, Platform } from "../types";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

const INITIAL_DATA: ScreenshotData = {
  title: "Your title here",
  subtitle: "Place your subtitle here",
  fontFamily: "Inter, sans-serif",
  titleFontSize: 88,
  titleFontWeight: "bold",
  titleFontStyle: "normal",
  titleTextDecoration: "none",
  titleLetterSpacing: 0,
  titleLineHeight: 1.2,
  titleTextShadow: false,
  subtitleFontSize: 56,
  subtitleFontWeight: "normal",
  subtitleFontStyle: "normal",
  subtitleTextDecoration: "none",
  subtitleLetterSpacing: 0,
  subtitleLineHeight: 1.4,
  subtitleTextShadow: false,
  textAlign: "center",
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

  const handleExport = useCallback(async () => {
    if (canvasRef.current === null) return;

    setIsExporting(true);
    try {
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

  const previewScale = 0.25;

  return (
    <div className="flex h-full bg-[#faf8f1] dark:bg-[#191C1E] flex-col md:flex-row overflow-hidden">
      <FontLoader />
      {/* Sidebar Controls */}
      <div className="w-full md:w-[26rem] border-r-2 border-black dark:border-gray-600 h-full overflow-hidden shrink-0 z-20 flex flex-col bg-white dark:bg-[#252526]">
        <div className="flex-1 overflow-y-auto p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
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
            className="w-full py-4 bg-[#E9945B] hover:bg-[#d8844b] text-black font-black uppercase text-sm border-2 border-black neo-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
