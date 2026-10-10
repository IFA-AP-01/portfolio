import clsx from "clsx";
import { FaApple, FaGithub, FaGooglePlay } from "react-icons/fa6";
import { siteMeta } from "@/lib/data";

const github = siteMeta.socials.find((s) => s.label === "GitHub");

const profiles = [
  ...(github ? [{ label: "GitHub", href: github.href, Icon: FaGithub }] : []),
  ...siteMeta.stores.map((store) => ({
    label: store.label,
    href: store.href,
    Icon: store.label === "App Store" ? FaApple : FaGooglePlay,
  })),
];

/** GitHub org + store developer pages as outlined pills; inherits text color. */
export default function ProfileLinks({ className }: { className?: string }) {
  return (
    <ul className={clsx("flex flex-wrap items-center gap-2", className)}>
      {profiles.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium"
          >
            <Icon aria-hidden="true" className="text-[15px]" />
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
