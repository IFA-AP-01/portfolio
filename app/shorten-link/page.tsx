"use client";

import { useState } from "react";
import { createShortLink } from "@/app/actions/shorten";
import { headlineFont } from "@/lib/fontawesome";

export default function ShortenLinkPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

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
    const origin = typeof window !== "undefined" ? window.location.origin : "";

    try {
      // Check cache
      const cache = JSON.parse(localStorage.getItem(cacheKey) || "{}");
      if (cache[url]) {
        setShortUrl(`${origin}/${cache[url]}`);
        setLoading(false);
        return;
      }

      const result = await createShortLink(url);
      if (result.success && result.data) {
        setShortUrl(`${origin}/${result.data.key}`);

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

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="neo-card p-8 sm:p-12 bg-white dark:bg-[#1a1a1a]">
          <h1
            className={`${headlineFont.className} text-4xl sm:text-5xl font-black mb-8 text-center text-black dark:text-white uppercase tracking-tighter`}
          >
            Shorten Link
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-bold uppercase tracking-wider mb-2 text-black dark:text-gray-300"
              >
                Enter URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your link here"
                className="w-full p-4 border-2 border-black bg-gray-50 dark:bg-black dark:border-white focus:outline-none focus:ring-0 text-lg transition-all neo-shadow"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`neo-button w-full sm:w-auto self-end bg-[#E9945B] hover:bg-[#d6854f] text-black text-lg uppercase py-3 px-8 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
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
                <div className="flex-grow p-4 border-2 border-black bg-green-50 dark:bg-green-900/20 font-mono text-lg break-all">
                  {shortUrl}
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
      </div>
    </div>
  );
}
