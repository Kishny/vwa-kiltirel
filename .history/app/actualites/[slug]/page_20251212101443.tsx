// app/actualites/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

type PageProps = {
    params: Promise<{ slug: string }>;
};

function getPost(slug: string) {
    return posts.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return { title: "Article introuvable | Vwa Kiltirèl" };

    return {
        title: `${post.title} | Vwa Kiltirèl`,
        description: post.excerpt,
    };
}

function formatDate(iso: string) {
    const [y, m, d] = iso.split("-").map((x) => Number(x));
    const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
    return dt.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default async function ActualiteDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPost(slug);

    if (!post) notFound();

    return (
        <main className="relative max-w-5xl mx-auto px-4 py-10 space-y-8">
            {/* Halo / ambiance */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/60 to-vwa-background" />
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/25 blur-3xl opacity-70" />
                <div className="absolute bottom-0 right-[-4rem] h-64 w-64 rounded-full bg-vwa-primary/15 blur-3xl opacity-70" />
            </div>

            {/* Back */}
            <div className="flex items-center justify-between gap-3">
                <Link
                    href="/actualites"
                    className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-vwa-dark/70 shadow-sm ring-1 ring-vwa-background/80 backdrop-blur-sm transition-all hover:-translate-y-[1px] hover:bg-white hover:text-vwa-dark hover:shadow-md"
                >
                    <span aria-hidden>←</span>
                    <span>Retour aux actualités</span>
                </Link>

                <span className="text-[11px] text-vwa-dark/60">
                    {formatDate(post.date)}
                    {typeof post.readingMinutes === "number" ? ` • ${post.readingMinutes} min` : ""}
                </span>
            </div>

            <article className="overflow-hidden rounded-3xl bg-white/95 shadow-[0_22px_70px_rgba(28,22,18,0.20)] ring-1 ring-vwa-background/80 backdrop-blur-sm">
                {/* Cover */}
                <div className="relative h-64 sm:h-80">
                    <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        priority
                        sizes="(min-width: 1024px) 960px, 100vw"
                        className="object-cover"
                        style={{ objectPosition: post.focal ?? "50% 35%" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vwa-dark via-vwa-dark/50 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-vwa-background space-y-2">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full bg-vwa-background/10 px-3 py-1 text-[11px] font-medium"
                                >
                                    #{t}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold leading-snug drop-shadow-[0_10px_28px_rgba(0,0,0,0.6)]">
                            {post.title}
                        </h1>
                        <p className="text-sm text-vwa-background/90 max-w-3xl">{post.excerpt}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-7 space-y-6">
                    <section className="space-y-3 text-sm text-vwa-dark/80">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                            Article
                        </h2>
                        <p className="whitespace-pre-line leading-relaxed">{post.content}</p>
                    </section>

                    <div className="pt-2 border-t border-vwa-background/70 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-[11px] text-vwa-dark/60">
                            Publié le <span className="font-semibold text-vwa-dark">{formatDate(post.date)}</span>
                        </span>

                        <Link
                            href="/actualites"
                            className="text-[11px] font-semibold text-vwa-primary underline-offset-2 hover:underline hover:text-vwa-dark transition-colors"
                        >
                            Voir tous les articles →
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
}