"use client";

import { FeedItem } from "@/lib/rss";
import { getFaviconUrl } from "@/lib/utils";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ArticleDialogProps {
  item: FeedItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArticleDialog({
  item,
  isOpen,
  onClose,
}: ArticleDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const faviconUrl = getFaviconUrl(item.link);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 custom-scrollbar">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        className="neo-card w-full max-w-3xl max-h-[85vh] overflow-y-auto relative p-0 flex flex-col bg-white animate-in zoom-in-95 duration-200 custom-scrollbar"
      >
        <button
          onClick={onClose}
          className="neo-button w-10 absolute top-4 right-4 p-2 border-2 border-black hover:bg-red-500 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
 
        {/* Content */}
        <div className="p-4">
          
          <div className="flex items-center gap-3 pt-12">
            {faviconUrl && (
              <Image
                src={faviconUrl}
                alt=""
                width={0}
                height={0}
                className="w-6 h-6 rounded-full border border-black"
              />
            )}
            <span className="font-bold text-lg">{item.source}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black mt-4 mb-4 leading-tight">
            {item.title}
          </h2>

          <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm font-medium">
            <span>
              {new Date(item.pubDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <Link href={item.link} target="_blank" rel="noopener noreferrer">
            <button className="neo-button bg-black text-white hover:bg-gray-800 text-sm p-2 flex items-center gap-2">
              Read Original Article
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </button>
          </Link>

          {item.thumbnail && (
            <div className="mb-8 w-full pt-4">
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={0}
                height={0}
                className="w-full h-auto object-contain max-h-[400px]"
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none mb-8 prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-md"
            dangerouslySetInnerHTML={{
              __html: item.fullContent || item.contentSnippet || "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
