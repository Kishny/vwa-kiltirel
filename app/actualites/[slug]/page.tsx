import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import ArticlePageClient from "@/components/actualites/ArticlePageClient";

type PageProps = { params: Promise<{ slug: string }> };

function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article introuvable | Vwa Kiltirèl" };
  return {
    title: `${post.title} | Actualités Vwa Kiltirèl`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.cover, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Génération des JSON-LD pour l'article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Vwa Kiltirèl" },
    publisher: { "@type": "Organization", name: "Vwa Kiltirèl", logo: "https://vwakiltirel-asso.org/logo.png" },
    mainEntityOfPage: `https://vwakiltirel-asso.org/actualites/${post.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://vwakiltirel-asso.org" },
      { "@type": "ListItem", position: 2, name: "Actualités", item: "https://vwakiltirel-asso.org/actualites" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://vwakiltirel-asso.org/actualites/${post.slug}` },
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