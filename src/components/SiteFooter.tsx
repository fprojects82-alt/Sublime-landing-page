import Link from "next/link";

import { SpeckleField } from "@/components/PlusMark";
import { Wordmark } from "@/components/Wordmark";

const COLUMNS = [
  {
    title: "What we do",
    links: [
      { href: "/#services", label: "Services" },
      { href: "/#ugc", label: "UGC" },
      { href: "/#process", label: "How it works" },
      { href: "/#plans", label: "Plans" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/#faq", label: "FAQ" },
      { href: "/#book", label: "Book a call" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-deep">
      <SpeckleField className="opacity-60" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Content &amp; social marketing, done with a little extra.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {column.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative border-t border-line">
        <div className="mx-auto w-full max-w-7xl px-5 py-6 text-xs text-muted sm:px-8">
          © {new Date().getFullYear()} Sublime+. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
