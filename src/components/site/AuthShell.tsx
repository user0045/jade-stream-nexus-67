import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AuthShell({
  eyebrow,
  title,
  intro,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-12">
      <div className="glass-panel halo animate-rise relative overflow-hidden rounded-[2.25rem] p-8 md:p-10">
        <div className="animate-glow-pulse pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.16),transparent_70%)]" />
        <Link to="/" className="font-display text-xl tracking-[0.34em]">
          Deal One
        </Link>
        <p className="eyebrow mt-8">{eyebrow}</p>
        <h1 className="mt-3 font-display text-3xl leading-none md:text-4xl">{title}</h1>
        {intro && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{intro}</p>}
        <div className="mt-8 flex flex-col gap-4">{children}</div>
        {footer && (
          <div className="mt-8 border-t border-hairline pt-6 text-xs text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  autoComplete,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        maxLength={200}
        className="mt-2 h-12 w-full rounded-2xl border border-hairline bg-surface px-4 text-sm outline-none transition-all duration-700 [transition-timing-function:var(--ease-lux)] placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:shadow-[var(--shadow-emission)]"
      />
    </label>
  );
}
