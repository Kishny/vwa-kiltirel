import type { Metadata } from "next";
import ActualitesView from "@/components/actualites/ActualitesView";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
    title: "Actualités | Vwa Kiltirèl",
    description:
        "Articles, coulisses, annonces et inspirations autour de Vwa Kiltirèl.",
};

export default function ActualitesPage() {
    return (
        <main className="relative max-w-5xl mx-auto px-4 py-10 space-y-10">
            {/* Halo / ambiance */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/60 to-vwa-background" />
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/22 blur-3xl opacity-80" />
                <div className="absolute bottom-[-4rem] right-[-3rem] h-60 w-60 rounded-full bg-vwa-primary/16 blur-3xl opacity-80" />
                <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,#111827_45%,transparent_0)] [background-size:18px_18px]" />
            </div>

            <ActualitesView posts={posts} />
        </main>
    );
}