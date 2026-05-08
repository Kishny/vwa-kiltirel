"use client";

import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Post } from "@/data/posts";
import {
  CalendarDays,
  Clock,
  Search,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type Props = { posts: Post[] };

const ALL = "tous";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

// Composant d'animation section
const SectionWrapper = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export default function ActualitesPageClient({ posts }: Props) {
  const [activeTag, setActiveTag] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [ALL, ...Array.from(set).sort()];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((p) => (activeTag === ALL ? true : p.tags.includes(activeTag)))
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [posts, activeTag, query]);

  const featured = filtered.find((p) => p.isFeatured) ?? filtered[0];

  return (
    <>
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header éditorial premium */}
        <SectionWrapper>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-vwa-accent/60" />
              <span className="text-[11px] font-medium tracking-[0.25em] text-vwa-accent/80 uppercase">
                Notre blog
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-vwa-accent/60" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-vwa-dark">
              Articles, coulisses & annonces
              <span className="block text-vwa-primary/70 mt-2">de Vwa Kiltirèl</span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-vwa-dark/70 mt-4">
              Une vitrine éditoriale : ce qu'on prépare, ce qu'on apprend, ce qu'on partage.
            </p>
          </div>
        </SectionWrapper>

        {/* Filtres et recherche */}
        <SectionWrapper delay={0.1}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const isActive = tag === activeTag;
                return (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTag(tag)}
                    className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                      isActive ? "text-white" : "text-vwa-dark/60 hover:text-vwa-dark"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTag"
                        className="absolute inset-0 rounded-full bg-vwa-dark"
                        transition={{ type: "spring", duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{tag === ALL ? "Tous" : tag}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-vwa-dark/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un article..."
                className="w-full rounded-xl border border-vwa-dark/10 bg-white/80 pl-9 pr-8 py-2 text-sm text-vwa-dark placeholder:text-vwa-dark/30 focus:border-vwa-accent/50 focus:ring-1 focus:ring-vwa-accent/30 transition-all outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-vwa-dark/40 hover:text-vwa-dark" />
                </button>
              )}
            </div>
          </div>
          <p className="text-xs text-vwa-dark/50 text-center">
            {filtered.length} article{filtered.length > 1 && "s"} trouvé{filtered.length > 1 && "s"}
          </p>
        </SectionWrapper>

        {/* Article à la une */}
        {featured && (
          <SectionWrapper delay={0.15}>
            <div className="group relative overflow-hidden rounded-2xl bg-white/90 border border-vwa-dark/8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <Link href={`/actualites/${featured.slug}`} className="block">
                <div className="grid md:grid-cols-[1.2fr_0.8fr]">
                  <div className="relative h-64 md:h-full min-h-[280px]">
                    <Image
                      src={featured.cover}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-[10px] font-medium text-white/90">
                        <Sparkles className="h-3 w-3" /> À la une
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex items-center gap-3 text-xs text-vwa-dark/50">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(featured.date)}
                      </span>
                      {featured.readingMinutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {featured.readingMinutes} min
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-vwa-dark group-hover:text-vwa-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-sm text-vwa-dark/70 line-clamp-3">{featured.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {featured.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] rounded-full bg-vwa-dark/5 px-2 py-1 text-vwa-dark/60">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-vwa-primary group-hover:gap-2 transition-all">
                      Lire l'article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </SectionWrapper>
        )}

        {/* Grille des articles */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-vwa-dark/60">Aucun article ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {filtered
              .filter((p) => p.slug !== featured?.slug)
              .map((post, idx) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={`/actualites/${post.slug}`} className="group block">
                    <div className="relative overflow-hidden rounded-xl bg-white/90 border border-vwa-dark/8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 flex items-center gap-2 text-[10px] text-white/90">
                          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                            <CalendarDays className="h-3 w-3" />
                            {formatDate(post.date)}
                          </span>
                          {post.readingMinutes && (
                            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                              <Clock className="h-3 w-3" />
                              {post.readingMinutes} min
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <h3 className="font-bold text-vwa-dark line-clamp-2 group-hover:text-vwa-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs text-vwa-dark/65 line-clamp-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[9px] rounded-full bg-vwa-dark/5 px-2 py-0.5 text-vwa-dark/50">
                              #{tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="text-[9px] text-vwa-dark/40">+{post.tags.length - 2}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <SectionWrapper delay={0.3}>
          <div className="mt-16 rounded-2xl bg-gradient-to-r from-vwa-dark to-vwa-primary p-8 text-center text-white shadow-xl">
            <h3 className="text-xl font-bold mb-2">Restez informé</h3>
            <p className="text-sm text-white/80 mb-4">Ne manquez aucun article, abonnez-vous à notre newsletter</p>
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-vwa-dark hover:shadow-lg transition-all">
              S'abonner <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </SectionWrapper>
      </main>
    </>
  );
}