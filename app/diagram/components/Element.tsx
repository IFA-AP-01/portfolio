import React, { useState, useRef } from 'react';
import { DiagramElement, ElementType } from '@/lib/types';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { ResizeHandles } from './ResizeHandles';

interface ElementProps {
  element: DiagramElement;
  isSelected: boolean;
  zoom: number;
  activeTool: 'select' | 'hand' | ElementType;
  onSelect: (id: string, shiftKey: boolean) => void;
  onUpdate: (id: string, updates: Partial<DiagramElement>) => void;
}

export const Element: React.FC<ElementProps> = ({ 
  element, 
  isSelected, 
  zoom,
  activeTool,
  onSelect, 
  onUpdate 
}) => {
  const { type, x, y, width, height, text, fill, stroke, strokeColor, textColor, fontSize, fontWeight } = element;
  
  // Local state for smooth dragging
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Refs for event handlers to avoid stale closures and dependency cycles
  const handlersRef = useRef<{
    move: (e: PointerEvent) => void;
    up: (e: PointerEvent) => void;
  }>();

  // Focus textarea when editing starts
  React.useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTextBlur = () => {
    setIsEditing(false);
    if (textareaRef.current) {
      onUpdate(element.id, { text: textareaRef.current.value });
    }
  };

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
      if (textareaRef.current) {
        onUpdate(element.id, { text: textareaRef.current.value });
      }
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
    e.stopPropagation(); // Prevent shortcuts from triggering
  };

  const renderShape = () => {
    const commonContent = (
      <>
        <span 
          style={{ 
            color: textColor, 
            fontSize, 
            fontWeight, 
            opacity: isEditing ? 0 : 1, // Hide text when editing
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            pointerEvents: 'none'
          }} 
          className="text-center px-1 w-full"
        >
          {text}
        </span>
        {isEditing && (
          <textarea
            ref={textareaRef}
            defaultValue={text}
            onBlur={handleTextBlur}
            onKeyDown={handleTextKeyDown}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              fontSize,
              fontWeight,
              color: textColor,
              textAlign: 'center',
              background: 'transparent',
              border: 'none',
              resize: 'none',
              outline: 'none',
              overflow: 'hidden',
              padding: '4px', // Standard padding-like alignment
              lineHeight: 'inherit'
            }}
            className="flex items-center justify-center"
          />
        )}
      </>
    );

    switch (type) {
      case 'rect':
        return (
          <div 
            style={{ 
              width, 
              height, 
              backgroundColor: fill, 
              border: `${stroke}px solid ${strokeColor}`,
              borderRadius: '4px'
            }}
            className="flex items-center justify-center overflow-hidden relative"
          >
            {commonContent}
          </div>
        );
      case 'ellipse':
        return (
          <div 
            style={{ 
              width, 
              height, 
              backgroundColor: fill, 
              border: `${stroke}px solid ${strokeColor}`,
              borderRadius: '50%'
            }}
            className="flex items-center justify-center overflow-hidden relative"
          >
            {commonContent}
          </div>
        );
      case 'diamond':
        return (
          <div 
            style={{ 
              width, 
              height, 
              // transform: 'rotate(45deg)', // No longer rotating the container
            }}
            className="flex items-center justify-center relative"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
               <path
                 d="M50 0 L100 50 L50 100 L0 50 Z"
                 fill={fill}
                 stroke={strokeColor}
                 strokeWidth={stroke}
               />
            </svg>
             <div 
              style={{
                position: 'relative',
                zIndex: 1,
                width: '70%', // roughly 1/sqrt(2) to fit inside
                height: '70%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {commonContent}
             </div>
          </div>
        );
      case 'text':
        return (
          <div 
            style={{ width, height }}
            className="flex items-center justify-center relative"
          >
            {commonContent}
          </div>
        );
      case 'connector':
          const { connectorType = 'straight', flipX, flipY } = element;
          
          return (
            <div style={{ width, height, position: 'relative', pointerEvents: 'none' }}>
              <svg
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
              >
                {(() => {
                  const sx = flipX ? width : 0;
                  const sy = flipY ? height : 0;
                  const ex = flipX ? 0 : width;
                  const ey = flipY ? 0 : height;
                  
                  const dx = ex - sx;
                  const dy = ey - sy;
                  
                  if (connectorType === 'straight') {
                     return (
                        <line
                          x1={sx}
                          y1={sy}
                          x2={ex}
                          y2={ey}
                          stroke={strokeColor}
                          strokeWidth={stroke}
                        />
                     );
                  }

                  let path = '';
                  // Simple auto-orientation logic
                  const isHorizontal = Math.abs(dx) > Math.abs(dy);

                  if (connectorType === 'curve') {
                     if (isHorizontal) {
                       const cp1x = sx + dx * 0.5;
                       const cp1y = sy;
                       const cp2x = ex - dx * 0.5;
                       const cp2y = ey;
                       path = `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`;
                     } else {
                       const cp1x = sx;
                       const cp1y = sy + dy * 0.5;
                       const cp2x = ex;
                       const cp2y = ey - dy * 0.5;
                       path = `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`;
                     }
                  } else if (connectorType === 'elbow') {
                     if (isHorizontal) {
                       const midX = sx + dx * 0.5;
                       path = `M ${sx} ${sy} L ${midX} ${sy} L ${midX} ${ey} L ${ex} ${ey}`;
                     } else {
                       const midY = sy + dy * 0.5;
                       path = `M ${sx} ${sy} L ${sx} ${midY} L ${ex} ${midY} L ${ex} ${ey}`;
                     }
                  }

                  return (
                    <path
                      d={path}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={stroke}
                    />
                  );
                })()}
              </svg>
            </div>
          );
      case 'triangle':
        return (
          <div style={{ width, height }} className="flex items-center justify-center relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <path d="M50 0 L100 100 L0 100 Z" fill={fill} stroke={strokeColor} strokeWidth={stroke} />
            </svg>
            <div style={{ position: 'relative', zIndex: 1, width: '70%', height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20%' }}>
              {commonContent}
            </div>
          </div>
        );
      case 'parallelogram':
        return (
          <div style={{ width, height }} className="flex items-center justify-center relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <path d="M25 0 L100 0 L75 100 L0 100 Z" fill={fill} stroke={strokeColor} strokeWidth={stroke} />
            </svg>
             <div style={{ position: 'relative', zIndex: 1, width: '80%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {commonContent}
            </div>
          </div>
        );
      case 'cylinder':
        return (
          <div style={{ width, height }} className="flex items-center justify-center relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              {/* Top ellipse */}
              <ellipse cx="50" cy="15" rx="50" ry="15" fill={fill} stroke={strokeColor} strokeWidth={stroke} />
              {/* Body */}
              <path d="M0 15 L0 85 A50 15 0 0 0 100 85 L100 15" fill={fill} stroke={strokeColor} strokeWidth={stroke} />
              {/* Top ellipse border (half) to cover body line overlap if filled, or just redraw top */}
               <ellipse cx="50" cy="15" rx="50" ry="15" fill="none" stroke={strokeColor} strokeWidth={stroke} />
            </svg>
            <div style={{ position: 'relative', zIndex: 1, width: '80%', height: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10%' }}>
              {commonContent}
            </div>
          </div>
        );
      case 'document':
        return (
            <div style={{ width, height }} className="flex items-center justify-center relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <path d="M0 0 L100 0 L100 80 Q75 100 50 80 Q25 60 0 80 Z" fill={fill} stroke={strokeColor} strokeWidth={stroke} />
            </svg>
            <div style={{ position: 'relative', zIndex: 1, width: '80%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10%' }}>
              {commonContent}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    // If using the Hand tool, do not interact with the element (allow pass-through for panning)
    if (activeTool === 'hand') return;

    // Do not drag if editing
    if (isEditing) {
      e.stopPropagation();
      return;
    }

    e.preventDefault();
    e.stopPropagation(); 
    
    // Select the element
    onSelect(element.id, e.shiftKey);
    
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    // Define handlers closing over current scope/refs
    const handlePointerMove = (moveEvent: PointerEvent) => {
      moveEvent.preventDefault();
      const dx = (moveEvent.clientX - dragStartRef.current.x) / zoom;
      const dy = (moveEvent.clientY - dragStartRef.current.y) / zoom;
      setDragOffset({ x: dx, y: dy });
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      upEvent.preventDefault();
      
      const dx = (upEvent.clientX - dragStartRef.current.x) / zoom;
      const dy = (upEvent.clientY - dragStartRef.current.y) / zoom;
      
      if (dx !== 0 || dy !== 0) {
        onUpdate(element.id, {
          x: x + dx,
          y: y + dy
        });
      }

      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
      
      // Remove listeners matches
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    handlersRef.current = { move: handlePointerMove, up: handlePointerUp };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <div
      style={{ 
        position: 'absolute',
        transform: `translate(${x + dragOffset.x}px, ${y + dragOffset.y}px)`,
        touchAction: 'none' 
      }}
      onPointerDown={handlePointerDown}
      onDoubleClick={handleDoubleClick}
      className={clsx(
        "select-none",
        activeTool === 'hand' ? "cursor-grab active:cursor-grabbing" : 
        activeTool === 'select' ? "cursor-move" : 
        "cursor-crosshair",
        // Remove the ring as ResizeHandles provides the visual selection state now
        // isSelected && "ring-2 ring-[#E9945B] ring-offset-2 dark:ring-offset-[#191C1E] rounded-sm",
        isDragging && "opacity-80"
      )}
    >
      {renderShape()}
      {isSelected && activeTool !== 'hand' && (
        <ResizeHandles 
          element={element} 
          zoom={zoom} 
          onUpdate={onUpdate} 
        />
      )}
    </div>
  );
};
