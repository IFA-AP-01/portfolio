"use client";

import React from "react";
import { ScreenshotData, Template } from "../types";
import { DeviceControl } from "./DeviceControl";
import { LayoutControl } from "./LayoutControl";
import { TypographyControl } from "./TypographyControl";
import { BackgroundControl } from "./BackgroundControl";
import { AssetsControl } from "./AssetsControl";

interface ControlPanelProps {
  data: ScreenshotData;
  onChange: (data: Partial<ScreenshotData>) => void;
  templates: Template[];
  onSelectTemplate: (templateId: string) => void;
  selectedTemplateId: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  data,
  onChange,
  templates,
  onSelectTemplate,
  selectedTemplateId,
}) => {
  return (
    <div className="flex flex-col gap-6 h-full mb-6">
      <DeviceControl
        data={data}
        onChange={onChange}
        templates={templates}
        onSelectTemplate={onSelectTemplate}
        selectedTemplateId={selectedTemplateId}
      />

      <LayoutControl data={data} onChange={onChange} />

      <TypographyControl data={data} onChange={onChange} />

      <BackgroundControl data={data} onChange={onChange} />

      <AssetsControl data={data} onChange={onChange} />
    </div>
  );
};
