"use client";

import React, { forwardRef, useMemo, memo, useRef } from "react";
import { ScreenshotData, Template } from "@/lib/types";
import Image from "next/image";
import { DEFAULT_ANDROID_SCALE, DEFAULT_IOS_SCALE } from "@/lib/constants";

interface CanvasPreviewProps {
  data: ScreenshotData;
  template: Template;
  scale: number;
  priority?: boolean;
  onChange?: (updates: Partial<ScreenshotData>) => void;
  interactionScale?: number;
}

const CanvasPreviewComponent = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  (
    { data, template, scale, priority = false, onChange, interactionScale = 1 },
    ref
  ) => {
    const { width, height } = data.dimensions || template.defaultDimensions;

    // Refs for direct DOM manipulation during drag
    const textRef = useRef<HTMLDivElement>(null);
    const deviceWrapperRef = useRef<HTMLDivElement>(null);
    const deviceInnerRef = useRef<HTMLDivElement>(null);

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
    const [isSafari, setIsSafari] = React.useState(false);

    React.useEffect(() => {
      const isSafariCheck =
        typeof navigator !== "undefined" &&
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      setIsSafari(isSafariCheck);
    }, []);

    const screenScale = useMemo(
      () =>
        template.platform === "ios" ? DEFAULT_IOS_SCALE : DEFAULT_ANDROID_SCALE,
      [template.platform]
    );

    const frameSrc = useMemo(() => {
      const ext = isSafari ? "png" : "svg";
      return template.hasNotch && !data.showNotch
        ? `/frame/${template.deviceFrame}-frame-only.${ext}`
        : `/frame/${template.deviceFrame}.${ext}`;
    }, [template.hasNotch, template.deviceFrame, data.showNotch, isSafari]);

    React.useEffect(() => {
      if (!dragState || !onChange) return;

      let rafId: number | null = null;
      let latestMouseEvent: MouseEvent | null = null;

      const handleMouseMove = (e: MouseEvent) => {
        // Store the latest mouse event
        latestMouseEvent = e;

        // Only schedule a new RAF if one isn't already pending
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            if (!latestMouseEvent) return;

            const deltaX =
              (latestMouseEvent.clientX - dragState.startX) /
              (scale * interactionScale);
            const deltaY =
              (latestMouseEvent.clientY - dragState.startY) /
              (scale * interactionScale);

            if (dragState.type === "text" && textRef.current) {
              const newX = dragState.startData.textTranslateX + deltaX;
              const newY = dragState.startData.textTranslateY + deltaY;
              textRef.current.style.transform = `translate(-50%, -50%) translate(${newX}px, ${newY}px)`;
            } else if (
              dragState.type === "device" &&
              deviceWrapperRef.current
            ) {
              const newX = dragState.startData.deviceTranslateX + deltaX;
              const newY = dragState.startData.deviceTranslateY + deltaY;
              deviceWrapperRef.current.style.transform = `translate(-50%, -50%) translate(${newX}px, ${newY}px)`;
            } else if (dragState.type === "rotate" && deviceInnerRef.current) {
              const newRotate = dragState.startData.deviceRotate + deltaX * 0.5;
              const currentScale =
                screenScale * dragState.startData.deviceScale;
              deviceInnerRef.current.style.transform = `scale(${currentScale}) rotate(${newRotate}deg) translateZ(0px)`;
            }

            rafId = null;
            latestMouseEvent = null;
          });
        }
      };

      const handleMouseUp = (e: MouseEvent) => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }

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

        setDragState(null);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [dragState, onChange, scale, interactionScale, screenScale]);

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
              />
            </div>
          )}

          {/* Content Container */}
          <div className="relative z-10 w-full h-full">
            {/* Text Section */}
            <div
              ref={textRef}
              className="absolute left-1/2 top-[10%] z-30 flex flex-col justify-center p-8 w-full pointer-events-auto will-change-transform"
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
              ref={deviceWrapperRef}
              className="absolute left-1/2 top-[58%] pointer-events-auto will-change-transform"
              onMouseDown={(e) => handleMouseDown(e, "device")}
              style={{
                cursor: onChange ? "move" : "default",
                transform: `translate(-50%, -50%) translate(${data.deviceTranslateX}px, ${data.deviceTranslateY}px)`,
              }}
            >
              <div
                ref={deviceInnerRef}
                className={`relative w-full h-auto aspect-[1/2.16]`}
                style={{
                  width: template.defaultDimensions.width,
                  transform: `scale(${screenScale * data.deviceScale}) rotate(${data.deviceRotate}deg) translateZ(0)`,
                  transformOrigin: "center center",
                }}
              >
                {/* Frame Image */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  <Image
                    src={frameSrc}
                    alt="Device Frame"
                    width={template.defaultDimensions.width}
                    height={template.defaultDimensions.height}
                    className="w-full h-full object-contain"
                    priority={true}
                    unoptimized={true}
                    loading="eager"
                  />
                </div>

                {/* Screenshot Content inside the frame */}
                <div
                  className="absolute z-10 overflow-hidden flex items-center justify-center top-0 left-0"
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
                      className="w-full h-full object-fill"
                      style={{
                        borderRadius: template.screenRegion.borderRadius,
                      }}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-gray-500 text-6xl bg-gray-100 font-bold"
                      style={{
                        borderRadius: template.screenRegion.borderRadius,
                      }}
                    >
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

// Set display name for the base component
CanvasPreviewComponent.displayName = "CanvasPreview";

// Memoize the component to prevent unnecessary re-renders
export const CanvasPreview = memo(CanvasPreviewComponent);
