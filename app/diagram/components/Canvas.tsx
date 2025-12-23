import React, { useRef } from 'react';
import { clsx } from 'clsx';
import { DiagramElement, ElementType } from '@/lib/types';
import { Element } from './Element';

interface CanvasProps {
  elements: DiagramElement[];
  selectedIds: string[];
  zoom: number;
  pan: { x: number; y: number };
  activeTool: ElementType | 'select' | 'hand';
  onSelect: (id: string, shiftKey: boolean) => void;
  onDeselect: () => void;
  onAddElement: (type: ElementType, x: number, y: number, initialProps?: Partial<DiagramElement>) => string;
  onUpdateElement: (id: string, updates: Partial<DiagramElement>) => void;
  onWheel: (e: React.WheelEvent) => void;
  onPan: (pan: { x: number; y: number }) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  elements,
  selectedIds,
  zoom,
  pan,
  activeTool,
  onSelect,
  onDeselect,
  onAddElement,
  onUpdateElement,
  onWheel,
  onPan,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only execute canvas actions if clicking directly on the canvas container
    if (e.target !== containerRef.current) return;

    if (activeTool === 'hand') {
       // Pan Logic
       e.preventDefault();
       const startX = e.clientX;
       const startY = e.clientY;
       const startPanX = pan.x;
       const startPanY = pan.y;

       const handlePointerMove = (moveEvent: PointerEvent) => {
         moveEvent.preventDefault();
         const dx = moveEvent.clientX - startX;
         const dy = moveEvent.clientY - startY;
         onPan({ x: startPanX + dx, y: startPanY + dy });
       };

       const handlePointerUp = () => {
         window.removeEventListener('pointermove', handlePointerMove);
         window.removeEventListener('pointerup', handlePointerUp);
       };

       window.addEventListener('pointermove', handlePointerMove);
       window.addEventListener('pointerup', handlePointerUp);
       return;
    }

    if (activeTool !== 'select') {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const startX = (e.clientX - rect.left - pan.x) / zoom;
        const startY = (e.clientY - rect.top - pan.y) / zoom;

        // If connector, start drag-to-draw
        if (activeTool === 'connector') {
          const id = onAddElement(activeTool as ElementType, startX, startY, { width: 0, height: 0 });
          
          const handlePointerMove = (moveEvent: PointerEvent) => {
             moveEvent.preventDefault();
             const currentX = (moveEvent.clientX - rect.left - pan.x) / zoom;
             const currentY = (moveEvent.clientY - rect.top - pan.y) / zoom;
             
             const dx = currentX - startX;
             const dy = currentY - startY;

             onUpdateElement(id, {
               x: dx > 0 ? startX : currentX,
               y: dy > 0 ? startY : currentY,
               width: Math.max(2, Math.abs(dx)), // Min width/height for visibility
               height: Math.max(2, Math.abs(dy)),
               flipX: dx < 0,
               flipY: dy < 0
             });
          };

          const handlePointerUp = () => {
             window.removeEventListener('pointermove', handlePointerMove);
             window.removeEventListener('pointerup', handlePointerUp);
          };

          window.addEventListener('pointermove', handlePointerMove);
          window.addEventListener('pointerup', handlePointerUp);
        } else {
            // Standard click to add for other shapes
            onAddElement(activeTool as ElementType, startX, startY);
        }
      }
    } else {
      onDeselect();
    }
  };

  const gridStyle = {
    backgroundImage: `radial-gradient(circle, #00000010 1px, transparent 1px)`,
    backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
    backgroundPosition: `${pan.x}px ${pan.y}px`,
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        "w-full h-full relative overflow-hidden bg-[#faf8f1] dark:bg-[#191C1E]",
        activeTool === 'hand' ? "cursor-grab active:cursor-grabbing" : 
        activeTool === 'select' ? "cursor-default" : 
        "cursor-crosshair"
      )}
      onPointerDown={handlePointerDown}
      onWheel={onWheel}
      style={gridStyle}
    >
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {elements.map((element) => (
          <div key={element.id} className="pointer-events-auto">
            <Element
              element={element}
              isSelected={selectedIds.includes(element.id)}
              zoom={zoom}
              onSelect={onSelect}
              onUpdate={onUpdateElement}
              activeTool={activeTool}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
