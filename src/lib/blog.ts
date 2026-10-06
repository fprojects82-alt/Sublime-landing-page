import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Cover art tone. Posts without a `cover` image fall back to a generated
 * brand gradient keyed by this value, so the index never shows a broken frame
 * while real photography is still outstanding.
 */
export const COVER_TONES = ["pine", "teal", "lime", "moss", "dusk"] as const;
export type CoverTone = (typeof COVER_TONES)[number];

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  authorRole: string;
  tone: CoverTone;
  /** Optional path or remote URL. Omitted posts render the generated cover. */
  cover?: string;
  coverAlt?: string;
  featured: boolean;
  readingTime: string;
};

export type Post = PostMeta & { content: string };

function isTone(value: unknown): value is CoverTone {
  return COVER_TONES.includes(value as CoverTone);
}

function readPostFile(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.date) {
    throw new Error(
      `content/blog/${slug}.mdx is missing a required "title" or "date" field.`,
    );
  }

  return {
    slug,
    title: String(data.title),
    excerpt: String(data.excerpt ?? ""),
    date: new Date(data.date).toISOString(),
    category: String(data.category ?? "Notes"),
    author: String(data.author ?? "Sublime+"),
    authorRole: String(data.authorRole ?? "Sublime+ team"),
    // The tone is cosmetic, so an unknown value degrades to the house pine
    // rather than failing the build.
    tone: isTone(data.tone) ? data.tone : "pine",
    cover: data.cover ? String(data.cover) : undefined,
    coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
    featured: data.featured === true,
    readingTime: readingTime(content).text,
    content,
  };
}

function listSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Every post, newest first. */
export function getAllPosts(): Post[] {
  return listSlugs()
    .map(readPostFile)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getPostSlugs(): string[] {
  return listSlugs();
}

export function getPostBySlug(slug: string): Post | null {
  if (!listSlugs().includes(slug)) return null;
  return readPostFile(slug);
}

/** The newest post flagged `featured`, else simply the newest post. */
export function getFeaturedPost(posts: Post[] = getAllPosts()): Post | undefined {
  return posts.find((post) => post.featured) ?? posts[0];
}

export function getCategories(posts: Post[] = getAllPosts()): string[] {
  return [...new Set(posts.map((post) => post.category))].sort();
}

/**
 * Up to `limit` posts to read next: same category first, then the newest of
 * whatever is left, so a thin category never yields an empty rail.
 */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const posts = getAllPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return posts.slice(0, limit);

  const others = posts.filter((post) => post.slug !== slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
