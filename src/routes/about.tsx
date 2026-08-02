import { createFileRoute } from "@tanstack/react-router";
import { Gem, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { LuxLink } from "@/components/site/LuxButton";
import { BackButton } from "@/components/site/BackButton";
import { Panel } from "@/components/site/PageHead";
import { Reveal } from "@/components/site/Reveal";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the House — Deal One" },
      {
        name: "description",
        content:
          "Deal One is a small atelier collective producing objects in black across six disciplines, made slowly and shipped in silence.",
      },
      { property: "og:title", content: "About the House — Deal One" },
      {
        property: "og:description",
        content: "A small atelier collective producing objects in black.",
      },
    ],
  }),
  component: About,
});

const pillars = [
  {
    icon: Gem,
    title: "Material honesty",
    body: "Cast iron, vegetable-tanned leather, machined aluminium, cork, brass. Nothing pretending to be something else.",
  },
  {
    icon: Sparkles,
    title: "One light",
    body: "Every piece is finished to read under a single source of white light — the way objects live at night.",
  },
  {
    icon: PackageCheck,
    title: "Slow release",
    body: "Twelve pieces per season. When a run ends, it ends. Nothing is reissued to meet demand.",
  },
];

const chapters = [
  ["2019", "Six ateliers agree on one discipline: useful objects, finished in black."],
  ["2022", "The first full season ships to eleven countries, insured end to end."],
  ["2024", "Client care moves in-house — every order tracked by a person, not a queue."],
  ["2026", "Forty-one countries served, still twelve pieces per season."],
];

function About() {
  return (
    <div>
      {/* editorial masthead — deliberately quiet, no hero imagery */}
      <section className="mx-auto max-w-7xl px-5 pt-6 md:px-8">
        <BackButton />

        <div className="mt-8 grid gap-8 border-t border-hairline pt-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
          <div>
            <p className="eyebrow">The house</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] md:text-5xl">
              A small collective,
              <br />
              <em className="italic">made slowly</em>
            </h1>
            <div className="mt-7 flex items-center gap-3">
              <Logo size={30} />
              <p className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                Deal One — est. 2019
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              Deal One began as six ateliers with one shared discipline: to make useful objects that
              disappear into a room until light finds them. We do not chase seasons, and we do not
              add a piece unless it earns its place.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Luxury, to us, is not an indulgence — it is a standard. Every object is chosen to
              inspire confidence, celebrate individuality and elevate an ordinary moment.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <LuxLink to="/shop">See the collection</LuxLink>
              <LuxLink to="/contact" variant="outline">
                Talk to us
              </LuxLink>
            </div>
          </div>
        </div>
      </section>

      {/* pillars */}
      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-14 md:grid-cols-3 md:px-8">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 90}>
            <Panel className="h-full">
              <p.icon className="h-5 w-5 text-foreground" strokeWidth={1.25} />
              <p className="eyebrow mt-5">0{i + 1}</p>
              <h2 className="mt-3 font-display text-2xl">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Panel>
          </Reveal>
        ))}
      </section>

      {/* chapters */}
      <section className="mx-auto max-w-4xl px-5 pb-14 md:px-8">
        <Reveal>
          <p className="eyebrow">Chapters</p>
          <ol className="mt-6 flex flex-col">
            {chapters.map(([year, body]) => (
              <li
                key={year}
                className="grid grid-cols-[3.5rem_1fr] items-start gap-4 border-t border-hairline py-5 md:grid-cols-[6rem_1fr] md:gap-8"
              >
                <span className="font-display text-xl text-foreground md:text-2xl">{year}</span>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* numbers */}
      <section className="mx-auto max-w-4xl px-5 pb-24 md:px-8">
        <Reveal>
          <div className="glass-panel light-sweep relative overflow-hidden rounded-[2.5rem] p-8 md:p-14">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" strokeWidth={1.25} />
              <p className="eyebrow">Numbers</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                ["6", "Ateliers"],
                ["12", "Pieces per season"],
                ["41", "Countries served"],
                ["100%", "Insured delivery"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-4xl">{n}</p>
                  <p className="mt-2 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
