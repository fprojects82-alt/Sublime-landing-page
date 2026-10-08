import { Container, SectionHeading } from "@/components/ui";

const STEPS = [
  {
    title: "Intro call",
    body: "You walk us through where you are now and what's not working. We say what we'd change, in order.",
  },
  {
    title: "Strategy & plan",
    body: "We write the argument your content is making, pick the formats that carry it, and set a cadence you can sustain.",
  },
  {
    title: "Production",
    body: "Scripting, filming, editing, design and creator briefs — run on a standing schedule with one point of contact.",
  },
  {
    title: "Review & adjust",
    body: "A short read on what landed and what we're changing next, so the plan keeps moving instead of ossifying.",
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, no mystery in the middle"
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-3xl border border-line bg-surface p-7"
            >
              <span className="font-script text-4xl leading-none text-accent">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
