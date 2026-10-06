"use client";

import { useSyncExternalStore } from "react";

export const THEME_STORAGE_KEY = "sublime-theme";

/**
 * Runs before paint in <head> so the stored theme is applied without a flash of
 * the wrong palette. Kept as a string because it has to ship inline.
 */
export const themeInitScript = `
(function () {
  try {
    // Pine is the brand default, so the system preference is deliberately not
    // consulted — only an explicit choice from the toggle switches to cream.
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    document.documentElement.classList.toggle("light", stored === "light");
  } catch (e) {
    /* Private mode or blocked storage: keep the dark default. */
  }
})();
`;

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

/**
 * The theme lives on <html>, set by the inline script before React boots, so it
 * is read as an external store rather than mirrored into component state. The
 * observer also keeps the icon correct if anything else flips the class.
 */
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("light");
}

/** The server cannot know the stored theme; it renders the dark default. */
function getServerThemeSnapshot() {
  return false;
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const isLight = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  function toggle() {
    const next = !document.documentElement.classList.contains("light");
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "light" : "dark");
    } catch {
      /* Storage can be blocked; the toggle still works for this page view. */
    }
  }

  const label = isLight ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:bg-accent-soft ${className}`}
    >
      {isLight ? <MoonIcon className="size-4.5" /> : <SunIcon className="size-4.5" />}
    </button>
  );
}
