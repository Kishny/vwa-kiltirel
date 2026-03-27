// app/evenements/[slug]/inscription/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { events } from "@/data/events";
import EventInscriptionForm from "@/components/forms/EventInscriptionForm";
import {
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  CurrencyEuroIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export default async function EventInscriptionPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const safeEvent = event!;

  const isPaid = Boolean(
    safeEvent.price &&
      !safeEvent.price.toLowerCase().includes("gratuit") &&
      !safeEvent.price.toLowerCase().includes("libre")
  );

  return (
    <main className="relative max-w-5xl mx-auto px-4 py-10">
      {/* Retour */}
      <div className="mb-6">
        <Link
          href="/evenements"
          className="inline-flex items-center gap-2 text-xs font-medium text-vwa-dark/70 hover:text-vwa-dark transition"
        >
          ← Retour aux événements
        </Link>
      </div>

      {/* Background premium */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/40 to-vwa-background" />
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/20 blur-3xl opacity-60 animate-pulse" />
      </div>

      {/* HEADER */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-vwa-dark/60">
            <SparklesIcon className="h-3 w-3 text-vwa-accent" />
            Inscription
          </p>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
            {safeEvent.title}
          </h1>

          <div className="flex flex-wrap gap-2 text-xs">
            {safeEvent.category && (
              <span className="rounded-full bg-vwa-dark/5 px-3 py-1">
                {safeEvent.category}
              </span>
            )}
            {safeEvent.tag && (
              <span className="rounded-full bg-vwa-accent/10 px-3 py-1 text-vwa-accent">
                {safeEvent.tag}
              </span>
            )}
          </div>
        </div>

        {/* Card résumé */}
        <aside className="w-full sm:w-72">
          <div className="rounded-3xl border border-vwa-background/80 bg-white/90 p-4 shadow-lg">
            <div className="flex justify-between text-xs text-vwa-dark/70">
              <span className="flex items-center gap-1">
                <CalendarDaysIcon className="h-4 w-4" />
                {safeEvent.date}
              </span>
              <span>{safeEvent.time}</span>
            </div>

            <div className="mt-3 flex gap-2 text-xs text-vwa-dark/75">
              <MapPinIcon className="h-4 w-4 text-vwa-accent" />
              <span>{safeEvent.location}</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-full bg-vwa-dark/5 px-2 py-1 text-xs">
                <UsersIcon className="h-3 w-3" />
                Places limitées
              </span>

              <span className="flex items-center gap-1 text-xs font-semibold text-vwa-primary">
                <CurrencyEuroIcon className="h-3 w-3" />
                {safeEvent.price}
              </span>
            </div>
          </div>
        </aside>
      </header>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* FORMULAIRE */}
        <EventInscriptionForm event={safeEvent} isPaid={isPaid} />

        {/* INFOS DROITE */}
        <section className="space-y-4">
          <div className="rounded-3xl border border-vwa-background/80 bg-white/90 p-4 shadow-lg">
            <h2 className="mb-2 text-sm font-semibold text-vwa-dark">
              À savoir
            </h2>

            <ul className="list-disc list-inside space-y-1.5 text-xs text-vwa-dark/75">
              <li>Inscription nominative</li>
              <li>Prévenir 48h avant en cas d’annulation</li>
              <li>Email de confirmation envoyé après inscription</li>
              <li>QR code possible à l’entrée</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-vwa-dark p-4 text-white shadow-xl">
            <p className="text-xs uppercase tracking-[0.18em] opacity-70">
              Esprit Vwa Kiltirèl
            </p>

            <p className="mt-2 text-sm">
              Un moment chaleureux, humain et culturel pour connecter les
              générations et faire vibrer nos racines.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
