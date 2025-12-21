"use client";

import { useState, useCallback } from "react";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { ScreenshotData, Template } from "../types";
import { TEMPLATES } from "../data/templates";

export const useScreenshotExport = () => {
  const [isExportingSingle, setIsExportingSingle] = useState(false);
  const [isExportingBulk, setIsExportingBulk] = useState(false);

  const getExportFilter = useCallback((node: Node) => {
    if (!(node instanceof HTMLElement)) return true;

    // Robust filter to skip stylesheets that cause "cssRules" security errors
    if (
      node instanceof HTMLLinkElement &&
      node.rel === "stylesheet"
    ) {
      try {
        const sheet = node.sheet;
        if (sheet) {
          // Try to access rules to check for CORS issues
          try {
            const rules = sheet.cssRules;
            return true;
          } catch (e) {
            // If we can't access rules, skip this stylesheet to prevent crash
            console.warn(
              "Skipping inaccessible stylesheet:",
              node.href
            );
            return false;
          }
        }
      } catch (e) {
        return false;
      }
    }
    // Also skip some known problematic patterns
    if (node instanceof HTMLStyleElement || node instanceof HTMLLinkElement) {
      const href = (node as any).href || "";
      if (href.startsWith("chrome-extension://")) return false;
    }
    
    // Skip cross-origin stylesheets that cause "cssRules" error during bulk export
    if (
      node instanceof HTMLLinkElement &&
      node.rel === "stylesheet"
    ) {
      const href = node.href;
      if (
        href &&
        (href.includes("fonts.googleapis.com") ||
          !href.startsWith(window.location.origin))
      ) {
        return false;
      }
    }

    // Skip elements explicitly marked for exclusion (controls, handles)
    if (node instanceof HTMLElement && node.classList.contains("export-exclude")) {
      return false;
    }
    
    return true;
  }, []);

  const handleExportSingle = useCallback(async (
    canvasRef: React.RefObject<HTMLDivElement>,
    template: Template,
    activeIndex: number
  ) => {
    if (canvasRef.current === null) return;

    setIsExportingSingle(true);
    try {
      const dataUrl = await htmlToImage.toPng(canvasRef.current, {
        canvasWidth: template.defaultDimensions.width,
        canvasHeight: template.defaultDimensions.height,
        pixelRatio: 2,
        skipAutoScale: true,
        cacheBust: true,
        filter: getExportFilter as (node: Node) => boolean,
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();

      if (blob) {
        saveAs(blob, `screenshot-${activeIndex + 1}-${Date.now()}.png`);
      }
    } catch (err) {
      console.error("Export failed", err);
      const message = err instanceof Error ? err.message : String(err);
      alert(`Failed to export image: ${message}`);
    } finally {
      setIsExportingSingle(false);
    }
  }, [getExportFilter]);

  const handleExportSelected = useCallback(async (
    slides: ScreenshotData[],
    selectedIndices: Set<number>,
    slideRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  ) => {
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
          const dataUrl = await htmlToImage.toPng(ref, {
            canvasWidth: template.defaultDimensions.width,
            canvasHeight: template.defaultDimensions.height,
            pixelRatio: 2,
            skipAutoScale: true,
            cacheBust: true,
            filter: getExportFilter as (node: Node) => boolean,
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
        return true; // Success
      } else {
        alert("No images were generated.");
        return false;
      }
    } catch (err) {
      console.error("Export failed", err);
      const message = err instanceof Error ? err.message : String(err);
      alert(`Failed to export images: ${message}`);
      return false;
    } finally {
      setIsExportingBulk(false);
    }
  }, [getExportFilter]);

  return {
    isExportingSingle,
    isExportingBulk,
    handleExportSingle,
    handleExportSelected,
  };
};
