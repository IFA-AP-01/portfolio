import { useState, useRef, useEffect, useCallback } from "react";
import { ScreenshotData } from "@/lib/types";
import { TEMPLATES } from "@/lib/templates";
import { useScreenshotExport } from "./useScreenshotExport";
import { INITIAL_DATA } from "@/lib/constants";

export const useScreenshotEditor = () => {
  const [slides, setSlides] = useState<ScreenshotData[]>([INITIAL_DATA]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
    new Set()
  );

  const [previewScale, setPreviewScale] = useState(0.25);
  const MIN_ZOOM = 0.1;
  const MAX_ZOOM = 2.0;

  const STORAGE_KEY = "screenshot-editor-storage";

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSlides(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved slides", e);
      }
    }
  }, []);

  useEffect(() => {
    if (slides === undefined || slides.length === 0) return;
    
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [slides]);

  const {
    isExportingSingle,
    isExportingBulk,
    handleExportSingle,
    handleExportSelected,
  } = useScreenshotExport();

  useEffect(() => {
    if (showExportDialog) {
      setSelectedIndices(new Set(slides.map((_, i) => i)));
    }
  }, [showExportDialog, slides]);

  const toggleSelection = useCallback((index: number) => {
    setSelectedIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedIndices((prev) => {
      if (prev.size === slides.length) {
        return new Set();
      } else {
        return new Set(slides.map((_, i) => i));
      }
    });
  }, [slides]);

  const activeIndex = Math.min(
    Math.max(currentSlideIndex, 0),
    slides.length - 1
  );
  const currentSlide = slides[activeIndex] || INITIAL_DATA;
  const currentTemplate =
    TEMPLATES.find((t) => t.id === currentSlide.templateId) || TEMPLATES[0];

  const handleDataChange = useCallback(
    (newData: Partial<ScreenshotData>) => {
      setSlides((prev) => {
        const newSlides = [...prev];
        newSlides[activeIndex] = { ...newSlides[activeIndex], ...newData };
        return newSlides;
      });
    },
    [activeIndex]
  );

  const handleTemplateSelect = useCallback(
    (templateId: string) => {
      setSlides((prev) => {
        const newSlides = [...prev];
        newSlides[activeIndex] = { ...newSlides[activeIndex], templateId };
        return newSlides;
      });
    },
    [activeIndex]
  );

  const handleAddSlide = useCallback(() => {
    setSlides((prev) => [
      ...prev,
      { ...INITIAL_DATA, templateId: prev[prev.length - 1].templateId },
    ]);
    setCurrentSlideIndex((prev) => prev + 1);
  }, []);

  const handleDeleteSlide = useCallback(
    (index: number) => {
      if (slides.length <= 1) return;
      setSlides((prev) => prev.filter((_, i) => i !== index));
      if (currentSlideIndex >= index && currentSlideIndex > 0) {
        setCurrentSlideIndex((prev) => prev - 1);
      }
    },
    [slides.length, currentSlideIndex]
  );

  const handleDuplicateSlide = useCallback(
    (index: number) => {
      setSlides((prev) => {
        const newSlides = [...prev];
        const slideToDuplicate = { ...newSlides[index] };
        newSlides.splice(index + 1, 0, slideToDuplicate);
        return newSlides;
      });
      setCurrentSlideIndex(index + 1);
    },
    []
  );

  const onExportSingle = useCallback(() => {
    handleExportSingle(canvasRef, currentTemplate, activeIndex).then(() => {
      setShowExportDialog(false);
    });
  }, [handleExportSingle, currentTemplate, activeIndex]);

  const onExportSelected = useCallback(() => {
    handleExportSelected(slides, selectedIndices, slideRefs).then((success) => {
      if (success) setShowExportDialog(false);
    });
  }, [handleExportSelected, slides, selectedIndices]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      setPreviewScale((prev) =>
        Math.min(Math.max(prev + delta, 0.1), 2.0)
      );
    }
  }, []);

  return {
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
  };
};
