// app/actualites/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

type Props = {
    params: Promise<{ slug: string }>;
};

function formatDate(iso: string) {
    const [y, m, d] = iso.split("-").map((x) => Number(x));
    const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
    return dt.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

function slugify(s: string) {
    return s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);
    if (!post) notFound();

    const headings =
        post.content?.filter?.((b: any) => b.type === "h2").map((b: any) => ({
            text: b.text,
            id: slugify(b.text),
        })) ?? [];

    const related = posts
        .filter((p) => p.slug !== post.slug)
        .map((p) => ({
            post: p,
            score: p.tags.filter((t) => post.tags.includes(t)).length,
        }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 2)
        .map((x) => x.post);

    return (
        <main className="relative max-w-5xl mx-auto px-4 py-10 space-y-8">
            {/* Halo */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/65 to-vwa-background" />
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/25 blur-3xl opacity-80" />
                <div className="absolute bottom-[-4rem] right-[-3rem] h-60 w-60 rounded-full bg-vwa-primary/18 blur-3xl opacity-80" />
            </div>

            {/* Back */}
            <div className="flex items-center justify-between gap-3">
                <Link
                    href="/actualites"
                    className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-vwa-dark/70 shadow-sm ring-1 ring-vwa-background/80 backdrop-blur-sm transition-all hover:-translate-y-[1px] hover:bg-white hover:text-vwa-dark hover:shadow-md"
                >
                    <span aria-hidden>←</span>
                    Retour aux actualités
                </Link>

                <div className="text-[11px] text-vwa-dark/60">
                    {formatDate(post.date)}
                    {typeof post.readingMinutes === "number" && <> • {post.readingMinutes} min</>}
                </div>
            </div>

            <article className="overflow-hidden rounded-3xl bg-white/95 shadow-[0_22px_70px_rgba(28,22,18,0.22)] ring-1 ring-vwa-background/85 backdrop-blur-sm">
                {/* HERO */}
                <div className="relative h-56 sm:h-72">
                    <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(min-width: 1024px) 960px, 100vw"
                        style={{ objectPosition: post.focal ?? "50% 35%" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                    <div className="absolute inset-x-5 bottom-5 text-vwa-background space-y-3">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full bg-black/35 px-2.5 py-1 text-[11px] backdrop-blur-sm"
                                >
                                    #{t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-xl sm:text-3xl font-extrabold leading-snug drop-shadow-[0_10px_28px_rgba(0,0,0,0.65)]">
                            {post.title}
                        </h1>

                        <p className="text-sm text-vwa-background/90 max-w-3xl">
                            {post.excerpt}
                        </p>
                    </div>
                </div>

                {/* BODY */}
                <div className="p-5 sm:p-7 grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,0.85fr)]">
                    {/* Content */}
                    <div className="space-y-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                            Article
                        </p>

                        <div className="space-y-4 text-sm text-vwa-dark/80 leading-relaxed">
                            {(post.content ?? []).map((block: any, idx: number) => {
                                if (block.type === "h2") {
                                    const id = slugify(block.text);
                                    return (
                                        <h2
                                            key={idx}
                                            id={id}
                                            className="scroll-mt-24 pt-2 text-base font-extrabold text-vwa-dark"
                                        >
                                            {block.text}
                                        </h2>
                                    );
                                }

                                if (block.type === "quote") {
                                    return (
                                        <figure
                                            key={idx}
                                            className="rounded-3xl bg-vwa-dark text-vwa-background px-5 py-4 shadow-[0_18px_55px_rgba(28,22,18,0.6)]"
                                        >
                                            <blockquote className="text-sm leading-relaxed">
                                                “{block.text}”
                                            </blockquote>
                                            {block.author && (
                                                <figcaption className="mt-2 text-[11px] text-vwa-background/75">
                                                    — {block.author}
                                                </figcaption>
                                            )}
                                        </figure>
                                    );
                                }

                                if (block.type === "list") {
                                    return (
                                        <ul key={idx} className="list-disc list-inside space-y-1.5">
                                            {block.items.map((it: string) => (
                                                <li key={it}>{it}</li>
                                            ))}
                                        </ul>
                                    );
                                }

                                // default paragraph
                                return <p key={idx}>{block.text}</p>;
                            })}
                        </div>

                        <div className="pt-4 border-t border-vwa-background/70 flex items-center justify-between gap-3 text-[11px] text-vwa-dark/60">
                            <span>Publié le {formatDate(post.date)}</span>
                            <Link href="/actualites" className="font-semibold text-vwa-primary hover:text-vwa-dark">
                                Voir tous les articles →
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-5">
                        {headings.length > 0 && (
                            <div className="rounded-3xl bg-white/95 border border-vwa-background/85 shadow-[0_16px_45px_rgba(28,22,18,0.12)] px-4 py-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                                    Sommaire
                                </p>
                                <ul className="mt-3 space-y-2 text-sm">
                                    {headings.map((h) => (
                                        <li key={h.id}>
                                            <a
                                                href={`#${h.id}`}
                                                className="text-vwa-dark/80 hover:text-vwa-dark underline-offset-4 hover:underline"
                                            >
                                                {h.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="rounded-3xl bg-vwa-background/60 border border-vwa-background/85 px-4 py-4 text-sm text-vwa-dark/80">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                                En bref
                            </p>
                            <p className="mt-2">
                                Tu veux soutenir Vwa Kiltirèl ? Une adhésion ou un don, et on transforme ça en
                                expériences culturelles bien réelles.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <Link
                                    href="/devenir-membre"
                                    className="inline-flex items-center justify-center rounded-full bg-vwa-dark text-vwa-background px-4 py-2 text-xs font-semibold shadow-[0_14px_40px_rgba(28,22,18,0.45)] hover:opacity-95"
                                >
                                    Devenir membre
                                </Link>
                                <Link
                                    href="/don"
                                    className="inline-flex items-center justify-center rounded-full bg-white/80 text-vwa-dark px-4 py-2 text-xs font-semibold ring-1 ring-vwa-background/80 hover:bg-white"
                                >
                                    Faire un don
                                </Link>
                            </div>
                        </div>

                        {related.length > 0 && (
                            <div className="rounded-3xl bg-white/95 border border-vwa-background/85 shadow-[0_16px_45px_rgba(28,22,18,0.12)] px-4 py-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                                    Articles liés
                                </p>
                                <ul className="mt-3 space-y-3">
                                    {related.map((p) => (
                                        <li key={p.slug} className="group">
                                            <Link
                                                href={`/actualites/${p.slug}`}
                                                className="block rounded-2xl bg-vwa-background/50 border border-vwa-background/80 px-3 py-3 transition-all hover:bg-white hover:shadow-[0_14px_40px_rgba(28,22,18,0.14)]"
                                            >
                                                <p className="text-sm font-semibold text-vwa-dark leading-snug">
                                                    {p.title}
                                                </p>
                                                <p className="mt-1 text-[11px] text-vwa-dark/65 line-clamp-2">
                                                    {p.excerpt}
                                                </p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </aside>
                </div>
            </article>
        </main>
    );
}