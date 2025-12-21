"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
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
  layout: "text-top",
  showNotch: true,
};

export const ScreenshotEditor: React.FC = () => {
  const [slides, setSlides] = useState<ScreenshotData[]>([INITIAL_DATA]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  // Refs for all slides for bulk export
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isExportingSingle, setIsExportingSingle] = useState(false);
  const [isExportingBulk, setIsExportingBulk] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
    new Set()
  );

  // Initialize selection when dialog opens (optional, or manual)
  useEffect(() => {
    if (showExportDialog) {
      // Default to all selected? Or none? Let's default to all for convenience
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

  const handleExportSingle = useCallback(async () => {
    if (canvasRef.current === null) return;

    setIsExportingSingle(true);
    try {
      const dataUrl = await htmlToImage.toPng(canvasRef.current, {
        canvasWidth: currentTemplate.defaultDimensions.width,
        canvasHeight: currentTemplate.defaultDimensions.height,
        pixelRatio: 2,
        skipAutoScale: true,
        cacheBust: true,
        filter: (node) => {
          // Robust filter to skip stylesheets that cause "cssRules" security errors
          if (
            node.tagName === "LINK" &&
            (node as HTMLLinkElement).rel === "stylesheet"
          ) {
            try {
              const sheet = (node as HTMLLinkElement).sheet;
              if (sheet) {
                // Try to access rules to check for CORS issues
                try {
                  const rules = sheet.cssRules;
                  return true;
                } catch (e) {
                  // If we can't access rules, skip this stylesheet to prevent crash
                  console.warn(
                    "Skipping inaccessible stylesheet:",
                    (node as HTMLLinkElement).href
                  );
                  return false;
                }
              }
            } catch (e) {
              return false;
            }
          }
          // Also skip some known problematic patterns
          if (node.tagName === "STYLE" || node.tagName === "LINK") {
            const href = (node as any).href || "";
            if (href.startsWith("chrome-extension://")) return false;
          }
          return true;
        },
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();

      if (blob) {
        saveAs(blob, `screenshot-${activeIndex + 1}-${Date.now()}.png`);
      }
      setShowExportDialog(false);
    } catch (err) {
      console.error("Export failed", err);
      const message = err instanceof Error ? err.message : String(err);
      alert(`Failed to export image: ${message}`);
    } finally {
      setIsExportingSingle(false);
    }
  }, [currentTemplate, activeIndex]);

  const handleExportSelected = useCallback(async () => {
    if (selectedIndices.size === 0) {
      alert("Please select at least one slide to export.");
      return;
    }

    setIsExportingBulk(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      let count = 0;

      // PROCESS SEQUENTIALLY to avoid concurrency issues with html-to-image
      // Convert Set to sorted array to process in order
      const indicesToExport = Array.from(selectedIndices).sort((a, b) => a - b);

      for (const index of indicesToExport) {
        const ref = slideRefs.current[index];
        if (!ref) {
          console.warn(`Ref for slide ${index} is null`);
          continue;
        }

        const slide = slides[index];
        const template =
          TEMPLATES.find((t) => t.id === slide.templateId) || TEMPLATES[0];

        // Wait a bit for each slide to ensure it's rendered in the hidden area
        await new Promise((resolve) => setTimeout(resolve, 200));

        try {
          // Using toPng and then converting to blob can be more reliable than toBlob directly
          const dataUrl = await htmlToImage.toPng(ref, {
            canvasWidth: template.defaultDimensions.width,
            canvasHeight: template.defaultDimensions.height,
            pixelRatio: 2, // Better quality
            skipAutoScale: true,
            cacheBust: true,
            filter: (node) => {
              // Skip cross-origin stylesheets that cause "cssRules" error
              if (
                node.tagName === "LINK" &&
                (node as HTMLLinkElement).rel === "stylesheet"
              ) {
                const href = (node as HTMLLinkElement).href;
                if (
                  href &&
                  (href.includes("fonts.googleapis.com") ||
                    !href.startsWith(window.location.origin))
                ) {
                  return false;
                }
              }
              return true;
            },
          });

          const response = await fetch(dataUrl);
          const blob = await response.blob();

          if (blob) {
            zip.file(`screenshot-${index + 1}.png`, blob);
            count++;
          }
        } catch (captureErr) {
          console.error(`Failed to capture slide ${index + 1}:`, captureErr);
        }
      }

      if (count > 0) {
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `screenshots-${Date.now()}.zip`);
        setShowExportDialog(false);
      } else {
        alert("No images were generated.");
      }
    } catch (err) {
      console.error("Export failed", err);
      const message = err instanceof Error ? err.message : String(err);
      alert(`Failed to export images: ${message}`);
    } finally {
      setIsExportingBulk(false);
    }
  }, [slides, selectedIndices]);

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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#252526] border-4 border-black dark:border-gray-600 p-6 w-[400px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[80vh] flex flex-col">
              <h3 className="text-xl font-black uppercase mb-4 text-center border-b-2 border-black dark:border-gray-600 pb-2">
                Export Options
              </h3>

              <div className="flex-1 overflow-y-auto min-h-0 mb-4 border-2 border-black dark:border-gray-600 p-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-xs font-bold uppercase">
                      Select Slides
                    </span>
                    <button
                      onClick={() => {
                        if (selectedIndices.size === slides.length) {
                          setSelectedIndices(new Set());
                        } else {
                          setSelectedIndices(new Set(slides.map((_, i) => i)));
                        }
                      }}
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
                      onClick={() => toggleSelection(index)}
                    >
                      <div
                        className={`w-5 h-5 border-2 border-black dark:border-gray-500 flex items-center justify-center ${selectedIndices.has(index) ? "bg-[#E9945B]" : "bg-transparent"}`}
                      >
                        {selectedIndices.has(index) && (
                          <div className="w-2 h-2 bg-black"></div>
                        )}
                      </div>
                      <span className="text-sm font-bold">
                        Slide {index + 1}
                      </span>
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
                  onClick={handleExportSingle}
                  disabled={isExportingSingle || isExportingBulk}
                  className="w-full py-3 bg-white hover:bg-gray-50 text-black dark:bg-[#333] dark:text-white dark:hover:bg-[#444] font-bold uppercase text-sm border-2 border-black dark:border-gray-600 neo-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isExportingSingle
                    ? "Processing..."
                    : "Export Current Slide (PNG)"}
                </button>

                <button
                  onClick={handleExportSelected}
                  disabled={
                    isExportingBulk ||
                    isExportingSingle ||
                    selectedIndices.size === 0
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
                  onClick={() => setShowExportDialog(false)}
                  disabled={isExportingSingle || isExportingBulk}
                  className="text-xs font-bold uppercase text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
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
