import { Metadata } from "next";
import { headlineFont, bodyFont } from "@/lib/fontawesome";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policies | IFA Team",
  description: "Privacy policies for IFA Team applications and services",
  robots: "index, follow",
};

export default function PrivacyIndex() {
  return (
    <main className="flex flex-col items-center px-4 pt-8 pb-20">
      <div className="max-w-4xl w-full">
        {/* Navigation breadcrumb */}
        <nav className="mb-8">
          <Link 
            href="/"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`${headlineFont.className} text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4`}>
            Privacy Policies
          </h1>
          <p className={`${bodyFont.className} text-xl text-gray-700 dark:text-gray-300`}>
            Transparency in how we handle your data across our applications
          </p>
        </div>

        {/* Privacy Policies List */}
        <div className="space-y-6">
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-3xl p-8 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300 shadow-lg">
            <Link href="/privacy/scanner" className="block">
              <h2 className={`${headlineFont.className} text-2xl font-bold text-gray-900 dark:text-white mb-3`}>
                AIO Scanner Mobile App
              </h2>
              <p className={`${bodyFont.className} text-gray-700 dark:text-gray-300 mb-4`}>
                Privacy policy for our mobile scanning application, including camera permissions and data handling for OCR functionality.
              </p>
              <div className="flex items-center space-x-4">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                  Mobile App
                </span>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                  COPPA Compliant
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Android
                </span>
              </div>
              <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium">
                Read Privacy Policy →
              </div>
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className={`${bodyFont.className} text-gray-600 dark:text-gray-400 mb-4`}>
            Have questions about our privacy practices?
          </p>
          <a 
            href="mailto:privacy@ifateam.dev"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors duration-200 font-medium"
          >
            Contact Privacy Team
          </a>
        </div>
      </div>
    </main>
  );
}