import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.webp";
import metacamPoster from "@/public/metacamHeaderPoster.webp";
import { navItems, siteMeta } from "@/lib/data";
import { FaGithub } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <FaGithub className="text-[18px]" />,
  Discord: <BsDiscord className="text-[18px]" />,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-canvas p-2 sm:p-3">
      <div className="relative overflow-hidden rounded-card bg-night text-canvas">
        <div className="relative z-10 mx-auto w-full max-w-shell px-4 pb-[320px] pt-16 sm:px-6 sm:pb-[440px]">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-10 lg:grid-cols-4">
            {/* Brand */}
            <div className="col-span-2 flex flex-col items-start gap-4 sm:col-span-1">
              <a href="/#home" className="flex items-center gap-2.5">
                <Image
                  src={logo}
                  alt="IFA"
                  width={30}
                  height={30}
                  className="h-7 w-7 object-contain"
                />
                <span className="font-heading text-[18px] font-bold tracking-[-0.04em]">
                  {siteMeta.name}
                </span>
              </a>
              <p className="max-w-xs text-[14px] leading-relaxed text-canvas/60">
                A product studio building web, mobile and edge software that
                ships.
              </p>
              <div className="flex items-center gap-3">
                {siteMeta.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 transition-colors duration-150 hover:bg-white/15"
                  >
                    {socialIcons[social.label]}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigate */}
            <div>
              <h3 className="text-[13px] font-semibold">Navigate</h3>
              <ul className="mt-3.5 space-y-2.5">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={`/${item.hash}`}
                      className="text-[14px] text-canvas/60 transition-colors duration-150 ease-out hover:text-canvas"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Find us */}
            <div>
              <h3 className="text-[13px] font-semibold">Find us</h3>
              <ul className="mt-3.5 space-y-2.5">
                {[
                  ...siteMeta.socials.filter(
                    (social) => social.label === "GitHub",
                  ),
                  ...siteMeta.stores,
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-canvas/60 transition-colors duration-150 ease-out hover:text-canvas"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-[13px] font-semibold">Contact</h3>
              <a
                href={`mailto:${siteMeta.email}`}
                className="mt-4 inline-flex items-center rounded-[10px] bg-white/10 px-3.5 py-2 text-[14px] font-medium transition-colors duration-150 hover:bg-white/15"
              >
                {siteMeta.email}
              </a>
              <p className="mt-4 text-[14px] text-canvas/60">
                Available for new projects this quarter.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
            <p className="text-[13px] text-canvas/50">
              &copy; {currentYear} {siteMeta.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-[13px] text-canvas/60">
              <Link
                href="/privacy"
                className="transition-colors duration-150 hover:text-canvas"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors duration-150 hover:text-canvas"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[420px] sm:h-[536px]">
          <video
            src="https://cdn.ifateam.dev/header-metacam.mp4"
            poster={metacamPoster.src}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            preload="metadata"
            aria-label="MetaCam photos with EXIF frames hanging on a string"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-x-0 -top-px h-[140px] bg-gradient-to-b from-night to-transparent sm:h-[225px]"
            aria-hidden
          />
        </div>
      </div>
    </footer>
  );
}
