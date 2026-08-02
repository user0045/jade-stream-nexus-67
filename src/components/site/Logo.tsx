import { cn } from "@/lib/utils";

export function Logo({ className, size = 34 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn(
        "logo-emit relative inline-block shrink-0 overflow-hidden rounded-[0.55rem] border border-hairline",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <img
        src="/favicon.png"
        alt="Deal One logo"
        width={size}
        height={size}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
