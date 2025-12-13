import { headlineFont } from "@/lib/fontawesome";
import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2
      className={`${headlineFont.className} p-2 border-2 border-black neo-shadow text-2xl sm:text-4xl capitalize bg-[#E9945B] mb-8 text-center font-black text-black`}
    >
      {children}
    </h2>
  );
}
