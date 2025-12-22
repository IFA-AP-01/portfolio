import React from "react";
import { ControlPanel } from "./control/ControlPanel";
import { ScreenshotData, Template } from "@/lib/types";

interface EditorSidebarProps {
  currentSlide: ScreenshotData;
  templates: Template[];
  onDataChange: (newData: Partial<ScreenshotData>) => void;
  onSelectTemplate: (templateId: string) => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  currentSlide,
  templates,
  onDataChange,
  onSelectTemplate,
}) => {
  return (
    <div className="neo-shadow w-full md:w-[26rem] border-r-2 border-black dark:border-gray-600 h-full overflow-hidden shrink-0 z-20 flex flex-col bg-white dark:bg-[#252526]">
      <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <ControlPanel
          data={currentSlide}
          onChange={onDataChange}
          templates={templates}
          onSelectTemplate={onSelectTemplate}
          selectedTemplateId={currentSlide.templateId}
        />
      </div>
    </div>
  );
};
