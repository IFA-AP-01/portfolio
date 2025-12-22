import React from "react";
import { CanvasPreview } from "./CanvasPreview";
import { NeoBrutalSlider } from "@/components/common/slider";
import { ScreenshotData, Template } from "@/lib/types";

interface PreviewAreaProps {
  currentSlide: ScreenshotData;
  currentTemplate: Template;
  previewScale: number;
  minZoom: number;
  maxZoom: number;
  canvasRef: React.RefObject<HTMLDivElement>;
  onWheel: (e: React.WheelEvent) => void;
  onPreviewScaleChange: (value: number) => void;
  onDataChange: (newData: Partial<ScreenshotData>) => void;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({
  currentSlide,
  currentTemplate,
  previewScale,
  minZoom,
  maxZoom,
  canvasRef,
  onWheel,
  onPreviewScaleChange,
  onDataChange,
}) => {
  return (
    <div className="flex-1 relative bg-[#faf8f1] dark:bg-[#191C1E] overflow-hidden">
      {/* Background Pattern - Fixed */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* Scrollable Container */}
      <div
        className="absolute inset-0 overflow-auto flex p-10 custom-scrollbar"
        onWheel={onWheel}
      >
        {/* Scaled Content - Centered via m-auto */}
        <div
          style={{
            width: currentTemplate.defaultDimensions.width * previewScale,
            height: currentTemplate.defaultDimensions.height * previewScale,
          }}
          className="relative shadow-2xl transition-all duration-300 m-auto shrink-0"
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
              onChange={onDataChange}
              interactionScale={previewScale}
            />
          </div>
        </div>
      </div>

      {/* Zoom Control - Fixed Overlay */}
      <div className="absolute bottom-2 right-2 z-30 w-64">
        <div className="flex items-center gap-4">
          <NeoBrutalSlider
            value={previewScale}
            min={minZoom}
            max={maxZoom}
            step={0.05}
            onChange={onPreviewScaleChange}
          />
          <span className="text-xs font-bold whitespace-nowrap">
            {Math.round(previewScale * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
