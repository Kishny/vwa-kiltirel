// app/evenements/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";

type EventDetailPageProps = {
    params: { slug: string };
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
    const { slug } = params;
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
            <header className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-vwa-dark/60">
                    Événement
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                    {event.title}
                </h1>
                <p className="text-sm text-vwa-dark/75">
                    {event.date} • {event.time} • {event.location}
                </p>
            </header>

            <div className="relative w-full h-52 sm:h-64 rounded-3xl overflow-hidden bg-vwa-background">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </div>

            <section className="space-y-4 text-sm text-vwa-dark/80">
                <p className="font-medium">{event.shortDescription}</p>
                <p className="whitespace-pre-line">{event.description}</p>
            </section>

            <section className="space-y-3">
                <h2 className="text-base font-semibold text-vwa-dark">À savoir</h2>
                <ul className="list-disc list-inside text-sm text-vwa-dark/75 space-y-1">
                    <li>Les inscriptions sont nominatives et non transférables.</li>
                    <li>
                        En cas d&apos;annulation, merci de nous prévenir au moins 48h à
                        l&apos;avance.
                    </li>
                    <li>
                        L&apos;association se réserve le droit d&apos;ajuster le programme
                        en fonction des besoins du groupe.
                    </li>
                </ul>
            </section>

            {!isPast && (
                <div className="pt-2">
                    <Link
                        href={`/evenements/${event.slug}/inscription`}
                        className="inline-flex items-center justify-center rounded-full bg-vwa-primary px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-vwa-dark hover:shadow-md transition-all"
                    >
                        Je m&apos;inscris
                    </Link>
                </div>
            )}
        </main>
    );
}
