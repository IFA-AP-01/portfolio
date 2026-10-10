import clsx from "clsx";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div className={clsx("max-w-2xl", className)}>
      {eyebrow && <p className="eyebrow mb-4 opacity-70">{eyebrow}</p>}
      <h2 className="font-heading text-[32px] font-normal leading-[1.15] tracking-[-0.01em] sm:text-[44px]">
        {children}
      </h2>
    </div>
  );
}
