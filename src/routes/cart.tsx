import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/data/catalog";
import { LuxLink } from "@/components/site/LuxButton";
import { PageHead } from "@/components/site/PageHead";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Deal One" },
      { name: "description", content: "Review the pieces in your Deal One bag before checkout." },
      { property: "og:title", content: "Your Bag — Deal One" },
      { property: "og:description", content: "Review your selected Deal One pieces." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal } = useShop();
  const shipping = subtotal > 0 ? 0 : 0;

  return (
    <div>
      <PageHead
        back
        eyebrow="Selection"
        title="Your bag"
        intro="Insured delivery and signature packaging are included with every order."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 md:grid-cols-[1.6fr_1fr] md:px-8">
        <div className="flex flex-col gap-4">
          {lines.length === 0 && (
            <div className="glass-panel rounded-[2rem] p-10 text-center">
              <p className="font-display text-2xl">Your bag is empty</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Everything begins with a single object.
              </p>
              <div className="mt-8 flex justify-center">
                <LuxLink to="/shop">Browse the house</LuxLink>
              </div>
            </div>
          )}

          {lines.map(({ product, qty }) => (
            <div
              key={product.id}
              className="glass-panel emission flex gap-4 rounded-[1.75rem] p-4 md:gap-6 md:p-5"
            >
              <Link
                to="/product/$productId"
                params={{ productId: product.id }}
                className="lift-img h-28 w-24 shrink-0 overflow-hidden rounded-2xl border border-hairline md:h-32 md:w-28"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-xl">{product.name}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">{product.tagline}</p>
                  </div>
                  <button
                    aria-label={`Remove ${product.name}`}
                    onClick={() => remove(product.id)}
                    className="halo grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.25} />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 rounded-full border border-hairline p-1">
                    <button
                      aria-label="Decrease"
                      onClick={() => setQty(product.id, qty - 1)}
                      className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button
                      aria-label="Increase"
                      onClick={() => setQty(product.id, qty + 1)}
                      className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="text-sm tracking-widest">
                    {formatPrice(product.price * qty)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="glass-panel h-fit rounded-[2rem] p-6 md:sticky md:top-28 md:p-8">
          <p className="eyebrow">Summary</p>
          <dl className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Delivery" value={shipping === 0 ? "Complimentary" : formatPrice(shipping)} />
          </dl>
          <div className="mt-6 flex items-baseline justify-between border-t border-hairline pt-6">
            <span className="eyebrow">Total</span>
            <span className="font-display text-2xl">{formatPrice(subtotal + shipping)}</span>
          </div>
          <div className="mt-8">
            <LuxLink
              to="/checkout"
              className={lines.length === 0 ? "pointer-events-none opacity-40" : ""}
            >
              Proceed to checkout
            </LuxLink>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt>{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
