import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

export function CardRail({
  eyebrow,
  title,
  products,
}: {
  eyebrow: string;
  title: string;
  products: Product[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = ref.current;
    if (!el) return;
    const onResize = () => sync();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sync]);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 240), behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-5 pb-6 pt-12 md:px-8 md:pb-6 md:pt-12">
      <Reveal className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-1.5 whitespace-nowrap text-2xl sm:text-3xl md:mt-2 md:text-3xl">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {!atStart && (
            <RailArrow label={`Scroll ${title} left`} onClick={() => scrollBy(-1)}>
              <ChevronLeft className="h-4 w-4" strokeWidth={1.25} />
            </RailArrow>
          )}
          {!atEnd && (
            <RailArrow label={`Scroll ${title} right`} onClick={() => scrollBy(1)}>
              <ChevronRight className="h-4 w-4" strokeWidth={1.25} />
            </RailArrow>
          )}
        </div>
      </Reveal>

      {/* rail-bleed gives the hover zoom + light emission room to spill without clipping */}
      <div
        ref={ref}
        onScroll={sync}
        className="rail-scroll rail-bleed -mx-5 mt-3 gap-4 px-5 md:-mx-4 md:mt-3.5 md:gap-5 md:px-4"
      >
        {products.map((p) => (
          <div key={`${title}-${p.id}`} className="w-[46vw] shrink-0 sm:w-[30vw] md:w-[13.25rem]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function RailArrow({
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
