import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/cart", label: "Cart", icon: ShoppingBag },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function MobileTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useShop();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:hidden">
      <div className="glass-panel mx-auto flex max-w-md items-center justify-between rounded-full px-3 py-2 shadow-[var(--shadow-deep)]">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className={cn(
                "relative flex h-12 w-16 flex-col items-center justify-center gap-1 rounded-full transition-all duration-500 [transition-timing-function:var(--ease-lux)]",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {active && (
                <span className="animate-glow-pulse pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(60%_60%_at_50%_50%,oklch(1_0_0/0.18),transparent_70%)]" />
              )}
              <span className="relative">
                <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.25} />
                {to === "/cart" && count > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.55rem] font-medium text-primary-foreground">
                    {count}
                  </span>
                )}
              </span>
              <span className="text-[0.55rem] uppercase tracking-[0.18em]">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
