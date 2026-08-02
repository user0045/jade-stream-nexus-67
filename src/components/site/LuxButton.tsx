import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

const base =
  "light-sweep relative inline-flex items-center justify-center gap-2 rounded-full font-sans uppercase tracking-[0.2em] transition-all duration-700 [transition-timing-function:var(--ease-lux)] disabled:pointer-events-none disabled:opacity-40";

const variants = {
  solid:
    "bg-primary text-primary-foreground hover:shadow-[var(--shadow-emission)] hover:-translate-y-0.5",
  outline:
    "border border-border text-foreground hover:border-foreground/50 hover:shadow-[var(--shadow-emission)] hover:-translate-y-0.5",
  ghost: "text-muted-foreground hover:text-foreground",
} as const;

const sizes = {
  sm: "h-9 px-5 text-[0.62rem]",
  md: "h-12 px-8 text-[0.68rem]",
  lg: "h-14 px-10 text-[0.72rem]",
} as const;

type LuxProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

export function LuxButton({
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: LuxProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <span className="relative z-[3] flex items-center gap-2">{children}</span>
    </button>
  );
}

export function LuxLink({
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: LuxProps & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <span className="relative z-[3] flex items-center gap-2">{children}</span>
    </Link>
  );
}

export const luxClass = (
  variant: keyof typeof variants = "solid",
  size: keyof typeof sizes = "md",
  className?: string,
) => cn(base, variants[variant], sizes[size], className);
