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
    toggleSelection,
    handleSelectAll,
    onExportSingle,
    onExportSelected,
    handleWheel,
    MIN_ZOOM,
    MAX_ZOOM,
  } = useScreenshotEditor();

  return (
    <div className="flex h-full bg-[#faf8f1] dark:bg-[#191C1E] flex-col md:flex-row overflow-hidden">
      <FontLoader />

      {/* Sidebar Controls */}
      <EditorSidebar
        currentSlide={currentSlide}
        templates={TEMPLATES}
        onDataChange={handleDataChange}
        onSelectTemplate={handleTemplateSelect}
      />

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
        <HiddenExportPreviews slides={slides} slideRefs={slideRefs} />

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
        />
      </div>
    </div>
  );
};
