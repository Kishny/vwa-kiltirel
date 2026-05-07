import type { MetadataRoute } from "next";
import { events } from "@/data/events";
import { posts } from "@/data/posts";

const BASE_URL = "https://vwakiltirel-asso.org";
const SITE_LAST_UPDATED = new Date("2026-05-07");

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, priority: 1.0, changeFrequency: "weekly", lastModified: SITE_LAST_UPDATED },
  { url: `${BASE_URL}/evenements`, priority: 0.9, changeFrequency: "weekly", lastModified: SITE_LAST_UPDATED },
  { url: `${BASE_URL}/actualites`, priority: 0.8, changeFrequency: "weekly", lastModified: SITE_LAST_UPDATED },
  { url: `${BASE_URL}/association`, priority: 0.7, changeFrequency: "monthly", lastModified: SITE_LAST_UPDATED },
  { url: `${BASE_URL}/mediatheque`, priority: 0.7, changeFrequency: "monthly", lastModified: SITE_LAST_UPDATED },
  { url: `${BASE_URL}/contact`, priority: 0.6, changeFrequency: "monthly", lastModified: SITE_LAST_UPDATED },
  { url: `${BASE_URL}/devenir-membre`, priority: 0.6, changeFrequency: "monthly", lastModified: SITE_LAST_UPDATED },
  { url: `${BASE_URL}/don`, priority: 0.5, changeFrequency: "monthly", lastModified: SITE_LAST_UPDATED },
  { url: `${BASE_URL}/mentions-legales`, priority: 0.2, changeFrequency: "yearly", lastModified: SITE_LAST_UPDATED },
  { url: `${BASE_URL}/rgpd`, priority: 0.2, changeFrequency: "yearly", lastModified: SITE_LAST_UPDATED },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${BASE_URL}/evenements/${event.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
    lastModified: SITE_LAST_UPDATED,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/actualites/${post.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: post.date ? new Date(post.date) : SITE_LAST_UPDATED,
  }));

  return [...staticRoutes, ...eventRoutes, ...postRoutes];
}
