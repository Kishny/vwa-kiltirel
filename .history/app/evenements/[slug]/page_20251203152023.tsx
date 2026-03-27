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

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    const { slug } = params;
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isPast = event.isPast;

    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 py-8 sm:py-12 space-y-10">
            {/* Breadcrumb / retour */}
            <div className="flex items-center justify-between gap-4 text-sm">
                <Link
                    href="/evenements"
                    className="inline-flex items-center gap-2 text-vwa-dark/70 hover:text-vwa-dark transition-colors"
                >
                    <span aria-hidden="true">←</span>
                    <span>Retour aux événements</span>
                </Link>

                {isPast && (
                    <span className="inline-flex items-center rounded-full border border-vwa-dark/10 bg-vwa-background px-3 py-1 text-xs font-medium text-vwa-dark/70">
                        Événement passé
                    </span>
                )}
            </div>

            {/* HERO PREMIUM */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-vwa-background via-white to-vwa-background border border-vwa-background/70 shadow-[0_24px_60px_rgba(59,38,29,0.14)]">
                {/* halo léger */}
                <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[480px] -translate-x-1/2 rounded-full bg-vwa-terracotta/15 blur-3xl" />

                <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:p-10">
                    {/* Colonne texte */}
                    <div className="flex flex-col justify-center gap-5">
                        {/* Catégorie + tag */}
                        <div className="flex flex-wrap items-center gap-3">
                            {event.category && (
                                <span className="inline-flex items-center rounded-full bg-vwa-dark/5 px-3 py-1 text-xs font-medium tracking-wide text-vwa-dark/80">
                                    {event.category.toUpperCase()}
                                </span>
                            )}

                            {event.tag && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-vwa-accent/40 bg-vwa-accent/5 px-3 py-1 text-xs font-medium text-vwa-accent">
                                    <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent" />
                                    {event.tag}
                                </span>
                            )}
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-vwa-dark">
                            {event.title}
                        </h1>

                        <p className="text-sm sm:text-base leading-relaxed text-vwa-dark/80">
                            {event.description}
                        </p>

                        {/* Infos principales */}
                        <dl className="mt-2 grid gap-3 text-sm text-vwa-dark/85 sm:grid-cols-2">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 text-vwa-primary" aria-hidden="true">
                                    📅
                                </span>
                                <div>
                                    <dt className="font-semibold text-vwa-dark/90">Date</dt>
                                    <dd>
                                        {event.date}
                                        {event.time && (
                                            <>
                                                <br />
                                                <span className="text-vwa-dark/70">{event.time}</span>
                                            </>
                                        )}
                                    </dd>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 text-vwa-primary" aria-hidden="true">
                                    📍
                                </span>
                                <div>
                                    <dt className="font-semibold text-vwa-dark/90">Lieu</dt>
                                    <dd>{event.location}</dd>
                                </div>
                            </div>
                        </dl>

                        {/* CTA animé */}
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            {!isPast && (
                                <Link
                                    href={`/evenements/${event.slug}#inscription`}
                                    className="relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-2.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(196,75,52,0.45)] transition 
                    [background:linear-gradient(135deg,theme(colors.vwa.terracotta),theme(colors.vwa.accent))]
                    hover:shadow-[0_18px_45px_rgba(196,75,52,0.65)]
                    hover:-translate-y-0.5
                    active:translate-y-0
                    active:scale-[0.97]"
                                >
                                    {/* halo animé */}
                                    <span className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light blur-xl transition-opacity duration-300 hover:opacity-60" />

                                    <span className="relative flex items-center gap-2">
                                        <span>S&apos;inscrire à l&apos;événement</span>
                                        <span
                                            className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-xs"
                                            aria-hidden="true"
                                        >
                                            →
                                        </span>
                                    </span>
                                </Link>
                            )}

                            <Link
                                href="/evenements"
                                className="inline-flex items-center gap-2 rounded-full border border-vwa-dark/15 bg-white/70 px-5 py-2 text-xs sm:text-sm font-medium text-vwa-dark/80 shadow-sm transition hover:border-vwa-primary/30 hover:bg-vwa-background/80 hover:text-vwa-primary"
                            >
                                Voir tous les événements
                            </Link>
                        </div>
                    </div>

                    {/* Colonne image */}
                    <div className="relative min-h-[220px] overflow-hidden rounded-3xl bg-vwa-dark/5">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="(min-width: 1024px) 40vw, 100vw"
                        />
                        {/* badge dans l'image */}
                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-vwa-dark/80 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-vwa-green" />
                            Ambiance conviviale & chaleureuse
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION À SAVOIR */}
            <section aria-labelledby="a-savoir-title" className="space-y-5">
                <div className="flex items-baseline justify-between gap-3">
                    <div>
                        <h2
                            id="a-savoir-title"
                            className="text-lg sm:text-xl font-semibold text-vwa-dark"
                        >
                            À savoir avant de venir
                        </h2>
                        <p className="mt-1 text-sm text-vwa-dark/70">
                            Quelques infos pratiques pour profiter pleinement de ce moment.
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {/* Infos pratiques */}
                    <div className="rounded-2xl border border-vwa-background/80 bg-white/90 p-4 shadow-sm">
                        <h3 className="text-sm font-semibold text-vwa-dark flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-vwa-terracotta" />
                            Infos pratiques
                        </h3>
                        <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-vwa-dark/80">
                            <li>
                                <span className="font-medium">Horaire :</span>{" "}
                                {event.time || "à préciser"}
                            </li>
                            <li>
                                <span className="font-medium">Adresse :</span>{" "}
                                {event.location}
                            </li>
                            <li>
                                <span className="font-medium">Accueil :</span> ouverture des
                                portes 15 min avant.
                            </li>
                        </ul>
                    </div>

                    {/* Public */}
                    <div className="rounded-2xl border border-vwa-background/80 bg-white/90 p-4 shadow-sm">
                        <h3 className="text-sm font-semibold text-vwa-dark flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-vwa-green" />
                            Public & ambiance
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-vwa-dark/80">
                            Moment pensé pour{" "}
                            <span className="font-medium">
                                les familles, les parents et les enfants
                            </span>{" "}
                            avec une atmosphère douce, bienveillante et créole-friendly.
                        </p>
                    </div>

                    {/* Tarifs */}
                    <div className="rounded-2xl border border-vwa-background/80 bg-white/90 p-4 shadow-sm">
                        <h3 className="text-sm font-semibold text-vwa-dark flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-vwa-primary" />
                            Tarifs & inscription
                        </h3>
                        <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-vwa-dark/80">
                            <li>
                                <span className="font-medium">Tarif :</span> gratuit ou à prix
                                libre, selon participation.
                            </li>
                            <li>
                                <span className="font-medium">Inscription :</span> recommandée,
                                places limitées.
                            </li>
                            <li>Un mail de confirmation sera envoyé après inscription.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* DESCRIPTION DÉTAILLÉE / TEXTE LONG */}
            <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-vwa-dark">
                    En quelques mots
                </h2>
                <div className="rounded-3xl border border-vwa-background/80 bg-white/90 p-5 sm:p-6 leading-relaxed text-sm sm:text-base text-vwa-dark/85 shadow-sm">
                    <p>
                        {event.longDescription ??
                            "Cet événement fait partie de la programmation de Vwa Kiltirèl pour valoriser les cultures afro-descendantes, le lien intergénérationnel et le vivre-ensemble à Tours. C’est un moment pour se retrouver, échanger, découvrir et célébrer nos héritages culturels dans un cadre chaleureux."}
                    </p>
                    <p className="mt-3">
                        Attendez-vous à des échanges authentiques, des sourires, peut-être
                        quelques notes de musique et surtout un espace où chacun·e est
                        accueilli·e tel qu’il ou elle est.
                    </p>
                </div>
            </section>

            {/* Ancre d’inscription (le vrai formulaire viendra plus tard) */}
            <section
                id="inscription"
                className="rounded-3xl border border-dashed border-vwa-primary/30 bg-vwa-primary/3 p-5 sm:p-6 text-sm text-vwa-dark/85"
            >
                <h2 className="text-base sm:text-lg font-semibold text-vwa-dark mb-2">
                    Inscription
                </h2>
                <p className="text-sm text-vwa-dark/75 mb-4">
                    Le formulaire d&apos;inscription en ligne sera bientôt disponible. En
                    attendant, vous pouvez nous écrire à{" "}
                    <a
                        href="mailto:contact@vwa-kiltirel.fr"
                        className="font-medium text-vwa-primary underline-offset-2 hover:underline"
                    >
                        contact@vwa-kiltirel.fr
                    </a>{" "}
                    pour réserver vos places.
                </p>

                {!isPast && (
                    <p className="text-xs text-vwa-dark/60">
                        Astuce : indiquez le nom de l&apos;événement, le nombre de
                        participant·es et si vous venez avec des enfants.
                    </p>
                )}

                {isPast && (
                    <p className="text-xs text-vwa-dark/60">
                        Cet événement est terminé, mais d&apos;autres rencontres arrivent
                        très bientôt dans l&apos;agenda Vwa Kiltirèl.
                    </p>
                )}
            </section>
        </main>
    );
}
