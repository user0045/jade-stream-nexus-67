import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { ArrowRight, Search as SearchIcon } from "lucide-react";
import { CATEGORIES, searchProducts } from "@/data/catalog";
import { ProductGrid } from "@/components/site/ProductGrid";
import { ProductFilters, useFilters } from "@/components/site/ProductFilters";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Search the House — Deal One" },
      { name: "description", content: "Search Deal One for objects, materials and collections." },
      { property: "og:title", content: "Search the House — Deal One" },
      { property: "og:description", content: "Find any Deal One piece in seconds." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [value, setValue] = useState(q ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setValue(q ?? ""), [q]);

  const results = searchProducts(q ?? "");
  const { filters, setFilters, filtered, ceiling } = useFilters(results);

  const submit = (next: string) => {
    // closes the virtual keyboard on touch devices
    inputRef.current?.blur();
    navigate({ to: "/search", search: { q: next } });
  };

  return (
    <div>
      {/* ---- clean, structured discovery header ---- */}
      <header className="mx-auto max-w-7xl px-5 pb-8 pt-4 md:px-8 md:pb-10">
        <div className="glass-panel halo animate-rise overflow-hidden rounded-[2rem] p-6 md:p-9">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Discovery</p>
              <h1 className="mt-3 font-display text-3xl leading-none md:text-5xl">Search</h1>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground md:text-right md:text-sm">
              Type a piece, a material or a house.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(value);
            }}
            className="mt-7 flex items-center gap-2 rounded-full border border-hairline bg-surface-2 pl-5 pr-1.5 py-1.5 transition-all duration-700 [transition-timing-function:var(--ease-lux)] focus-within:border-foreground/45 focus-within:shadow-[var(--shadow-emission)]"
          >
            <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.25} />
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search Deal One…"
              aria-label="Search products"
              enterKeyHint="search"
              maxLength={120}
              className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground/70"
            />
            <button
              type="submit"
              aria-label="Search"
              className="halo light-sweep inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-[0.6rem] uppercase tracking-[0.2em] text-primary-foreground transition-all duration-700 [transition-timing-function:var(--ease-lux)] hover:shadow-[var(--shadow-emission)]"
            >
              <span className="relative z-[3] hidden sm:inline">Search</span>
              <ArrowRight className="relative z-[3] h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </form>

          <div className="mt-6">
            <p className="text-[0.55rem] uppercase tracking-[0.28em] text-muted-foreground">
              Browse by house
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:flex-wrap">
              {CATEGORIES.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => submit(c.name)}
                  className="light-sweep flex items-center justify-center rounded-full border border-hairline px-3 py-2 text-center text-[0.58rem] uppercase leading-tight tracking-[0.16em] text-muted-foreground transition-all duration-700 hover:border-foreground/40 hover:text-foreground md:px-4 md:text-[0.6rem] md:tracking-[0.2em]"
                >
                  <span className="relative z-[3]">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        {q ? (
          <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
            <div className="lg:hidden">
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                ceiling={ceiling}
                resultCount={filtered.length}
              />
            </div>
            <div className="hidden lg:block">
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                ceiling={ceiling}
                resultCount={filtered.length}
              />
            </div>
            <div className="min-w-0">
              <p className="eyebrow mb-7">
                {filtered.length} result{filtered.length === 1 ? "" : "s"} for “{q}”
              </p>
              <ProductGrid
                products={filtered}
                empty="We couldn't find any matching products, but new items are added regularly. Try a different search or explore our collections."
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Begin typing to reveal the collection.</p>
        )}
      </section>
    </div>
  );
}
