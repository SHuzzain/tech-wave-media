import { siteConfig } from "@/site.config";
import type { RankMathHead } from "@/lib/rankmath";
import type { Metadata } from "next";

interface ContentMetadataOptions {
  title: string;
  description: string;
  slug: string;
  basePath: "posts" | "pages";
  rankMath?: RankMathHead | null;
}

export function generateContentMetadata({
  title,
  description,
  slug,
  basePath,
  rankMath,
}: ContentMetadataOptions): Metadata {
  const resolvedTitle = rankMath?.title || title;
  const resolvedDescription = rankMath?.description || description;
  const canonical =
    rankMath?.canonical || `${siteConfig.site_domain}/${basePath}/${slug}`;
  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", resolvedTitle);
  ogUrl.searchParams.append("description", resolvedDescription);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical },
    robots: rankMath?.robots || undefined,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      type: "article",
      url: canonical,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogUrl.toString()],
    },
  };
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function truncateHtml(html: string, maxWords: number): string {
  const text = html.replace(/<[^>]*>/g, "").trim();
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}
