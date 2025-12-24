import { useCallback, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import { DiagramElement } from '@/lib/types';

export const useDiagramExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(async (
    containerRef: React.RefObject<HTMLDivElement>,
    elements: DiagramElement[]
  ) => {
    if (!containerRef.current || elements.length === 0) return;

    setIsExporting(true);

    try {
      // Calculate bounding box
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      elements.forEach((el) => {
        minX = Math.min(minX, el.x);
        minY = Math.min(minY, el.y);
        maxX = Math.max(maxX, el.x + el.width);
        maxY = Math.max(maxY, el.y + el.height);
      });

      // Add padding
      const padding = 50;
      const width = maxX - minX + (padding * 2);
      const height = maxY - minY + (padding * 2);

      // We want to capture the inner content div which holds the elements
      // It is the first child of the canvas container
      const contentNode = containerRef.current.firstElementChild as HTMLElement;
      
      if (!contentNode) {
          throw new Error("Content node not found");
      }

      const dataUrl = await htmlToImage.toPng(contentNode, {
        width: width,
        height: height,
        style: {
          transform: `translate(${-minX + padding}px, ${-minY + padding}px)`,
          transformOrigin: 'top left',
          width: `${width}px`,
          height: `${height}px`,
          position: 'relative', // Ensure it doesn't try to be absolute inset-0 in the clone
          left: '0',
          top: '0',
        },
        pixelRatio: 2,
        backgroundColor: '#ffffff', 
      });

      saveAs(dataUrl, `diagram-${Date.now()}.png`);
    } catch (err) {
      console.error('Export failed', err);
      alert('Failed to export diagram');
    } finally {
      setIsExporting(false);
    }
  }, []);

  return {
    isExporting,
    handleExport
  };
};
