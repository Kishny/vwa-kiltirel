"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/posts";

type Props = { posts: Post[] };

const ALL = "tous";

function formatDate(iso: string) {
    // iso: YYYY-MM-DD
    const [y, m, d] = iso.split("-").map((x) => Number(x));
    const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
    return dt.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function ActualitesView({ posts }: Props) {
    const [activeTag, setActiveTag] = useState<string>(ALL);
    const [query, setQuery] = useState("");

    const allTags = useMemo(() => {
        const set = new Set<string>();
        posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
        return [ALL, ...Array.from(set)];
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
            .slice()
            .sort((a, b) => (a.date < b.date ? 1 : -1));
    }, [posts, activeTag, query]);

    const featured = filtered.find((p) => p.isFeatured) ?? filtered[0];

    return (
        <div className="space-y-8">
            {/* Header éditorial */}
            <header className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-vwa-dark/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
                    Actualités – Vwa Kiltirèl
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                            Articles, coulisses & annonces
                        </h1>
                        <p className="text-sm text-vwa-dark/75 max-w-2xl">
                            Une vitrine éditoriale : ce qu’on prépare, ce qu’on apprend, ce qu’on partage.
                            (Et oui, parfois on raconte aussi les fails… mais avec style.)
                        </p>
                    </div>

                    <div className="text-xs text-right space-y-1">
                        <p className="text-vwa-dark/60">Articles publiés</p>
                        <p className="text-sm font-semibold text-vwa-dark">
                            {posts.length} article{posts.length > 1 && "s"}
                        </p>
                    </div>
                </div>
            </header>

            {/* Controls */}
            <section className="space-y-3">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => {
                            const isActive = tag === activeTag;
                            const label = tag === ALL ? "Tous" : tag;
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setActiveTag(tag)}
                                    className={[
                                        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
                                        isActive
                                            ? "border-vwa-dark bg-vwa-dark text-vwa-background shadow-[0_10px_28px_rgba(28,22,18,0.45)]"
                                            : "border-vwa-background bg-white/80 text-vwa-dark/75 hover:border-vwa-dark/50 hover:bg-white",
                                    ].join(" ")}
                                >
                                    {tag === ALL ? "•" : "●"} {label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search */}
                    <div className="relative w-full lg:w-[360px]">
                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-vwa-primary/10 via-vwa-accent/5 to-vwa-primary/0 blur-sm" />
                        <div className="relative flex items-center gap-2 rounded-2xl border border-vwa-background/80 bg-white/95 px-3.5 py-2 shadow-[0_12px_36px_rgba(28,22,18,0.12)]">
                            <span className="text-xs text-vwa-dark/50">🔎</span>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                type="text"
                                placeholder="Rechercher un article, un tag…"
                                className="w-full bg-transparent text-sm text-vwa-dark placeholder:text-vwa-dark/35 outline-none"
                            />
                            {query.trim() !== "" && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="text-[11px] rounded-full bg-vwa-background px-2 py-0.5 text-vwa-dark/70 hover:text-vwa-dark transition"
                                >
                                    Effacer
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <p className="text-[11px] text-vwa-dark/55">
                    Filtre actif :{" "}
                    <span className="font-semibold text-vwa-dark">
                        {activeTag === ALL ? "Tous les tags" : activeTag}
                    </span>{" "}
                    • Résultats :{" "}
                    <span className="font-semibold text-vwa-dark">{filtered.length}</span>
                </p>
            </section>

            {/* Featured */}
            {featured && (
                <section className="group overflow-hidden rounded-3xl bg-white/95 border border-vwa-background/85 shadow-[0_22px_70px_rgba(28,22,18,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_85px_rgba(28,22,18,0.26)]">
                    <Link href={`/actualites/${featured.slug}`} className="block">
                        <div className="grid md:grid-cols-[1.25fr_1fr]">
                            <div className="relative h-56 md:h-full min-h-[220px]">
                                <Image
                                    src={featured.cover}
                                    alt={featured.title}
                                    fill
                                    sizes="(min-width: 768px) 60vw, 100vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                    style={{ objectPosition: featured.focal ?? "50% 35%" }} // ✅ vise un peu plus haut par défaut
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                                <div className="pointer-events-none absolute bottom-4 left-4 right-4 text-vwa-background">
                                    <p className="text-[11px] uppercase tracking-[0.22em] opacity-80">
                                        À la une
                                    </p>
                                    <p className="mt-1 text-lg font-extrabold drop-shadow-[0_10px_28px_rgba(0,0,0,0.6)]">
                                        {featured.title}
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 sm:p-6 space-y-3">
                                <div className="flex flex-wrap items-center gap-2 text-[11px] text-vwa-dark/70">
                                    <span className="rounded-full bg-vwa-dark/5 px-2.5 py-1 font-medium text-vwa-dark/80">
                                        {formatDate(featured.date)}
                                    </span>
                                    {typeof featured.readingMinutes === "number" && (
                                        <span className="rounded-full border border-vwa-accent/35 bg-vwa-accent/5 px-2.5 py-1 font-medium text-vwa-accent">
                                            {featured.readingMinutes} min
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-vwa-dark/80 leading-relaxed">
                                    {featured.excerpt}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-1">
                                    {featured.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[11px] rounded-full bg-vwa-background px-2.5 py-1 text-vwa-dark/70"
                                        >
                                            #{t}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-2">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-vwa-dark text-vwa-background px-4 py-2 text-xs font-semibold shadow-[0_16px_45px_rgba(28,22,18,0.55)]">
                                        Lire l’article <span aria-hidden>→</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Grid cards */}
            <section className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                    Tous les articles
                </h2>

                {filtered.length === 0 ? (
                    <div className="rounded-3xl bg-white/90 border border-vwa-background/85 px-5 py-6 text-sm text-vwa-dark/75 shadow-[0_18px_55px_rgba(28,22,18,0.12)]">
                        Aucun article ne correspond à ce filtre. (La base éditoriale arrive…)
                    </div>
                ) : (
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {filtered
                            .filter((p) => p.slug !== featured?.slug)
                            .map((post) => (
                                <li
                                    key={post.slug}
                                    className="group overflow-hidden rounded-3xl bg-white/95 border border-vwa-background/85 shadow-[0_16px_45px_rgba(28,22,18,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(28,22,18,0.20)]"
                                >
                                    <Link href={`/actualites/${post.slug}`} className="block">
                                        <div className="relative h-40 overflow-hidden">
                                            <Image
                                                src={post.cover}
                                                alt={post.title}
                                                fill
                                                sizes="(min-width: 640px) 50vw, 100vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-90" />
                                            <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-vwa-background">
                                                <span className="font-semibold drop-shadow-sm">
                                                    {formatDate(post.date)}
                                                </span>
                                                {typeof post.readingMinutes === "number" && (
                                                    <span className="rounded-full bg-black/35 px-2 py-0.5 backdrop-blur-sm">
                                                        {post.readingMinutes} min
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="px-4 pb-4 pt-3 space-y-2">
                                            <p className="text-sm font-semibold text-vwa-dark leading-snug">
                                                {post.title}
                                            </p>
                                            <p className="text-[11px] text-vwa-dark/70 leading-relaxed line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {post.tags.slice(0, 3).map((t) => (
                                                    <span
                                                        key={t}
                                                        className="text-[10px] rounded-full bg-vwa-background px-2 py-0.5 text-vwa-dark/70"
                                                    >
                                                        #{t}
                                                    </span>
                                                ))}
                                                {post.tags.length > 3 && (
                                                    <span className="text-[10px] text-vwa-dark/55">
                                                        +{post.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="pt-1">
                                                <span className="text-[11px] font-semibold text-vwa-primary underline-offset-2 group-hover:underline group-hover:text-vwa-dark transition-colors">
                                                    Lire →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                )}
            </section>
        </div>
    );
}