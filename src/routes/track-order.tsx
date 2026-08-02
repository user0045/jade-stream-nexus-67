import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowLeft, Check, HelpCircle, MessageCircle, Package, X } from "lucide-react";
import { formatPrice } from "@/data/catalog";
import { LuxButton } from "@/components/site/LuxButton";
import { PageHead } from "@/components/site/PageHead";
import { ORDER_STAGES, useShop } from "@/lib/shop-store";
import { deliveryInfo, formatOrderDate, stageTimeline } from "@/lib/order-timeline";
import { cn } from "@/lib/utils";

const STAGES = ORDER_STAGES;

export const Route = createFileRoute("/track-order")({
  validateSearch: z.object({ number: z.string().optional(), from: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Track Your Order — Deal One" },
      {
        name: "description",
        content: "Enter your Deal One order number to follow your parcel from atelier to door.",
      },
      { property: "og:title", content: "Track Your Order — Deal One" },
      { property: "og:description", content: "Follow your Deal One parcel in real time." },
    ],
  }),
  component: TrackOrder,
});

function TrackOrder() {
  const { number, from } = Route.useSearch();
  const navigate = useNavigate();
  const { orders, account } = useShop();
  const [value, setValue] = useState(number ?? "");
  const [error, setError] = useState("");
  const [lookup, setLookup] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [sent, setSent] = useState<string | null>(null);

  useEffect(() => setValue(number ?? ""), [number]);

  const order = number ? orders.find((o) => o.number === number.trim()) : undefined;
  const timeline = order ? stageTimeline(order) : [];
  const delivery = order ? deliveryInfo(order) : null;
  const showBack = Boolean(account) && from === "orders";

  return (
    <div>
      {showBack && (
        <div className="mx-auto max-w-7xl px-5 pt-6 md:px-8">
          <Link
            to="/orders"
            className="halo inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground transition-all duration-700 [transition-timing-function:var(--ease-lux)] hover:border-foreground/40 hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Back to orders
          </Link>
        </div>
      )}

      <div className="relative">
      <PageHead
        {...(showBack ? {} : { back: true as const })}
        {...(from === "checkout" ? { backTo: "/shop" } : {})}
        eyebrow="Client care"
        title="Track your order"
        intro="Enter the 12-digit order number from your confirmation — for example 480192774531."
      >
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^\d{12}$/.test(value.trim())) {
              setError("Order number must be exactly 12 digits.");
              return;
            }
            setError("");
            // replace the entry when a result is already shown, so the browser
            // back button returns to the page the visitor arrived from
            navigate({
              to: "/track-order",
              search: { number: value.trim() },
              replace: Boolean(number),
            });
          }}
          className="flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="flex-1">
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value.replace(/\D/g, "").slice(0, 12));
                setError("");
              }}
              placeholder="12-digit order number"
              inputMode="numeric"
              aria-label="Order number"
              maxLength={12}
              minLength={12}
              pattern="\d{12}"
              className="h-12 w-full rounded-full border border-hairline bg-surface px-5 text-sm tracking-[0.18em] outline-none transition-all duration-700 [transition-timing-function:var(--ease-lux)] placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:shadow-[var(--shadow-emission)]"
            />
            <p className="mt-2 pl-5 text-[0.6rem] tracking-[0.08em] text-muted-foreground">
              {error ? (
                <span className="text-destructive">{error}</span>
              ) : (
                `${value.length}/12 digits`
              )}
            </p>
          </div>
          <LuxButton type="submit">Track</LuxButton>
        </form>

        <button
          type="button"
          onClick={() => setLookup((v) => !v)}
          className="light-sweep halo glow-ring mt-5 inline-flex w-full max-w-xl items-center justify-center gap-2 rounded-2xl border border-foreground/30 bg-surface/80 px-4 py-3 text-center text-[0.58rem] uppercase leading-relaxed tracking-[0.18em] text-foreground backdrop-blur-xl transition-all duration-700 [transition-timing-function:var(--ease-lux)] hover:-translate-y-0.5 hover:border-foreground/60 sm:w-auto sm:rounded-full sm:px-5 sm:text-[0.6rem] sm:tracking-[0.2em]"
        >
          <HelpCircle className="relative z-[3] h-3.5 w-3.5 shrink-0" strokeWidth={1.25} />
          <span className="relative z-[3]">Don’t remember your order number?</span>
        </button>
      </PageHead>
      </div>

      {lookup && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto overscroll-contain bg-background/80 px-5 pb-12 pt-24 backdrop-blur-md md:pt-28"
          onClick={() => setLookup(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Find order by mobile number"
            onClick={(e) => e.stopPropagation()}
            className="glass-panel halo animate-rise relative my-auto w-full max-w-md rounded-[2rem] p-6 md:p-8"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLookup(false)}
              className="halo absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-hairline text-muted-foreground transition-all duration-500 hover:border-foreground/40 hover:text-foreground"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <p className="eyebrow">Find by mobile number</p>
            <p className="mt-3 max-w-[85%] text-xs leading-relaxed text-muted-foreground">
              Enter the mobile number used to place the order and we will send your recent order
              details on WhatsApp.
            </p>
            <form
              noValidate
              className="mt-6 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!/^[6-9]\d{9}$/.test(phone)) {
                  setSent(null);
                  setPhoneError("Enter a valid 10-digit mobile number.");
                  return;
                }
                setPhoneError("");
                setSent(phone);
                setLookup(false);
              }}
            >
              <div className="flex h-12 flex-1 items-center gap-2 rounded-full border border-hairline bg-surface px-5 focus-within:border-foreground/40">
                <span className="text-sm text-muted-foreground">+91</span>
                <input
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    setPhoneError("");
                  }}
                  inputMode="numeric"
                  maxLength={10}
                  aria-label="Mobile number"
                  placeholder="10-digit mobile number"
                  className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                />
              </div>
              {phoneError && <p className="text-[0.62rem] text-destructive">{phoneError}</p>}
              <LuxButton type="submit">Send details</LuxButton>
            </form>
          </div>
        </div>
      )}


      {sent && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto overscroll-contain bg-background/80 px-5 pb-12 pt-24 backdrop-blur-md md:pt-28">
          <div className="glass-panel halo animate-rise my-auto w-full max-w-md rounded-[2rem] p-7 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-hairline">
              <MessageCircle className="h-5 w-5" strokeWidth={1.25} />
            </div>
            <h3 className="mt-6 font-display text-2xl">On its way to WhatsApp</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We will soon send the details of your last 7 orders placed with +91 {sent} on
              WhatsApp.
            </p>
            <div className="mt-7 flex justify-center">
              <LuxButton
                onClick={() => {
                  setSent(null);
                  setLookup(false);
                }}
              >
                Close
              </LuxButton>
            </div>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
        {number && !order && (
          <div className="glass-panel rounded-[2rem] p-8 text-center">
            <p className="font-display text-2xl">No order found</p>
            <p className="mt-3 text-sm text-muted-foreground">
              We couldn’t find {number}. Please check the 12 digits and try again — or look your
              order up with the mobile number used at checkout.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <LuxButton onClick={() => setLookup(true)}>Find with mobile number</LuxButton>
              <LuxButton variant="outline" onClick={() => setValue("")}>
                Try another number
              </LuxButton>
            </div>
          </div>
        )}

        {order && (
          <div className="glass-panel animate-rise rounded-[2rem] p-6 md:p-10">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
              <div className="min-w-0">
                <p className="eyebrow">Order</p>
                <h2 className="truncate font-display text-3xl">{order.number}</h2>
                <p className="mt-2 text-xs text-muted-foreground">
                  Placed {formatOrderDate(order.date)} · {formatPrice(order.total)}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-hairline px-4 py-2 text-[0.6rem] uppercase tracking-[0.2em]">
                {order.status}
              </span>
            </div>

            {delivery && (
              <p className="mt-5 text-xs text-muted-foreground">
                {delivery.label} — <span className="text-foreground">{delivery.date}</span>
              </p>
            )}

            <ol className="mt-10 flex flex-col gap-0">
              {STAGES.map((stage, i) => {
                const currentIndex = STAGES.indexOf(order.status);
                const done = i <= currentIndex;
                const stamp = timeline[i];
                return (
                  <li key={stage} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-700",
                          done
                            ? "border-transparent bg-primary text-primary-foreground shadow-[var(--shadow-emission)]"
                            : "border-hairline text-muted-foreground",
                        )}
                      >
                        {done ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Package className="h-3.5 w-3.5" strokeWidth={1.25} />
                        )}
                      </span>
                      {i < STAGES.length - 1 && (
                        <span
                          className={cn(
                            "my-1 w-px flex-1",
                            i < currentIndex ? "bg-foreground/60" : "bg-hairline",
                          )}
                        />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className={done ? "text-sm" : "text-sm text-muted-foreground"}>{stage}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {done && stamp ? (
                          <>
                            {stamp.date} · {stamp.time}
                          </>
                        ) : (
                          "Pending"
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="border-t border-hairline pt-6">
              <p className="eyebrow">
                {order.status === "Delivered" ? "Delivered to" : "Delivering to"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{order.address}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
