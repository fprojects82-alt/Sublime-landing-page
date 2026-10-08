import Link from "next/link";

import { PostCover } from "@/components/blog/PostCover";
import { formatPostDate, type Post } from "@/lib/blog";

function Meta({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted ${className}`}
    >
      <span className="font-semibold uppercase tracking-[0.14em] text-accent">
        {post.category}
      </span>
      <span aria-hidden>•</span>
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden>•</span>
      <span>{post.readingTime}</span>
    </div>
  );
}

export function PostCard({
  post,
  priority = false,
}: {
  post: Post;
  priority?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-accent/50">
      <PostCover
        tone={post.tone}
        cover={post.cover}
        coverAlt={post.coverAlt}
        title={post.title}
        priority={priority}
        className="aspect-[16/10] w-full"
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
      />

      <div className="flex flex-1 flex-col p-6">
        <Meta post={post} />

        <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">
          {/* Stretched link: the whole card is the hit area, but only the title
              text is announced as the link. */}
          <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Read article
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </article>
  );
}

/** Wide hero treatment for the newest / pinned post on the blog index. */
export function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <article className="group relative grid overflow-hidden rounded-[2rem] border border-line bg-surface lg:grid-cols-2">
      <PostCover
        tone={post.tone}
        cover={post.cover}
        coverAlt={post.coverAlt}
        title={post.title}
        priority
        className="aspect-[16/10] w-full lg:aspect-auto lg:h-full"
        sizes="(min-width: 1024px) 640px, 100vw"
      />

      <div className="flex flex-col justify-center p-7 sm:p-10">
        <Meta post={post} />

        <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
          <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
            {post.title}
          </Link>
        </h3>

        <p className="mt-4 text-base leading-relaxed text-muted">{post.excerpt}</p>

        <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-on-brand transition-colors group-hover:bg-brand-strong">
          Read the article
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </article>
  );
}
