import Image from "next/image";
import logo from "@/public/logo.webp";
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
    <footer className="border-t border-white/10 py-16">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4">
            <a href="#home" className="flex items-center gap-2.5">
              <Image
                src={logo}
                alt="IFA"
                width={30}
                height={30}
                className="h-7 w-7 rounded-lg object-contain"
              />
              <span className="text-[17px] font-semibold tracking-[-0.015em] text-fg">
                {siteMeta.name}
              </span>
            </a>
            <p className="max-w-xs text-[14px] leading-relaxed text-fg-muted">
              A product studio building web, mobile and edge software that ships.
            </p>
            <div className="flex items-center gap-3">
              {siteMeta.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-fg-muted transition-colors duration-200 hover:border-white/25 hover:text-fg"
                >
                  {socialIcons[social.label]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="font-mono text-[13px] uppercase tracking-[0.12em] text-fg-subtle">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.hash}
                    className="text-[14px] text-fg-muted transition-colors duration-200 hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-[13px] uppercase tracking-[0.12em] text-fg-subtle">
              Contact
            </h3>
            <a
              href={`mailto:${siteMeta.email}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[13px] text-fg transition-colors duration-200 hover:border-white/25"
            >
              {siteMeta.email}
            </a>
            <p className="mt-4 text-[14px] text-fg-muted">
              Available for new projects this quarter.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-[13px] text-fg-subtle">
            &copy; {currentYear} {siteMeta.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
