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
      {eyebrow && (
        <p className="mb-3 font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.025em] text-fg sm:text-[40px]">
        {children}
      </h2>
    </div>
  );
}
