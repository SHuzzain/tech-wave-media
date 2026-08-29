export type RankMathHead = {
  title?: string;
  description?: string;
  canonical?: string;
  jsonLd?: string[];
  robots?: string;
};

export function parseRankMathHead(html: string): RankMathHead {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description =
    html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
    )?.[1] ??
    html.match(
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i
    )?.[1];
  const canonical =
    html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
    )?.[1] ??
    html.match(
      /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i
    )?.[1];
  const robots =
    html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)?.[1];
  const jsonLd = [
    ...html.matchAll(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ),
  ]
    .map((match) => match[1].trim())
    .filter(Boolean);

  return {
    title: title ? decodeHtml(title) : undefined,
    description: description ? decodeHtml(description) : undefined,
    canonical,
    jsonLd,
    robots,
  };
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function getRankMathHead(
  publicUrl: string
): Promise<RankMathHead | null> {
  const baseUrl = process.env.WORDPRESS_URL;
  if (!baseUrl) return null;

  try {
    const endpoint = `${baseUrl}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(publicUrl)}`;
    const response = await fetch(endpoint, {
      headers: { "User-Agent": "Next.js WordPress Client" },
      next: { tags: ["wordpress", "rankmath"], revalidate: 3600 },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as { head?: string; success?: boolean };
    if (!payload.head) return null;
    return parseRankMathHead(payload.head);
  } catch {
    return null;
  }
}

export function rankMathFromPostMeta(
  meta: Record<string, unknown> | undefined
): RankMathHead | null {
  if (!meta) return null;
  const title =
    stringMeta(meta.rank_math_title) || stringMeta(meta.rank_math_seo_title);
  const description =
    stringMeta(meta.rank_math_description) ||
    stringMeta(meta.rank_math_seo_description);
  const canonical = stringMeta(meta.rank_math_canonical_url);
  if (!title && !description && !canonical) return null;
  return { title, description, canonical };
}

function stringMeta(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (Array.isArray(value) && typeof value[0] === "string" && value[0].trim()) {
    return value[0].trim();
  }
  return undefined;
}
