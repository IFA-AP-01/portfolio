import Link from "next/link";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary: "bg-white text-canvas hover:bg-fg/90 font-semibold",
  secondary:
    "border border-white/15 text-fg hover:bg-white/[0.06] hover:border-white/30 font-medium",
  ghost: "text-fg-muted hover:text-fg font-medium",
};

type ButtonProps = {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export default function Button({
  href,
  variant = "primary",
  className,
  children,
  external,
  ...rest
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[15px] transition-colors duration-200",
    variantClasses[variant],
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
