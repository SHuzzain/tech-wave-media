import { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin", "/wp-admin/"],
      },
    ],
    sitemap: `${siteConfig.site_domain}/sitemap.xml`,
  };
}
