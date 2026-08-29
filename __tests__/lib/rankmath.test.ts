import { describe, it, expect } from "vitest";
import { parseRankMathHead, rankMathFromPostMeta } from "@/lib/rankmath";
import { generateContentMetadata } from "@/lib/metadata";

describe("parseRankMathHead", () => {
  it("extracts title, description, canonical, and json-ld", () => {
    const html = `
      <title>Rank title</title>
      <meta name="description" content="Rank desc" />
      <link rel="canonical" href="https://techwavemedia.com/posts/hello" />
      <script type="application/ld+json">{"@type":"Article"}</script>
    `;
    const parsed = parseRankMathHead(html);
    expect(parsed.title).toBe("Rank title");
    expect(parsed.description).toBe("Rank desc");
    expect(parsed.canonical).toBe("https://techwavemedia.com/posts/hello");
    expect(parsed.jsonLd?.[0]).toContain("Article");
  });
});

describe("rankMathFromPostMeta", () => {
  it("reads Rank Math post meta keys", () => {
    const head = rankMathFromPostMeta({
      rank_math_title: "Meta title",
      rank_math_description: "Meta description",
    });
    expect(head?.title).toBe("Meta title");
    expect(head?.description).toBe("Meta description");
  });
});

describe("generateContentMetadata rank math", () => {
  it("prefers Rank Math title and canonical", () => {
    const metadata = generateContentMetadata({
      title: "WP title",
      description: "WP desc",
      slug: "hello",
      basePath: "posts",
      rankMath: {
        title: "SEO title",
        description: "SEO desc",
        canonical: "https://techwavemedia.com/custom",
      },
    });
    expect(metadata.title).toBe("SEO title");
    expect(metadata.description).toBe("SEO desc");
    expect(metadata.alternates?.canonical).toBe(
      "https://techwavemedia.com/custom"
    );
  });
});
