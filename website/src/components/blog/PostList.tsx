import Link from 'next/link';
import type { BlogPostSummary } from '@/lib/blog';

interface PostListProps {
  posts: BlogPostSummary[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <section className="py-8 md:py-16 bg-background">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-display font-medium mb-6 md:mb-10">Publications</h2>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-2 text-left text-neutral-600 group-hover:text-primary transition-colors duration-300">
                      <span className="text-sm">{new Date(post.date).toLocaleDateString()}</span>
                      <span className="text-xs">|</span>
                      <span className="text-sm">{post.readingTime}</span>
                    </div>

                    <h3 className="text-xl font-medium group-hover:text-orange transition-colors duration-300">{post.title}</h3>
                    <p className="text-neutral-700 max-w-2xl">{post.excerpt}</p>
                  </div>

                  <div className="hidden md:block">
                    <span className="text-sm font-light px-4 py-1.5 rounded-full border border-neutral-500 text-neutral-800 group-hover:border-orange group-hover:text-orange transition-colors duration-300">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>

              {index !== posts.length - 1 && <div className="border-b border-neutral-800/30 pt-6" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
