// app/evenements/inscription/page.tsx
import { events } from "@/data/events";

type EventInscriptionPageProps = {
    searchParams: {
        event?: string;
    };
};

export const metadata = {
    title: "Inscription à un événement – Vwa Kiltirèl",
};

function getEventBySlug(slug: string) {
    return events.find((event) => event.slug === slug);
}

export default function EventInscriptionPage({
    searchParams,
}: EventInscriptionPageProps) {
    const slug = searchParams.event;
    const event = slug ? getEventBySlug(slug) : undefined;

    return (
        <main className="max-w-xl mx-auto px-4 py-10 space-y-6">
            <header className="space-y-2">
                <p className="text-xs tracking-[0.2em] uppercase text-vwa-dark/60">
                    Inscription
                </p>
                <h1 className="text-2xl font-extrabold text-vwa-dark">
                    Je m&apos;inscris à un événement
                </h1>

                {event && (
                    <div className="mt-2 rounded-2xl bg-vwa-background/70 border border-vwa-background px-4 py-3">
                        <p className="text-xs text-vwa-dark/60 mb-1">
                            Vous vous inscrivez pour :
                        </p>
                        <p className="text-sm font-semibold text-vwa-dark">
                            {event.title}
                        </p>
                        <p className="text-xs text-vwa-dark/70">
                            {event.date} • {event.time} • {event.location}
                        </p>
                    </div>
                )}
            </header>

            <form className="space-y-4 bg-white/80 border border-vwa-background rounded-3xl p-5">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark">
                        Nom et prénom
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vwa-primary/60"
                        placeholder="Ex : Maud Aron"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark">Email</label>
                    <input
                        type="email"
                        className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vwa-primary/60"
                        placeholder="vous@example.com"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark">
                        Nombre de participant·es
                    </label>
                    <input
                        type="number"
                        min={1}
                        className="w-full rounded-xl border border-vwa-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vwa-primary/60"
                        defaultValue={1}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-2 rounded-full bg-vwa-primary text-white text-sm font-medium py-2.5 shadow-sm hover:bg-vwa-dark transition-all"
                >
                    Valider mon inscription
                </button>

                <p className="text-[11px] text-vwa-dark/60 mt-2">
                    Ceci est une maquette : nous brancherons plus tard l&apos;envoi réel
                    (email / base de données).
                </p>
            </form>
        </main>
    );
}