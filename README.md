# Sublime+ Landing Page

Preliminary marketing landing page for Sublime+ ("Content & social marketing, done with a little extra"), built with Next.js and Tailwind CSS, following the Sublime+ brand identity guidelines (teal/pine/lime palette, Poppins type, plus-mark motif).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app/page.tsx` — landing page sections (Hero, Services, UGC, How it Works, Plans, Blog, FAQ, Final CTA)
- `src/app/blog/page.tsx` — blog index: featured post, category filter, post grid
- `src/app/blog/[slug]/page.tsx` — post template (MDX), author block and related posts
- `content/blog/*.mdx` — blog posts, edit or add files here
- `src/lib/blog.ts` — reads and sorts `content/blog`, derives reading time and related posts
- `src/components/sections/` — one component per landing page section
- `src/components/blog/` — post cards and cover art
- `src/app/globals.css` — brand colour tokens for the pine (default) and cream themes

## Theming

Every surface colour is a semantic CSS variable in `globals.css`, mapped onto Tailwind
utilities via `@theme inline`. `bg-surface`, `text-ink` and friends follow the active
theme on their own, so components carry no `dark:` variants.

Pine is the default. The header toggle switches to the cream theme and stores the choice
in `localStorage`; an inline script in `src/app/layout.tsx` applies it before first paint.
The system `prefers-color-scheme` is deliberately not consulted — pine is the brand default.

## Adding a blog post

Drop an `.mdx` file into `content/blog/`. The filename becomes the URL slug.

```mdx
---
title: "Post title"
excerpt: "One or two sentences used on cards and in social previews."
date: "2026-10-06"
category: "Strategy"
author: "Sublime+"
authorRole: "Content & social team"
tone: "pine"        # pine | teal | lime | moss | dusk — picks the generated cover art
featured: true      # optional; pins the post to the hero slot on /blog
cover: "/blog/x.jpg"  # optional; a real image replaces the generated cover
coverAlt: "…"         # required whenever `cover` is set
---

Body copy in MDX.
```

`title` and `date` are required; everything else has a fallback. Categories are derived
from the posts themselves, so the filter chips on `/blog` need no separate configuration.

## Configuration

Set `NEXT_PUBLIC_SITE_URL` to the production origin. It drives canonical URLs,
Open Graph image resolution, `sitemap.xml` and `robots.txt`. Without it, those
fall back to a placeholder and social previews will not resolve correctly.

```bash
NEXT_PUBLIC_SITE_URL=https://sublimeplus.co
```

## Content standards

Every claim on the site must trace to a Sublime+ SOP or a signed-off business
fact. Do not add testimonials, statistics, client names or capability claims
without a written source — see the QA/QC audit for the provenance rules and the
outstanding items.

## Known gaps

- **The six posts in `content/blog/` are demo content.** They are written to the
  content standards above (no statistics, client names or testimonials) but they
  are placeholders, and each one is marked as such in its frontmatter.
- **Copy requires owner sign-off.** The Services list, plan tiers, reporting
  cadence and the stated consult duration are not currently traceable to any SOP.
  They need confirming or rewriting before launch. Plan pricing is deliberately
  left as "Pricing on request" rather than stating unapproved figures.
- Logo is a code-recreated wordmark (Poppins + Yellowtail + an SVG plus mark)
  rather than the original hand-lettered files. Swap in the real logo under
  `public/` and update `src/components/Wordmark.tsx` when available.
- Blog covers are generated brand gradients rather than photography. Real cover
  images drop in per post via the `cover` frontmatter field — `next.config.ts`
  already allows remote images from `images.unsplash.com` and will need the real
  host added.
- The "Book a Call" buttons link to the `#book` section. The Cal.com embed
  (`@calcom/embed-react`) is not wired up yet; see the TODO in
  `src/components/sections/FinalCta.tsx`.
- The hero mascot with the cursor-tracking face is not implemented in this
  revision.
