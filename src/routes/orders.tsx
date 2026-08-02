import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, MapPin, Package, Truck } from "lucide-react";
import { formatPrice } from "@/data/catalog";
import { LuxLink, luxClass } from "@/components/site/LuxButton";
import { PageHead } from "@/components/site/PageHead";
import { Reveal } from "@/components/site/Reveal";
import { ORDER_STAGES, useShop } from "@/lib/shop-store";
import { deliveryInfo, formatOrderDate } from "@/lib/order-timeline";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Your Orders — Deal One" },
      { name: "description", content: "A record of every Deal One piece you have commissioned." },
      { property: "og:title", content: "Your Orders — Deal One" },
      { property: "og:description", content: "Your Deal One order history and statuses." },
    ],
  }),
  component: Orders,
});

function Orders() {
  const { orders } = useShop();

  return (
    <div>
      <PageHead
        back
        eyebrow="Archive"
        title="Your orders"
        intro="Every commission, with its current position between our atelier and your door."
      />

      <section className="mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-24 md:px-8">
        {orders.length === 0 && (
          <div className="glass-panel rounded-[2rem] p-10 text-center">
            <p className="font-display text-2xl">No orders yet</p>
            <div className="mt-8 flex justify-center">
              <LuxLink to="/shop">Browse the house</LuxLink>
            </div>
          </div>
        )}

        {orders.map((o, i) => {
          const live = o.status !== "Delivered";
          const delivery = deliveryInfo(o);
          const stageIndex = ORDER_STAGES.indexOf(o.status);
          const progress = ((stageIndex + 1) / ORDER_STAGES.length) * 100;

          return (
            <Reveal key={o.number} delay={i * 70}>
              <article
                className={cn(
                  "glass-panel relative overflow-hidden rounded-[1.75rem] px-5 py-5 md:px-7 md:py-6",
                  live ? "animate-blink border-foreground/20" : "emission",
                )}
              >
                {live && (
                  <span
                    aria-hidden="true"
                    className="animate-glow-pulse pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.12),transparent_70%)] blur-2xl"
                  />
                )}

                <div className="relative grid gap-5 md:grid-cols-[1.25fr_1fr] md:gap-8">
                  {/* left column */}
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="eyebrow">Order · placed {formatOrderDate(o.date)}</p>
                        <h2 className="mt-1.5 truncate font-display text-xl tracking-[0.08em] md:text-2xl">
                          {o.number}
                        </h2>
                      </div>
                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[0.52rem] uppercase tracking-[0.2em]",
                          live
                            ? "border-foreground/30 bg-foreground/10 text-foreground"
                            : "border-hairline text-muted-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            live
                              ? "animate-glow-pulse bg-foreground shadow-[0_0_10px_2px_oklch(1_0_0/0.6)]"
                              : "bg-muted-foreground",
                          )}
                        />
                        {o.status}
                      </span>
                    </div>

                    {/* progress ribbon */}
                    <div className="mt-4">
                      <div className="h-[3px] w-full overflow-hidden rounded-full bg-hairline">
                        <span
                          className="block h-full rounded-full bg-foreground/80 shadow-[0_0_14px_1px_oklch(1_0_0/0.45)] transition-[width] duration-1000"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[0.5rem] uppercase tracking-[0.2em] text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Package className="h-3 w-3" strokeWidth={1.25} /> Confirmed
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Truck className="h-3 w-3" strokeWidth={1.25} /> Delivered
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 flex items-start gap-2 text-[0.7rem] leading-relaxed text-muted-foreground">
                      <CalendarClock className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.25} />
                      {delivery.label} — <span className="text-foreground">{delivery.date}</span>
                    </p>
                    <p className="mt-1.5 flex items-start gap-2 text-[0.7rem] leading-relaxed text-muted-foreground">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.25} />
                      {live ? "Delivering to" : "Delivered to"} — {o.address}
                    </p>
                  </div>

                  {/* right column */}
                  <div className="flex min-w-0 flex-col border-t border-hairline pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    <ul className="flex flex-col gap-1.5">
                      {o.items.map((it) => (
                        <li
                          key={it.id}
                          className="light-sweep flex items-center justify-between gap-4 rounded-xl border border-hairline bg-surface-2/50 px-3.5 py-2"
                        >
                          <Link
                            to="/product/$productId"
                            params={{ productId: it.id }}
                            className="relative z-[3] min-w-0 flex-1 truncate text-[0.78rem] text-foreground"
                          >
                            {it.name}
                            <span className="text-muted-foreground"> × {it.qty}</span>
                          </Link>
                          <span className="relative z-[3] shrink-0 text-[0.78rem] text-muted-foreground">
                            {formatPrice(it.price * it.qty)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4">
                      <div>
                        <p className="eyebrow">Total</p>
                        <span className="font-display text-lg">{formatPrice(o.total)}</span>
                      </div>
                      <Link
                        to="/track-order"
                        search={{ number: o.number, from: "orders" }}
                        className={luxClass("solid", "sm", "btn-shine")}
                      >
                        <span className="relative z-[3]">Track this order</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>

    </div>
  );
}
