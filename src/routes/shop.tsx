import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { CATEGORIES, PRODUCTS, categoryName } from "@/data/catalog";
import { PageHead } from "@/components/site/PageHead";
import { ProductGrid } from "@/components/site/ProductGrid";
import { ProductFilters, useFilters } from "@/components/site/ProductFilters";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop All Collections — Deal One" },
      {
        name: "description",
        content:
          "Browse Deal One collections: Home & Kitchen, Electronics, Beauty & Accessories, Fitness, Kids and Pets.",
      },
      { property: "og:title", content: "Shop All Collections — Deal One" },
      { property: "og:description", content: "Six houses of premium objects finished in black." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category } = Route.useSearch();
  const base = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
  const { filters, setFilters, filtered, ceiling } = useFilters(base);

  return (
    <div>
      <PageHead
        back
        eyebrow="The collections"
        title={category ? categoryName(category) : "Shop the house"}
        intro="Twelve pieces, six disciplines. Each one selected for material honesty and a silhouette that survives trends."
      >
        <div className="flex flex-col gap-5">
          {/* wraps into a tidy grid on small screens — no horizontal scrolling */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:flex md:flex-wrap">
            <Chip to={{}} active={!category} label="All" />
            {CATEGORIES.map((c) => (
              <Chip
                key={c.slug}
                to={{ category: c.slug }}
                active={category === c.slug}
                label={c.name}
              />
            ))}
          </div>
          <div className="lg:hidden">
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              ceiling={ceiling}
              resultCount={filtered.length}
            />
          </div>
        </div>
      </PageHead>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-24 md:px-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            ceiling={ceiling}
            resultCount={filtered.length}
          />
        </div>
        <div className="min-w-0">
          <ProductGrid products={filtered} />
        </div>
      </section>
    </div>
  );
}

function Chip({
  to,
  active,
  label,
}: {
  to: { category?: string };
  active: boolean;
  label: string;
}) {
  return (
    <Link
      to="/shop"
      search={to}
      className={cn(
        "light-sweep flex items-center justify-center rounded-full border px-3 py-2.5 text-center text-[0.58rem] uppercase leading-tight tracking-[0.16em] transition-all duration-700 [transition-timing-function:var(--ease-lux)] md:px-5 md:text-[0.62rem] md:tracking-[0.22em]",
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-hairline text-muted-foreground hover:border-foreground/40 hover:text-foreground",
      )}
    >
      <span className="relative z-[3]">{label}</span>
    </Link>
  );
}

