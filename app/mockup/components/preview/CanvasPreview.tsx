"use client";

import React, { forwardRef, useMemo, memo, useRef, useState } from "react";
import { ScreenshotData, Template } from "@/lib/types";
import Image from "next/image";
import { DEFAULT_ANDROID_SCALE, DEFAULT_IOS_SCALE } from "@/lib/constants";

import { FloatingTextEditor } from "./FloatingTextEditor";

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
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);

    // State for selection and editing
    const [selectedId, setSelectedId] = useState<
      "text" | "device" | "rotate" | null
    >(null);
    // Track which text field is currently being edited: null, 'title', or 'subtitle'
    const [editingTextId, setEditingTextId] = useState<
      "title" | "subtitle" | null
    >(null);
    
    // Track which text field is "active" for the floating editor (even if not editing content)
    const [activeTextField, setActiveTextField] = useState<"title" | "subtitle">("title");

    // Auto-focus when entering edit mode
    React.useEffect(() => {
      if (editingTextId === "title" && titleRef.current) {
        titleRef.current.focus();
      } else if (editingTextId === "subtitle" && subtitleRef.current) {
        subtitleRef.current.focus();
      }
    }, [editingTextId]);

    const [dragState, setDragState] = React.useState<{
      type: "text" | "device" | "rotate";
      startX: number;
      startY: number;
      startData: ScreenshotData;
    } | null>(null);

    // Handle Image Drop
    const handleDragOver = (e: React.DragEvent) => {
      if (!onChange) return;
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      if (!onChange) return;
      e.preventDefault();
      e.stopPropagation();

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((f) => f.type.startsWith("image/"));

      if (imageFile) {
        const url = URL.createObjectURL(imageFile);
        // By default, update the screenshot image
        onChange({ screenshotImage: url });
      }
    };

    const handleMouseDown = (
      e: React.MouseEvent,
      type: "text" | "device" | "rotate"
    ) => {
      if (!onChange) return;
      // If we are currently editing text, don't start dragging
      if (editingTextId) return;

      e.stopPropagation();
      e.preventDefault();

      setSelectedId(type);

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

    // Handle clicking background to deselect
    const handleBackgroundClick = () => {
      setSelectedId(null);
      setEditingTextId(null);
    };

    // Text editing handlers
    const handleTextClick = (
       e: React.MouseEvent,
       field: "title" | "subtitle"
    ) => {
       if (!onChange) return;
       // We don't stop propagation here so drag can still start from the container handler
       // But we do want to update the active field for the floating editor
       setActiveTextField(field);
    };

    const handleTextDoubleClick = (
      e: React.MouseEvent,
      field: "title" | "subtitle"
    ) => {
      if (!onChange) return;
      e.stopPropagation();
      setEditingTextId(field);
      setActiveTextField(field);
      setSelectedId("text");
    };

    const handleTextBlur = (
      e: React.FocusEvent<HTMLHeadingElement>,
      field: "title" | "subtitle"
    ) => {
      if (!onChange) return;
      setEditingTextId(null);
      const newValue = e.target.innerText;
      
      // Only update if changed prevents unnecessary renders
      if (newValue !== data[field]) {
         onChange({ [field]: newValue });
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      // Blur on Enter? Maybe not for multi-line, strictly speaking title probably single line.
      // But let's allow multi-line for now unless shift+enter?
      // Common behavior: just standard contentEditable behavior.
    };

    return (
      <div
        className="relative overflow-hidden bg-white"
        style={{
          width: width,
          height: height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        onClick={handleBackgroundClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
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
          {/* ... (background image) */}

          {/* Content Container */}
          <div className="relative z-10 w-full h-full">
            {/* Text Section */}
            <div
              ref={textRef}
              className={`absolute left-1/2 top-[10%] z-30 flex flex-col justify-center p-8 w-full pointer-events-auto will-change-transform group`}
              style={{
                transform: `translate(-50%, -50%) translate(${data.textTranslateX}px, ${data.textTranslateY}px)`,
                cursor: onChange ? (editingTextId ? "text" : "move") : "default",
              }}
              onMouseDown={(e) => handleMouseDown(e, "text")}
            >
              {/* Selection Border - Excluded from export - THICKER */}
              {selectedId === "text" && onChange && (
                <div className="absolute inset-0 border-[3px] border-blue-500 rounded-lg pointer-events-none export-exclude z-50">
                  {/* Reuse handles with slight adjust for thicker border */}
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full" />
                </div>
              )}
              
              {/* Floating Text Editor */}
              {selectedId === "text" && onChange && (
                 <FloatingTextEditor 
                    data={data}
                    field={activeTextField}
                    onChange={onChange}
                    interactionScale={interactionScale}
                 />
              )}

              {/* Hover Border - Excluded from export */}
              {!selectedId && onChange && (
                <div className="absolute inset-0 border border-transparent group-hover:border-blue-300 rounded-lg pointer-events-none export-exclude transition-colors" />
              )}

              <h1
                ref={titleRef}
                contentEditable={editingTextId === "title"}
                suppressContentEditableWarning
                onMouseDown={(e) => handleTextClick(e, "title")} 
                onDoubleClick={(e) => handleTextDoubleClick(e, "title")}
                onBlur={(e) => handleTextBlur(e, "title")}
                onKeyDown={handleKeyDown}
                className={`outline-none border-none bg-transparent min-h-[1em] ${editingTextId === "title" ? "cursor-text select-text relative z-[60]" : "cursor-inherit select-none"}`}
                style={{
                  color: data.titleColor,
                  fontFamily: data.titleFontFamily,
                  fontSize: `${data.titleFontSize}px`,
                  fontWeight: data.titleFontWeight,
                  fontStyle: data.titleFontStyle,
                  textDecoration: data.titleTextDecoration,
                  letterSpacing: `${data.titleLetterSpacing}em`,
                  lineHeight: data.titleLineHeight,
                  opacity: data.titleOpacity ?? 1,
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
                ref={subtitleRef}
                contentEditable={editingTextId === "subtitle"}
                suppressContentEditableWarning
                onMouseDown={(e) => handleTextClick(e, "subtitle")}
                onDoubleClick={(e) => handleTextDoubleClick(e, "subtitle")}
                onBlur={(e) => handleTextBlur(e, "subtitle")}
                onKeyDown={handleKeyDown}
                className={`outline-none border-none bg-transparent min-h-[1em] ${editingTextId === "subtitle" ? "cursor-text select-text relative z-[60]" : "cursor-inherit select-none"}`}
                style={{
                  color: data.subtitleColor,
                  fontFamily: data.subtitleFontFamily,
                  fontSize: `${data.subtitleFontSize}px`,
                  fontWeight: data.subtitleFontWeight,
                  fontStyle: data.subtitleFontStyle,
                  textDecoration: data.subtitleTextDecoration,
                  letterSpacing: `${data.subtitleLetterSpacing}em`,
                  lineHeight: data.subtitleLineHeight,
                  opacity: data.subtitleOpacity ?? 1,
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
              className={`absolute left-1/2 top-[58%] pointer-events-auto will-change-transform group`}
              onMouseDown={(e) => handleMouseDown(e, "device")}
              style={{
                cursor: onChange ? "move" : "default",
                transform: `translate(-50%, -50%) translate(${data.deviceTranslateX}px, ${data.deviceTranslateY}px)`,
              }}
            >
              {/* Selection Border - Excluded from export - THICKER */}
              {selectedId === "device" && onChange && (
                <div className="absolute -inset-2 border-[3px] border-blue-500 rounded-lg pointer-events-none export-exclude z-50">
                   <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full" />
                   <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full" />
                   <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full" />
                   <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full" />
                </div>
              )}
               {/* Hover Border - Excluded from export */}
              {!selectedId && onChange && (
                <div className="absolute -inset-2 border border-transparent group-hover:border-blue-300 rounded-lg pointer-events-none export-exclude transition-colors" />
              )}

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

