import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CallToAction from '@/components/home/CallToAction';
import RelatedPostsList from '@/components/blog/RelatedPostsList';
import { getBlogPost, getRelatedPosts, POST_SLUGS } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getBlogPost(slug);
    return {
      title: `${post.title} | Intrinsic Labs Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch {
    return {
      title: 'Post Not Found | Intrinsic Labs Blog',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug);
  const PostComponent = post.Component;

  return (
    <main className="min-h-screen">
      <section className="relative pt-8 md:pt-12 lg:pt-16 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto pt-16 text-center">
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              <Link
                href={`/blog?category=${encodeURIComponent(post.category)}`}
                className="text-xs px-3 py-1 rounded-full border border-primary/30 text-primary/90 hover:bg-primary/20 transition-colors duration-300"
              >
                {post.category}
              </Link>
            </div>

            <h1 className="heading-xl mb-6 text-center">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-5 mb-10 justify-center">
              <div className="text-sm text-neutral-800">{new Date(post.date).toLocaleDateString()}</div>
              <span className="text-neutral-400">|</span>
              <div className="text-sm text-neutral-800">{post.readingTime}</div>
            </div>

            {post.coverImage ? (
              <div className="rounded-xl overflow-hidden mx-auto relative aspect-video mb-8">
                <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="pt-4 md:pt-8 pb-16">
        <div className="container-custom">
          <article className="max-w-3xl mx-auto prose prose-neutral max-w-none">
            <PostComponent />
          </article>

          <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-neutral-800/30">
            <h3 className="text-md font-medium mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-orange hover:text-secondary transition-colors duration-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RelatedPostsList posts={relatedPosts} />
      <CallToAction />
    </main>
  );
}
