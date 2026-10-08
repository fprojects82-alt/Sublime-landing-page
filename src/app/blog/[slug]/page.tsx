import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { PostCard } from "@/components/blog/PostCard";
import { PostCover } from "@/components/blog/PostCover";
import { SpeckleField } from "@/components/PlusMark";
import { Container } from "@/components/ui";
import {
  formatPostDate,
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/lib/blog";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

/** Headings and links styled to the brand rather than the plugin defaults. */
const mdxComponents = {
  a: (props: React.ComponentProps<"a">) => (
    <a
      {...props}
      className="font-medium text-accent underline underline-offset-4 hover:text-brand-strong"
    />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 {...props} className="mt-12 text-2xl font-semibold tracking-tight text-ink" />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 {...props} className="mt-9 text-xl font-semibold tracking-tight text-ink" />
  ),
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line bg-bg-deep">
        <SpeckleField />
        <Container className="relative py-16 sm:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden>←</span> All posts
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted">
            <span className="font-semibold uppercase tracking-[0.14em] text-accent">
              {post.category}
            </span>
            <span aria-hidden>•</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden>•</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {post.excerpt}
          </p>
        </Container>
      </header>

      <Container className="py-12 sm:py-16">
        <PostCover
          tone={post.tone}
          cover={post.cover}
          coverAlt={post.coverAlt}
          title={post.title}
          priority
          className="aspect-[16/7] w-full rounded-[2rem]"
          sizes="(min-width: 1280px) 1216px, 100vw"
        />

        <div className="mx-auto mt-14 max-w-2xl">
          <div className="prose prose-sublime max-w-none prose-headings:scroll-mt-28">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <div className="mt-14 flex items-center gap-4 rounded-3xl border border-line bg-surface p-6">
            <span
              aria-hidden
              className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft font-script text-2xl text-accent"
            >
              S
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{post.author}</p>
              <p className="text-sm text-muted">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 ? (
        <section className="border-t border-line py-16 sm:py-20" aria-labelledby="related">
          <Container>
            <h2
              id="related"
              className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            >
              Keep reading
            </h2>
            <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </article>
  );
}
