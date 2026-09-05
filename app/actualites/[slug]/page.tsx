import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import ArticlePageClient from "@/components/actualites/ArticlePageClient";
import {
  SITE_URL,
  ORG_LOGO,
  SITE_NAME,
  absoluteUrl,
  canonicalUrl,
  organizationRef,
} from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article introuvable | Vwa Kiltirèl" };

  const pageUrl = canonicalUrl(`/actualites/${post.slug}`);

  return {
    title: `${post.title} | Actualités Vwa Kiltirèl`,
    description: post.excerpt,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: pageUrl,
      type: "article",
      publishedTime: post.date,
      images: [{ url: absoluteUrl(post.cover), alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [absoluteUrl(post.cover)],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Génération des JSON-LD pour l'article
  const pageUrl = canonicalUrl(`/actualites/${post.slug}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    // URL absolue obligatoire : l'ancien chemin relatif était ignoré.
    image: [absoluteUrl(post.cover)],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "fr-FR",
    author: organizationRef,
    publisher: {
      "@type": "NGO",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      // L'ancien logo pointait vers /logo.png, un fichier inexistant.
      logo: {
        "@type": "ImageObject",
        url: ORG_LOGO,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Actualités", item: canonicalUrl("/actualites") },
      { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ArticlePageClient post={post} />
    </>
  );
}