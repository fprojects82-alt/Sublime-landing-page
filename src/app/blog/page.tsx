import type { Metadata } from "next";
import Link from "next/link";

import { FeaturedPostCard, PostCard } from "@/components/blog/PostCard";
import { SpeckleField } from "@/components/PlusMark";
import { Container, Eyebrow } from "@/components/ui";
import { getAllPosts, getCategories, getFeaturedPost } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on content strategy, short-form video, UGC and social reporting from the Sublime+ team.",
  alternates: { canonical: "/blog" },
};

const ALL = "All";

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = getAllPosts();
  const categories = [ALL, ...getCategories(posts)];

  // An unknown ?category= falls back to the full list rather than an empty page.
  const activeCategory =
    category && categories.includes(category) ? category : ALL;
  const isFiltered = activeCategory !== ALL;

  const visiblePosts = isFiltered
    ? posts.filter((post) => post.category === activeCategory)
    : posts;

  // The featured hero is only shown on the unfiltered view — inside a filter
  // people are scanning a list, and pulling one post out of it just hides it.
  const featured = isFiltered ? undefined : getFeaturedPost(posts);
  const gridPosts = featured
    ? visiblePosts.filter((post) => post.slug !== featured.slug)
    : visiblePosts;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-bg-deep">
        <SpeckleField />
        <Container className="relative py-20 sm:py-24">
          <Eyebrow>Sublime+ Blog</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Notes on content, social and the work behind it
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            How we think about strategy, short-form video, creator content and
            reporting — written down so you can use it, whether or not you work
            with us.
          </p>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <nav aria-label="Filter posts by category" className="mb-12">
          <ul className="flex flex-wrap gap-2.5">
            {categories.map((item) => {
              const isActive = item === activeCategory;
              return (
                <li key={item}>
                  <Link
                    href={item === ALL ? "/blog" : `/blog?category=${encodeURIComponent(item)}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-line text-muted hover:border-accent/50 hover:text-ink"
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {featured ? (
          <div className="mb-14">
            <FeaturedPostCard post={featured} />
          </div>
        ) : null}

        {gridPosts.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} priority={!featured && index < 3} />
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-line bg-surface p-10 text-center text-muted">
            No posts in this category yet.{" "}
            <Link href="/blog" className="font-semibold text-accent">
              View all posts
            </Link>
            .
          </p>
        )}
      </Container>

      <Container className="pb-20 sm:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-9 text-center sm:p-14">
          <SpeckleField className="opacity-60" />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Want this applied to your brand?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Bring us where you are now. We&apos;ll walk through what we&apos;d
              change, in order, on a short intro call.
            </p>
            <Link
              href="/#book"
              className="mt-8 inline-flex rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-strong"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
