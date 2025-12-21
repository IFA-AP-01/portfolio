"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

interface AssetUploaderProps {
  label: string;
  imageSrc?: string;
  onImageChange: (dataUrl: string) => void;
  onRemove: () => void;
}

export const AssetUploader: React.FC<AssetUploaderProps> = ({
  label,
  imageSrc,
  onImageChange,
  onRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <label className="block text-xs font-bold mb-1 uppercase">{label}</label>

      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
           w-full h-24 border-2 text-black dark:text-white border-dashed rounded-none flex flex-col items-center justify-center cursor-pointer transition-all
           ${
             isDragging
               ? "border-[#E9945B] bg-[#E9945B]/10"
               : "border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-[#333]"
           }
         `}
        >
          <div className="text-3xl mb-2 text-black dark:text-white">+</div>
          <span className="text-xs font-bold uppercase text-black dark:text-white">
            Upload
          </span>
          <span className="text-[10px] text-gray-400 uppercase mt-1">
            or drag & drop
          </span>
        </div>
      ) : (
        <div className="relative w-full h-32 group border-2 border-black dark:border-gray-600 bg-gray-100 dark:bg-[#333]">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={imageSrc}
              alt="Preview"
              fill
              className="object-contain p-2"
            />
          </div>

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-white rounded-full hover:bg-gray-100 text-black"
              title="Change Image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the file input if clicking remove
                onRemove();
              }}
              className="p-2 bg-red-500 rounded-full hover:bg-red-600 text-white"
              title="Remove Image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
