import Link from 'next/link';
import Image from 'next/image';
import type { BlogPostSummary } from '@/lib/blog';

interface FeaturedPostCardProps {
  post: BlogPostSummary;
}

export default function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  return (
    <section className="py-8 md:py-16 bg-background/30">
      <div className="container-custom">
        <Link href={`/blog/${post.slug}`} className="block group">
          <article className="relative rounded-xl overflow-hidden border border-neutral-300/60">
            <div className="relative aspect-[3/4.5] md:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-neutral-300" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent z-10 pointer-events-none" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12 z-20">
                <div className="max-w-3xl">
                  <div className="flex items-center space-x-1 mb-3 text-sm font-light text-secondary/75 group-hover:text-orange transition-colors duration-300">
                    <span>Featured</span>
                    <span className="text-secondary/40">|</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display text-secondary font-medium mb-3">{post.title}</h2>
                  <p className="text-secondary/90 max-w-2xl">{post.excerpt}</p>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}
