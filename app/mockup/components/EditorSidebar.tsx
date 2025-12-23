import React from "react";
import { ControlPanel } from "./control/ControlPanel";
import { ScreenshotData, Template } from "@/lib/types";

interface EditorSidebarProps {
  currentSlide: ScreenshotData;
  templates: Template[];
  onDataChange: (newData: Partial<ScreenshotData>) => void;
  onSelectTemplate: (templateId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  currentSlide,
  templates,
  onDataChange,
  onSelectTemplate,
  isOpen,
  onToggle,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
        fixed md:relative z-40 h-full bg-white dark:bg-[#252526]
        transition-all duration-300 ease-in-out overflow-hidden
        border-r-2 border-black dark:border-gray-600
        ${isOpen ? "translate-x-0 w-[85vw] md:w-[26rem]" : "-translate-x-full md:translate-x-0 md:w-0 md:border-r-0"}
      `}
      >
        <div className="flex flex-col h-full w-[85vw] md:w-[26rem]">
          <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            <ControlPanel
              data={currentSlide}
              onChange={onDataChange}
              templates={templates}
              onSelectTemplate={onSelectTemplate}
              selectedTemplateId={currentSlide.templateId}
              onClose={onToggle}
            />
          </div>
        </div>
      </div>
    </>
  );
};
