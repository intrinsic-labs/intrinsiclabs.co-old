import Link from 'next/link';
import Image from 'next/image';
import type { BlogPostSummary } from '@/lib/blog';

interface RelatedPostsListProps {
  posts: BlogPostSummary[];
}

export default function RelatedPostsList({ posts }: RelatedPostsListProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-background/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-md mb-12 text-center">Related Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="bg-neutral-200 rounded-xl overflow-hidden h-full flex flex-col border border-transparent hover:border-primary/10 transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden">
                      {post.coverImage ? (
                        <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-neutral-300" />
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-neutral-800 text-xs">{new Date(post.date).toLocaleDateString()}</span>
                        <span className="text-neutral-400 text-xs">|</span>
                        <span className="text-neutral-800 text-xs">{post.readingTime}</span>
                      </div>

                      <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors duration-300">{post.title}</h3>
                      <p className="text-sm text-neutral-700 mb-4">{post.excerpt}</p>

                      <div className="mt-auto">
                        <span className="text-xs px-2 py-1 rounded-full border border-neutral-500 text-neutral-800 group-hover:border-orange group-hover:text-orange transition-colors duration-300">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
