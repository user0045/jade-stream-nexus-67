import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { LuxButton, LuxLink } from "@/components/site/LuxButton";
import { PageHead, Panel } from "@/components/site/PageHead";
import { AddressForm, type AddressDraft } from "@/components/site/AddressForm";
import { Field } from "@/components/site/AuthShell";
import { formatAddress, useShop, type Address } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Account — Deal One" },
      {
        name: "description",
        content: "Manage your Deal One membership, addresses and preferences.",
      },
      { property: "og:title", content: "Your Account — Deal One" },
      { property: "og:description", content: "Your Deal One membership and preferences." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const {
    account,
    signIn,
    signOut,
    orders,
    addresses,
    saveAddress,
    deleteAddress,
    setDefaultAddress,
    maxAddresses,
  } = useShop();

  const [editingProfile, setEditingProfile] = useState(false);
  const [name, setName] = useState(account?.name ?? "");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<AddressDraft | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Address | null>(null);
  const [nextDefault, setNextDefault] = useState<string | null>(null);

  if (!account) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <div className="glass-panel halo animate-rise rounded-[2.5rem] p-10">
          <p className="eyebrow">Membership</p>
          <h1 className="mt-4 font-display text-4xl">Sign in to Deal One</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Access your orders, addresses and private previews.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <LuxLink to="/auth/login">Sign in</LuxLink>
            <LuxLink to="/auth/signup" variant="outline">
              Create account
            </LuxLink>
          </div>
        </div>
      </div>
    );
  }

  const initial = account.name.trim().charAt(0).toUpperCase() || "D";
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const inProgress = orders.length - delivered;
  const memberSince = orders.length
    ? orders[orders.length - 1]!.date
    : new Date().toISOString().slice(0, 10);
  const defaultId = addresses[0]?.id;
  const canAdd = addresses.length < maxAddresses;

  const confirmDelete = () => {
    if (!pendingDelete) return;
    const isDefault = pendingDelete.id === defaultId;
    const remaining = addresses.filter((a) => a.id !== pendingDelete.id);
    if (isDefault && remaining.length > 1 && !nextDefault) {
      toast.error("Choose a new default address");
      return;
    }
    deleteAddress(pendingDelete.id, nextDefault ?? undefined);
    setPendingDelete(null);
    setNextDefault(null);
    toast.success("Address removed");
  };

  return (
    <div>
      <PageHead back eyebrow="Membership" title="Your account" />

      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        {/* ---------- IDENTITY BANNER ---------- */}
        <div className="glass-panel halo animate-rise relative overflow-hidden rounded-[2.25rem] p-6 md:p-9">
          <div
            aria-hidden="true"
            className="animate-glow-pulse pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.12),transparent_70%)] blur-2xl"
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* monogram */}
            <div className="relative w-fit shrink-0">
              <span
                aria-hidden="true"
                className="animate-glow-pulse absolute -inset-3 rounded-[2rem] bg-[radial-gradient(circle,oklch(1_0_0/0.3),transparent_70%)] blur-xl"
              />
              <span className="light-highlight relative grid h-24 w-24 place-items-center overflow-hidden rounded-3xl border border-foreground/25 bg-surface-2 shadow-[var(--shadow-emission)]">
                <span className="font-display text-5xl font-bold leading-none text-foreground drop-shadow-[0_0_18px_oklch(1_0_0/0.65)]">
                  {initial}
                </span>
              </span>
              <span className="absolute -bottom-1.5 -right-1.5 grid h-9 w-9 place-items-center rounded-full border border-hairline bg-surface">
                <span
                  aria-hidden="true"
                  className="animate-glow-pulse absolute inset-0 rounded-full shadow-[0_0_18px_3px_oklch(1_0_0/0.55)]"
                />
                <BadgeCheck
                  className="relative h-5 w-5 text-foreground drop-shadow-[0_0_8px_oklch(1_0_0/0.75)]"
                  strokeWidth={1.5}
                />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="eyebrow">Deal One member</p>
              {editingProfile ? (
                <form
                  className="mt-3 flex max-w-sm flex-col gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!name.trim()) return;
                    signIn(name.trim(), account.email);
                    setEditingProfile(false);
                    toast.success("Profile updated");
                  }}
                >
                  <Field label="Full name" value={name} onChange={setName} />
                  <div className="flex gap-3">
                    <LuxButton type="submit" size="sm">
                      Save
                    </LuxButton>
                    <LuxButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setName(account.name);
                        setEditingProfile(false);
                      }}
                    >
                      Cancel
                    </LuxButton>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="mt-1.5 truncate font-display text-3xl md:text-4xl">
                    {account.name}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="flex min-w-0 items-center gap-2">
                      <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.25} />
                      <span className="truncate">{account.email}</span>
                    </span>
                    <span>Member since {memberSince}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <LuxButton
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setName(account.name);
                        setEditingProfile(true);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit profile
                    </LuxButton>
                    <LuxButton
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        signOut();
                        toast.success("Signed out");
                      }}
                    >
                      <LogOut className="h-3.5 w-3.5" /> Sign out
                    </LuxButton>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* stat strip */}
          <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
            <Stat label="Orders" value={String(orders.length)} />
            <Stat label="Delivered" value={String(delivered)} />
            <Stat label="In progress" value={String(inProgress)} />
          </div>
        </div>

        {/* ---------- ADDRESSES + SIDE ---------- */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 font-display text-xl">
                <MapPin className="h-4 w-4" strokeWidth={1.25} /> Saved addresses
              </p>
              {!adding && !editing && (
                <LuxButton
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (!canAdd) {
                      toast.error(`You can save up to ${maxAddresses} addresses`);
                      return;
                    }
                    setAdding(true);
                  }}
                >
                  <Plus className="h-3.5 w-3.5" /> Add address
                </LuxButton>
              )}
            </div>

            {adding || editing ? (
              <div className="mt-6">
                <AddressForm
                  {...(editing ? { initial: editing } : {})}
                  submitLabel={editing ? "Save changes" : "Save address"}
                  onCancel={() => {
                    setAdding(false);
                    setEditing(null);
                  }}
                  onSave={(d) => {
                    saveAddress(d);
                    setAdding(false);
                    setEditing(null);
                    toast.success(editing ? "Address updated" : "Address saved");
                  }}
                />
              </div>
            ) : (
              <>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {addresses.map((a) => {
                    const isDefault = a.id === defaultId;
                    return (
                      <div
                        key={a.id}
                        className={cn(
                          "light-sweep relative rounded-2xl border bg-surface-2/50 p-4 transition-all duration-700 [transition-timing-function:var(--ease-lux)]",
                          isDefault
                            ? "border-foreground/35 shadow-[var(--shadow-emission)]"
                            : "border-hairline hover:border-foreground/25",
                        )}
                      >
                        <div className="relative z-[3] flex items-start justify-between gap-3">
                          <p className="flex min-w-0 flex-wrap items-center gap-2 text-sm">
                            <span className="truncate font-medium">{a.name}</span>
                            {isDefault && (
                              <span className="light-highlight rounded-full px-2 py-0.5 text-[0.5rem] uppercase tracking-[0.18em]">
                                Default
                              </span>
                            )}
                          </p>
                          <span className="flex shrink-0 items-center gap-1">
                            <button
                              onClick={() => setEditing(a)}
                              aria-label={`Edit address of ${a.name}`}
                              className="halo grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <Pencil className="h-3.5 w-3.5" strokeWidth={1.25} />
                            </button>
                            <button
                              onClick={() => {
                                if (addresses.length <= 1) {
                                  toast.error("At least one address must remain saved");
                                  return;
                                }
                                setNextDefault(null);
                                setPendingDelete(a);
                              }}
                              aria-label={`Delete address of ${a.name}`}
                              className="halo grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" strokeWidth={1.25} />
                            </button>
                          </span>
                        </div>
                        <p className="relative z-[3] mt-2 text-xs leading-relaxed text-muted-foreground">
                          {formatAddress(a)}
                        </p>
                        <p className="relative z-[3] mt-1 text-xs text-muted-foreground">
                          +91 {a.phone}
                        </p>
                        {!isDefault && (
                          <button
                            onClick={() => {
                              setDefaultAddress(a.id);
                              toast.success("Default address updated");
                            }}
                            className="underline-lux relative z-[3] mt-3 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                          >
                            Set as default
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="mt-5 text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {addresses.length} / {maxAddresses} addresses saved
                </p>
              </>
            )}
          </Panel>

          <div className="flex flex-col gap-5">
            <Panel>
              <p className="eyebrow">Quick links</p>
              <div className="mt-5 flex flex-col">
                <QuickLink to="/orders" label="Order history" />
                <QuickLink to="/shop" label="Continue shopping" />
                <QuickLink to="/contact" label="Contact support" />
              </div>
            </Panel>

            <Panel>
              <p className="eyebrow">Security</p>
              <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.25} />
                Your account is protected with encrypted sessions and private, house-held data.
                Contact support if anything ever looks unusual.
              </p>
              <div className="mt-6">
                <Link
                  to="/auth/forgot-password"
                  className="underline-lux text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground"
                >
                  Change password
                </Link>
              </div>
            </Panel>
          </div>
        </div>
      </section>

      {/* ---------- DELETE ADDRESS DIALOG ---------- */}
      {pendingDelete && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto overscroll-contain bg-background/80 px-5 pb-12 pt-24 backdrop-blur-md md:pt-28">
          <div className="glass-panel halo animate-rise w-full max-w-md rounded-[2rem] p-7">
            <p className="eyebrow">Remove address</p>
            <h3 className="mt-3 font-display text-2xl">
              Delete {pendingDelete.name}&rsquo;s address?
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {formatAddress(pendingDelete)}
            </p>

            {pendingDelete.id === defaultId &&
              addresses.filter((a) => a.id !== pendingDelete.id).length > 1 && (
                <div className="mt-6">
                  <p className="eyebrow">Choose a new default address</p>
                  <div className="mt-3 flex flex-col gap-2">
                    {addresses
                      .filter((a) => a.id !== pendingDelete.id)
                      .map((a) => (
                        <button
                          key={a.id}
                          onClick={() => setNextDefault(a.id)}
                          className={cn(
                            "flex items-start gap-3 rounded-2xl border bg-surface p-3.5 text-left transition-all duration-500",
                            nextDefault === a.id
                              ? "border-foreground/40 shadow-[var(--shadow-emission)]"
                              : "border-hairline hover:border-foreground/25",
                          )}
                        >
                          <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-foreground/50">
                            {nextDefault === a.id && (
                              <span className="h-2 w-2 rounded-full bg-foreground" />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm">{a.name}</span>
                            <span className="mt-1 block text-xs text-muted-foreground">
                              {formatAddress(a)}
                            </span>
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}

            <div className="mt-7 flex flex-wrap gap-3">
              <LuxButton onClick={confirmDelete}>Delete address</LuxButton>
              <LuxButton
                variant="ghost"
                onClick={() => {
                  setPendingDelete(null);
                  setNextDefault(null);
                }}
              >
                Cancel
              </LuxButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuickLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="light-sweep flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors duration-500 hover:bg-surface-2 hover:text-foreground"
    >
      <span className="relative z-[3]">{label}</span>
      <ArrowRight className="relative z-[3] h-3.5 w-3.5" strokeWidth={1.25} />
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface-2/60 px-4 py-3.5">
      <p className="text-[0.52rem] uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
      <p className="mt-1.5 font-display text-2xl [font-variant-numeric:lining-nums]">{value}</p>
    </div>
  );
}
