// app/evenements/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";

type EventDetailPageProps = {
    params: { slug: string }; // ⬅️ PAS de Promise ici
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
    const { slug } = params; // ⬅️ PAS de await
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
            {/* … le reste de la page (header, image, description, CTA, etc.) … */}
        </main>
    );
}