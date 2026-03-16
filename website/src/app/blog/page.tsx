import BlogHero from '@/components/blog/BlogHero';
import FeaturedPostCard from '@/components/blog/FeaturedPostCard';
import PostList from '@/components/blog/PostList';
import { getAllBlogPosts, getFeaturedBlogPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog | Intrinsic Labs',
  description:
    'Insights, tutorials, and updates from the Intrinsic Labs team on mobile development, web development, and custom software solutions.',
};

export default async function BlogPage() {
  const [allPosts, featuredPosts] = await Promise.all([getAllBlogPosts(), getFeaturedBlogPosts()]);
  const featured = featuredPosts[0] ?? allPosts[0];
  const nonFeatured = allPosts.filter((post) => post.slug !== featured?.slug);

  return (
    <main className="min-h-screen">
      <BlogHero />
      {featured ? <FeaturedPostCard post={featured} /> : null}
      <PostList posts={nonFeatured} />
    </main>
  );
}
