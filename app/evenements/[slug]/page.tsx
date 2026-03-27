// app/evenements/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { events } from "@/data/events";
import {
  CalendarDaysIcon,
  MapPinIcon,
  ArrowRightIcon,
  PhotoIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Événements | Vwa Kiltirèl",
  description:
    "Découvrez les événements à venir et les moments déjà vécus avec Vwa Kiltirèl à Tours : ateliers, soirées culturelles, rencontres, bien-être et transmission.",
  openGraph: {
    title: "Événements | Vwa Kiltirèl",
    description:
      "Agenda culturel de Vwa Kiltirèl : événements à venir, ateliers, rencontres et souvenirs d’événements passés.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Événements | Vwa Kiltirèl",
    description:
      "Explorez l’agenda Vwa Kiltirèl : prochains rendez-vous et souvenirs culturels.",
  },
};

function sortUpcomingFirst() {
  const upcoming = events.filter((event) => !event.isPast);
  const past = events.filter((event) => event.isPast);

  return { upcoming, past };
}

export default function EventsPage() {
  const { upcoming, past } = sortUpcomingFirst();

  return (
    <main className="relative max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Halo / ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/60 to-vwa-background" />
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/25 blur-3xl opacity-75" />
        <div className="absolute bottom-[-5rem] right-[-4rem] h-72 w-72 rounded-full bg-vwa-primary/12 blur-3xl opacity-80" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,#111827_45%,transparent_0)] [background-size:18px_18px]" />
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden rounded-[2rem] border border-vwa-background/80 bg-white/95 shadow-[0_24px_80px_rgba(28,22,18,0.14)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-vwa-accent/15 blur-3xl opacity-80" />
          <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-vwa-primary/12 blur-3xl opacity-80" />
        </div>

        <div className="relative grid gap-6 px-5 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-vwa-dark/60">
              <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
              Agenda – Vwa Kiltirèl
            </p>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight text-vwa-dark">
                Des rendez-vous culturels pensés pour rassembler, transmettre et faire vibrer.
              </h1>

              <p className="text-sm sm:text-base leading-relaxed text-vwa-dark/75 max-w-2xl">
                Découvrez les événements à venir de Vwa Kiltirèl à Tours :
                ateliers, rencontres, soirées culturelles, moments de bien-être
                et souvenirs des temps forts déjà vécus.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-vwa-background/80 bg-vwa-background/50 px-3 py-3">
                <p className="text-base font-extrabold text-vwa-dark">{upcoming.length}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-vwa-dark/58">
                  Événements à venir
                </p>
              </div>

              <div className="rounded-2xl border border-vwa-background/80 bg-vwa-background/50 px-3 py-3">
                <p className="text-base font-extrabold text-vwa-dark">{past.length}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-vwa-dark/58">
                  Événements passés
                </p>
              </div>

              <div className="rounded-2xl border border-vwa-background/80 bg-vwa-background/50 px-3 py-3">
                <p className="text-base font-extrabold text-vwa-dark">Tours</p>
                <p className="mt-1 text-[11px] leading-relaxed text-vwa-dark/58">
                  Ancrage principal
                </p>
              </div>

              <div className="rounded-2xl border border-vwa-background/80 bg-vwa-background/50 px-3 py-3">
                <p className="text-base font-extrabold text-vwa-dark">Culture</p>
                <p className="mt-1 text-[11px] leading-relaxed text-vwa-dark/58">
                  Transmission vivante
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[280px] sm:h-[340px] overflow-hidden rounded-[1.6rem] bg-vwa-background">
            <Image
              src="/images/actualites/cover-1.png"
              alt="Agenda culturel Vwa Kiltirèl"
              fill
              className="object-cover"
              style={{ objectPosition: "50% 30%" }}
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
              Tours • Rencontres • Culture
            </div>
          </div>
        </div>
      </section>

      {/* ÉVÉNEMENTS À VENIR */}
      <section className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-vwa-dark">
              Événements à venir
            </h2>
            <p className="text-sm text-vwa-dark/65">
              Les prochains rendez-vous à ne pas manquer.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-vwa-dark text-vwa-background px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]">
            <TicketIcon className="h-4 w-4" />
            Réservation selon l’événement
          </span>
        </div>

        {upcoming.length === 0 ? (
          <div className="rounded-3xl border border-vwa-background/85 bg-white/95 px-5 py-6 shadow-[0_16px_45px_rgba(28,22,18,0.10)]">
            <p className="text-sm text-vwa-dark/75">
              Aucun événement à venir pour le moment. De nouvelles expériences
              arrivent bientôt.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {upcoming.map((event) => (
              <article
                key={event.slug}
                className="group overflow-hidden rounded-[1.75rem] border border-vwa-background/85 bg-white/95 shadow-[0_18px_55px_rgba(28,22,18,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(28,22,18,0.18)]"
              >
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                  {/* Texte */}
                  <div className="relative p-5 sm:p-6 lg:p-7">
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-vwa-accent/10 blur-3xl opacity-80" />
                    </div>

                    <div className="relative space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-vwa-dark/60">
                          À venir
                        </span>

                        {event.category && (
                          <span className="rounded-full bg-vwa-background px-3 py-1 text-[10px] font-medium text-vwa-dark/70">
                            {event.category}
                          </span>
                        )}

                        {event.tag && (
                          <span className="rounded-full border border-vwa-accent/25 bg-vwa-accent/5 px-3 py-1 text-[10px] font-medium text-vwa-accent">
                            {event.tag}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-extrabold leading-snug text-vwa-dark">
                          {event.title}
                        </h3>

                        {event.shortDescription && (
                          <p className="text-sm leading-relaxed text-vwa-dark/72 max-w-2xl">
                            {event.shortDescription}
                          </p>
                        )}
                      </div>

                      <div className="grid gap-2 text-sm text-vwa-dark/75">
                        <div className="inline-flex items-center gap-2">
                          <CalendarDaysIcon className="h-4 w-4 text-vwa-accent" />
                          <span>
                            {event.date} • {event.time}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-2">
                          <MapPinIcon className="h-4 w-4 text-vwa-accent" />
                          <span>{event.location}</span>
                        </div>

                        {event.price && (
                          <div className="inline-flex items-center gap-2">
                            <TicketIcon className="h-4 w-4 text-vwa-accent" />
                            <span>{event.price}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <Link
                          href={`/evenements/${event.slug}`}
                          className="inline-flex items-center justify-center rounded-full border border-vwa-dark/10 bg-white px-5 py-2.5 text-sm font-medium text-vwa-dark/80 shadow-sm transition hover:border-vwa-primary/30 hover:text-vwa-primary"
                        >
                          Voir la fiche
                        </Link>

                        <Link
                          href={`/evenements/${event.slug}/inscription`}
                          className="group/cta inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(28,22,18,0.45)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_22px_55px_rgba(28,22,18,0.58)]"
                        >
                          Je m’inscris
                          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative min-h-[240px] lg:min-h-full overflow-hidden bg-vwa-background">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-black/10" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ÉVÉNEMENTS PASSÉS */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-vwa-dark">
            Événements passés
          </h2>
          <p className="text-sm text-vwa-dark/65">
            Les souvenirs, temps forts et expériences déjà vécus.
          </p>
        </div>

        {past.length === 0 ? (
          <div className="rounded-3xl border border-vwa-background/85 bg-white/95 px-5 py-6 shadow-[0_16px_45px_rgba(28,22,18,0.10)]">
            <p className="text-sm text-vwa-dark/75">
              Aucun événement passé n’est encore affiché.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {past.map((event) => (
              <article
                key={event.slug}
                className="group overflow-hidden rounded-[1.6rem] border border-vwa-background/85 bg-white/95 shadow-[0_16px_45px_rgba(28,22,18,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(28,22,18,0.16)]"
              >
                <div className="relative h-48 overflow-hidden bg-vwa-background">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                  <div className="absolute left-3 bottom-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                      Événement passé
                    </span>

                    {event.category && (
                      <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm">
                        {event.category}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4 p-4 sm:p-5">
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold leading-snug text-vwa-dark">
                      {event.title}
                    </h3>

                    {event.shortDescription && (
                      <p className="text-xs leading-relaxed text-vwa-dark/70">
                        {event.shortDescription}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2 text-xs text-vwa-dark/65">
                    <div className="inline-flex items-center gap-2">
                      <CalendarDaysIcon className="h-4 w-4 text-vwa-accent" />
                      <span>{event.date}</span>
                    </div>

                    <div className="inline-flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-vwa-accent" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <Link
                      href={`/evenements/${event.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-vwa-dark/10 bg-white px-4 py-2 text-[11px] font-medium text-vwa-dark/80 shadow-sm transition hover:border-vwa-primary/30 hover:text-vwa-primary"
                    >
                      Voir la fiche
                    </Link>

                    <Link
                      href={`/mediatheque?event=${event.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-vwa-dark px-4 py-2 text-[11px] font-semibold text-vwa-background shadow-sm transition hover:bg-black"
                    >
                      <PhotoIcon className="h-4 w-4" />
                      Médiathèque
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}