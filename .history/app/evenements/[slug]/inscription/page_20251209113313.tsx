// app/evenements/[slug]/inscription/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { events } from "@/data/events";

type EventInscriptionPageProps = {
    params: { slug: string }; // ⬅️ PAS de Promise
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default function EventInscriptionPage({
    params,
}: EventInscriptionPageProps) {
    const { slug } = params; // ⬅️ PAS de await
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="max-w-xl mx-auto px-4 py-10 space-y-6">
            {/* … contenu minimal d’inscription … */}
        </main>
    );
}