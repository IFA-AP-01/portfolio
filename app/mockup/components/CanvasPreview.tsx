"use client";

import React, { forwardRef } from "react";
import { ScreenshotData, Template } from "../types";
import Image from "next/image";

interface CanvasPreviewProps {
  data: ScreenshotData;
  template: Template;
  scale: number;
}

const DEFAULT_IOS_SCALE = 0.85;
const DEFAULT_ANDROID_SCALE = 0.7;

export const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  ({ data, template, scale }, ref) => {
    const { width, height } = template.defaultDimensions;

    const isTextTop = data.layout === "text-top";
    const isTextBottom = data.layout === "text-bottom";

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
              data.layout === "phone-left" ||
              data.layout === "phone-right") && (
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
                ${data.layout === "phone-left" ? "-translate-x-[20%]" : ""}
                ${data.layout === "phone-right" ? "translate-x-[20%]" : ""}
              `}
            >
              <div
                className={`relative w-full h-auto aspect-[1/2.16]`}
                style={{ transform: `scale(${screenScale})` }}
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
                      className="w-full h-full object-fill rounded-[9rem]"
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
