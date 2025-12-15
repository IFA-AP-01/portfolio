"use client";

import { useState, useEffect } from "react";
import { createShortLink } from "@/app/actions/shorten";
import { headlineFont } from "@/lib/fontawesome";
import Link from "next/link";
import { getFaviconUrl } from "@/lib/utils";
import Image from "next/image";
import SubmitBtn from "@/components/submit-btn";
import {
  FaChartBar,
  FaCheck,
  FaCopy,
  FaLink,
  FaQrcode,
  FaTimes,
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";

const domain = "ifateam.dev";

// Define the type for the cache object
type LinkCache = Record<string, string>;

export default function ShortenLinkPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortKey, setShortKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<LinkCache>({});

  // Track copied state for individual history items
  const [historyCopied, setHistoryCopied] = useState<Record<string, boolean>>(
    {}
  );
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const cacheKey = "shorten-link-cache";
    const cache = JSON.parse(localStorage.getItem(cacheKey) || "{}");
    setHistory(cache);
  }, [shortUrl]); // Refresh history when a new link is created

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");
    setCopied(false);

    // Basic validation
    if (!url) {
      setError("Please enter a URL");
      setLoading(false);
      return;
    }

    const cacheKey = "shorten-link-cache";

    try {
      // Check cache
      const cache = JSON.parse(localStorage.getItem(cacheKey) || "{}");
      if (cache[url]) {
        setShortUrl(`https://${domain}/${cache[url]}`);
        setShortKey(cache[url]);
        setLoading(false);
        return;
      }

      const result = await createShortLink(url);
      if (result.success && result.data) {
        setShortUrl(`https://${domain}/${result.data.key}`);
        setShortKey(result.data.key);
        // Update cache
        cache[url] = result.data.key;
        localStorage.setItem(cacheKey, JSON.stringify(cache));
      } else {
        setError(result.error || "Failed to shorten link");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyHistoryLink = (key: string, link: string) => {
    navigator.clipboard.writeText(link);
    setHistoryCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setHistoryCopied((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <div className="px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="neo-card p-4 sm:p-8 bg-white dark:bg-[#1a1a1a]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your link here"
                className="w-full px-4 py-2 border-2 border-black bg-gray-50 dark:bg-black dark:border-white focus:outline-none focus:ring-0 text-md transition-all neo-shadow"
                required
              />
            </div>

            <SubmitBtn pending={loading} />
          </form>

          {error && (
            <div className="mt-8 p-4 border-2 border-black bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold uppercase tracking-wide">
              Error: {error}
            </div>
          )}

          {shortUrl && (
            <div className="mt-10 pt-8 border-t-2 border-black dark:border-white/20 animation-fade-in">
              <p className="text-sm font-bold uppercase tracking-wider mb-3 text-black dark:text-gray-300">
                Your Shortened Link:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow px-4 py-2 border-2 border-black bg-green-50 dark:bg-green-900/20 text-md break-all">
                  {`${domain}/${shortKey}`}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="neo-button bg-[#90EE90] hover:bg-[#7bc67b] text-black whitespace-nowrap"
                >
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* History Section - Only show if there are history items */}
        {Object.keys(history).length > 0 && (
          <div className="mt-12 neo-card p-4 sm:p-8 bg-[#FEF3C0] dark:bg-[#1a1a1a]">
            <h2
              className={`${headlineFont.className} text-xl sm:text-2xl font-black mb-6 text-black dark:text-white uppercase tracking-tighter`}
            >
              History
            </h2>
            <div className="flex flex-col gap-4">
              {Object.entries(history)
                .reverse()
                .map(([originalUrl, key]) => {
                  const shortLink = `${domain}/${key}`;
                  const favicon = getFaviconUrl(originalUrl);
                  return (
                    <div
                      key={key}
                      className="p-4 border-2 border-black dark:border-white/20 bg-gray-50 dark:bg-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-grow min-w-0">
                        <Link
                          href={`https://${shortLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-md text-[#E9945B] hover:underline break-all flex items-center gap-2"
                        >
                          <FaLink />
                          {shortLink}
                        </Link>
                        <div className="flex items-center gap-2 max-w-full pt-2">
                          {favicon && (
                            <Image
                              src={favicon}
                              alt=""
                              width={20}
                              height={20}
                              className="w-5 h-5 shrink-0"
                              loading="lazy"
                            />
                          )}

                          <p
                            className="text-xs text-black dark:text-white truncate"
                            title={originalUrl}
                          >
                            {originalUrl}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setQrUrl(`https://${shortLink}`);
                            setShowQrModal(true);
                          }}
                          className="neo-button text-sm bg-[#FFB6C1] hover:bg-[#ff9aa2] text-black whitespace-nowrap p-2 h-min"
                          title="Show QR Code"
                        >
                          <FaQrcode />
                        </button>
                        <Link
                          href={`/${key}/stats`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neo-button text-sm bg-blue-200 hover:bg-blue-300 text-black whitespace-nowrap p-2 h-min flex items-center justify-center gap-2"
                        >
                          <FaChartBar />
                        </Link>
                        <button
                          onClick={() =>
                            copyHistoryLink(key, `https://${shortLink}`)
                          }
                          className="neo-button text-sm bg-[#90EE90] hover:bg-[#7bc67b] text-black whitespace-nowrap p-2 h-min"
                        >
                          {historyCopied[key] ? <FaCheck /> : <FaCopy />}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {showQrModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a1a1a] p-6 border-4 border-black neo-shadow max-w-sm w-full relative">
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 text-black dark:text-white hover:text-red-500"
              >
                <FaTimes size={24} />
              </button>

              <h3 className="text-xl font-black uppercase mb-6 text-center text-black dark:text-white">
                QR Code
              </h3>

              <div className="flex justify-center mb-6 p-4 bg-white border-2 border-black">
                <QRCodeSVG value={qrUrl} size={200} />
              </div>

              <p className="text-center font-bold text-sm text-black dark:text-gray-300 break-all border-2 border-black p-2 bg-gray-50 dark:bg-black/20">
                {qrUrl}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
