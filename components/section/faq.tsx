"use client";

import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "Are these tools free to use?",
    answer:
      "Yes! Most of our tools are completely free for indie developers. We believe in supporting the community with accessible, high-quality utilities without hidden costs.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "For basic usage, no account is required. However, creating an account allows you to save your projects, track link analytics, and access premium features across all our tools.",
  },
  {
    question: "What makes the Screenshot Generator different?",
    answer:
      "Unlike complicate design software, our Screenshot Generator is purpose-built for App Store and Play Store guidelines. It includes pre-set device frames, layouts, and export options to get your listing ready in minutes.",
  },
  {
    question: "Is the Link Shortener reliable for production?",
    answer:
      "Absolutely. Our Link Shortener is built on global edge infrastructure, ensuring your links are always fast and accessible. We also provide detailed analytics to help you understand your traffic.",
  },
  {
    question: "How does JSON to TOON save money?",
    answer:
      "JSON structure often uses many tokens for syntax. TOON is a concise format that preserves the data structure while significantly reducing token count, which lowers your API costs when working with LLMs.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 bg-transparent">
      <div className="max-w-3xl mx-auto px-4 w-full">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-50 leading-tight">
            Frequently Asked <span className="text-[#e9945b]">Questions</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Everything you need to know about our tools and services.
          </p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`neo-card p-0 transition-all duration-300 ${
                openIndex === index
                  ? "bg-[#faf8f1] dark:bg-[#252526]"
                  : "bg-white dark:bg-[#1e1e1f]"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100 pr-8">
                  {faq.question}
                </span>
                <div className="shrink-0">
                  {openIndex === index ? (
                    <FaMinus className="text-[#e9945b]" />
                  ) : (
                    <FaPlus className="text-gray-400" />
                  )}
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100 pb-6 px-6"
                    : "grid-rows-[0fr] opacity-0 pb-0 px-6"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
