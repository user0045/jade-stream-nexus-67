import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/site/Logo";

/**
 * Premium full-screen route transition veil.
 * A slow white-light emission: an orbiting arc, a breathing bloom and a
 * hairline progress filament — matched to the house's dark cinematic theme.
 */
export function RouteLoader() {
  const isPending = useRouterState({
    select: (s) => s.status === "pending" || s.isLoading,
  });

  const [visible, setVisible] = useState(true);
  const since = useRef<number>(Date.now());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPending) {
      since.current = Date.now();
      setVisible(true);
    } else {
      const elapsed = Date.now() - since.current;
      timer = setTimeout(() => setVisible(false), Math.max(0, 620 - elapsed));
    }
    return () => clearTimeout(timer);
  }, [isPending]);

  // hide the initial mount veil once hydrated
  useEffect(() => {
    const t = setTimeout(() => setVisible((v) => (isPending ? v : false)), 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden={!visible}
      role="status"
      className={`pointer-events-none fixed inset-0 z-[200] grid place-items-center bg-background/85 backdrop-blur-xl transition-opacity duration-700 [transition-timing-function:var(--ease-lux)] ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative grid h-28 w-28 place-items-center">
        {/* breathing bloom */}
        <span className="animate-glow-pulse absolute inset-0 rounded-[1.6rem] bg-[radial-gradient(circle,oklch(1_0_0/0.18),transparent_65%)] blur-2xl" />
        {/* square frame with a bright light travelling smoothly along its edges */}
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="absolute inset-[0.9rem] h-auto w-[calc(100%-1.8rem)] overflow-visible"
        >
          <defs>
            <linearGradient id="lux-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0" />
              <stop offset="50%" stopColor="oklch(1 0 0)" stopOpacity="1" />
              <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect
            x="1"
            y="1"
            width="98"
            height="98"
            rx="18"
            fill="none"
            stroke="oklch(1 0 0 / 0.14)"
            strokeWidth="1.5"
          />
          <rect
            x="1"
            y="1"
            width="98"
            height="98"
            rx="18"
            fill="none"
            stroke="url(#lux-edge)"
            strokeWidth="2"
            strokeLinecap="round"
            className="edge-travel [filter:drop-shadow(0_0_6px_oklch(1_0_0/0.85))]"
          />
        </svg>
        {/* mark, fitted to the centre of the square */}
        <span className="lux-breathe relative grid place-items-center">
          <Logo size={56} className="rounded-[0.9rem]" />
        </span>
      </div>


      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden bg-hairline">
        <span className="lux-filament block h-full w-1/3 bg-[linear-gradient(90deg,transparent,oklch(1_0_0/0.9),transparent)]" />
      </div>
    </div>
  );
}
