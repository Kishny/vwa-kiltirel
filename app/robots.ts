import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Espaces techniques ou transactionnels : aucun intérêt en résultat
        // de recherche, et ils consommeraient du budget de crawl.
        disallow: ["/admin/", "/api/", "/unsubscribe"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
