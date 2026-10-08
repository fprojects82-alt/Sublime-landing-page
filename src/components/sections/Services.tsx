import { PlusMark } from "@/components/PlusMark";
import { Container, SectionHeading } from "@/components/ui";

// Placeholder service list — pending owner sign-off against the Sublime+ SOPs.
const SERVICES = [
  {
    title: "Content strategy",
    body: "The argument your brand is making, the formats that carry it, and a calendar that follows from both rather than filling slots.",
  },
  {
    title: "Short-form video",
    body: "Concepting, scripting, editing and hook variants for vertical video, built for the platforms you actually post on.",
  },
  {
    title: "Social management",
    body: "Day-to-day publishing, community replies and the running idea list that keeps the feed from going quiet.",
  },
  {
    title: "Creator & UGC",
    body: "Sourcing, briefing and directing creators, with usage rights and compliance language handled up front.",
  },
  {
    title: "Design & art direction",
    body: "Statics, carousels and templates that stay recognisably yours across every format and placement.",
  },
  {
    title: "Reporting",
    body: "A short read on what we learned, what we're changing, and what needs a decision from you.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="One team across the whole pipeline"
          description="Strategy through to reporting, so nothing gets handed off halfway and lost."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-accent/50"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                <PlusMark className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {service.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
