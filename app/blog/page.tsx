import Link from "next/link";
import { blogPosts } from "@/lib/blog";

const titles: Record<string, string> = {
  streetwear: "Streetwear",
  duefte: "Düfte",
};

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const { category } = await searchParams;
  const cat = typeof category === "string" ? category : undefined;
  const posts = cat ? blogPosts.filter((p) => p.category === cat) : blogPosts;

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10 md:px-16 md:py-14">
      <h1 className="text-3xl font-bold text-foreground md:text-4xl">
        {cat ? titles[cat] ?? "Journal" : "Journal"}
      </h1>
      <p className="mt-3 max-w-[700px] text-sm text-muted md:text-base">
        Streetwear-Trends, Sneaker-News und Duft-Empfehlungen — kuratiert, bevor du kaufst.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="flex flex-col gap-3">
            <div className="aspect-[8/5] w-full rounded-xl bg-placeholder" />
            <span className="text-xs font-bold uppercase text-muted-light">
              {post.categoryLabel} · {post.publishedAt}
              {post.readMinutes ? ` · ${post.readMinutes} Min` : ""}
            </span>
            <span className="text-lg font-bold text-foreground">{post.title}</span>
            <p className="text-sm text-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
