"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SpeckleField } from "@/components/PlusMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Wordmark } from "@/components/Wordmark";

/**
 * Section anchors are written absolute (`/#services`) so the same header works
 * on the landing page and on the blog routes.
 */
const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#ugc", label: "UGC" },
  { href: "/#plans", label: "Plans" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  // The sheet records the route it was opened on rather than a plain boolean, so
  // navigating away closes it by derivation and no effect has to chase the route.
  const [openedOnPath, setOpenedOnPath] = useState<string | null>(null);
  const menuOpen = openedOnPath === pathname;

  const closeMenu = () => setOpenedOnPath(null);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg-deep/85 backdrop-blur-xl">
      <SpeckleField className="opacity-70" />

      <div className="relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Wordmark />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/blog" && pathname.startsWith("/blog");

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-[0.95rem] font-medium transition-colors hover:text-accent ${
                      isActive ? "text-accent" : "text-ink/90"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/#book"
            className="hidden rounded-full bg-brand px-6 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-strong sm:inline-flex"
          >
            Book a Call
          </Link>

          <button
            type="button"
            onClick={() => setOpenedOnPath(menuOpen ? null : pathname)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-ink lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="relative border-t border-line bg-bg-deep px-5 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block border-b border-line py-3.5 text-base font-medium text-ink/90 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#book"
            onClick={closeMenu}
            className="mt-5 block rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-on-brand"
          >
            Book a Call
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
