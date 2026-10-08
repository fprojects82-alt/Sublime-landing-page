import Link from "next/link";

/**
 * Code-recreated wordmark: script "Sublime" + the plus mark set as a glyph.
 * Swap for the real hand-lettered artwork once the source files land.
 */
export function Wordmark({
  className = "",
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-baseline gap-1.5 ${className}`}
      aria-label="Sublime Plus — home"
    >
      <span className="font-script text-3xl leading-none tracking-wide text-ink sm:text-4xl">
        Sublime
      </span>
      <span className="font-script text-3xl leading-none tracking-wide text-accent transition-transform group-hover:-translate-y-0.5 sm:text-4xl">
        Plus
      </span>
    </Link>
  );
}
