import clsx from "clsx";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

const Section = forwardRef<HTMLElement, ComponentPropsWithoutRef<"section">>(
  function Section({ className, children, ...rest }, ref) {
    return (
      <section
        ref={ref}
        className={clsx("relative scroll-mt-20 py-16 sm:py-24", className)}
        {...rest}
      >
        {children}
      </section>
    );
  }
);

export default Section;
