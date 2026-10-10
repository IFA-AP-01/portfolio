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
    <footer className="bg-navy-deep py-20 text-white">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4">
            <a href="#home" className="flex items-center gap-2.5">
              <Image
                src={logo}
                alt="IFA"
                width={30}
                height={30}
                className="h-7 w-7 object-contain"
              />
              <span className="font-heading text-[20px] font-medium tracking-[-0.01em]">
                {siteMeta.name}
              </span>
            </a>
            <p className="max-w-xs text-[15px] leading-relaxed text-white/70">
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
                  className="btn-outline flex h-10 w-10 items-center justify-center"
                >
                  {socialIcons[social.label]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="eyebrow text-white/60">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.hash}
                    className="text-[15px] text-white/70 transition-colors duration-300 ease-out hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Find us */}
          <div>
            <h3 className="eyebrow text-white/60">Find us</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                ...siteMeta.socials.filter((social) => social.label === "GitHub"),
                ...siteMeta.stores,
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-white/70 transition-colors duration-300 ease-out hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-white/60">
              Contact
            </h3>
            <a
              href={`mailto:${siteMeta.email}`}
              className="btn-outline mt-4 inline-flex items-center px-4 py-2 text-[14px]"
            >
              {siteMeta.email}
            </a>
            <p className="mt-4 text-[15px] text-white/70">
              Available for new projects this quarter.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/15 pt-6">
          <p className="text-[13px] text-white/50">
            &copy; {currentYear} {siteMeta.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
