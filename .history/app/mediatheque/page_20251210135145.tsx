// app/mediatheque/page.tsx
import type { Metadata } from "next";
import { events } from "@/data/events";
import { mediaByEvent, MediaItem } from "@/data/media";
import MediathequeView, {
    EventWithMedia,
} from "@/components/mediatheque/MediathequeView";

export const metadata: Metadata = {
    title: "Médiathèque | Vwa Kiltirèl",
    description:
        "Photos et souvenirs des ateliers, rencontres et événements Vwa Kiltirèl.",
};

type MediathequePageProps = {
    // Next 16 => searchParams est une Promise
    searchParams: Promise<{
        event?: string;
        category?: string;
    }>;
};

export default async function MediathequePage({
    searchParams,
}: MediathequePageProps) {
    const { event: eventSlugFromUrl, category: categoryFromUrl } =
        await searchParams;

    // On ne garde que les événements passés qui ont des médias
    const pastEventsWithMedia: EventWithMedia[] = events
        .filter((e) => e.isPast && mediaByEvent[e.slug]?.length)
        .map((e) => ({
            slug: e.slug,
            title: e.title,
            category: e.category,
            date: e.date,
            location: e.location,
            medias: mediaByEvent[e.slug] as MediaItem[],
        }));

    return (
        <main className="relative max-w-5xl mx-auto px-4 py-10">
            {/* Halo d'ambiance léger */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/40 to-vwa-background" />
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/18 blur-3xl opacity-80" />
            </div>

            <MediathequeView
                events={pastEventsWithMedia}
                initialEventSlug={eventSlugFromUrl}
                initialCategory={categoryFromUrl}
            />
        </main>
    );
}