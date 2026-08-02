import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, CreditCard, Lock, Pencil, Plus } from "lucide-react";
import { toast } from "sonner";
import { findProduct, formatPrice } from "@/data/catalog";
import { Field } from "@/components/site/AuthShell";
import { AddressForm, type AddressDraft } from "@/components/site/AddressForm";
import { LuxButton, LuxLink, luxClass } from "@/components/site/LuxButton";
import { PageHead } from "@/components/site/PageHead";
import { formatAddress, useShop, type Address, type Order } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({
    buy: typeof search["buy"] === "string" ? (search["buy"] as string) : undefined,
    qty: Number(search["qty"]) > 0 ? Number(search["qty"]) : undefined,
  }),

  head: () => ({
    meta: [
      { title: "Secure Checkout — Deal One" },
      { name: "description", content: "Complete your Deal One order in three discreet steps." },
      { property: "og:title", content: "Secure Checkout — Deal One" },
      { property: "og:description", content: "Details, payment, confirmation." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { buy, qty: buyQty } = Route.useSearch();
  const {
    lines,
    subtotal,
    placeOrder,
    placeDirectOrder,
    addresses,
    saveAddress,
    maxAddresses,
    account,
  } = useShop();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [placed, setPlaced] = useState<Order | null>(null);
  const [selected, setSelected] = useState<string | null>(addresses[0]?.id ?? null);
  const [editing, setEditing] = useState<AddressDraft | null>(null);
  const [adding, setAdding] = useState(addresses.length === 0);
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });
  const [confirmAddress, setConfirmAddress] = useState<Address | null>(null);

  const buyProduct = buy ? findProduct(buy) : undefined;
  const directLines = buyProduct ? [{ product: buyProduct, qty: buyQty ?? 1 }] : null;
  const activeLines = directLines ?? lines;
  const total = activeLines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const chosen: Address | undefined = addresses.find((a) => a.id === selected);

  if (step === 3 && placed) {
    return (
      <div>
        <PageHead eyebrow="Checkout" title="Confirmation">
          <StepBar step={3} />
        </PageHead>
        <div className="mx-auto max-w-xl px-5 pb-24 text-center">
          <div className="glass-panel halo animate-rise relative overflow-hidden rounded-[2.5rem] p-10">
            <div className="animate-glow-pulse pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.18),transparent_70%)]" />
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-hairline">
              <Check className="h-5 w-5" strokeWidth={1.25} />
            </div>
            <h1 className="mt-8 font-display text-4xl">Order confirmed</h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Your order number is being prepared in our atelier.
            </p>
            <div className="mx-auto mt-5 flex w-fit items-center gap-3 rounded-full border border-hairline bg-surface px-5 py-3">
              <span className="font-display text-lg tracking-[0.16em] text-foreground">
                {placed.number}
              </span>
              <button
                type="button"
                aria-label="Copy order number"
                onClick={() => {
                  navigator.clipboard
                    ?.writeText(placed.number)
                    .then(() => toast.success("Order number copied"))
                    .catch(() => toast.error("Couldn’t copy — please note it down"));
                }}
                className="halo grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors duration-500 hover:text-foreground"
              >
                <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
            {!account && (
              <p className="mx-auto mt-5 max-w-sm text-xs leading-relaxed text-muted-foreground">
                You’re not signed in — keep this 12-digit number safe. You can use it any time on
                the Track order page to follow your parcel.
              </p>
            )}

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/track-order"
                search={{ number: placed.number, from: "checkout" }}
                className={luxClass()}
              >
                <span className="relative z-[3]">Track order</span>
              </Link>
              <LuxLink to="/shop" variant="outline">
                Continue browsing
              </LuxLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeLines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl">Nothing to check out</h1>
        <p className="mt-4 text-sm text-muted-foreground">Your bag is currently empty.</p>
        <div className="mt-8 flex justify-center">
          <LuxLink to="/shop">Browse the house</LuxLink>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHead
        eyebrow="Checkout"
        title={step === 1 ? "Your details" : step === 2 ? "Payment" : "Confirmation"}
      >
        <StepBar step={step} />
      </PageHead>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 md:grid-cols-[1.4fr_1fr] md:px-8">
        <div className="glass-panel rounded-[2rem] p-6 md:p-8">
          {step === 1 ? (
            <div className="flex flex-col gap-5">
              {editing ? (
                <AddressForm
                  initial={editing}
                  submitLabel="Save changes"
                  onCancel={() => setEditing(null)}
                  onSave={(d) => {
                    const saved = saveAddress(d);
                    setSelected(saved.id);
                    setEditing(null);
                  }}
                />
              ) : adding ? (
                <AddressForm
                  {...(addresses.length ? { onCancel: () => setAdding(false) } : {})}
                  submitLabel="Save & continue"
                  onSave={(d) => {
                    const saved = saveAddress(d);
                    setSelected(saved.id);
                    setAdding(false);
                    setConfirmAddress(saved);
                  }}
                />
              ) : (
                <>
                  <p className="eyebrow">Saved addresses</p>
                  <div className="flex flex-col gap-3">
                    {addresses.map((a) => (
                      <div
                        key={a.id}
                        className={cn(
                          "light-sweep flex items-start gap-4 rounded-2xl border bg-surface p-4 transition-all duration-700 [transition-timing-function:var(--ease-lux)]",
                          selected === a.id
                            ? "border-foreground/40 shadow-[var(--shadow-emission)]"
                            : "border-hairline hover:border-foreground/25",
                        )}
                      >
                        <button
                          onClick={() => setSelected(a.id)}
                          className="relative z-[3] mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-foreground/50"
                          aria-label={`Select address of ${a.name}`}
                        >
                          {selected === a.id && (
                            <span className="h-2 w-2 rounded-full bg-foreground" />
                          )}
                        </button>
                        <button
                          onClick={() => setSelected(a.id)}
                          className="relative z-[3] min-w-0 flex-1 text-left"
                        >
                          <p className="text-sm text-foreground">
                            {a.name} · <span className="text-muted-foreground">+91 {a.phone}</span>
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {formatAddress(a)}
                          </p>
                        </button>
                        <button
                          onClick={() => setEditing(a)}
                          aria-label="Edit address"
                          className="halo relative z-[3] grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.25} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <LuxButton
                      variant="outline"
                      onClick={() => {
                        if (addresses.length >= maxAddresses) {
                          toast.error(`You can save up to ${maxAddresses} addresses`);
                          return;
                        }
                        setAdding(true);
                      }}
                    >
                      <Plus className="h-3.5 w-3.5" /> Add new address
                    </LuxButton>
                    <LuxButton
                      disabled={!chosen}
                      onClick={() => {
                        if (chosen) setConfirmAddress(chosen);
                      }}
                    >
                      Deliver here — continue
                    </LuxButton>
                  </div>
                </>
              )}
            </div>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!chosen) return;
                const addr = formatAddress(chosen);
                const order = directLines
                  ? placeDirectOrder(
                      addr,
                      directLines.map((l) => ({
                        id: l.product.id,
                        name: l.product.name,
                        qty: l.qty,
                        price: l.product.price,
                      })),
                    )
                  : placeOrder(addr);
                setPlaced(order);
                setStep(3);
                toast.success("Payment authorised");
              }}
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" strokeWidth={1.25} /> Encrypted, tokenised payment
              </div>
              <Field
                label="Card number"
                value={card.number}
                onChange={(v) => setCard({ ...card, number: v })}
                placeholder="0000 0000 0000 0000"
                autoComplete="cc-number"
              />
              <Field
                label="Name on card"
                value={card.name}
                onChange={(v) => setCard({ ...card, name: v })}
                autoComplete="cc-name"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Expiry"
                  value={card.expiry}
                  onChange={(v) => setCard({ ...card, expiry: v })}
                  placeholder="MM / YY"
                  autoComplete="cc-exp"
                />
                <Field
                  label="CVC"
                  value={card.cvc}
                  onChange={(v) => setCard({ ...card, cvc: v })}
                  placeholder="•••"
                  autoComplete="cc-csc"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <LuxButton type="submit">
                  <CreditCard className="h-3.5 w-3.5" /> Pay {formatPrice(total)}
                </LuxButton>
                <LuxButton type="button" variant="ghost" onClick={() => setStep(1)}>
                  Back to details
                </LuxButton>
              </div>
            </form>
          )}
        </div>

        <aside className="glass-panel h-fit rounded-[2rem] p-6 md:sticky md:top-28 md:p-8">
          <p className="eyebrow">Order</p>
          <div className="mt-6 flex flex-col gap-4">
            {activeLines.map(({ product, qty }) => (
              <Link
                key={product.id}
                to="/product/$productId"
                params={{ productId: product.id }}
                className="group flex items-center gap-3"
              >
                <div className="lift-img h-16 w-14 overflow-hidden rounded-xl border border-hairline">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {qty}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatPrice(product.price * qty)}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex items-baseline justify-between border-t border-hairline pt-6">
            <span className="eyebrow">Total</span>
            <span className="font-display text-2xl">{formatPrice(total)}</span>
          </div>
        </aside>
      </section>

      {confirmAddress && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto overscroll-contain bg-background/80 px-5 pb-12 pt-24 backdrop-blur-md md:pt-28">
          <div className="glass-panel halo animate-rise w-full max-w-md rounded-[2rem] p-7">
            <p className="eyebrow">Confirm delivery details</p>
            <h3 className="mt-3 font-display text-2xl">Is everything correct?</h3>
            <div className="mt-5 flex flex-col gap-2 rounded-2xl border border-hairline bg-surface p-4">
              <p className="text-sm">{confirmAddress.name}</p>
              <p className="text-xs text-muted-foreground">+91 {confirmAddress.phone}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {formatAddress(confirmAddress)}
              </p>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              This address will be used for this order. You can still edit it before paying.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LuxButton
                onClick={() => {
                  setConfirmAddress(null);
                  setStep(2);
                }}
              >
                Yes, continue to payment
              </LuxButton>
              <LuxButton
                variant="ghost"
                onClick={() => {
                  setEditing(confirmAddress);
                  setConfirmAddress(null);
                }}
              >
                Edit address
              </LuxButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepBar({ step }: { step: 1 | 2 | 3 }) {
  const steps = ["Details", "Payment", "Confirmation"] as const;
  return (
    <ol className="flex w-full items-center gap-1.5 sm:gap-3">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <li key={label} className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-3">
            <span className="flex min-w-0 items-center gap-1.5 sm:gap-2.5">
              <span
                className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[0.6rem] transition-all duration-700 [transition-timing-function:var(--ease-lux)] sm:h-8 sm:w-8 sm:text-xs",
                  active || done
                    ? "border-transparent bg-primary text-primary-foreground shadow-[var(--shadow-emission)]"
                    : "border-hairline text-muted-foreground",
                )}
              >
                {done ? <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : n}
              </span>
              <span
                className={cn(
                  "truncate text-[0.5rem] uppercase tracking-[0.12em] sm:text-[0.6rem] sm:tracking-[0.2em]",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </span>
            {n < steps.length && (
              <span
                className={cn("h-px min-w-2 flex-1", done ? "bg-foreground/60" : "bg-hairline")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
