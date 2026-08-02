import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroLight from "@/assets/hero-light.jpg";
import {
  CATEGORIES,
  FAVORITES,
  LATEST,
  PRODUCTS,
  SIGNATURE,
  TOP_RATED,
  TRENDING,
} from "@/data/catalog";
import { LuxLink } from "@/components/site/LuxButton";
import { CardRail } from "@/components/site/CardRail";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deal One — Luxury Objects, Finished in Black" },
      {
        name: "description",
        content:
          "Discover Deal One: a cinematic luxury house of objects across electronics, home, beauty, fitness, kids and pets.",
      },
      { property: "og:title", content: "Deal One — Luxury Objects, Finished in Black" },
      {
        property: "og:description",
        content: "A curated house of premium objects finished in black.",
      },
    ],
  }),
  component: Index,
});

const floatIds = [
  "eclipse-headphones",
  "obsidian-tea-ritual",
  "lumiere-serum",
  "hex-dumbbell",
  "atelier-collar",
];

/*
 * Each floater gets its own pair of co-prime durations + directions, so every
 * card is permanently in motion along a unique path — none of them ever rest.
 */
const driftConfig = [
  { xDur: "23s", yDur: "17s", xDir: "normal", yDir: "alternate-reverse" },
  { xDur: "31s", yDur: "21s", xDir: "reverse", yDir: "normal" },
  { xDur: "19s", yDur: "27s", xDir: "normal", yDir: "normal" },
  { xDur: "29s", yDur: "23s", xDir: "reverse", yDir: "alternate" },
  { xDur: "26s", yDur: "33s", xDir: "normal", yDir: "reverse" },
] as const;

const floaters = floatIds
  .map((id) => PRODUCTS.find((p) => p.id === id))
  .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p))
  .map((p, i) => ({
    product: p,
    drift: driftConfig[i % driftConfig.length]!,
    style: [
      { top: "4%", left: "6%", width: "9rem", delay: "-3s", innerDelay: "-7s" },
      { top: "38%", left: "24%", width: "7.5rem", delay: "-11s", innerDelay: "-2s" },
      { top: "8%", left: "48%", width: "8.5rem", delay: "-6s", innerDelay: "-14s" },
      { top: "52%", left: "58%", width: "7rem", delay: "-17s", innerDelay: "-9s" },
      { top: "24%", left: "76%", width: "8rem", delay: "-21s", innerDelay: "-4s" },
    ][i]!,
  }));

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden px-5 pb-14 pt-6 md:px-8 md:pb-16">
        <img
          src={heroLight}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1088}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,transparent,oklch(0.06_0_0/0.9))]" />

        {/* drifting product cards — desktop only, right 2/3 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/3 md:block"
        >
          {floaters.map(({ product, drift, style }) => (
            <div
              key={product.id}
              className="drift-x absolute"
              style={
                {
                  top: style.top,
                  left: style.left,
                  width: style.width,
                  animationDelay: style.delay,
                  "--drift-x-duration": drift.xDur,
                  "--drift-x-direction": drift.xDir,
                } as React.CSSProperties
              }
            >
              <div
                className="drift-y overflow-hidden rounded-[1.5rem] border border-hairline bg-surface shadow-[var(--shadow-deep)]"
                style={
                  {
                    animationDelay: style.innerDelay,
                    "--drift-y-duration": drift.yDur,
                    "--drift-y-direction": drift.yDir,
                  } as React.CSSProperties
                }
              >
                <div className="animate-glow-pulse pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(70%_70%_at_30%_10%,oklch(1_0_0/0.22),transparent_70%)]" />
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="aspect-[4/5] h-full w-full object-cover opacity-85"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow animate-rise">Deal One — Collection MMXXVI</p>
          <h1 className="display-xl animate-rise mt-5 max-w-4xl [animation-delay:120ms]">
            Where Premium
            <br />
            <em className="font-display italic">Feels Personal</em>
          </h1>
          <p className="animate-rise mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base [animation-delay:240ms]">
            From handpicked collections to reliable service, every detail is designed around your
            expectations. Quality products, transparent pricing, and customer-first support come
            together in every purchase.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap items-center gap-4 [animation-delay:340ms]">
            <LuxLink to="/shop">Enter the shop</LuxLink>
            <LuxLink to="/about" variant="outline">
              The house
            </LuxLink>
          </div>
        </div>
      </section>

      {/* HORIZONTAL RAILS */}
      <CardRail eyebrow="Latest" title="Just arrived" products={LATEST} />
      <CardRail eyebrow="Coveted" title="Customer favourites" products={FAVORITES} />
      <CardRail eyebrow="Adored" title="Top rated" products={TOP_RATED} />
      <CardRail eyebrow="Trending" title="Popular right now" products={TRENDING} />

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-9 md:px-8 md:py-11">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The houses</p>
            <h2 className="mt-2 text-3xl md:mt-3 md:text-4xl">Six disciplines</h2>
          </div>
          <Link
            to="/shop"
            className="underline-lux hidden items-center gap-2 text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground hover:text-foreground md:flex"
          >
            All collections <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>

        <div className="mt-5 grid grid-cols-2 gap-4 md:mt-6 md:grid-cols-3 md:gap-x-14 md:gap-y-8">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70}>
              <Link
                to="/shop"
                search={{ category: c.slug }}
                className="emission halo light-sweep lift-img group relative block aspect-[5/4] overflow-hidden rounded-3xl border border-hairline bg-surface md:aspect-[3/2]"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover opacity-75"
                />
                <div className="veil absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 z-[3] p-5 md:p-4">
                  <h3 className="font-display text-xl md:text-xl">{c.name}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SIGNATURE PIECES */}
      <CardRail eyebrow="Signature" title="Pieces of the season" products={SIGNATURE} />

      {/* MANIFESTO */}
      <section className="relative mx-auto mt-2 max-w-7xl px-5 pb-6 md:px-8">
        <Reveal>
          <div className="glass-panel halo light-sweep relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center md:px-20 md:py-24">
            <div className="animate-glow-pulse pointer-events-none absolute inset-x-0 -top-1/2 h-full bg-[radial-gradient(50%_50%_at_50%_50%,oklch(1_0_0/0.12),transparent_70%)]" />
            <p className="eyebrow">Manifesto</p>
            <p className="mx-auto mt-6 max-w-3xl font-display text-2xl leading-snug md:text-4xl">
              “We believe luxury isn’t an indulgence. It is a standard. Every piece we offer is
              chosen to inspire confidence, celebrate individuality, and elevate everyday moments.”
            </p>

            <ul className="mx-auto mt-9 grid max-w-2xl grid-cols-3 items-stretch gap-2 sm:gap-4">
              {["Buy Quality", "Choose Better", "Live Your Legacy"].map((line, i) => (
                <li
                  key={line}
                  style={{ "--seq-delay": `${i * 1.4}s` } as React.CSSProperties}
                  className="seq-blink rounded-2xl border border-hairline bg-surface-2/40 px-2 py-3 text-[0.56rem] uppercase leading-tight tracking-[0.16em] text-foreground sm:px-4 sm:py-4 sm:text-[0.68rem] sm:tracking-[0.22em]"
                >
                  <span className="block text-[0.5rem] tracking-[0.3em] text-muted-foreground sm:text-[0.55rem]">
                    0{i + 1}
                  </span>
                  <span className="mt-2 block">{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex justify-center">
              <LuxLink to="/about" variant="outline">
                Read our story
              </LuxLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
