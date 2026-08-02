import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Clock3,
  HeartHandshake,
  LifeBuoy,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Field } from "@/components/site/AuthShell";
import { LuxButton } from "@/components/site/LuxButton";
import { PageHead, Panel } from "@/components/site/PageHead";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Client Care — Deal One" },
      {
        name: "description",
        content: "Reach the Deal One client care team by message, email or WhatsApp.",
      },
      { property: "og:title", content: "Contact Client Care — Deal One" },
      { property: "og:description", content: "We reply within one working day." },
    ],
  }),
  component: Contact,
});

const CARE_EMAIL = "care@dealone.example";
const CARE_WHATSAPP = "919876543210";
const CARE_WHATSAPP_DISPLAY = "+91 98765 43210";

const PROMISES = [
  {
    icon: Clock3,
    title: "Fast Response",
    body: "We aim to respond to all inquiries within 24 hours, and often much sooner during business hours.",
  },
  {
    icon: Users,
    title: "Genuine Customer Support",
    body: "Every message is handled by a real support representative who is committed to helping you find the right solution.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    body: "Your personal information is kept private and secure. We never share your details with third parties without your consent.",
  },
  {
    icon: LifeBuoy,
    title: "We're Here Always",
    body: "Our support doesn't end once your order is delivered. We're always available to help with product questions, returns, exchanges, and any post-purchase concerns.",
  },
  {
    icon: HeartHandshake,
    title: "Your Trust Matters",
    body: "Thousands of customers choose us because we focus on quality products, honest service, secure shopping, and dependable customer support. We value your trust and strive to earn it with every interaction.",
  },
] as const;

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/),
  message: z.string().trim().min(1).max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  return (
    <div>
      <PageHead
        back
        eyebrow="Client care"
        title="Contact us"
        intro="A private line to our client care team. We answer every message within one working day."
      />

      <section className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-[1.3fr_1fr] md:px-8">
        <Panel>
          <form
            noValidate
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const parsed = schema.safeParse(form);
              if (!parsed.success) {
                toast.error("Please check your name, email, mobile number and message.");
                return;
              }
              toast.success("Message received — we'll reply within one working day.");
              setForm({ name: "", email: "", phone: "", message: "" });
            }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                autoComplete="name"
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                autoComplete="email"
              />
            </div>
            <label className="block">
              <span className="eyebrow">Mobile Number</span>
              <div className="mt-2 flex h-12 items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 transition-all duration-700 [transition-timing-function:var(--ease-lux)] focus-within:border-foreground/40 focus-within:shadow-[var(--shadow-emission)]">
                <span className="text-sm text-muted-foreground">+91</span>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                  }
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                />
              </div>
            </label>
            <label className="block">
              <span className="eyebrow">Message</span>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={6}
                maxLength={1000}
                required
                className="mt-2 w-full resize-none rounded-2xl border border-hairline bg-surface px-4 py-3 text-sm outline-none transition-all duration-700 [transition-timing-function:var(--ease-lux)] placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:shadow-[var(--shadow-emission)]"
                placeholder="How can we help?"
              />
            </label>
            <div className="mt-2">
              <LuxButton type="submit">Send message</LuxButton>
            </div>
          </form>
        </Panel>

        <div className="flex flex-col gap-5">
          <Panel>
            <p className="eyebrow">Direct</p>

            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-4">
              <p className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.25} /> {CARE_EMAIL}
              </p>
              <a
                href={`mailto:${CARE_EMAIL}?subject=${encodeURIComponent("Deal One — client care")}`}
                className="light-sweep halo inline-flex h-10 w-fit items-center gap-2 rounded-full border border-border px-5 text-[0.6rem] uppercase tracking-[0.2em] text-foreground transition-all duration-700 [transition-timing-function:var(--ease-lux)] hover:-translate-y-0.5 hover:border-foreground/50 hover:shadow-[var(--shadow-emission)]"
              >
                <span className="relative z-[3]">Write an email</span>
              </a>
            </div>

            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-4">
              <p className="flex items-center gap-3 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.25} />{" "}
                {CARE_WHATSAPP_DISPLAY}
              </p>
              <a
                href={`https://wa.me/${CARE_WHATSAPP}?text=${encodeURIComponent("Hello Deal One, I need help with")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="light-sweep halo inline-flex h-10 w-fit items-center gap-2 rounded-full border border-border px-5 text-[0.6rem] uppercase tracking-[0.2em] text-foreground transition-all duration-700 [transition-timing-function:var(--ease-lux)] hover:-translate-y-0.5 hover:border-foreground/50 hover:shadow-[var(--shadow-emission)]"
              >
                <span className="relative z-[3]">Chat on WhatsApp</span>
              </a>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Both open directly in your mail app and WhatsApp with our address prefilled — simply
              type and send.
            </p>
          </Panel>
        </div>
      </section>

      {/* ---------- SATISFACTION STATEMENT ---------- */}
      <section className="mx-auto max-w-6xl px-5 pt-16 md:px-8 md:pt-20">
        <Reveal>
          <div className="glass-panel halo relative overflow-hidden rounded-[2.5rem] p-8 text-center md:p-14">
            <span
              aria-hidden="true"
              className="animate-glow-pulse pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.16),transparent_70%)] blur-3xl"
            />
            <p className="eyebrow relative inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.25} /> Our promise
            </p>
            <h2 className="relative mt-5 font-display text-3xl leading-tight md:text-5xl">
              Your satisfaction is our priority
            </h2>
            <p className="relative mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Every question, concern, or feedback you share with us is important. Our dedicated
              support team carefully reviews every inquiry and works to provide accurate solutions
              as quickly as possible. We believe in honest communication, transparent service, and
              building long-term relationships with our customers.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- PROMISE CARDS ---------- */}
      <section className="mx-auto max-w-6xl px-5 pt-6 md:px-8 md:pt-8">
        <div className="grid gap-4 md:grid-cols-2">
          {PROMISES.map((p, i) => {
            const Icon = p.icon;
            const wide = i === PROMISES.length - 1;
            return (
              <Reveal key={p.title} delay={i * 90} className={wide ? "md:col-span-2" : ""}>
                <article className="light-sweep emission group glass-panel relative h-full overflow-hidden rounded-[2rem] p-6 md:p-8">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.14),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-1000 [transition-timing-function:var(--ease-lux)] group-hover:opacity-100"
                  />
                  <span className="relative z-[3] grid h-12 w-12 place-items-center rounded-full border border-hairline bg-surface transition-all duration-700 [transition-timing-function:var(--ease-lux)] group-hover:border-foreground/45 group-hover:shadow-[var(--shadow-emission)]">
                    <Icon className="h-5 w-5" strokeWidth={1.15} />
                  </span>
                  <h3 className="relative z-[3] mt-6 font-display text-2xl tracking-[0.02em]">
                    {p.title}
                  </h3>
                  <p className="relative z-[3] mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- FURTHER READING ---------- */}
      <section className="mx-auto max-w-6xl px-5 pb-24 pt-10 md:px-8 md:pt-14">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <FurtherLink
              to="/faq"
              eyebrow="Answers"
              title="FAQ"
              body="Delivery windows, returns, exchanges and payment — answered."
            />
            <FurtherLink
              to="/about"
              eyebrow="The house"
              title="About us"
              body="Who we are, what we select, and the standard we hold."
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function FurtherLink({
  to,
  eyebrow,
  title,
  body,
}: {
  to: "/faq" | "/about";
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      to={to}
      className="light-sweep halo group glass-panel flex items-center justify-between gap-5 rounded-[2rem] p-6 transition-all duration-700 [transition-timing-function:var(--ease-lux)] hover:-translate-y-1 hover:border-foreground/30 hover:shadow-[var(--shadow-emission)] md:p-8"
    >
      <span className="relative z-[3] block">
        <span className="eyebrow block">{eyebrow}</span>
        <span className="mt-3 block font-display text-2xl">{title}</span>
        <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">{body}</span>
      </span>
      <ArrowRight
        className="relative z-[3] h-5 w-5 shrink-0 text-muted-foreground transition-all duration-700 [transition-timing-function:var(--ease-lux)] group-hover:translate-x-1 group-hover:text-foreground"
        strokeWidth={1.25}
      />
    </Link>
  );
}
