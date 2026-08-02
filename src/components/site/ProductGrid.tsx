import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

/**
 * Paginated product grid.
 * Desktop: 5 per row × 6 rows = 30 per page.
 * Tablet / mobile: 2 per row × 9 rows = 18 per page.
 */
export function ProductGrid({ products, empty }: { products: Product[]; empty?: string }) {
  const [perPage, setPerPage] = useState(30);
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setPerPage(mq.matches ? 30 : 18);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const pageCount = Math.max(1, Math.ceil(products.length / perPage));

  useEffect(() => {
    setPage(1);
  }, [products, perPage]);

  const current = useMemo(
    () => products.slice((page - 1) * perPage, page * perPage),
    [products, page, perPage],
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = topRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [page]);

  if (products.length === 0) {
    return (
      <p className="mx-auto max-w-md py-20 text-center text-sm leading-relaxed text-muted-foreground">
        {empty ?? "Nothing in this house yet."}
      </p>

    );
  }

  return (
    <div>
      <div ref={topRef} className="scroll-mt-32" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5 md:gap-6">
        {current.map((p, i) => (
          <Reveal key={p.id} delay={(i % 5) * 60}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-10 flex items-center justify-end gap-3">
          {page > 1 && (
            <PageArrow label="Previous page" onClick={() => setPage((p) => Math.max(1, p - 1))}>
              <ChevronLeft className="h-4 w-4" strokeWidth={1.25} />
            </PageArrow>
          )}
          <span className="text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
            Page <span className="text-foreground">{page}</span> / {pageCount}
          </span>
          {page < pageCount && (
            <PageArrow label="Next page" onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>
              <ChevronRight className="h-4 w-4" strokeWidth={1.25} />
            </PageArrow>
          )}
        </div>
      )}
    </div>
  );
}

function PageArrow({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="halo light-sweep grid h-10 w-10 place-items-center rounded-full border border-hairline bg-surface text-muted-foreground transition-all duration-700 [transition-timing-function:var(--ease-lux)] hover:-translate-y-0.5 hover:border-foreground/40 hover:text-foreground hover:shadow-[var(--shadow-emission)]"
    >
      <span className="relative z-[3]">{children}</span>
    </button>
  );
}
