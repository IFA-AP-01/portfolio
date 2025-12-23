"use client";

import Link from "next/link";
import Image from "next/image";
import teamImage from "@/public/logo.webp";

interface HeaderProps {
  onClose?: () => void;
  title?: string;
  showCloseButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onClose, title = "Screenshot Generator", showCloseButton = true }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <div className="neo-shadow border-black border-2 w-10 flex items-center justify-center bg-[#E9945B]">
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
        <span className="text-md uppercase font-bold">{title}</span>
      </div>
      
      {/* Close/Collapse Button */}
      {showCloseButton && (
        <button 
          onClick={onClose}
          className="md:flex p-1 hover:bg-black/5 neo-button transition-colors"
          title="Collapse Sidebar"
        >
          <div className="hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </div>
          <div className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            </div>
        </button>
      )}
    </div>
  );
};
