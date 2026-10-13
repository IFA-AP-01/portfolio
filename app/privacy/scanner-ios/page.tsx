import { Metadata } from "next";
import { headlineFont, bodyFont } from "@/lib/fontawesome";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - AIO Scanner | IFA Team",
  description: "Privacy policy for AIO Scanner iOS application - Compliance with Apple App Store requirements",
  robots: "index, follow",
};

export default function ScannerPrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <h2 className={`${bodyFont.className} text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2`}>
            AIO Scanner – iOS Application
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-3xl p-8 md:p-12 space-y-8 shadow-lg">
          
          {/* Introduction */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The IFA Team ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy describes how the AIO Scanner iOS application (“App”) handles your information in compliance with Apple App Store requirements.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This App does not collect personal data, does not transmit data off your device, and does not use tracking technologies.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Information We Collect
            </h3>

            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              2.1 Camera and Image Data (On-Device Only)
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The App requires access to the device camera to perform scanning functions. All captured images and scanned content are processed entirely on your device.
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Camera access for document scanning</li>
              <li>Local optical character recognition (OCR)</li>
              <li>Temporary in-memory processing only</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              2.2 Device Information (Non-Personal, Anonymous)
            </h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>App version</li>
              <li>Anonymous crash logs and diagnostics through Apple systems (if user opts in)</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              2.3 Local Storage Access
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Saved scans and exported documents remain on your device. We do not access, collect, or transmit these files.
            </p>
          </section>

          {/* How We Use Information */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. How We Use Your Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Information is used only for providing core app functionality:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Document scanning and OCR</li>
              <li>Improving app stability and performance</li>
              <li>Ensuring compatibility with iOS system services</li>
            </ul>
          </section>

          {/* Data Processing and Storage */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Data Processing and Storage
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                🔒 All data is processed locally. Nothing is uploaded or shared externally.
              </p>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>No servers are used</li>
              <li>No information leaves the device</li>
              <li>All data remains fully under user control</li>
            </ul>
          </section>

          {/* Children’s Privacy */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Children’s Privacy
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The App does not collect personal data from any user, including children. No accounts, logins, or identifiable information are required.
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>No personal data collection</li>
              <li>No online services or communication</li>
              <li>All processing remains on the device</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Data Security
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Because the App does not transmit or store personal data on external systems, exposure risk is minimized. Security is ensured through:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Local-only processing</li>
              <li>iOS sandboxing and system protections</li>
              <li>No cloud storage or remote servers</li>
            </ul>
          </section>

          {/* Tracking Technologies */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. No Tracking & No Third-Party Advertising
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The App does not track users, does not collect identifiers, and does not use App Tracking Transparency (ATT) because no tracking is performed.
            </p>
          </section>

          {/* Third Party Services */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Third-Party Services
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The App does not integrate third-party SDKs, analytics, or advertising services. Diagnostic data may be collected by Apple if the user consents in iOS settings.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Your Rights and Control
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>You may delete all scans at any time</li>
              <li>You may revoke camera permissions through iOS Settings</li>
              <li>No server-side data means no requests are needed to delete or access stored data</li>
            </ul>
          </section>

          {/* Changes */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              10. Changes to This Privacy Policy
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy as required by App Store guidelines. Updates will be published on this page along with a revised effective date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              11. Contact Us
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              For questions about this Privacy Policy, please contact:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>The IFA Team</strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Email: privacy@ifateam.dev
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Website: https://ifateam.dev
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Response time: within 72 hours
              </p>
            </div>
          </section>

          {/* App Store Compliance */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              12. Apple App Store Compliance
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              AIO Scanner fully complies with Apple App Store guidelines regarding:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Data privacy and minimal data collection</li>
              <li>On-device processing requirements</li>
              <li>Children’s privacy and data safety</li>
              <li>Transparent disclosure of app functionality</li>
              <li>No use of tracking or advertising identifiers</li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
