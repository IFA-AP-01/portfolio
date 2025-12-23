import React from 'react';
import { DiagramElement } from '@/lib/types';

interface ResizeHandlesProps {
  element: DiagramElement;
  zoom: number;
  onUpdate: (id: string, updates: Partial<DiagramElement>) => void;
}

const HANDLES = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'] as const;
type HandleType = typeof HANDLES[number];

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({ element, zoom, onUpdate }) => {
  const { id, x, y, width, height } = element;

  const handlePointerDown = (e: React.PointerEvent, type: HandleType) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;
    const startElX = x;
    const startElY = y;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      moveEvent.preventDefault();
      
      const dx = (moveEvent.clientX - startX) / zoom;
      const dy = (moveEvent.clientY - startY) / zoom;

      let newX = startElX;
      let newY = startElY;
      let newWidth = startWidth;
      let newHeight = startHeight;

      if (type.includes('e')) newWidth = Math.max(20, startWidth + dx);
      if (type.includes('w')) {
        const w = Math.max(20, startWidth - dx);
        newX = startElX + (startWidth - w);
        newWidth = w;
      }
      if (type.includes('s')) newHeight = Math.max(20, startHeight + dy);
      if (type.includes('n')) {
        const h = Math.max(20, startHeight - dy);
        newY = startElY + (startHeight - h);
        newHeight = h;
      }

      onUpdate(id, {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const getCursor = (type: HandleType) => {
    switch (type) {
      case 'nw': return 'nwse-resize';
      case 'ne': return 'nesw-resize';
      case 'sw': return 'nesw-resize';
      case 'se': return 'nwse-resize';
      case 'n': return 'ns-resize';
      case 's': return 'ns-resize';
      case 'w': return 'ew-resize';
      case 'e': return 'ew-resize';
    }
  };

  const getPosition = (type: HandleType) => {
    const size = 10;
    const offset = -size / 2;
    const style: React.CSSProperties = {
      position: 'absolute',
      width: size,
      height: size,
      backgroundColor: 'white',
      border: '1px solid #E9945B',
      borderRadius: '50%',
      zIndex: 10,
    };

    switch (type) {
      case 'nw': return { ...style, left: offset, top: offset, cursor: getCursor(type) };
      case 'n': return { ...style, left: '50%', top: offset, marginLeft: offset, cursor: getCursor(type) };
      case 'ne': return { ...style, right: offset, top: offset, cursor: getCursor(type) };
      case 'w': return { ...style, left: offset, top: '50%', marginTop: offset, cursor: getCursor(type) };
      case 'e': return { ...style, right: offset, top: '50%', marginTop: offset, cursor: getCursor(type) };
      case 'sw': return { ...style, left: offset, bottom: offset, cursor: getCursor(type) };
      case 's': return { ...style, left: '50%', bottom: offset, marginLeft: offset, cursor: getCursor(type) };
      case 'se': return { ...style, right: offset, bottom: offset, cursor: getCursor(type) };
    }
  };

  return (
    <>
      <div 
        style={{
          position: 'absolute',
          top: -2, left: -2, right: -2, bottom: -2,
          border: '1px solid #E9945B',
          pointerEvents: 'none'
        }}
      />
      {HANDLES.map((handle) => (
        <div
          key={handle}
          style={getPosition(handle)}
          onPointerDown={(e) => handlePointerDown(e, handle)}
        />
      ))}
    </>
  );
};
