// app/actualites/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "@/data/posts";
import ShareBar from "@/components/actualites/ShareBar";
import type { PostBlock } from "@/data/posts";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";

type PageProps = {
    params: Promise<{ slug: string }>;
};

function formatDate(iso: string) {
    const [y, m, d] = iso.split("-").map((x) => Number(x));
    const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
    return dt.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

function getPostBySlug(slug: string) {
    return posts.find((p) => p.slug === slug);
}

function getPrevNext(slug: string) {
    const sorted = posts.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
    const idx = sorted.findIndex((p) => p.slug === slug);
    const prev = idx > 0 ? sorted[idx - 1] : null;        // plus récent
    const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null; // plus ancien
    return { prev, next };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) return { title: "Article introuvable | Vwa Kiltirèl" };

    const title = `${post.title} | Actualités Vwa Kiltirèl`;
    const description = post.excerpt;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            images: [
                {
                    url: post.cover,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [post.cover],
        },
    };
}

function ratioClass(ratio: "16/9" | "4/3" | "1/1" | "3/4" | undefined) {
    switch (ratio) {
        case "1/1":
            return "aspect-square";
        case "4/3":
            return "aspect-[4/3]";
        case "3/4":
            return "aspect-[3/4]";
        case "16/9":
        default:
            return "aspect-[16/9]";
    }
}

function RenderBlocks({ blocks }: { blocks: PostBlock[] }) {
    return (
        <div className="space-y-5 text-sm text-vwa-dark/80 leading-relaxed">
            {blocks.map((b, i) => {
                if (b.type === "h2") {
                    return (
                        <h2
                            key={i}
                            className="pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60"
                        >
                            {b.text}
                        </h2>
                    );
                }

                if (b.type === "p") {
                    return (
                        <p key={i} className="whitespace-pre-line">
                            {b.text}
                        </p>
                    );
                }

                if (b.type === "quote") {
                    return (
                        <figure
                            key={i}
                            className="rounded-3xl bg-vwa-dark text-vwa-background px-5 py-4 shadow-[0_18px_55px_rgba(28,22,18,0.6)]"
                        >
                            <blockquote className="text-sm leading-relaxed text-vwa-background/95">
                                “{b.text}”
                            </blockquote>
                            {b.author && (
                                <figcaption className="mt-2 text-[11px] uppercase tracking-[0.18em] text-vwa-background/70">
                                    — {b.author}
                                </figcaption>
                            )}
                        </figure>
                    );
                }

                if (b.type === "list") {
                    return (
                        <ul key={i} className="list-disc list-inside space-y-1.5">
                            {b.items.map((it, idx) => (
                                <li key={idx}>{it}</li>
                            ))}
                        </ul>
                    );
                }

                if (b.type === "image") {
                    const aspect = ratioClass(b.ratio);
                    return (
                        <figure
                            key={i}
                            className="overflow-hidden rounded-3xl bg-white/95 border border-vwa-background/85 shadow-[0_16px_45px_rgba(28,22,18,0.12)]"
                        >
                            <div className={`relative w-full ${aspect}`}>
                                <Image
                                    src={b.src}
                                    alt={b.alt}
                                    fill
                                    sizes="(min-width: 1024px) 860px, 100vw"
                                    className="object-cover"
                                    style={{ objectPosition: b.focal ?? "50% 50%" }}
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
                            </div>
                            {b.caption && (
                                <figcaption className="px-4 py-3 text-[11px] text-vwa-dark/65">
                                    {b.caption}
                                </figcaption>
                            )}
                        </figure>
                    );
                }

                if (b.type === "video") {
                    const aspect = ratioClass(b.ratio);
                    return (
                        <figure
                            key={i}
                            className="overflow-hidden rounded-3xl bg-white/95 border border-vwa-background/85 shadow-[0_16px_45px_rgba(28,22,18,0.12)]"
                        >
                            <div className={`relative w-full ${aspect} bg-black`}>
                                <video
                                    className="h-full w-full object-cover"
                                    controls
                                    playsInline
                                    poster={b.poster}
                                >
                                    <source src={b.src} />
                                </video>
                            </div>
                            {b.caption && (
                                <figcaption className="px-4 py-3 text-[11px] text-vwa-dark/65">
                                    {b.caption}
                                </figcaption>
                            )}
                        </figure>
                    );
                }

                return null;
            })}
        </div>
    );
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) notFound();

    const { prev, next } = getPrevNext(slug);

    return (
        <main className="relative max-w-5xl mx-auto px-4 py-10 space-y-8">
            {/* Halo / ambiance */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/65 to-vwa-background" />
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/25 blur-3xl opacity-80" />
                <div className="absolute bottom-[-4rem] right-[-3rem] h-60 w-60 rounded-full bg-vwa-primary/18 blur-3xl opacity-80" />
            </div>

            {/* Top bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                    href="/actualites"
                    className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-vwa-dark/70 shadow-sm ring-1 ring-vwa-background/80 backdrop-blur-sm transition-all hover:-translate-y-[1px] hover:bg-white hover:text-vwa-dark hover:shadow-md"
                >
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                    <span>Retour aux actualités</span>
                </Link>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className="text-[11px] text-vwa-dark/55 inline-flex items-center gap-1.5">
                        <CalendarDaysIcon className="h-4 w-4" />
                        {formatDate(post.date)}
                        {typeof post.readingMinutes === "number" ? ` • ${post.readingMinutes} min` : ""}
                    </span>
                </div>
            </div>

            <article className="overflow-hidden rounded-3xl bg-white/95 shadow-[0_22px_70px_rgba(28,22,18,0.18)] ring-1 ring-vwa-background/85">
                {/* HERO */}
                <div className="relative h-56 sm:h-72">
                    <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        priority
                        sizes="(min-width: 1024px) 960px, 100vw"
                        className="object-cover"
                        style={{ objectPosition: post.focal ?? "50% 50%" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vwa-dark via-vwa-dark/55 to-vwa-dark/10" />

                    <div className="absolute inset-x-5 bottom-5 text-vwa-background space-y-2">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium backdrop-blur-sm"
                                >
                                    #{t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-extrabold leading-snug drop-shadow-[0_10px_28px_rgba(0,0,0,0.65)]">
                            {post.title}
                        </h1>

                        <p className="text-xs sm:text-sm text-vwa-background/85 max-w-3xl">
                            {post.excerpt}
                        </p>
                    </div>
                </div>

                {/* BODY */}
                <div className="p-5 sm:p-7 space-y-6">
                    {/* Share */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                            Article
                        </p>
                        <ShareBar title={post.title} />
                    </div>

                    {/* Content blocks */}
                    <RenderBlocks blocks={post.content} />

                    {/* Footer row */}
                    <div className="pt-2 border-t border-vwa-background/70 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[11px] text-vwa-dark/55">
                            Publié le <span className="font-semibold text-vwa-dark">{formatDate(post.date)}</span>
                        </p>

                        <Link
                            href="/actualites"
                            className="text-[11px] font-semibold text-vwa-primary underline-offset-2 hover:underline hover:text-vwa-dark transition"
                        >
                            Voir tous les articles →
                        </Link>
                    </div>
                </div>
            </article>

            {/* Prev / Next */}
            <nav className="grid gap-3 sm:grid-cols-2">
                {prev ? (
                    <Link
                        href={`/actualites/${prev.slug}`}
                        className="group rounded-3xl bg-white/90 border border-vwa-background/85 px-4 py-4 shadow-[0_16px_45px_rgba(28,22,18,0.12)] hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(28,22,18,0.20)] transition"
                    >
                        <p className="text-[11px] uppercase tracking-[0.18em] text-vwa-dark/55">
                            Article précédent
                        </p>
                        <p className="mt-1 text-sm font-semibold text-vwa-dark group-hover:text-vwa-primary transition">
                            {prev.title}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold text-vwa-primary">
                            <ArrowLeftIcon className="h-4 w-4" /> Lire
                        </span>
                    </Link>
                ) : (
                    <div className="hidden sm:block" />
                )}

                {next ? (
                    <Link
                        href={`/actualites/${next.slug}`}
                        className="group rounded-3xl bg-white/90 border border-vwa-background/85 px-4 py-4 shadow-[0_16px_45px_rgba(28,22,18,0.12)] hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(28,22,18,0.20)] transition sm:text-right"
                    >
                        <p className="text-[11px] uppercase tracking-[0.18em] text-vwa-dark/55">
                            Article suivant
                        </p>
                        <p className="mt-1 text-sm font-semibold text-vwa-dark group-hover:text-vwa-primary transition">
                            {next.title}
                        </p>
                        <span className="mt-2 inline-flex items-center justify-end gap-2 text-[11px] font-semibold text-vwa-primary">
                            Lire <ArrowRightIcon className="h-4 w-4" />
                        </span>
                    </Link>
                ) : null}
            </nav>
        </main>
    );
}