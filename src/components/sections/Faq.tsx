import { Container, SectionHeading } from "@/components/ui";

// Placeholder answers — consult duration and turnaround need owner sign-off.
const FAQS = [
  {
    question: "What happens on the intro call?",
    answer:
      "You walk us through where your content is now and what isn't working. We come back with what we'd change and in what order — whether or not you go on to work with us.",
  },
  {
    question: "Do you work with our in-house team?",
    answer:
      "Often, yes. We can own the whole pipeline or slot into the parts you don't have covered — most commonly strategy, production or creator management.",
  },
  {
    question: "Who owns the content you produce?",
    answer:
      "You do. Creator usage rights are agreed before anyone films, and the terms are set out in the engagement rather than left to work out later.",
  },
  {
    question: "Which platforms do you cover?",
    answer:
      "We plan for the platforms where your audience already is, and say so plainly when we think one isn't worth the production cost for your brand.",
  },
  {
    question: "How do you report on results?",
    answer:
      "A short written read: what we learned, what we're changing, and anything that needs a decision from you. The underlying numbers sit beneath it as evidence.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Questions we get asked first" />

        <div className="mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-ink marker:hidden">
                {faq.question}
                <span
                  aria-hidden
                  className="shrink-0 text-xl leading-none text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
