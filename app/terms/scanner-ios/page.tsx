import { Metadata } from "next";
import { headlineFont, bodyFont } from "@/lib/fontawesome";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - AIO Scanner | IFA Team",
  description:
    "Terms of Service for AIO Scanner mobile application - Usage rules, user responsibilities, limitations, and legal terms.",
  robots: "index, follow",
};

export default function ScannerTermsOfService() {
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
          <h1
            className={`${headlineFont.className} text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4`}
          >
            Terms of Service
          </h1>
          <h2
            className={`${bodyFont.className} text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2`}
          >
            AIO Scanner Mobile Application
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-3xl p-8 md:p-12 space-y-8 shadow-lg">

          {/* 1. Introduction */}
          <section>
            <h3 className={`${headlineFont.className} text-2xl font-bold text-gray-900 dark:text-white mb-4`}>
              1. Introduction
            </h3>
            <p className={`${bodyFont.className} text-gray-700 dark:text-gray-300 leading-relaxed`}>
              These Terms of Service (“Terms”) govern your use of the AIO Scanner application (“the App”) provided by
              the IFA Team (“we”, “our”, or “us”). By accessing or using the App, you agree to be bound by these Terms.
              If you do not agree, you must discontinue using the App.
            </p>
          </section>

          {/* 2. Use of the Application */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Use of the Application</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The App provides tools for document scanning, text extraction (OCR), and file management. You may use the
              App only for lawful purposes and in accordance with these Terms.
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>You must not use the App in a manner that violates applicable laws or regulations.</li>
              <li>You must not attempt to reverse engineer, modify, or disrupt the App.</li>
              <li>You must not use the App to process illegal, harmful, or infringing content.</li>
              <li>The App is licensed to you for personal and non-commercial use unless stated otherwise.</li>
            </ul>
          </section>

          {/* 3. User Responsibilities */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. User Responsibilities</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You are responsible for ensuring that all information and files you process using the App comply with laws
              and do not infringe upon the rights of others. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Maintaining the confidentiality of your device and access credentials.</li>
              <li>Managing your files and backups stored on your device.</li>
              <li>Ensuring the legality of documents you scan or process.</li>
            </ul>
          </section>

          {/* 4. Local Processing and Permissions */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Local Processing and Permissions</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The App may require access to certain device features to function properly:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li><strong>Camera:</strong> Used to capture images and documents for scanning.</li>
              <li><strong>Storage:</strong> Used to save or export scanned results at your request.</li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                All image processing and OCR operations occur locally on your device. No scanned images or extracted text
                are transmitted to external servers unless you explicitly choose to share or export them.
              </p>
            </div>
          </section>

          {/* 5. Intellectual Property */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Intellectual Property</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All trademarks, logos, source code, design elements, and features of the App are owned by the IFA Team or
              its licensors. You are granted a limited, non-transferable, revocable license to use the App in accordance
              with these Terms. You may not copy, distribute, or create derivative works from the App.
            </p>
          </section>

          {/* 6. Disclaimer of Warranties */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Disclaimer of Warranties</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The App is provided on an “as is” and “as available” basis. We make no warranties regarding accuracy,
              reliability, or availability. We do not guarantee that scanning or OCR results will be error-free or suitable
              for specific legal, financial, or professional purposes.
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Limitation of Liability</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To the maximum extent permitted by law, the IFA Team shall not be liable for any damages arising from your
              use of the App, including loss of data, device malfunction, or inaccurate OCR results. You use the App
              solely at your own risk.
            </p>
          </section>

          {/* 8. Termination */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Termination</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may suspend or terminate your access to the App if you violate these Terms. You may stop using the App
              at any time by uninstalling it from your device.
            </p>
          </section>

          {/* 9. Changes to Terms */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Changes to These Terms</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update these Terms periodically. Revised Terms will be posted within the App and become effective
              immediately upon publication. Continued use of the App indicates acceptance of the updated Terms.
            </p>
          </section>

          {/* 10. Contact Information */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact Us</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you have questions regarding these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>IFA Team</strong></p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Email: privacy@ifateam.dev</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Website: https://ifateam.dev</p>
              <p className="text-gray-700 dark:text-gray-300">We aim to respond within 72 hours.</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
