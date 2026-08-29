import { getPageBySlug, getAllPages } from "@/lib/wordpress";
import { generateContentMetadata, stripHtml } from "@/lib/metadata";
import { getRankMathHead, rankMathFromPostMeta } from "@/lib/rankmath";
import { siteConfig } from "@/site.config";
import { Section, Container, Prose } from "@/components/craft";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {};
  }

  const description = page.excerpt?.rendered
    ? stripHtml(page.excerpt.rendered)
    : stripHtml(page.content.rendered).slice(0, 200) + "...";
  const publicUrl = `${siteConfig.site_domain}/pages/${page.slug}`;
  const rankMath =
    (await getRankMathHead(publicUrl)) || rankMathFromPostMeta(page.meta);

  return generateContentMetadata({
    title: stripHtml(page.title.rendered),
    description,
    slug: page.slug,
    basePath: "pages",
    rankMath,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <Prose>
          <h2>{page.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </Prose>
      </Container>
    </Section>
  );
}
