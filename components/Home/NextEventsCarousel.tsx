// components/Home/NextEventsCarousel.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { getUpcomingEvents } from "@/lib/events";

const AUTO_PLAY_DELAY = 8000;

type UpcomingEvent = (ReturnType<typeof getUpcomingEvents>[number]) & {
  price?: string;
};

export default function NextEventsCarousel() {
  const events = useMemo<UpcomingEvent[]>(
    () => getUpcomingEvents() as UpcomingEvent[],
    []
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (events.length <= 1) return;

    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(id);
  }, [events.length]);

  if (!events.length) {
    return (
      <section aria-labelledby="next-events-title" className="mt-4">
        <div className="mb-3 flex items-center justify-between">
          <h2
            id="next-events-title"
            className="text-lg font-semibold text-vwa-dark"
          >
            Prochains événements
          </h2>
          <Link
            href="/evenements"
            className="text-xs font-medium text-vwa-primary transition hover:text-vwa-blueSoft"
          >
            Tout voir
          </Link>
        </div>

        <div className="rounded-3xl border border-vwa-background/80 bg-white/90 px-5 py-6 shadow-[0_18px_55px_rgba(71,41,24,0.10)]">
          <p className="text-sm text-vwa-dark/75">
            Aucun événement à venir pour le moment. De belles choses se
            préparent en coulisses…
          </p>
        </div>
      </section>
    );
  }

  const event = events[current];

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + events.length) % events.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % events.length);
  };

  return (
    <section aria-labelledby="next-events-title" className="mt-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2
            id="next-events-title"
            className="text-lg font-semibold text-vwa-dark"
          >
            Prochains événements
          </h2>
          <p className="mt-0.5 text-[11px] text-vwa-dark/55">
            Les prochains rendez-vous à ne pas manquer
          </p>
        </div>

        <Link
          href="/evenements"
          className="inline-flex items-center gap-1 text-xs font-medium text-vwa-primary transition hover:text-vwa-blueSoft"
        >
          Tout voir
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>

      <article className="group relative overflow-hidden rounded-[1.75rem] border border-vwa-background/80 bg-white/95 shadow-[0_20px_60px_rgba(71,41,24,0.14)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-0 h-36 w-36 rounded-full bg-vwa-accent/15 blur-3xl opacity-70" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-vwa-primary/10 blur-3xl opacity-70" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.95fr]">
          <div className="relative z-10 flex flex-col justify-between p-5 sm:p-6 md:p-7">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-vwa-dark/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                  {event.subtitle ?? "Événement à venir"}
                </span>

                {event.category && (
                  <span className="inline-flex items-center rounded-full border border-vwa-accent/35 bg-vwa-accent/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-vwa-accent">
                    {event.category}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="max-w-xl text-lg font-extrabold leading-snug text-vwa-dark sm:text-xl">
                  {event.title}
                </h3>

                <p className="max-w-xl text-sm leading-relaxed text-vwa-dark/72">
                  {event.shortDescription}
                </p>
              </div>

              <dl className="grid gap-2 text-xs text-vwa-dark/75">
                <div className="flex items-center gap-2">
                  <span className="text-[13px]">📅</span>
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[13px]">⏰</span>
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[13px]">📍</span>
                  <span>{event.location}</span>
                </div>

                {event.price ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[13px]">🎟️</span>
                    <span>{event.price}</span>
                  </div>
                ) : null}
              </dl>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/evenements/${event.slug}/inscription`}
                  className="group/cta inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-[0_14px_30px_rgba(71,41,24,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(71,41,24,0.36)] active:scale-[0.98] sm:text-sm [background:linear-gradient(135deg,theme(colors.vwa.terracotta),theme(colors.vwa.accent))]"
                >
                  <span>Je m&apos;inscris</span>
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                </Link>

                <Link
                  href={`/evenements/${event.slug}`}
                  className="inline-flex items-center justify-center rounded-full border border-vwa-dark/10 bg-white px-4 py-2 text-xs font-medium text-vwa-dark/80 shadow-sm transition-all duration-200 hover:border-vwa-primary/25 hover:text-vwa-primary sm:text-sm"
                >
                  Voir la fiche
                </Link>
              </div>

              <div className="self-start sm:self-auto">
                {events.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-vwa-background bg-white text-vwa-dark/70 shadow-sm transition hover:border-vwa-dark/20 hover:text-vwa-dark"
                      aria-label="Événement précédent"
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-vwa-background bg-white text-vwa-dark/70 shadow-sm transition hover:border-vwa-dark/20 hover:text-vwa-dark"
                      aria-label="Événement suivant"
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {events.length > 1 && (
              <div className="mt-4 flex items-center gap-2">
                {events.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === current
                        ? "w-6 bg-vwa-primary"
                        : "w-2 bg-vwa-dark/20 hover:bg-vwa-dark/40"
                    }`}
                    aria-label={`Afficher l’événement ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="relative min-h-[240px] overflow-hidden bg-vwa-background md:min-h-full">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(min-width: 768px) 45vw, 100vw"
              priority
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-black/10" />

            <div className="absolute bottom-4 right-4 rounded-full bg-black/45 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
              Vwa Kiltirèl
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}


