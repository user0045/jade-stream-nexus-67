import { createFileRoute } from "@tanstack/react-router";
import { PageHead } from "@/components/site/PageHead";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Deal One" },
      {
        name: "description",
        content: "How Deal One collects, uses, stores and protects the personal data of its clients.",
      },
      { property: "og:title", content: "Privacy Policy — Deal One" },
      { property: "og:description", content: "How we handle and protect client data." },
    ],
  }),
  component: Privacy,
});

const sections = [
  {
    title: "What we collect",
    body: "We collect the details you provide at checkout or account creation: name, email, delivery address, phone number and order history. Card details are handled by our payment processor and never reach our servers.",
  },
  {
    title: "How we use it",
    body: "Your data is used to fulfil orders, provide client care, prevent fraud and — only with your consent — to send collection previews. We do not sell or rent personal data to third parties.",
  },
  {
    title: "Cookies",
    body: "We use strictly necessary cookies to keep your bag and session working, and optional analytics cookies to understand which pieces are viewed. Optional cookies are only set after consent.",
  },
  {
    title: "Retention",
    body: "Order records are retained for seven years to satisfy tax obligations. Marketing preferences are retained until you withdraw consent. Account data is deleted within 30 days of a deletion request.",
  },
  {
    title: "Your rights",
    body: "You may request access, correction, export or deletion of your personal data, and object to marketing at any time. Requests are answered within 30 days.",
  },
  {
    id: "returns",
    title: "Return policy",
    body: "Unused items may be returned within 3 days of delivery in their original packaging. Once collected and inspected, refunds are issued to the original payment method within 5 business days. Personal care items with broken seals cannot be returned.",
  },
  {
    title: "Contact",
    body: "Privacy enquiries can be sent to privacy@dealone.example. Our client care team can direct any question to the data protection officer.",
  },
];

function Privacy() {
  return (
    <div>
      <PageHead
        back
        eyebrow="Legal"
        title="Privacy policy"
        intro="Last updated July 2026. This policy explains what we collect, why, and the control you keep over it."
      />

      <section className="mx-auto flex max-w-3xl flex-col gap-4 px-5 pb-24 md:px-8">
        {sections.map((s, i) => (
          <Reveal key={s.title} delay={i * 60}>
            <article id={"id" in s ? (s.id as string) : undefined} className="glass-panel emission scroll-mt-32 rounded-[1.75rem] p-6 md:p-8">
              <h2 className="font-display text-2xl">{s.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
