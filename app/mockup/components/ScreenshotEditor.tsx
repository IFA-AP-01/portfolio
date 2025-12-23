"use client";

import React from "react";
import { SlideList } from "./preview/SlideList";
import { FontLoader } from "./FontLoader";
import { ExportDialog } from "./ExportDialog";
import { TEMPLATES } from "@/lib/templates";
import { useScreenshotEditor } from "../../../hooks/useScreenshotEditor";
import { EditorSidebar } from "./EditorSidebar";
import { PreviewArea } from "./preview/PreviewArea";
import { HiddenExportPreviews } from "./preview/HiddenExportPreviews";

export const ScreenshotEditor: React.FC = () => {
  const {
    slides,
    currentSlideIndex,
    setCurrentSlideIndex,
    canvasRef,
    slideRefs,
    showExportDialog,
    setShowExportDialog,
    selectedIndices,
    previewScale,
    setPreviewScale,
    isExportingSingle,
    isExportingBulk,
    activeIndex,
    currentSlide,
    currentTemplate,
    handleDataChange,
    handleTemplateSelect,
    handleAddSlide,
    handleDeleteSlide,
    handleDuplicateSlide,
    toggleSelection,
    handleSelectAll,
    onExportSingle,
    onExportSelected,
    handleWheel,
    MIN_ZOOM,
    MAX_ZOOM,
  } = useScreenshotEditor();

  // Add Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  // Responsive check
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-full bg-[#faf8f1] dark:bg-[#191C1E] flex-col md:flex-row overflow-hidden relative">
      <FontLoader />

      {/* Sidebar Controls */}
      <EditorSidebar
        currentSlide={currentSlide}
        templates={TEMPLATES}
        onDataChange={handleDataChange}
        onSelectTemplate={handleTemplateSelect}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
        {/* Toggle Sidebar Button (Visible when closed) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-6 left-6 z-30 p-2 bg-white dark:bg-[#252526] border-2 border-black neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            title="Open Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="9" x2="9" y1="3" y2="21" />
            </svg>
          </button>
        )}

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

        {/* Hidden Preview Area for Bulk Export - Only render when needed */}
        {showExportDialog && (
          <HiddenExportPreviews slides={slides} slideRefs={slideRefs} />
        )}

        {/* Preview Area Wrapper */}
        <PreviewArea
          currentSlide={currentSlide}
          currentTemplate={currentTemplate}
          previewScale={previewScale}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          canvasRef={canvasRef}
          onWheel={handleWheel}
          onPreviewScaleChange={setPreviewScale}
          onDataChange={handleDataChange}
        />

        {/* Slides Strip */}
        <SlideList
          slides={slides}
          currentSlideIndex={activeIndex}
          onSelectSlide={setCurrentSlideIndex}
          onAddSlide={handleAddSlide}
          onDeleteSlide={handleDeleteSlide}
          onDuplicateSlide={handleDuplicateSlide}
        />
      </div>
    </div>
  );
};
