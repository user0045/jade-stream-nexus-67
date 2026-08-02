import { createFileRoute } from "@tanstack/react-router";
import { LuxLink } from "@/components/site/LuxButton";
import { PageHead } from "@/components/site/PageHead";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — Deal One" },
      {
        name: "description",
        content: "Delivery, returns, care, authenticity and payment answers for Deal One clients.",
      },
      { property: "og:title", content: "Frequently Asked Questions — Deal One" },
      { property: "og:description", content: "Everything about delivery, returns and care." },
    ],
  }),
  component: Faq,
});

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Insured delivery is complimentary worldwide. European orders arrive within 2–4 working days, the rest of the world within 4–8. Every parcel ships with a signature requirement.",
  },
  {
    q: "Can I return a piece?",
    a: "Yes. You have 30 days from delivery to return any unworn, unused piece in its original packaging. Return collection is arranged by our client care team at no cost.",
  },
  {
    q: "Are the pieces limited?",
    a: "Each season is limited to twelve pieces produced in a single run. When a run closes it is not reissued, though occasionally a piece returns in a new material.",
  },
  {
    q: "How do I care for matte black finishes?",
    a: "Wipe with a dry microfibre cloth. Avoid solvent cleaners, which dull the finish. Leather should be conditioned twice a year with a neutral balm.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "All major cards, Apple Pay, Google Pay and bank transfer for orders above $2,000. Payments are tokenised — we never store card details.",
  },
  {
    q: "Do you offer engraving?",
    a: "Selected metal and leather pieces can be engraved in our Paris atelier. Contact client care with your order number and requested text.",
  },
];

function Faq() {
  return (
    <div>
      <PageHead
        back
        eyebrow="Client care"
        title="Questions, answered"
        intro="If something remains unclear, our client care team replies within one working day."
      >
        <LuxLink to="/contact" variant="outline">
          Contact client care
        </LuxLink>
      </PageHead>

      <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
        <Reveal>
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="glass-panel emission rounded-[1.5rem] border-none px-6"
              >
                <AccordionTrigger className="py-5 text-left font-display text-lg hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
    </div>
  );
}
