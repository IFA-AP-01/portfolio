"use client";

import React, { forwardRef } from "react";
import { ScreenshotData, Template } from "@/lib/types";
import Image from "next/image";

interface CanvasPreviewProps {
  data: ScreenshotData;
  template: Template;
  scale: number;
  priority?: boolean;
  onChange?: (updates: Partial<ScreenshotData>) => void;
  interactionScale?: number;
}

const DEFAULT_IOS_SCALE = 0.75;
const DEFAULT_ANDROID_SCALE = 0.65;

export const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  (
    { data, template, scale, priority = false, onChange, interactionScale = 1 },
    ref
  ) => {
    const { width, height } = template.defaultDimensions;

    const [dragState, setDragState] = React.useState<{
      type: "text" | "device" | "rotate";
      startX: number;
      startY: number;
      startData: ScreenshotData;
    } | null>(null);

    const handleMouseDown = (
      e: React.MouseEvent,
      type: "text" | "device" | "rotate"
    ) => {
      if (!onChange) return;
      e.stopPropagation();
      e.preventDefault();
      setDragState({
        type,
        startX: e.clientX,
        startY: e.clientY,
        startData: { ...data },
      });
    };

    React.useEffect(() => {
      if (!dragState || !onChange) return;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX =
          (e.clientX - dragState.startX) / (scale * interactionScale);
        const deltaY =
          (e.clientY - dragState.startY) / (scale * interactionScale);

        if (dragState.type === "text") {
          onChange({
            textTranslateX: dragState.startData.textTranslateX + deltaX,
            textTranslateY: dragState.startData.textTranslateY + deltaY,
          });
        } else if (dragState.type === "device") {
          onChange({
            deviceTranslateX: dragState.startData.deviceTranslateX + deltaX,
            deviceTranslateY: dragState.startData.deviceTranslateY + deltaY,
          });
        } else if (dragState.type === "rotate") {
          onChange({
            deviceRotate: dragState.startData.deviceRotate + deltaX * 0.5,
          });
        }
      };

      const handleMouseUp = () => {
        setDragState(null);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [dragState, onChange, scale, interactionScale]);

    const screenScale =
      template.platform === "ios" ? DEFAULT_IOS_SCALE : DEFAULT_ANDROID_SCALE;

    return (
      <div
        className="relative overflow-hidden bg-white"
        style={{
          width: width,
          height: height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div
          ref={ref}
          className="w-full h-full relative flex flex-col"
          style={{
            background:
              data.backgroundType === "gradient"
                ? `linear-gradient(${data.gradientAngle}deg, ${data.gradientColorFrom}, ${data.gradientColorTo})`
                : data.backgroundColor,
          }}
        >
          {/* Background Image if present */}
          {data.backgroundImage && (
            <div className="absolute inset-0 z-0">
              <Image
                src={data.backgroundImage}
                alt="Background"
                width={width}
                height={height}
                className="w-full h-full object-cover"
                priority={priority}
                unoptimized
              />
            </div>
          )}

          {/* Content Container */}
          <div className="relative z-10 w-full h-full">
            {/* Text Section */}
            <div
              className="absolute left-1/2 top-[10%] z-30 flex flex-col justify-center p-8 w-full pointer-events-auto"
              style={{
                transform: `translate(-50%, -50%) translate(${data.textTranslateX}px, ${data.textTranslateY}px)`,
                cursor: onChange ? "move" : "default",
              }}
              onMouseDown={(e) => handleMouseDown(e, "text")}
            >
              <h1
                style={{
                  color: data.titleColor,
                  fontFamily: data.titleFontFamily,
                  fontSize: `${data.titleFontSize}px`,
                  fontWeight: data.titleFontWeight,
                  fontStyle: data.titleFontStyle,
                  textDecoration: data.titleTextDecoration,
                  letterSpacing: `${data.titleLetterSpacing}em`,
                  lineHeight: data.titleLineHeight,
                  textShadow: data.titleTextShadow
                    ? "2px 2px 4px rgba(0,0,0,0.5)"
                    : "none",
                  marginBottom: "1rem",
                  textAlign: data.titleTextAlign,
                }}
              >
                {data.title}
              </h1>
              <h2
                style={{
                  color: data.subtitleColor,
                  fontFamily: data.subtitleFontFamily,
                  fontSize: `${data.subtitleFontSize}px`,
                  fontWeight: data.subtitleFontWeight,
                  fontStyle: data.subtitleFontStyle,
                  textDecoration: data.subtitleTextDecoration,
                  letterSpacing: `${data.subtitleLetterSpacing}em`,
                  lineHeight: data.subtitleLineHeight,
                  textShadow: data.subtitleTextShadow
                    ? "2px 2px 4px rgba(0,0,0,0.5)"
                    : "none",
                  textAlign: data.subtitleTextAlign,
                }}
              >
                {data.subtitle}
              </h2>
            </div>

            {/* Device Frame Section */}
            <div
              className="absolute left-1/2 top-[58%] pointer-events-auto"
              onMouseDown={(e) => handleMouseDown(e, "device")}
              style={{
                cursor: onChange ? "move" : "default",
                transform: `translate(-50%, -50%) translate(${data.deviceTranslateX}px, ${data.deviceTranslateY}px)`,
              }}
            >
              <div
                className={`relative w-full h-auto aspect-[1/2.16]`}
                style={{
                  width: template.defaultDimensions.width,
                  transform: `scale(${screenScale * data.deviceScale}) rotate(${data.deviceRotate}deg)`,
                  transformOrigin: "center center",
                }}
              >
                {/* Frame Image */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  <Image
                    src={
                      data.showNotch
                        ? `/frame/${template.deviceFrame}.svg`
                        : `/frame/${template.deviceFrame}-frame-only.svg`
                    }
                    alt="Device Frame"
                    width={template.defaultDimensions.width}
                    height={template.defaultDimensions.height}
                    className="w-full h-full object-contain"
                    priority={priority}
                    unoptimized
                  />
                </div>

                {/* Screenshot Content inside the frame */}
                <div
                  className="absolute z-10 overflow-hidden flex items-center justify-center top-0 left-0 rounded-[9rem]"
                  style={{
                    top: template.screenRegion.top,
                    left: template.screenRegion.left,
                    width: template.screenRegion.width,
                    height: template.screenRegion.height,
                    borderRadius: template.screenRegion.borderRadius,
                  }}
                >
                  {data.screenshotImage ? (
                    <Image
                      src={data.screenshotImage}
                      alt="App Screenshot"
                      width={template.defaultDimensions.width}
                      height={template.defaultDimensions.height}
                      className="w-full h-full object-fill rounded-[9rem]"
                      priority={priority}
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-6xl bg-gray-100 font-bold rounded-[9rem]">
                      Empty Image
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CanvasPreview.displayName = "CanvasPreview";
