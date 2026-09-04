import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkVariant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: ButtonLinkVariant;
  className?: string;
};

const variants: Record<ButtonLinkVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",

  secondary:
    "border border-border bg-background text-foreground hover:bg-surface",

  ghost: "bg-transparent text-foreground hover:bg-surface",
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
