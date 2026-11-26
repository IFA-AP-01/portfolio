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
    <div className={clsx("mx-auto max-w-2xl", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-heading text-[30px] font-bold leading-[1.05] tracking-[-0.05em] sm:text-[40px]">
        {children}
      </h2>
    </div>
  );
}
