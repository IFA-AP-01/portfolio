"use client";

import Link from "next/link";
import Image from "next/image";
import teamImage from "@/public/logo.webp";

export const Header = () => {
  return (
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
      <span className="text-md uppercase font-bold">Screenshot Generator</span>
    </div>
  );
};
