import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Policies",
  description: "Privacy policies for IFA Team applications and services",
  robots: "index, follow",
  alternates: { canonical: "/privacy" },
};

const policies = [
  {
    href: "/privacy/scanner-ios",
    title: "AIO Scanner iOS App",
    description:
      "Privacy policy for our iOS scanning application - zero data collection, camera permissions and local on-device document processing.",
    tags: ["Mobile App", "Apple Compliant", "iOS"],
  },
  {
    href: "/privacy/scanner",
    title: "AIO Scanner Android App",
    description:
      "Privacy policy for our Android scanning application, including camera permissions and data handling for OCR functionality.",
    tags: ["Mobile App", "COPPA Compliant", "Android"],
  },
];

const externalPolicies = [
  {
    href: "https://policy.ifateam.dev/savo",
    title: "Savo",
    platform: "iOS & iPadOS",
  },
  {
    href: "https://policy.ifateam.dev/vinlens",
    title: "VinLens",
    platform: "Mobile Video Camera",
  },
  {
    href: "https://policy.ifateam.dev/iptv",
    title: "IPTV Player",
    platform: "Mobile & TV",
  },
  {
    href: "https://policy.ifateam.dev/metacam",
    title: "MetaCam",
    platform: "iOS",
  },
  {
    href: "https://policy.ifateam.dev/ifagamestudio",
    title: "IFA Game Studio",
    platform: "Mobile Games",
  },
];

export default function PrivacyIndex() {
  return (
    <main className="mx-auto w-full max-w-[880px] px-4 pb-24 pt-10 sm:px-6 sm:pt-16">
      <nav className="mb-10">
        <Link
          href="/"
          className="text-[14px] font-medium text-ink-muted transition-colors duration-150 ease-out hover:text-ink"
        >
          ← Back to Home
        </Link>
      </nav>

      <div className="mb-12 text-center">
        <h1 className="font-heading text-[36px] font-bold leading-[1.05] tracking-[-0.05em] sm:text-[48px]">
          Privacy Policies
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">
          Transparency in how we handle your data across our applications
        </p>
      </div>

      <div className="space-y-5">
        {policies.map((policy) => (
          <Link
            key={policy.href}
            href={policy.href}
            className="card group block p-7 transition-colors duration-150 ease-out hover:bg-surface/70 sm:p-8"
          >
            <h2 className="font-heading text-[22px] font-bold tracking-[-0.04em]">
              {policy.title}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
              {policy.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {policy.tags.map((tag) => (
                <span key={tag} className="tech-pill">
                  {tag}
                </span>
              ))}
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold">
              Read Privacy Policy
              <ArrowRight />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {externalPolicies.map((policy) => (
          <a
            key={policy.href}
            href={policy.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card block p-7 transition-colors duration-150 ease-out hover:bg-surface/70 sm:p-8 sm:last:odd:col-span-2"
          >
            <h2 className="font-heading text-[22px] font-bold tracking-[-0.04em]">
              {policy.title}
            </h2>
            <span className="tech-pill mt-4">{policy.platform}</span>
            <span className="mt-6 flex items-center gap-1.5 text-[15px] font-semibold">
              Read Privacy Policy
              <ArrowRight />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center gap-4 text-center">
        <p className="text-[15px] text-ink-muted">
          Have questions about our privacy practices?
        </p>
        <a href="mailto:privacy@ifateam.dev" className="btn btn-primary">
          Contact Privacy Team
        </a>
      </div>
    </main>
  );
}
