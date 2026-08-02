import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { INDIAN_STATES } from "@/data/catalog";
import { Field } from "@/components/site/AuthShell";
import { LuxButton } from "@/components/site/LuxButton";
import type { Address } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export type AddressDraft = Omit<Address, "id"> & { id?: string };

const EMPTY: AddressDraft = {
  name: "",
  phone: "",
  house: "",
  road: "",
  pincode: "",
  city: "",
  state: "",
};

export function LuxSelect({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  error?: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [rect, setRect] = useState<{ top: number; left: number; width: number; up: boolean }>({
    top: 0,
    left: 0,
    width: 0,
    up: false,
  });

  const place = () => {
    const el = trigger.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const below = window.innerHeight - r.bottom;
    const up = below < 280 && r.top > below;
    setRect({
      top: up ? r.top - 8 : r.bottom + 8,
      left: r.left,
      width: r.width,
      up,
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    place();
    const onScroll = () => place();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // lock page scrolling while the list is open (mobile especially),
    // but keep the list itself scrollable
    const body = document.body;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    const onTouchMove = (e: TouchEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t?.closest?.("[data-lux-select-menu]")) e.preventDefault();
    };
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      body.style.overflow = prevOverflow;
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!wrap.current?.contains(t) && !(t as HTMLElement).closest?.("[data-lux-select-menu]"))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <div ref={wrap} className="relative mt-2">
        <button
          ref={trigger}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-2xl border bg-surface px-4 text-left text-sm outline-none transition-all duration-700 [transition-timing-function:var(--ease-lux)]",
            error ? "border-destructive/60" : "border-hairline hover:border-foreground/30",
            open && "border-foreground/45 shadow-[var(--shadow-emission)]",
            value ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <span className="truncate">{value || "Select state"}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-500 [transition-timing-function:var(--ease-lux)]",
              open && "rotate-180 text-foreground",
            )}
            strokeWidth={1.25}
          />
        </button>

        {open &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              role="listbox"
              data-lux-select-menu=""
              style={{
                position: "fixed",
                top: rect.top,
                left: rect.left,
                width: rect.width,
                transform: rect.up ? "translateY(-100%)" : undefined,
              }}
              className={cn(
                "lux-scroll z-[300] max-h-64",
                !rect.up && "animate-rise",
              ) + "  overflow-y-auto rounded-2xl border border-hairline bg-surface-2/95 p-1.5 shadow-[var(--shadow-emission)] backdrop-blur-xl"}
            >
              {options.map((o) => (
                <button
                  key={o}
                  type="button"
                  role="option"
                  aria-selected={value === o}
                  onClick={() => {
                    onChange(o);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-left text-sm transition-all duration-500 [transition-timing-function:var(--ease-lux)] hover:bg-foreground/10 hover:text-foreground",
                    value === o ? "bg-foreground/10 text-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="truncate">{o}</span>
                  {value === o && <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />}
                </button>
              ))}
            </div>,
            document.body,
          )}
      </div>
      {error && <span className="mt-1.5 block text-[0.62rem] text-destructive">{error}</span>}
    </label>
  );
}

export function validateAddress(d: AddressDraft) {
  const e: Partial<Record<keyof AddressDraft, string>> = {};
  if (!d.name.trim()) e.name = "Name is required";
  if (!/^[6-9]\d{9}$/.test(d.phone.trim())) e.phone = "Enter a valid 10-digit number";
  if (!d.house.trim()) e.house = "Required";
  if (!d.road.trim()) e.road = "Required";
  if (!/^\d{6}$/.test(d.pincode.trim())) e.pincode = "Enter a valid 6-digit pincode";
  if (!d.city.trim()) e.city = "Required";
  if (!d.state) e.state = "Select a state";
  return e;
}

export function AddressForm({
  initial,
  onCancel,
  onSave,
  submitLabel = "Save address",
}: {
  initial?: AddressDraft;
  onCancel?: () => void;
  onSave: (d: AddressDraft) => void;
  submitLabel?: string;
}) {
  const [draft, setDraft] = useState<AddressDraft>(initial ?? EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressDraft, string>>>({});

  const set = (k: keyof AddressDraft) => (v: string) => setDraft((d) => ({ ...d, [k]: v }));

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const errs = validateAddress(draft);
        setErrors(errs);
        if (Object.keys(errs).length === 0) onSave(draft);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FieldWrap error={errors.name}>
          <Field label="Name" value={draft.name} onChange={set("name")} autoComplete="name" />
        </FieldWrap>
        <FieldWrap error={errors.phone}>
          <label className="block">
            <span className="eyebrow">Contact Number</span>
            <div className="mt-2 flex h-12 items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 transition-all duration-700 [transition-timing-function:var(--ease-lux)] focus-within:border-foreground/40 focus-within:shadow-[var(--shadow-emission)]">
              <span className="text-sm text-muted-foreground">+91</span>
              <input
                value={draft.phone}
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel"
                onChange={(e) => set("phone")(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                placeholder="10-digit mobile number"
              />
            </div>
          </label>
        </FieldWrap>
      </div>

      <FieldWrap error={errors.house}>
        <Field
          label="House no./Building Name"
          value={draft.house}
          onChange={set("house")}
          autoComplete="address-line1"
        />
      </FieldWrap>
      <FieldWrap error={errors.road}>
        <Field
          label="Road Name/ Area/ Colony"
          value={draft.road}
          onChange={set("road")}
          autoComplete="address-line2"
        />
      </FieldWrap>

      <div className="grid gap-4 md:grid-cols-3">
        <FieldWrap error={errors.pincode}>
          <Field
            label="Pincode"
            value={draft.pincode}
            onChange={(v) => set("pincode")(v.replace(/\D/g, "").slice(0, 6))}
            autoComplete="postal-code"
          />
        </FieldWrap>
        <FieldWrap error={errors.city}>
          <Field
            label="City"
            value={draft.city}
            onChange={set("city")}
            autoComplete="address-level2"
          />
        </FieldWrap>
        <LuxSelect
          label="State"
          value={draft.state}
          onChange={set("state")}
          options={INDIAN_STATES}
          error={errors.state}
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <LuxButton type="submit">{submitLabel}</LuxButton>
        {onCancel && (
          <LuxButton type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </LuxButton>
        )}
      </div>
    </form>
  );
}

function FieldWrap({ error, children }: { error?: string | undefined; children: React.ReactNode }) {
  return (
    <div>
      {children}
      {error && <span className="mt-1.5 block text-[0.62rem] text-destructive">{error}</span>}
    </div>
  );
}
