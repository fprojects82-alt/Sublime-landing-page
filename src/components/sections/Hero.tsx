import Link from "next/link";

import { SpeckleField } from "@/components/PlusMark";
import { Container } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg-deep">
      <SpeckleField />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgb(63 160 107 / 0.28), transparent 70%)",
        }}
      />

      <Container className="relative py-24 text-center sm:py-32">
        <span className="inline-flex items-center rounded-full border border-line-strong px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Content &amp; social marketing studio
        </span>

        <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
          Content &amp; social marketing,
          <span className="block text-accent">done with a little extra.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Strategy, short-form video, creator content and always-on social
          management — planned, produced and reported on by one team.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/#book"
            className="inline-flex w-full justify-center rounded-full bg-brand px-8 py-4 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-strong sm:w-auto"
          >
            Book a Call
          </Link>
          <Link
            href="/#services"
            className="inline-flex w-full justify-center rounded-full border border-line-strong px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft sm:w-auto"
          >
            See what we do
          </Link>
        </div>
      </Container>
    </section>
  );
}
