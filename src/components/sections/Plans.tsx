import Link from "next/link";

import { PlusMark } from "@/components/PlusMark";
import { Container, SectionHeading } from "@/components/ui";

/**
 * Placeholder tiers. Deliverable volumes and pricing are not yet traceable to a
 * Sublime+ SOP, so no figures are stated here — tiers describe scope only and
 * pricing is quoted on the call. Replace once the commercial model is signed off.
 */
const PLANS = [
  {
    name: "Starter",
    summary: "For brands getting a consistent feed off the ground.",
    features: [
      "Content strategy and format system",
      "Short-form video production",
      "Publishing calendar",
      "Monthly performance read",
    ],
  },
  {
    name: "Growth",
    summary: "For brands adding creator content and testing at pace.",
    features: [
      "Everything in Starter",
      "Creator sourcing and briefing",
      "UGC production and hook testing",
      "Community management",
      "Bi-weekly working session",
    ],
    highlighted: true,
  },
  {
    name: "Studio",
    summary: "For brands running always-on content across several channels.",
    features: [
      "Everything in Growth",
      "Multi-channel planning",
      "Design and art direction",
      "Paid social asset production",
      "Dedicated account lead",
    ],
  },
];

export function Plans() {
  return (
    <section id="plans" className="border-y border-line bg-bg-deep py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Plans"
          title="Pick the scope, not a package you'll outgrow"
          description="Every engagement is scoped on the intro call. Pricing is quoted against what you actually need."
          align="center"
          className="text-center"
        />

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-[2rem] border bg-surface p-8 ${
                plan.highlighted ? "border-accent" : "border-line"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-ink">{plan.name}</h3>
                {plan.highlighted ? (
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    Popular
                  </span>
                ) : null}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {plan.summary}
              </p>

              <p className="mt-6 text-sm font-semibold text-ink">
                Pricing on request
              </p>

              <ul className="mt-6 flex-1 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <PlusMark className="mt-1 size-3.5 shrink-0 text-accent" />
                    <span className="text-sm leading-relaxed text-muted">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/#book"
                className={`mt-8 inline-flex justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-brand text-on-brand hover:bg-brand-strong"
                    : "border border-line-strong text-ink hover:bg-accent-soft"
                }`}
              >
                Book a Call
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
