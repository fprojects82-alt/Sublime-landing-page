import Link from "next/link";

import { PostCard } from "@/components/blog/PostCard";
import { Container, SectionHeading } from "@/components/ui";
import type { Post } from "@/lib/blog";

/**
 * Landing-page blog rail. Posts are passed in from the page so the filesystem
 * read happens once per render rather than once per section.
 */
export function BlogPreview({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="border-y border-line bg-bg-deep py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Blog"
            title="What we're thinking about"
            description="Strategy, short-form and creator notes from the work — published as we go."
          />

          <Link
            href="/blog"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
          >
            Read the blog
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
