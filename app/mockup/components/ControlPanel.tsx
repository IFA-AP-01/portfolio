"use client";

import React from "react";
import { ScreenshotData, Template } from "../types";
import { DeviceControl } from "./DeviceControl";
import { LayoutControl } from "./LayoutControl";
import { TypographyControl } from "./TypographyControl";
import { BackgroundControl } from "./BackgroundControl";
import { AssetsControl } from "./AssetsControl";
import Link from "next/link";
import Image from "next/image";
import teamImage from "@/public/logo.webp";

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
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col gap-6 h-full mb-6">
      <Link href="/" className="flex items-center">
        <div className="neo-shadow border-black border-2 w-10 h-10 flex items-center justify-center bg-[#E9945B]">
          <Image
            src={teamImage}
            alt="IFA"
            width={50}
            height={50}
            priority
            className="w-10 object-contain flex"
          />
        </div>
      </Link>
      <DeviceControl
        data={data}
        onChange={onChange}
        templates={templates}
        onSelectTemplate={onSelectTemplate}
        selectedTemplateId={selectedTemplateId}
      />
      <LayoutControl data={data} onChange={onChange} />
      <AssetsControl data={data} onChange={onChange} />
      <BackgroundControl data={data} onChange={onChange} />
      <TypographyControl data={data} onChange={onChange} />
      <p className="text-center text-xs text-gray-500 pb-2">
        © {currentYear} IFA Team. All rights reserved.
      </p>
    </div>
  );
};
