"use client";

import React, { useEffect } from 'react';
import { useDiagramEditor } from '@/hooks/useDiagramEditor';
import { Canvas } from './Canvas';
import { Header } from '@/app/mockup/components/control/Header';
import { Toolbar } from './Toolbar';

export const DiagramEditor: React.FC = () => {
  const {
    elements,
    selectedIds,
    activeTool,
    zoom,
    pan,
    setSelectedIds,
    setActiveTool,
    addElement,
    updateElement,
    deleteSelected,
    handleWheel,
    setPan,
    activeConnectorType,
    setConnectorType,
  } = useDiagramEditor();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if focus is in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelected();
      } else if (e.key === 'v') {
        setActiveTool('select');
      } else if (e.key === 'h') {
        setActiveTool('hand');
      } else if (e.key === 'r') {
        setActiveTool('rect');
      } else if (e.key === 'o') {
        setActiveTool('ellipse');
      } else if (e.key === 'd') {
        setActiveTool('diamond');
      } else if (e.key === 't') {
        setActiveTool('text');
      } else if (e.key === 'l') {
        setActiveTool('connector');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelected, setActiveTool]);

  return (
    <div className="flex flex-col h-full bg-[#faf8f1] dark:bg-[#191C1E] overflow-hidden relative">
      <div className="bg-white dark:bg-[#252526] border-b-2 border-black p-4 z-50">
        <Header title="Diagram Maker" showCloseButton={false}/>
      </div>
      
      <div className="flex-1 relative">
        <Canvas
          elements={elements}
          selectedIds={selectedIds}
          zoom={zoom}
          pan={pan}
          activeTool={activeTool}
          onSelect={(id, shiftKey) => {
            if (shiftKey) {
              setSelectedIds(
                selectedIds.includes(id)
                  ? selectedIds.filter((i) => i !== id)
                  : [...selectedIds, id]
              );
            } else {
              setSelectedIds([id]);
            }
          }}
          onDeselect={() => setSelectedIds([])}
          onAddElement={addElement}
          onUpdateElement={updateElement}
          onWheel={handleWheel}
          onPan={setPan}
        />

        <Toolbar
          activeTool={activeTool}
          onSelectTool={setActiveTool}
          activeConnectorType={activeConnectorType}
          onSelectConnectorType={setConnectorType}
        />
        
        {/* Selection Info / Controls Floating Panel? To be implemented if needed */}
        {selectedIds.length > 0 && (
          <div className="fixed top-24 right-8 z-40 p-4 bg-white dark:bg-[#252526] border-2 border-black neo-shadow-sm rounded-lg flex flex-col gap-2 min-w-[200px]">
            <h3 className="text-xs font-black uppercase text-gray-500 mb-1">Properties</h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold">Text</label>
                <input 
                  type="text"
                  className="neo-input text-sm p-1"
                  value={elements.find(el => el.id === selectedIds[0])?.text || ''}
                  onChange={(e) => updateElement(selectedIds[0], { text: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold">Fill Color</label>
                <div className="flex gap-2">
                   <input 
                    type="color"
                    className="w-full h-8 cursor-pointer"
                    value={elements.find(el => el.id === selectedIds[0])?.fill || '#ffffff'}
                    onChange={(e) => updateElement(selectedIds[0], { fill: e.target.value })}
                  />
                </div>
              </div>
              <button 
                onClick={deleteSelected}
                className="mt-2 neo-button bg-red-500 text-white text-xs py-1.5"
              >
                Delete Element
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Instructions footer? */}
      <div className="absolute top-24 left-8 z-40 hidden md:block">
        <div className="p-3 bg-white/80 dark:bg-[#252526]/80 backdrop-blur-sm border border-black/10 rounded-lg text-[10px] text-gray-500 uppercase font-bold tracking-wider space-y-1">
          <p>Drag to move • Shift+Click to multiselect</p>
          <p>Space + Drag to pan • Ctrl + Scroll to zoom</p>
        </div>
      </div>
    </div>
  );
};
