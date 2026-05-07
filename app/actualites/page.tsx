import type { Metadata } from "next";
import ActualitesPageClient from "@/components/actualites/ActualitesPageClient";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Actualités | Vwa Kiltirèl",
  description:
    "Articles, coulisses, annonces et inspirations autour de l'association Vwa Kiltirèl à Tours. Découvrez notre actualité culturelle afro-descendante, créole et caribéenne.",
  keywords: [
    "actualités Vwa Kiltirèl",
    "articles association culturelle Tours",
    "coulisses événements",
    "annonces culturelles",
    "blog afro-caribéen",
  ],
  authors: [{ name: "Vwa Kiltirèl" }],
  creator: "Vwa Kiltirèl",
  publisher: "Vwa Kiltirèl",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Actualités Vwa Kiltirèl | Culture afro-caribéenne à Tours",
    description:
      "Suivez l'actualité de Vwa Kiltirèl : articles, événements, coulisses et partages culturels.",
    url: "https://vwakiltirel-asso.org/actualites",
    siteName: "Vwa Kiltirèl",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/og/actualites-og.jpg",
        width: 1200,
        height: 630,
        alt: "Actualités Vwa Kiltirèl",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Actualités Vwa Kiltirèl",
    description:
      "Suivez l'actualité de Vwa Kiltirèl : articles, événements, coulisses et partages culturels.",
    images: ["/images/og/actualites-og.jpg"],
    site: "@vwa_kiltirel",
    creator: "@vwa_kiltirel",
  },
  alternates: {
    canonical: "https://vwakiltirel-asso.org/actualites",
  },
  category: "actualités association culturelle",
};

// Données structurées JSON-LD (globales pour la page blog)
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Actualités Vwa Kiltirèl",
  description:
    "Articles, coulisses et annonces de l'association Vwa Kiltirèl. Découvrez nos actualités culturelles afro-descendantes, créoles et caribéennes à Tours.",
  url: "https://vwakiltirel-asso.org/actualites",
  publisher: {
    "@type": "Organization",
    name: "Vwa Kiltirèl",
    logo: "https://vwakiltirel-asso.org/logo.png",
  },
  numberOfPosts: posts.length,
  blogPosts: posts.slice(0, 10).map((post) => ({
    "@type": "BlogPosting",
    name: post.title,
    headline: post.title,
    url: `https://vwakiltirel-asso.org/actualites/${post.slug}`,
    datePublished: post.date,
    image: post.cover,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://vwakiltirel-asso.org" },
    { "@type": "ListItem", position: 2, name: "Actualités", item: "https://vwakiltirel-asso.org/actualites" },
  ],
};

export default function ActualitesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ActualitesPageClient posts={posts} />
    </>
  );
}