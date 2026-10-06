import type { CSSProperties } from "react";

type MarkProps = {
  className?: string;
  style?: CSSProperties;
  /** Pass only when the mark carries meaning on its own; otherwise decorative. */
  title?: string;
};

/** The Sublime+ plus mark. */
export function PlusMark({ className = "", style, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path d="M12 4.5v15M4.5 12h15" />
    </svg>
  );
}

/** The companion × mark used in the same scattered motif. */
export function CrossMark({ className = "", style }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

type Speck = { left: string; top: string; size: string; kind: "plus" | "cross" };

/**
 * The scattered plus/× confetti behind the brand surfaces. Positions are fixed
 * rather than random so server and client render identically.
 */
const SPECKS: Speck[] = [
  { left: "3%", top: "18%", size: "0.75rem", kind: "cross" },
  { left: "11%", top: "68%", size: "0.6rem", kind: "cross" },
  { left: "27%", top: "82%", size: "0.7rem", kind: "plus" },
  { left: "44%", top: "12%", size: "0.6rem", kind: "plus" },
  { left: "62%", top: "74%", size: "0.7rem", kind: "cross" },
  { left: "79%", top: "22%", size: "0.65rem", kind: "plus" },
  { left: "92%", top: "60%", size: "0.8rem", kind: "plus" },
];

export function SpeckleField({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden text-accent/45 ${className}`}
      aria-hidden
    >
      {SPECKS.map((speck, index) => {
        const Mark = speck.kind === "plus" ? PlusMark : CrossMark;
        return (
          <Mark
            key={index}
            className="absolute"
            style={{
              left: speck.left,
              top: speck.top,
              width: speck.size,
              height: speck.size,
            }}
          />
        );
      })}
    </div>
  );
}
