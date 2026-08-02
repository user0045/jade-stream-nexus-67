import type { ReactNode } from "react";
import { BackButton } from "@/components/site/BackButton";

export function PageHead({
  eyebrow,
  title,
  intro,
  back = false,
  backTo,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  back?: boolean;
  backTo?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative mx-auto max-w-7xl px-5 pb-10 pt-6 md:px-8 md:pb-14">
      {back && (
        <div className="animate-rise mb-6">
          <BackButton {...(backTo ? { to: backTo } : {})} />
        </div>
      )}
      <p className="eyebrow animate-rise">{eyebrow}</p>
      <h1 className="animate-rise mt-5 font-display text-4xl leading-none [animation-delay:100ms] md:text-6xl">
        {title}
      </h1>
      {intro && (
        <p className="animate-rise mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground [animation-delay:200ms] md:text-base">
          {intro}
        </p>
      )}
      {children && <div className="animate-rise mt-8 [animation-delay:280ms]">{children}</div>}
    </header>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass-panel halo rounded-[2rem] p-6 md:p-8 ${className}`}>{children}</div>
  );
}
