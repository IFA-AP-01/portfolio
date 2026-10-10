import clsx from "clsx";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

export type SectionTone = "ink" | "paper" | "periwinkle" | "cream" | "navy";

const toneClasses: Record<SectionTone, string> = {
  ink: "bg-ink text-white",
  paper: "bg-paper text-ink",
  periwinkle:
    "bg-periwinkle text-ink [--slab-side:#d5dbf8] [--slab-bottom:#bcc5f2]",
  cream: "bg-cream text-ink [--slab-side:#efe5d8] [--slab-bottom:#e0d2c0]",
  navy: "bg-navy-deep text-white",
};

type SectionProps = {
  tone: SectionTone;
} & ComponentPropsWithoutRef<"section">;

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { tone, className, children, ...rest },
  ref
) {
  return (
    <section
      ref={ref}
      className={clsx("relative scroll-mt-[72px]", toneClasses[tone], className)}
      {...rest}
    >
      {children}
    </section>
  );
});

export default Section;
