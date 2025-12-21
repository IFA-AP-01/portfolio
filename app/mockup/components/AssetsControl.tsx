"use client";

import React from "react";
import { ScreenshotData } from "../types";
import { AssetUploader } from "./AssetUploader";

interface AssetsControlProps {
  data: ScreenshotData;
  onChange: (updates: Partial<ScreenshotData>) => void;
}

export const AssetsControl: React.FC<AssetsControlProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold border-b-2 border-black dark:border-gray-600 pb-1 uppercase text-sm">
        Assets
      </h3>
      <div className="flex gap-4 w-full flex-col md:flex-row">
        <AssetUploader
          label="App Screenshot"
          imageSrc={data.screenshotImage}
          onImageChange={(img) => onChange({ screenshotImage: img })}
          onRemove={() => onChange({ screenshotImage: undefined })}
        />
        <AssetUploader
          label="Background Image"
          imageSrc={data.backgroundImage}
          onImageChange={(img) => onChange({ backgroundImage: img })}
          onRemove={() => onChange({ backgroundImage: undefined })}
        />
      </div>
    </div>
  );
};
