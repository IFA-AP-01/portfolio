import React, { useState } from 'react';
import { SavedDiagram } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import teamImage from '@/public/logo.webp';
import { FaArrowAltCircleRight, FaTrash } from 'react-icons/fa';

interface DiagramSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  history: SavedDiagram[];
  onLoad: (diagram: SavedDiagram) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
  onSave: (name: string) => void;
}

export const DiagramSidebar: React.FC<DiagramSidebarProps> = ({
  isOpen,
  onToggle,
  history,
  onLoad,
  onDelete,
  onNew,
  onSave,
}) => {
  const [newDiagramName, setNewDiagramName] = useState('');

  const handleSave = () => {
    if (newDiagramName.trim()) {
      onSave(newDiagramName);
      setNewDiagramName('');
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full w-64 border-r-2 border-black neo-shadow flex flex-col">
        {/* Branding Header */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
             <Link href="/tools" className="flex items-center">
              <div className="neo-shadow border-black border-2 w-10 flex items-center justify-center bg-[#E9945B]">
                <Image
                  src={teamImage}
                  alt="IFA"
                  width={40}
                  height={40}
                  priority
                  className="w-8 object-contain"
                />
              </div>
            </Link>
            <span className="text-sm uppercase font-black leading-tight">Diagram Maker</span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex gap-2 mb-3">
             <button
              onClick={onNew}
              className="flex-1 py-1.5 px-3 bg-[#E9945B] hover:bg-[#d8844b] text-black font-bold uppercase text-xs border-2 border-black neo-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              New
            </button>
          </div>
          
           <div className="flex gap-2">
            <input
              type="text"
              placeholder="Save current as..."
              value={newDiagramName}
              onChange={(e) => setNewDiagramName(e.target.value)}
              className="flex-1 neo-input text-xs p-1.5 min-w-0"
            />
            <button
               onClick={handleSave}
               disabled={!newDiagramName.trim()}
               className="px-2 py-1.5 bg-white hover:bg-gray-100 disabled:opacity-50 text-black font-bold border-2 border-black neo-shadow-sm text-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              Save
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
           {history.length === 0 ? (
               <div className="text-center p-4 text-xs font-bold text-gray-400 uppercase">
                   No saved diagrams
               </div>
           ) : (
               <div className="space-y-2">
                   {history.map((item) => (
                       <div key={item.id} className="neo-card group relative p-3 cursor-pointer" onClick={() => onLoad(item)}>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-sm truncate pr-6">{item.name}</h3>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(item.id);
                                    }}
                                    className="hover:text-red-500 p-1 neo-card bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
                                    title="Delete"
                                >
                                    <FaTrash className="text-white w-3 h-3"/>
                                </button>
                            </div>
                            <div className="text-[10px] text-gray-500 font-medium">
                                {new Date(item.lastModified).toLocaleDateString()} {new Date(item.lastModified).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                             <div className="text-[10px] text-gray-400 mt-1">
                                {item.data.elements.length} elements
                            </div>
                       </div>
                   ))}
               </div>
           )}
        </div>
      </div>
        <button
        onClick={onToggle}
        className="absolute top-16 -right-8 bg-white dark:bg-[#252526] border-2 border-l-0 border-black p-1.5 cursor-pointer z-50 neo-shadow"
        title={isOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        <FaArrowAltCircleRight
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
};
