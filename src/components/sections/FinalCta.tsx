import Link from "next/link";

import { SpeckleField } from "@/components/PlusMark";
import { Container } from "@/components/ui";

export function FinalCta() {
  return (
    <section id="book" className="pb-24 pt-4 sm:pb-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-bg-deep p-10 text-center sm:p-16">
          <SpeckleField />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 70% at 50% 100%, rgb(63 160 107 / 0.3), transparent 70%)",
            }}
          />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Let&apos;s look at your content together
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
              Book a short intro call. You&apos;ll leave with our read on what to
              change first, whether or not we end up working together.
            </p>

            {/* TODO: swap for the Cal.com embed (@calcom/embed-react) once the
                booking link is confirmed. */}
            <Link
              href="/#book"
              className="mt-9 inline-flex rounded-full bg-brand px-8 py-4 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-strong"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
