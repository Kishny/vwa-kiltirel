import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { events } from "@/data/events";
import EventInscriptionForm from "@/components/forms/EventInscriptionForm";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Ticket,
  Sparkles,
  Shield,
  Mail,
  ArrowLeft,
  Heart,
  Info,
  CheckCircle,
} from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export default async function EventInscriptionPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const isPaid = Boolean(
    event.price &&
      !event.price.toLowerCase().includes("gratuit") &&
      !event.price.toLowerCase().includes("libre")
  );

  return (
    <>
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Navigation retour */}
        <div className="mb-8">
          <Link
            href="/evenements"
            className="group inline-flex items-center gap-2 text-sm font-medium text-vwa-dark/60 transition-colors hover:text-vwa-dark"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour aux événements
          </Link>
        </div>

        {/* Header premium */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-3">
            <div className="h-px w-6 bg-gradient-to-r from-transparent to-vwa-accent/60" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-vwa-accent/80 sm:text-[11px]">
              Inscription
            </span>
            <div className="h-px w-6 bg-gradient-to-l from-transparent to-vwa-accent/60" />
          </div>

          <h1 className="mb-3 text-2xl font-bold text-vwa-dark sm:text-3xl lg:text-4xl">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            {event.category && (
              <span className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium text-vwa-dark/70">
                {event.category}
              </span>
            )}
            {event.tag && (
              <span className="rounded-full bg-vwa-accent/10 px-3 py-1 text-[11px] font-medium text-vwa-accent">
                {event.tag}
              </span>
            )}
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Colonne gauche - Formulaire */}
          <div>
            <div className="rounded-2xl border border-vwa-dark/8 bg-white/90 p-6 shadow-xl backdrop-blur-sm md:p-8">
              <div className="mb-6 flex items-center gap-3 border-b border-vwa-dark/8 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark">
                  <Ticket className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-vwa-dark">
                    Formulaire d&apos;inscription
                  </h2>
                  <p className="text-xs text-vwa-dark/50">
                    Remplissez vos informations pour réserver votre place
                  </p>
                </div>
              </div>

              <EventInscriptionForm event={event} isPaid={isPaid} />
            </div>
          </div>

          {/* Colonne droite - Informations */}
          <div className="space-y-6">
            {/* Carte résumé événement */}
            <div className="rounded-2xl bg-gradient-to-br from-vwa-dark to-vwa-dark/95 p-6 text-white shadow-xl">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-vwa-accent" />
                Récapitulatif
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
                  <div>
                    <p className="text-xs text-white/70">Date</p>
                    <p className="text-sm font-medium">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
                  <div>
                    <p className="text-xs text-white/70">Horaire</p>
                    <p className="text-sm font-medium">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
                  <div>
                    <p className="text-xs text-white/70">Lieu</p>
                    <p className="text-sm font-medium">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
                  <div>
                    <p className="text-xs text-white/70">Places</p>
                    <p className="text-sm font-medium">Places limitées</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-white/20 pt-2">
                  <Ticket className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
                  <div>
                    <p className="text-xs text-white/70">Tarif</p>
                    <p className="text-xl font-bold">{event.price}</p>
                  </div>
                </div>
              </div>

              {isPaid && (
                <div className="mt-4 border-t border-white/20 pt-3">
                  <p className="flex items-center gap-1 text-[10px] text-white/60">
                    <Shield className="h-3 w-3" />
                    Paiement sécurisé
                  </p>
                </div>
              )}
            </div>

            {/* À savoir */}
            <div className="rounded-2xl border border-vwa-dark/8 bg-white/90 p-6 shadow-md backdrop-blur-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-vwa-dark">
                <Info className="h-4 w-4 text-vwa-accent" />
                À savoir
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-xs text-vwa-dark/70">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-vwa-accent" />
                  Inscription nominative
                </li>
                <li className="flex items-start gap-2 text-xs text-vwa-dark/70">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-vwa-accent" />
                  Prévenir 48h avant en cas d&apos;annulation
                </li>
                <li className="flex items-start gap-2 text-xs text-vwa-dark/70">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-vwa-accent" />
                  Email de confirmation envoyé après inscription
                </li>
                <li className="flex items-start gap-2 text-xs text-vwa-dark/70">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-vwa-accent" />
                  QR code possible à l&apos;entrée
                </li>
              </ul>
            </div>

            {/* Besoin d'aide */}
            <div className="rounded-2xl border border-vwa-accent/20 bg-vwa-accent/5 p-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-vwa-dark">
                <Mail className="h-4 w-4 text-vwa-accent" />
                Besoin d&apos;aide ?
              </h3>
              <p className="mb-3 text-xs text-vwa-dark/70">
                Une question sur votre inscription ? Contactez-nous
              </p>
              <a
                href="mailto:vwakiltirel.asso@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-vwa-primary transition-colors hover:text-vwa-dark"
              >
                vwakiltirel.asso@gmail.com
                <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
              </a>
            </div>

            {/* Citation */}
            {event.shortDescription && (
              <div className="rounded-2xl border border-vwa-dark/8 bg-white/90 p-6 backdrop-blur-sm">
                <Heart className="mb-3 h-4 w-4 text-vwa-accent" />
                <p className="text-xs italic leading-relaxed text-vwa-dark/60">
                  &ldquo;{event.shortDescription}&rdquo;
                </p>
                {event.reservationNote && (
                  <p className="mt-3 border-t border-vwa-dark/8 pt-2 text-[10px] text-vwa-dark/40">
                    ℹ️ {event.reservationNote}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Esprit Vwa Kiltirèl */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-4 py-2">
            <Sparkles className="h-4 w-4 text-vwa-accent" />
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-vwa-dark/50">
              Esprit Vwa Kiltirèl
            </span>
          </div>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-vwa-dark/60">
            Un moment chaleureux, humain et culturel pour connecter les
            générations et faire vibrer nos racines.
          </p>
        </div>
      </main>
    </>
  );
}
