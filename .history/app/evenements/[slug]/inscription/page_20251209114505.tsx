// app/evenements/[slug]/inscription/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";

// ⚠️ params est une Promise maintenant
type EventInscriptionPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default async function EventInscriptionPage(
    { params }: EventInscriptionPageProps
) {
    // ✅ on "déballe" la Promise ici
    const { slug } = await params;

    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="max-w-xl mx-auto px-4 py-10 space-y-6">
            <header className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-vwa-dark/60">
                    {isPast ? "Événement passé" : "Inscription"}
                </p>
                <h1 className="text-xl sm:text-2xl font-extrabold text-vwa-dark">
                    {event.title}
                </h1>
                <p className="text-xs sm:text-sm text-vwa-dark/75">
                    {event.date} • {event.time} • {event.location}
                </p>
            </header>

            {isPast ? (
                <p className="text-sm text-vwa-dark/80">
                    Cet événement est désormais passé. Merci de votre intérêt ! Retrouvez
                    nos prochains rendez-vous dans la page{" "}
                    <Link
                        href="/evenements"
                        className="underline underline-offset-2 text-vwa-primary hover:text-vwa-dark"
                    >
                        Événements
                    </Link>
                    .
                </p>
            ) : (
                <section className="rounded-3xl bg-white shadow-sm border border-vwa-background px-5 py-6 space-y-4">
                    <p className="text-sm text-vwa-dark/80">
                        Page d&apos;inscription minimaliste (formulaire à venir).
                    </p>
                    <ul className="list-disc list-inside text-sm text-vwa-dark/75 space-y-1">
                        <li>Formulaire prénom / nom / email / téléphone</li>
                        <li>Nombre de participants</li>
                        <li>Questions spécifiques (allergies, enfants, etc.)</li>
                    </ul>
                    <p className="text-xs text-vwa-dark/60">
                        Pour l&apos;instant, ce texte sert juste de placeholder.
                    </p>
                </section>
            )}

            <div className="pt-2">
                <Link
                    href="/evenements"
                    className="text-xs text-vwa-primary hover:text-vwa-dark underline underline-offset-2"
                >
                    ← Retour aux événements
                </Link>
            </div>
        </main>
    );
}