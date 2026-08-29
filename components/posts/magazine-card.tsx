import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";
import { truncateHtml } from "@/lib/metadata";

export function FeaturedHero({ post }: { post: Post }) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
  const category = post._embedded?.["wp:term"]?.[0]?.[0] ?? null;
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="grid lg:grid-cols-2 gap-6 group not-prose"
    >
      <div className="relative min-h-72 overflow-hidden bg-muted">
        {media?.source_url ? (
          <Image
            src={media.source_url}
            alt={post.title?.rendered || "Featured story"}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900 text-white flex items-end p-8">
            <p className="font-serif text-4xl leading-none opacity-30">TW</p>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-4 py-2">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span>{category?.name || "Featured"}</span>
          <span aria-hidden>•</span>
          <span>{date}</span>
        </div>
        <h2
          className="font-serif text-3xl md:text-5xl leading-tight group-hover:underline decoration-from-font underline-offset-4"
          dangerouslySetInnerHTML={{
            __html: post.title?.rendered || "Untitled",
          }}
        />
        <p className="text-muted-foreground text-lg">
          {post.excerpt?.rendered
            ? truncateHtml(post.excerpt.rendered, 32)
            : ""}
        </p>
      </div>
    </Link>
  );
}

export function MagazineCard({
  post,
  className,
}: {
  post: Post;
  className?: string;
}) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
  const category = post._embedded?.["wp:term"]?.[0]?.[0] ?? null;
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/posts/${post.slug}`}
      className={cn("group flex flex-col gap-3 not-prose", className)}
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted relative">
        {media?.source_url ? (
          <Image
            className="object-cover h-full w-full group-hover:scale-[1.03] transition-transform duration-500"
            src={media.source_url}
            alt={post.title?.rendered || "Post thumbnail"}
            width={640}
            height={400}
          />
        ) : (
          <div className="h-full w-full bg-zinc-200 dark:bg-zinc-800" />
        )}
      </div>
      <p className="text-xs uppercase tracking-widest text-red-700 dark:text-red-400">
        {category?.name || "Story"}
      </p>
      <h3
        className="font-serif text-xl leading-snug group-hover:underline underline-offset-4"
        dangerouslySetInnerHTML={{
          __html: post.title?.rendered || "Untitled Post",
        }}
      />
      <p className="text-sm text-muted-foreground">
        {post.excerpt?.rendered ? truncateHtml(post.excerpt.rendered, 18) : ""}
      </p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </Link>
  );
}
