import Image from "next/image";

import { CrossMark, PlusMark } from "@/components/PlusMark";
import type { CoverTone } from "@/lib/blog";

/**
 * Generated cover art, one gradient per tone. Posts carry a `tone` instead of a
 * photo so the index stays on-brand while real cover imagery is outstanding —
 * add a `cover` frontmatter field and the photo takes over.
 */
const TONES: Record<CoverTone, string> = {
  pine: "linear-gradient(135deg, #14402a 0%, #061a11 100%)",
  teal: "linear-gradient(135deg, #0d5c4e 0%, #062b26 100%)",
  lime: "linear-gradient(135deg, #4f8322 0%, #16330f 100%)",
  moss: "linear-gradient(135deg, #2a5a35 0%, #0b2416 100%)",
  dusk: "linear-gradient(135deg, #12474b 0%, #061f21 100%)",
};

export function PostCover({
  tone,
  cover,
  coverAlt,
  title,
  className = "",
  sizes = "(min-width: 1024px) 420px, 100vw",
  priority = false,
}: {
  tone: CoverTone;
  cover?: string;
  coverAlt?: string;
  title: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (cover) {
    return (
      <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
        <Image
          src={cover}
          alt={coverAlt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: TONES[tone] }}
      role="img"
      aria-label={coverAlt ?? `Cover art for ${title}`}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(70% 60% at 25% 20%, rgb(169 212 94 / 0.22), transparent 70%)",
        }}
      />
      <PlusMark className="absolute -right-6 -top-8 size-40 text-[#a9d45e]/25" />
      <CrossMark className="absolute bottom-5 left-6 size-6 text-[#a9d45e]/40" />
      <PlusMark className="absolute bottom-10 left-20 size-4 text-[#a9d45e]/30" />
      <PlusMark className="absolute right-24 top-10 size-5 text-[#a9d45e]/25" />
    </div>
  );
}
