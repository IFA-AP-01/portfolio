"use client";

import React from "react";
import {
  BsLightningCharge,
  BsGraphUp,
  BsClock,
  BsCurrencyDollar,
  BsCodeSlash,
  BsShieldCheck,
} from "react-icons/bs";

const testimonials = [
  {
    initials: "TL",
    name: "Thang Le",
    role: "Developer at FPT Software",
    quote:
      "The App Screenshot Generator saved me hours. Figma was overkill for simple store listings. Best free tool out there.",
    metricValue: "1h",
    metricLabel: "saved per release",
    metricIcon: <BsClock />,
    color: "bg-purple-400",
  },
  {
    initials: "AS",
    name: "Alice Smith",
    role: "Marketing Lead",
    quote:
      "The Link Shorter analytics are minimal and perfect. Semantic URLs increased my CTR significantly.",
    metricValue: "20%",
    metricLabel: "CTR increase",
    metricIcon: <BsGraphUp />,
    color: "bg-green-400",
  },
  {
    initials: "MK",
    name: "Mike K.",
    role: "AI Engineer",
    quote:
      "JSON to TOON is a lifesaver for context windows. Reduced my LLM costs noticeably with optimized token usage.",
    metricValue: "30%",
    metricLabel: "cost reduction",
    metricIcon: <BsCurrencyDollar />,
    color: "bg-orange-400",
  },
  {
    initials: "SR",
    name: "Sarah Ross",
    role: "Mobile App Dev",
    quote:
      "Finally a screenshot tool that doesn't require a subscription. Drag, drop, export. My Play Store conversion went up.",
    metricValue: "2x",
    metricLabel: "faster workflow",
    metricIcon: <BsLightningCharge />,
    color: "bg-indigo-400",
  },
  {
    initials: "TG",
    name: "Tom Green",
    role: "Open Source Maintainer",
    quote:
      "I use the Link Shorter for all my project documentation. Clean, fast, and reliable tracking.",
    metricValue: "10k+",
    metricLabel: "clicks tracked",
    metricIcon: <BsShieldCheck />,
    color: "bg-blue-400",
  },
  {
    initials: "LJ",
    name: "Lisa Johnson",
    role: "Data Scientist",
    quote:
      "Converted a massive dataset using JSON to TOON. Tokens saved = money saved. Essential for large prompts.",
    metricValue: "1M+",
    metricLabel: "tokens optimizing",
    metricIcon: <BsCodeSlash />,
    color: "bg-red-400",
  },
];

export default function Testimonials() {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-12 pb-24 bg-transparent mt-20">
      <div className="max-w-6xl mx-auto px-4 w-full">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-50 leading-tight">
            Loved by <span className="text-[#e9945b]">Developers</span>
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            See what happens when you use tools built for efficiency.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="neo-card p-0 flex flex-col justify-between h-full"
            >
              <div className="p-6 flex flex-col gap-4">
                {/* User Header */}
                <div className="flex items-center gap-3">
                  <div
                    className={`${item.color} w-12 h-12 flex items-center justify-center border-2 border-black font-bold text-white text-lg neo-shadow`}
                  >
                    {item.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 dark:text-gray-100 leading-tight">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Metric Footer */}
              <div className="border-t-2 border-black p-4 flex items-center gap-3 bg-gray-50 dark:bg-[#1e1e1f]">
                <div
                  className={`${item.color} w-10 h-10 flex items-center justify-center border-2 border-black text-white shrink-0 neo-shadow`}
                >
                  {item.metricIcon}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                  <span className="font-black text-xl text-gray-900 dark:text-gray-100">
                    {item.metricValue}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {item.metricLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
