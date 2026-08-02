import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import {
  PRODUCTS,
  categoryName,
  deliveryWindow,
  discountPercent,
  findProduct,
  formatPrice,
  type Product,
} from "@/data/catalog";
import { LuxButton } from "@/components/site/LuxButton";
import { luxClass } from "@/components/site/LuxButton";
import { CardRail } from "@/components/site/CardRail";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = findProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Piece unavailable — Deal One" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Deal One` },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: `${product.name} — Deal One` },
        { property: "og:description", content: product.tagline },
      ],
    };
  },
  component: ProductPage,
});

type Tab = "description" | "specifications" | "shipping";

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { add } = useShop();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("description");
  const [choices, setChoices] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((o) => [o.label, o.values[0] ?? ""])),
  );

  // client-side gallery order — index 0 is the main viewer, 1..3 the thumbnails
  const [order, setOrder] = useState<number[]>(() => product.images.map((_, i) => i));
  useEffect(() => {
    setOrder(product.images.map((_, i) => i));
  }, [product.id, product.images]);

  const swap = (thumbPosition: number) =>
    setOrder((prev) => {
      const next = [...prev];
      const a = next[0]!;
      next[0] = next[thumbPosition]!;
      next[thumbPosition] = a;
      return next;
    });

  const mainSrc = product.images[order[0] ?? 0] ?? product.image;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
  const inStock = product.stock > 0;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
      <nav className="flex items-center gap-2 py-4 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
        <Link to="/shop" className="underline-lux">
          Shop
        </Link>
        <span>/</span>
        <Link to="/shop" search={{ category: product.category }} className="underline-lux">
          {categoryName(product.category)}
        </Link>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {/* ---------- LEFT: gallery ---------- */}
        <div>
          <ZoomImage src={mainSrc} alt={product.name} />
          <div className="mt-4 grid grid-cols-3 gap-4">
            {order.slice(1).map((imgIndex, i) => (
              <button
                key={`thumb-${i}`}
                onClick={() => swap(i + 1)}
                aria-label={`Show image ${i + 2} of ${product.name} in the main viewer`}
                className="emission halo lift-img aspect-square overflow-hidden rounded-2xl border border-hairline bg-surface"
              >
                <img
                  src={product.images[imgIndex]}
                  alt={`${product.name} view ${i + 2}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ---------- RIGHT: details ---------- */}
        <div className="animate-rise">
          <h1 className="font-display text-2xl leading-tight md:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-foreground text-foreground" strokeWidth={1.25} />
            <span className="text-foreground">{product.rating.toFixed(1)}</span>
            <span>· {product.reviews} reviews</span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-4xl">{formatPrice(product.price)}</span>
            <span className="text-base text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="light-highlight rounded-full px-3.5 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-foreground">
              {discountPercent(product)}% off
            </span>
          </div>

          <p className="mt-4 flex items-center gap-2.5 text-xs text-muted-foreground">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                inStock
                  ? "animate-glow-pulse bg-foreground shadow-[0_0_12px_2px_oklch(1_0_0/0.5)]"
                  : "bg-muted-foreground",
              )}
            />
            {inStock ? (
              <span>
                In stock — <span className="text-foreground">{product.stock} available</span>
              </span>
            ) : (
              <span>Out of Stock — Restocking in progress</span>
            )}
          </p>

          {product.options.map((group) => (
            <div key={group.label} className="mt-8">
              <p className="eyebrow">{group.label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.values.map((v) => (
                  <button
                    key={v}
                    onClick={() => setChoices((c) => ({ ...c, [group.label]: v }))}
                    className={cn(
                      "light-sweep rounded-full border px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] transition-all duration-700 [transition-timing-function:var(--ease-lux)]",
                      choices[group.label] === v
                        ? "border-transparent bg-primary text-primary-foreground shadow-[var(--shadow-emission)]"
                        : "border-hairline text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                    )}
                  >
                    <span className="relative z-[3]">{v}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-1 rounded-full border border-hairline bg-surface-2 p-1">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="halo grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(Math.max(product.stock, 1), q + 1))}
                className="halo grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Est. delivery {deliveryWindow()}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <LuxButton
              variant="outline"
              disabled={!inStock}
              onClick={() => {
                add(product.id, qty);
                toast.success(`${product.name} added to your bag`);
              }}
            >
              Add to bag
            </LuxButton>
            <Link
              to="/checkout"
              search={{ buy: product.id, qty }}
              disabled={!inStock}
              className={luxClass("solid")}
            >
              <span className="relative z-[3]">Buy now</span>
            </Link>
          </div>

          <div className="mt-8 h-px w-full bg-[linear-gradient(90deg,transparent,oklch(1_0_0/0.22),transparent)]" />

          <div className="mt-6 grid grid-cols-3 gap-3 text-[0.5rem] uppercase tracking-[0.12em] text-muted-foreground md:text-[0.53rem]">
            <span className="flex items-center gap-1.5">
              <Truck className="h-3 w-3 shrink-0" strokeWidth={1.25} /> Fast dispatch on all orders
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 shrink-0" strokeWidth={1.25} /> Secure checkout
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 shrink-0" strokeWidth={1.25} /> High quality products
            </span>
          </div>

          {/* ---------- TABS: right half, aligned with the thumbnail row ---------- */}
          <section className="mt-8">
            <div className="flex items-center gap-3 border-b border-hairline pb-3 sm:gap-6">
              {(
                [
                  ["description", "Description"],
                  ["specifications", "Specifications"],
                  ["shipping", "Shipping & Returns"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={cn(
                    "underline-lux whitespace-nowrap text-[0.52rem] uppercase tracking-[0.14em] transition-colors duration-500 sm:text-[0.62rem] sm:tracking-[0.2em]",
                    tab === key ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="lux-scroll glass-panel mt-4 max-h-[15rem] rounded-[1.5rem] p-5">
              {tab === "description" && (
                <p className="animate-rise text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              )}

              {tab === "specifications" && (
                <table className="animate-rise w-full text-sm">
                  <tbody>
                    {product.specs.map((s) => (
                      <tr key={s.label} className="border-b border-hairline last:border-0">
                        <td className="w-32 py-2.5 text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
                          {s.label}
                        </td>
                        <td className="py-2.5 text-foreground">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {tab === "shipping" && (
                <table className="animate-rise w-full text-sm">
                  <tbody>
                    <ShippingRow
                      title="Same-Day Dispatch"
                      body="Order before 3:00 PM for same-day dispatch."
                    />
                    <ShippingRow
                      title="Fast Delivery"
                      body="Receive your order in 3–7 business days."
                    />
                    <ShippingRow
                      title="Trusted Shipping"
                      body={
                        <>
                          Secure delivery via our logistics partner,{" "}
                          <strong className="font-semibold text-foreground">Meesho</strong>.
                        </>
                      }
                    />
                    <ShippingRow
                      title="Easy Returns"
                      body={
                        <>
                          Return unused items within 3 days in their original packaging. View our{" "}
                          <Link
                            to="/privacy"
                            hash="returns"
                            className="underline-lux font-semibold text-foreground"
                          >
                            Return Policy
                          </Link>
                          .
                        </>
                      }
                    />
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <CardRail eyebrow="From the same house" title="You may also consider" products={related} />
      )}

      <ReviewsSection
        productId={product.id}
        totalReviews={product.reviews}
        baseRating={product.rating}
      />
    </div>
  );
}

function ShippingRow({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <tr className="border-b border-hairline last:border-0">
      <td className="w-36 py-2.5 pr-3 align-top text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </td>
      <td className="py-2.5 text-sm text-muted-foreground">{body}</td>
    </tr>
  );
}

function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const move = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)),
      y: Math.min(100, Math.max(0, ((clientY - r.top) / r.height) * 100)),
    });
  };

  /*
   * Touch panning must be registered as a NON-passive native listener.
   * React's synthetic touchmove is passive, so preventDefault() there is
   * ignored and the very first drag after load scrolls the page instead of
   * panning the zoom.
   */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      setZoom(true);
      move(t.clientX, t.clientY);
    };
    const onMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      e.preventDefault();
      move(t.clientX, t.clientY);
    };
    const onEnd = () => setZoom(false);

    el.addEventListener("touchstart", onStart, { passive: false });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  return (
    <div className="relative">
      {/* premium white-light emission behind the viewer */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-6 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_50%,oklch(1_0_0/0.16),transparent_72%)] blur-2xl transition-opacity duration-1000 [transition-timing-function:var(--ease-lux)]",
          zoom ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={ref}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={(e) => move(e.clientX, e.clientY)}
        className="relative aspect-square w-full cursor-zoom-in touch-none overflow-hidden rounded-[2rem] border border-hairline bg-surface transition-shadow duration-1000 [transition-timing-function:var(--ease-lux)] hover:shadow-[var(--shadow-emission)]"
      >
        <img
          src={src}
          alt={alt}
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-lux)]"
          style={{
            transformOrigin: `${pos.x}% ${pos.y}%`,
            transform: zoom ? "scale(2.2)" : "scale(1)",
          }}
        />
      </div>
    </div>
  );
}
