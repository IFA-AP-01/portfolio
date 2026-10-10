import Link from "next/link";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "inverse" | "outline" | "link";

const variantClasses: Record<Variant, string> = {
  primary: "rounded-full bg-ink px-6 py-2.5 text-white hover:bg-indigo",
  inverse: "rounded-full bg-white px-6 py-2.5 text-ink hover:bg-periwinkle",
  outline:
    "btn-outline px-6 py-2.5",
  link: "group underline-offset-4 hover:underline",
};

type ButtonProps = {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

/** Up-arrow turned to point right; tilts to ↗ when the parent `group` is hovered. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={clsx(
        "shrink-0 rotate-90 transition-transform duration-300 ease-out group-hover:rotate-45 group-focus-visible:rotate-45",
        className
      )}
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

export default function Button({
  href,
  variant = "primary",
  className,
  children,
  external,
  ...rest
}: ButtonProps) {
  const classes = clsx(
    "group inline-flex items-center justify-center gap-2 text-[15px] font-medium transition-colors duration-300 ease-out",
    variantClasses[variant],
    className
  );
  const content = (
    <>
      {children}
      {variant === "link" && <ArrowRight />}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
