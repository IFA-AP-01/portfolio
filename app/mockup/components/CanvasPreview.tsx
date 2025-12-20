"use client";

import React, { forwardRef } from "react";
import { ScreenshotData, Template } from "../types";
import Image from "next/image";

interface CanvasPreviewProps {
  data: ScreenshotData;
  template: Template;
  scale: number;
}

export const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  ({ data, template, scale }, ref) => {
    const { width, height } = template.defaultDimensions;

    // Calculate layout styles based on template
    const isTextTop = template.layout === "text-top";
    const isTextBottom = template.layout === "text-bottom";

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
          style={{ backgroundColor: data.backgroundColor }}
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
          <div
            className={`relative z-10 w-full h-full p-12 flex flex-col ${isTextBottom ? "justify-end" : "justify-start"}`}
          >
            {/* Text Section - Order depends on layout */}
            {(isTextTop ||
              template.layout === "text-overlay" ||
              template.layout === "phone-left" ||
              template.layout === "phone-right") && (
              <div
                className="mb-8 pt-20 px-8"
                style={{ textAlign: data.textAlign }}
              >
                <h1
                  style={{
                    color: data.titleColor,
                    fontFamily: data.fontFamily,
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
                  }}
                >
                  {data.title}
                </h1>
                <h2
                  style={{
                    color: data.subtitleColor,
                    fontFamily: data.fontFamily,
                    fontSize: `${data.subtitleFontSize}px`,
                    fontWeight: data.subtitleFontWeight,
                    fontStyle: data.subtitleFontStyle,
                    textDecoration: data.subtitleTextDecoration,
                    letterSpacing: `${data.subtitleLetterSpacing}em`,
                    lineHeight: data.subtitleLineHeight,
                    textShadow: data.subtitleTextShadow
                      ? "2px 2px 4px rgba(0,0,0,0.5)"
                      : "none",
                  }}
                >
                  {data.subtitle}
                </h2>
              </div>
            )}

            {/* Device Frame Section */}
            <div
              className={`flex-1 relative flex justify-center items-center overflow-hidden transition-all duration-500
                ${template.layout === "phone-left" ? "-translate-x-[25%]" : ""}
                ${template.layout === "phone-right" ? "translate-x-[25%]" : ""}
              `}
            >
              <div className="relative w-[85%] h-auto aspect-[1/2.16]">
                {/* Frame Image */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  <Image
                    src={template.deviceFrame}
                    alt="Device Frame"
                    width={template.defaultDimensions.width}
                    height={template.defaultDimensions.height}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Screenshot Content inside the frame */}
                <div
                  className="absolute z-10 overflow-hidden flex items-center justify-center"
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
                      className="w-full h-full object-contain rounded-[6rem]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100 text-3xl font-bold rounded-[10rem]">
                      Upload
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Text Bottom Section */}
            {isTextBottom && (
              <div
                className="mt-8 pb-20 px-8"
                style={{ textAlign: data.textAlign }}
              >
                <h1
                  style={{
                    color: data.titleColor,
                    fontFamily: data.fontFamily,
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
                  }}
                >
                  {data.title}
                </h1>
                <h2
                  style={{
                    color: data.subtitleColor,
                    fontFamily: data.fontFamily,
                    fontSize: `${data.subtitleFontSize}px`,
                    fontWeight: data.subtitleFontWeight,
                    fontStyle: data.subtitleFontStyle,
                    textDecoration: data.subtitleTextDecoration,
                    letterSpacing: `${data.subtitleLetterSpacing}em`,
                    lineHeight: data.subtitleLineHeight,
                    textShadow: data.subtitleTextShadow
                      ? "2px 2px 4px rgba(0,0,0,0.5)"
                      : "none",
                  }}
                >
                  {data.subtitle}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

CanvasPreview.displayName = "CanvasPreview";
