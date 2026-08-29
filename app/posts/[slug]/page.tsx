import { getPostBySlug, getAllPostSlugs } from "@/lib/wordpress";
import { generateContentMetadata, stripHtml } from "@/lib/metadata";
import { getRankMathHead, rankMathFromPostMeta } from "@/lib/rankmath";
import { siteConfig } from "@/site.config";
import { ArticleJsonLd, JsonLd } from "@/components/json-ld";

import { Section, Container, Article, Prose } from "@/components/craft";
import { badgeVariants } from "@/components/ui/badge";
import { cn, stripDuplicateFeaturedImage } from "@/lib/utils";

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const publicUrl = `${siteConfig.site_domain}/posts/${post.slug}`;
  const rankMath =
    (await getRankMathHead(publicUrl)) || rankMathFromPostMeta(post.meta);

  return generateContentMetadata({
    title: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt.rendered),
    slug: post.slug,
    basePath: "posts",
    rankMath,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const author = post._embedded?.author?.[0];
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  const category = post._embedded?.["wp:term"]?.[0]?.[0];
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const publicUrl = `${siteConfig.site_domain}/posts/${post.slug}`;
  const rankMath =
    (await getRankMathHead(publicUrl)) || rankMathFromPostMeta(post.meta);
  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered);

  return (
    <Section>
      <Container>
        {rankMath?.jsonLd?.length ? (
          rankMath.jsonLd.map((block, index) => (
            <JsonLd key={index} data={block} />
          ))
        ) : (
          <ArticleJsonLd
            title={title}
            description={description}
            slug={post.slug}
            date={post.date}
          />
        )}
        <Prose>
          <h1>
            <span
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            ></span>
          </h1>
          <div className="flex justify-between items-center gap-4 text-sm mb-4">
            <h5>
              Published {date}
              {author?.name && (
                <>
                  {" "}
                  by{" "}
                  <span>
                    <a href={`/posts/?author=${author.id}`}>{author.name}</a>
                  </span>
                </>
              )}
            </h5>

            {category && (
              <Link
                href={`/posts/categories/${category.slug}`}
                className={cn(
                  badgeVariants({ variant: "outline" }),
                  "no-underline!"
                )}
              >
                {category.name}
              </Link>
            )}
          </div>
          {featuredMedia?.source_url && (
            <div className="h-96 my-12 md:h-[500px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
              {/* eslint-disable-next-line */}
              <img
                className="w-full h-full object-cover"
                src={featuredMedia.source_url}
                alt={post.title.rendered}
              />
            </div>
          )}
        </Prose>

        <Article
          dangerouslySetInnerHTML={{
            __html: stripDuplicateFeaturedImage(
              post.content.rendered,
              featuredMedia?.source_url
            ),
          }}
        />
      </Container>
    </Section>
  );
}
