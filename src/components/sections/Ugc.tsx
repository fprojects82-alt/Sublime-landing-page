import Link from "next/link";

import { PlusMark, SpeckleField } from "@/components/PlusMark";
import { Container, SectionHeading } from "@/components/ui";

const POINTS = [
  "Creator sourcing matched to your audience, not just follower count",
  "One-page briefs that pin the claim, the shot and the non-negotiables",
  "Multiple hook variants per concept so there is something to test",
  "Usage rights and compliance language agreed before anyone films",
];

export function Ugc() {
  return (
    <section id="ugc" className="relative overflow-hidden border-y border-line bg-bg-deep py-20 sm:py-28">
      <SpeckleField className="opacity-70" />

      <Container className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="UGC"
            title="Creator content that doesn't sound like an ad read"
            description="We brief creators the way we'd brief a writer: one claim, a clear shot list, and room to sound like themselves."
          />

          <Link
            href="/#book"
            className="mt-8 inline-flex rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-strong"
          >
            Talk through a campaign
          </Link>
        </div>

        <ul className="space-y-4">
          {POINTS.map((point) => (
            <li
              key={point}
              className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5"
            >
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                <PlusMark className="size-3.5" />
              </span>
              <span className="text-sm leading-relaxed text-muted">{point}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
