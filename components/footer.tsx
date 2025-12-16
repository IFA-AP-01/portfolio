import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.webp";
import { FaGithub, FaTwitter, FaArrowRight } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full border-t-2 px-4 border-black bg-white dark:bg-[#191C1E] dark:border-white/10 pt-16 pb-8 flex justify-center items-center">
      {/* Main Container */}
      <div className="max-w-5xl inset-x-0 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-start space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="neo-shadow border-2 border-black p-1 bg-[#E9945B]">
                <Image
                  src={logo}
                  alt="IFA"
                  width={30}
                  height={30}
                  className="rounded-sm"
                />
              </div>
              <span className="text-xl font-bold text-black dark:text-white">
                IFA Team
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
              IFA Team is a team of passionate developers who are always looking
              for new ways to improve their skills and create innovative
              solutions for their clients.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <Link
                href="https://github.com/huyhunhngc"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-button p-2 bg-white hover:bg-gray-50 flex items-center justify-center w-10 h-10"
                aria-label="GitHub"
              >
                <FaGithub className="text-lg" />
              </Link>
              <Link
                href="https://discord.gg/DaeSfrkfnS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join us on Discord"
                className="neo-button p-2 bg-white hover:bg-gray-50 flex items-center justify-center w-10 h-10"
              >
                <BsDiscord className="text-lg" />
              </Link>
            </div>
          </div>

          {/* Product Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">
              Product
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <Link
                  href="/toonify"
                  className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
                >
                  Toonify Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/shorten-link"
                  className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
                >
                  Link Shortener
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">
              Resources
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col">
            <div className="neo-card p-6 bg-[#faf8f1] dark:bg-[#252526] relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-[#E9945B] font-bold text-xs uppercase tracking-wide">
                  <span>✨ Shorten your link</span>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                  Free & easy to use
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Monitor your links statistics with our free & easy to use
                  service.
                </p>
                <Link
                  href="/shorten-link"
                  className="neo-button bg-[#E9945B] text-black text-xs inline-flex items-center gap-2 w-full justify-center"
                >
                  Try it now <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>© {currentYear} IFA Team. All rights reserved.</p>
          <div className="flex items-center gap-1"></div>
        </div>
      </div>
    </footer>
  );
}
