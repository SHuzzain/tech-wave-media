import { siteConfig } from "@/site.config";

export function JsonLd({ data }: { data: unknown }) {
  const payload = typeof data === "string" ? data : JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  date,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished: date,
        publisher: {
          "@type": "Organization",
          name: siteConfig.site_name,
        },
        mainEntityOfPage: `${siteConfig.site_domain}/posts/${slug}`,
      }}
    />
  );
}
