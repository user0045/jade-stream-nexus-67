import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackButton({
  label = "Back",
  className,
  to,
}: {
  label?: string;
  className?: string;
  to?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        if (to) router.navigate({ to });
        else if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
        else router.navigate({ to: "/" });
      }}
      className={cn(
        "light-sweep halo group inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground transition-all duration-700 [transition-timing-function:var(--ease-lux)] hover:-translate-y-0.5 hover:border-foreground/45 hover:text-foreground hover:shadow-[var(--shadow-emission)]",
        className,
      )}
    >
      <ArrowLeft
        className="relative z-[3] h-3.5 w-3.5 transition-transform duration-700 [transition-timing-function:var(--ease-lux)] group-hover:-translate-x-1"
        strokeWidth={1.5}
      />
      <span className="relative z-[3]">{label}</span>
    </button>
  );
}
