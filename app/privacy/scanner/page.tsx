import { Metadata } from "next";
import { headlineFont, bodyFont } from "@/lib/fontawesome";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - AIO Scanner | IFA Team",
  description: "Privacy policy for AIO Scanner mobile application - How we handle your data and protect your privacy",
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
            AIO Scanner Mobile Application
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-3xl p-8 md:p-12 space-y-8 shadow-lg">
          
          {/* Introduction */}
          <section>
            <h3 className={`${headlineFont.className} text-2xl font-bold text-gray-900 dark:text-white mb-4`}>
              1. Introduction
            </h3>
            <p className={`${bodyFont.className} text-gray-700 dark:text-gray-300 leading-relaxed mb-4`}>
              The IFA Team ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AIO Scanner mobile application (the "App"). This policy is designed to help you understand how we handle your data, including special protections for children under 13 years of age.
            </p>
            <p className={`${bodyFont.className} text-gray-700 dark:text-gray-300 leading-relaxed`}>
              By using our App, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Information We Collect
            </h3>
            
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              2.1 Camera and Image Data
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our App requires camera permission to provide core functionality:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Camera access to capture images and documents for scanning</li>
              <li>Image processing for optical character recognition (OCR)</li>
              <li>Temporary storage of scanned images for processing</li>
            </ul>
            
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              2.2 Device Information
            </h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Device model and operating system version</li>
              <li>App version and usage analytics</li>
              <li>Crash reports and performance data</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              2.3 Storage Access
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may request storage permission to save processed documents and scan results to your device's local storage.
            </p>
          </section>

          {/* How We Use Information */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. How We Use Your Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>To provide and maintain our scanning and OCR services</li>
              <li>To process images and convert them to text</li>
              <li>To improve app functionality and user experience</li>
              <li>To detect and prevent technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Processing and Storage */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Data Processing and Storage
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                🔒 Local Processing: All image processing and OCR operations are performed locally on your device.
              </p>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Images are processed locally and are not transmitted to external servers</li>
              <li>Scanned text results are stored locally on your device</li>
              <li>You have full control over saving and deleting scan results</li>
              <li>No personal data is collected or stored on our servers</li>
            </ul>
          </section>

          {/* Children's Privacy (COPPA Compliance) */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Children's Privacy (COPPA Compliance)
            </h3>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                👶 Special Protection for Children Under 13
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We are committed to complying with the Children's Online Privacy Protection Act (COPPA) and protecting the privacy of children under 13 years of age:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>We do not knowingly collect personal information from children under 13</li>
              <li>No registration or account creation is required to use the app</li>
              <li>Camera access is used only for scanning functionality, not for collecting personal data</li>
              <li>All processing occurs locally on the device</li>
              <li>Parents can review and control their child's use of the app through device parental controls</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at the information provided below.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Data Security
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We implement appropriate security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Local-only processing eliminates data transmission risks</li>
              <li>Standard device security protocols apply</li>
              <li>Regular security updates and patches</li>
              <li>No data collection minimizes security exposure</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Third-Party Services
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our app may use third-party services for:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>App analytics and crash reporting</li>
              <li>Performance monitoring</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These services may collect limited, anonymized data in accordance with their own privacy policies.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Your Rights and Choices
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You have the following rights regarding your data:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Access: View what data is stored locally on your device</li>
              <li>Deletion: Delete scan results and app data at any time</li>
              <li>Control: Manage camera and storage permissions through device settings</li>
              <li>Transparency: This privacy policy provides full disclosure of our practices</li>
            </ul>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Changes to This Privacy Policy
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              10. Contact Us
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our practices, please contact us:
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
                Response time: We will respond to privacy inquiries within 72 hours
              </p>
            </div>
          </section>

          {/* Google Play Compliance */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              11. Google Play Store Compliance
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              This app complies with Google Play Store policies regarding:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>User data and privacy protection</li>
              <li>Sensitive permissions disclosure</li>
              <li>Children's privacy requirements</li>
              <li>Transparency in data handling</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For more information about Google Play's privacy requirements, visit: 
              <a 
                href="https://support.google.com/googleplay/android-developer/topic/9877467" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
              >
                Google Play Developer Policy Center
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}