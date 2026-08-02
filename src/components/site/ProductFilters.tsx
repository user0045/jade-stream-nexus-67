import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SlidersHorizontal, Star, X } from "lucide-react";
import type { Product } from "@/data/catalog";
import { PRODUCTS, formatPrice } from "@/data/catalog";
import { cn } from "@/lib/utils";

export type SortKey = "relevance" | "price-asc" | "price-desc" | "newest" | "top-rated";

export type Filters = { price: number; rating: number; sort: SortKey };

const SORTS: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "price-asc", label: "Price: Low – High" },
  { key: "price-desc", label: "Price: High – Low" },
  { key: "newest", label: "Newest" },
  { key: "top-rated", label: "Top rated" },
];

const RATINGS = [4, 3, 2] as const;

export const priceCeiling = (items: Product[]) =>
  items.length ? Math.max(...items.map((p) => p.price)) : 0;

/** Price starts at the ceiling and rating at "all", so nothing is hidden on load. */
export const initialFilters = (items: Product[]): Filters => ({
  price: priceCeiling(items),
  rating: 0,
  sort: "relevance",
});

const newnessIndex = new Map(PRODUCTS.map((p, i) => [p.id, PRODUCTS.length - i]));

export function applyFilters(items: Product[], f: Filters): Product[] {
  const out = items.filter((p) => p.price <= f.price && p.rating >= f.rating);
  switch (f.sort) {
    case "price-asc":
      return [...out].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...out].sort((a, b) => b.price - a.price);
    case "newest":
      return [...out].sort(
        (a, b) => (newnessIndex.get(b.id) ?? 0) - (newnessIndex.get(a.id) ?? 0),
      );
    case "top-rated":
      return [...out].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    default:
      return out;
  }
}

/** Hook keeping filters in sync with the current result set. */
export function useFilters(items: Product[]) {
  const ceiling = priceCeiling(items);
  const [filters, setFilters] = useState<Filters>(() => initialFilters(items));

  // when the result set changes (new search / category) reopen the full range
  useEffect(() => {
    setFilters((f) => ({ ...f, price: ceiling, rating: 0 }));
  }, [ceiling, items.length]);

  const filtered = useMemo(() => applyFilters(items, filters), [items, filters]);
  return { filters, setFilters, filtered, ceiling };
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn("h-3.5 w-3.5", i <= n ? "text-foreground" : "text-muted-foreground/40")}
          strokeWidth={1.25}
          fill={i <= n ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}

function Row({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "light-sweep flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[0.72rem] tracking-[0.06em] transition-all duration-500 [transition-timing-function:var(--ease-lux)]",
        active
          ? "bg-foreground/10 text-foreground shadow-[var(--shadow-emission)]"
          : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
      )}
    >
      <span className="relative z-[3] flex flex-1 items-center gap-3">{children}</span>
    </button>
  );
}

function Panel({
  filters,
  setFilters,
  ceiling,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  ceiling: number;
}) {
  const min = 0;
  const fill = ceiling > 0 ? `${(filters.price / ceiling) * 100}%` : "100%";
  const rangeRef = useRef<HTMLInputElement>(null);

  // set the track fill as a CSS custom property after mount to avoid
  // SSR/client attribute mismatches on custom properties
  useEffect(() => {
    rangeRef.current?.style.setProperty("--range-fill", fill);
  }, [fill]);

  return (
    <div className="flex flex-col gap-7">
      <div>
        <p className="eyebrow">Price</p>
        <input
          ref={rangeRef}
          type="range"
          min={min}
          max={ceiling}
          step={100}
          value={filters.price}
          aria-label="Maximum price"
          onChange={(e) => setFilters({ ...filters, price: Number(e.target.value) })}
          className="lux-range mt-4"
        />
        <div className="mt-3 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
          <span>{formatPrice(min)}</span>
          <span className="text-foreground">Up to {formatPrice(filters.price)}</span>
        </div>
      </div>

      <div>
        <p className="eyebrow">Rating</p>
        <div className="mt-3 flex flex-col gap-1">
          {RATINGS.map((r) => (
            <Row
              key={r}
              active={filters.rating === r}
              onClick={() => setFilters({ ...filters, rating: r })}
            >
              <Stars n={r} />
              <span className="text-[0.66rem] uppercase tracking-[0.18em]">&amp; up</span>
            </Row>
          ))}
          <Row active={filters.rating === 0} onClick={() => setFilters({ ...filters, rating: 0 })}>
            <span className="text-[0.66rem] uppercase tracking-[0.18em]">All ratings</span>
          </Row>
        </div>
      </div>

      <div>
        <p className="eyebrow">Sort by</p>
        <div className="mt-3 flex flex-col gap-1">
          {SORTS.map((s) => (
            <Row
              key={s.key}
              active={filters.sort === s.key}
              onClick={() => setFilters({ ...filters, sort: s.key })}
            >
              <span className="text-[0.72rem]">{s.label}</span>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Desktop: a sticky sidebar panel.
 * Tablet / mobile: a trigger pill that opens a bottom sheet.
 */
export function ProductFilters({
  filters,
  setFilters,
  ceiling,
  resultCount,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  ceiling: number;
  resultCount: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const active =
    filters.rating !== 0 || filters.sort !== "relevance" || filters.price < ceiling ? true : false;

  return (
    <>
      {/* desktop sidebar */}
      <aside className="glass-panel hidden h-fit rounded-[1.75rem] p-5 lg:sticky lg:top-28 lg:block">
        <div className="flex items-center gap-2 border-b border-hairline pb-4">
          <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.25} />
          <p className="eyebrow">Filters</p>
        </div>
        <div className="mt-5">
          <Panel filters={filters} setFilters={setFilters} ceiling={ceiling} />
        </div>
      </aside>

      {/* mobile / tablet trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="light-sweep halo inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-5 py-2.5 text-[0.6rem] uppercase tracking-[0.2em] text-foreground transition-all duration-700 [transition-timing-function:var(--ease-lux)] hover:border-foreground/45 lg:hidden"
      >
        <SlidersHorizontal className="relative z-[3] h-3.5 w-3.5" strokeWidth={1.25} />
        <span className="relative z-[3]">Filter &amp; sort</span>
        {active && (
          <span className="relative z-[3] h-1.5 w-1.5 rounded-full bg-foreground shadow-[0_0_10px_2px_oklch(1_0_0/0.6)]" />
        )}
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
        <div
          className="fixed inset-0 z-[120] flex items-end bg-background/80 backdrop-blur-md lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter and sort"
            onClick={(e) => e.stopPropagation()}
            className="glass-panel animate-rise max-h-[85vh] w-full overflow-y-auto rounded-t-[2rem] p-6 pb-10"
          >
            <div className="flex items-center justify-between gap-4 border-b border-hairline pb-4">
              <p className="eyebrow">Filter &amp; sort</p>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setOpen(false)}
                className="halo grid h-9 w-9 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-6">
              <Panel filters={filters} setFilters={setFilters} ceiling={ceiling} />
            </div>
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFilters({ price: ceiling, rating: 0, sort: "relevance" })}
                className="h-12 flex-1 rounded-full border border-hairline text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-shine h-12 flex-1 rounded-full text-[0.62rem] uppercase tracking-[0.2em]"
              >
                <span className="relative z-[3]">Show {resultCount}</span>
              </button>
            </div>
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}
