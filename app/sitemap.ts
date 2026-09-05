import type { MetadataRoute } from "next";
import { events } from "@/data/events";
import { posts } from "@/data/posts";
import { SITE_URL } from "@/lib/seo";

/**
 * Date de génération du sitemap.
 * Le site étant régénéré à chaque déploiement, cette valeur reflète
 * réellement la dernière mise en ligne — contrairement à une date figée
 * en dur, que Google finit par ignorer.
 */
const BUILD_DATE = new Date();

/** Convertit une date en objet Date valide, avec repli sur la date de build. */
function safeDate(value?: string): Date {
  if (!value) return BUILD_DATE;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? BUILD_DATE : parsed;
}

type StaticRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const staticRoutes: StaticRoute[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/evenements", priority: 0.9, changeFrequency: "weekly" },
  { path: "/actualites", priority: 0.8, changeFrequency: "weekly" },
  { path: "/association", priority: 0.8, changeFrequency: "monthly" },
  { path: "/mediatheque", priority: 0.7, changeFrequency: "monthly" },
  { path: "/devenir-membre", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/don", priority: 0.6, changeFrequency: "monthly" },
  { path: "/aide", priority: 0.5, changeFrequency: "monthly" },
  { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
  { path: "/rgpd", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    priority: route.priority,
    changeFrequency: route.changeFrequency,
    lastModified: BUILD_DATE,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${SITE_URL}/evenements/${event.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
    lastModified: BUILD_DATE,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/actualites/${post.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: safeDate(post.date),
  }));

  return [...pages, ...eventRoutes, ...postRoutes];
}
