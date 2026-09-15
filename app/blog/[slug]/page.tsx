import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-[840px] px-6 py-10 md:px-16 md:py-14">
      <nav className="text-sm text-muted">
        <Link href="/blog">Journal</Link> / <span className="font-medium text-foreground">{post.title}</span>
      </nav>

      <span className="mt-6 block text-xs font-bold uppercase text-muted-light">
        {post.categoryLabel} · {post.publishedAt}
        {post.readMinutes ? ` · ${post.readMinutes} Min Lesezeit` : ""}
      </span>
      <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">{post.title}</h1>

      <div className="mt-8 aspect-[19/9] w-full rounded-xl bg-placeholder" />

      <div className="mt-8 flex flex-col gap-5">
        {post.content.map((paragraph, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>

      {post.pullQuote && (
        <blockquote className="mt-8 border-l-4 border-primary pl-4 text-xl font-semibold leading-snug text-foreground">
          „{post.pullQuote}“
        </blockquote>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}
