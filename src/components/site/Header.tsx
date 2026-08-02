import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";
import { Logo } from "@/components/site/Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count, account } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const secondary = account
    ? ({ to: "/orders", label: "Orders" } as const)
    : ({ to: "/track-order", label: "Track" } as const);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 [transition-timing-function:var(--ease-lux)]",
        scrolled
          ? "hairline-b bg-background/85 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 md:gap-0 md:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <Logo size={34} />
          <span className="brand-wordmark text-2xl transition-opacity duration-700 group-hover:opacity-70">
            Deal One
          </span>
        </Link>

        {/* nav sits away from the wordmark, but tucks up against the search field */}
        <nav className="hidden items-center gap-7 md:ml-16 md:flex lg:ml-24">
          <div className="relative" onMouseLeave={() => setShopOpen(false)}>
            <Link
              to="/shop"
              onMouseEnter={() => setShopOpen(true)}
              className="underline-lux flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors duration-500 hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              Shop <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
            </Link>
            <div
              className={cn(
                "absolute left-0 top-full z-50 w-60 pt-4 transition-all duration-500 [transition-timing-function:var(--ease-lux)]",
                shopOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0",
              )}
            >
              <div className="glass-panel flex flex-col rounded-2xl p-2 shadow-[var(--shadow-deep)]">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    to="/shop"
                    search={{ category: c.slug }}
                    onClick={() => setShopOpen(false)}
                    className="light-sweep rounded-xl px-4 py-2.5 text-[0.66rem] uppercase tracking-[0.22em] text-muted-foreground transition-all duration-700 hover:bg-surface-2 hover:text-foreground"
                  >
                    <span className="relative z-[3]">{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            to={secondary.to}
            className="underline-lux text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors duration-500 hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            {secondary.label}
          </Link>

          <Link
            to="/contact"
            className="underline-lux text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors duration-500 hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Contact
          </Link>
        </nav>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            (e.currentTarget.querySelector("input") as HTMLInputElement | null)?.blur();
            navigate({ to: "/search", search: { q: query } });
          }}
          className="light-sweep ml-auto hidden w-[clamp(9rem,26vw,26rem)] min-w-0 shrink items-center gap-3 rounded-full border border-hairline bg-surface-2 px-4 py-2.5 transition-all duration-700 [transition-timing-function:var(--ease-lux)] hover:border-foreground/30 focus-within:border-foreground/45 focus-within:shadow-[var(--shadow-emission)] md:ml-6 md:mr-3 md:flex"
        >
          <Search className="relative z-[3] h-4 w-4 text-muted-foreground" strokeWidth={1.25} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Deal One…"
            aria-label="Search products"
            enterKeyHint="search"
            maxLength={120}
            className="relative z-[3] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          />
          <button
            type="submit"
            aria-label="Search"
            className="halo relative z-[3] grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors duration-500 hover:text-foreground"
          >
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <IconLink to="/cart" label="Cart" badge={count}>
            <ShoppingBag className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.25} />
          </IconLink>

          {account ? (
            <div className="hidden md:block">
              <IconLink to="/profile" label="Profile">
                <User className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.25} />
              </IconLink>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="light-sweep halo hidden h-10 items-center rounded-full border border-border px-5 text-[0.62rem] uppercase tracking-[0.22em] text-foreground transition-all duration-700 [transition-timing-function:var(--ease-lux)] hover:-translate-y-0.5 hover:border-foreground/50 hover:shadow-[var(--shadow-emission)] md:inline-flex"
            >
              <span className="relative z-[3]">Member access</span>
            </Link>
          )}

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="halo ml-1 grid h-10 w-10 place-items-center rounded-full border border-hairline text-foreground transition-colors duration-500 hover:border-foreground/40 md:hidden"
          >
            {open ? (
              <X className="h-4 w-4" strokeWidth={1.25} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.25} />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden px-5 transition-all duration-700 [transition-timing-function:var(--ease-lux)] md:hidden",
          open ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="glass-panel mt-4 flex flex-col rounded-3xl p-2 pb-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget.querySelector("input") as HTMLInputElement | null)?.blur();
              setOpen(false);
              navigate({ to: "/search", search: { q: query } });
            }}
            className="mb-1 flex items-center gap-3 rounded-2xl border border-hairline bg-surface-2 px-4 py-2.5 focus-within:border-foreground/45"
          >
            <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.25} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Deal One…"
              aria-label="Search products"
              enterKeyHint="search"
              maxLength={120}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
            />
            <button
              type="submit"
              aria-label="Search"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground"
            >
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </form>

          <Link
            to="/shop"
            onClick={() => setOpen(false)}
            className="rounded-2xl px-5 py-3 text-[0.82rem] font-medium uppercase tracking-[0.22em] text-foreground"
          >
            Shop
          </Link>
          <div className="ml-4 flex flex-col border-l border-hairline pl-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/shop"
                search={{ category: c.slug }}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-2.5 text-[0.62rem] font-light uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-500 hover:bg-surface-2 hover:text-foreground"
              >
                {c.name}
              </Link>
            ))}
          </div>

          <Link
            to={secondary.to}
            onClick={() => setOpen(false)}
            className="rounded-2xl px-5 py-3 text-[0.82rem] font-medium uppercase tracking-[0.22em] text-foreground transition-colors duration-500 hover:bg-surface-2"
          >
            {secondary.label}
          </Link>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="rounded-2xl px-5 py-3 text-[0.82rem] font-medium uppercase tracking-[0.22em] text-foreground transition-colors duration-500 hover:bg-surface-2"
          >
            Contact
          </Link>

          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="rounded-2xl px-5 py-3 text-[0.82rem] font-medium uppercase tracking-[0.22em] text-foreground transition-colors duration-500 hover:bg-surface-2"
          >
            About Us
          </Link>

          {!account && (
            <Link
              to="/auth/login"
              onClick={() => setOpen(false)}
              className="light-sweep mt-1 rounded-2xl border border-border px-5 py-3 text-center text-[0.66rem] uppercase tracking-[0.24em] text-foreground"
            >
              <span className="relative z-[3]">Member access</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function IconLink({
  to,
  label,
  badge,
  children,
}: {
  to: string;
  label: string;
  badge?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="halo relative grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-all duration-700 [transition-timing-function:var(--ease-lux)] hover:text-foreground"
    >
      {children}
      {badge ? (
        <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.55rem] text-primary-foreground">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}
