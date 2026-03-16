import type { ComponentType } from 'react';

export interface BlogPostMetadata {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
  featured?: boolean;
}

export interface BlogPostSummary extends BlogPostMetadata {
  slug: string;
}

export interface BlogPost extends BlogPostSummary {
  Component: ComponentType;
}

type BlogModule = {
  default: ComponentType;
  metadata: BlogPostMetadata;
};

export const POST_SLUGS = [
  'building-native-mobile-apps-with-swift-and-kotlin',
  'modern-web-development-with-nextjs',
  'designing-intuitive-user-interfaces',
  'scaling-backend-systems-with-microservices',
] as const;

export type PostSlug = (typeof POST_SLUGS)[number];

async function loadPostModule(slug: string): Promise<BlogModule> {
  return (await import(`@/content/blog/${slug}.mdx`)) as BlogModule;
}

function sortByDateDesc(posts: BlogPostSummary[]): BlogPostSummary[] {
  return [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  const loaded = await Promise.all(
    POST_SLUGS.map(async (slug) => {
      const { metadata } = await loadPostModule(slug);
      return { slug, ...metadata };
    }),
  );

  return sortByDateDesc(loaded);
}

export async function getFeaturedBlogPosts(): Promise<BlogPostSummary[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.featured);
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  if (!POST_SLUGS.includes(slug as PostSlug)) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }

  const { default: Component, metadata } = await loadPostModule(slug);
  return { slug, ...metadata, Component };
}

export async function getRelatedPosts(slug: string, limit: number = 3): Promise<BlogPostSummary[]> {
  const [allPosts, current] = await Promise.all([getAllBlogPosts(), getBlogPost(slug)]);

  const related = allPosts
    .filter((post) => post.slug !== slug)
    .filter((post) => post.category === current.category || post.tags.some((tag) => current.tags.includes(tag)));

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const fallback = allPosts.filter((post) => post.slug !== slug && !related.some((candidate) => candidate.slug === post.slug));
  return [...related, ...fallback].slice(0, limit);
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  return Array.from(new Set(posts.map((post) => post.category)));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
}
