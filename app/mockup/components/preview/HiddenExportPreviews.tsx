import React from "react";
import { CanvasPreview } from "./CanvasPreview";
import { ScreenshotData } from "@/lib/types";
import { TEMPLATES } from "@/lib/templates";

interface HiddenExportPreviewsProps {
  slides: ScreenshotData[];
  slideRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const HiddenExportPreviews: React.FC<HiddenExportPreviewsProps> = ({
  slides,
  slideRefs,
}) => {
  return (
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
          TEMPLATES.find((tp) => tp.id === slide.templateId) || TEMPLATES[0];
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
  );
};
