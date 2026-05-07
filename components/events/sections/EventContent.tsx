"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Info,
  Sparkles,
  Users,
  CheckCircle2,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import type { Event } from "@/data/events";
import { EventGallery } from "@/components/events/gallery/EventGallery";
import type { MediaItem } from "@/data/media";

type Props = {
  event: Event;
  isUpcoming: boolean;
  highlights: string[];
  audiencePoints: string[];
  eventGallery: MediaItem[];
  reservationHref: string;
  reservationLabel: string;
  hasPayment: boolean;
  onOpenLightbox: (index: number) => void;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const sectionTransition = { duration: 0.4, ease: "easeOut" as const };

export function EventContent({
  event,
  isUpcoming,
  highlights,
  audiencePoints,
  eventGallery,
  reservationHref,
  reservationLabel,
  hasPayment,
  onOpenLightbox,
}: Props) {
  return (
    <div className="space-y-8">
      {event.description && (
        <motion.section
          aria-labelledby="section-about"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={sectionTransition}
          className="rounded-2xl border border-vwa-dark/8 bg-white/90 p-6 shadow-md backdrop-blur-sm md:p-8"
        >
          <h2
            id="section-about"
            className="mb-5 flex items-center gap-2 text-xl font-bold text-vwa-dark"
          >
            <Info className="h-5 w-5 text-vwa-accent" aria-hidden="true" />
            À propos de cet événement
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-vwa-dark/70 sm:text-[15px]">
            {event.description.split("\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </motion.section>
      )}

      {highlights.length > 0 && (
        <motion.section
          aria-labelledby="section-highlights"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...sectionTransition, delay: 0.05 }}
          className="rounded-2xl border border-vwa-dark/8 bg-white/90 p-6 shadow-md backdrop-blur-sm md:p-8"
        >
          <h2
            id="section-highlights"
            className="mb-5 flex items-center gap-2 text-xl font-bold text-vwa-dark"
          >
            <Sparkles className="h-5 w-5 text-vwa-accent" aria-hidden="true" />
            Ce qui vous attend
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-vwa-dark/8 bg-vwa-background/40 p-4"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-vwa-dark/70">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {audiencePoints.length > 0 && (
        <motion.section
          aria-labelledby="section-audience"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...sectionTransition, delay: 0.1 }}
          className="rounded-2xl border border-vwa-dark/8 bg-white/90 p-6 shadow-md backdrop-blur-sm md:p-8"
        >
          <h2
            id="section-audience"
            className="mb-5 flex items-center gap-2 text-xl font-bold text-vwa-dark"
          >
            <Users className="h-5 w-5 text-vwa-accent" aria-hidden="true" />
            Cet événement est fait pour vous si…
          </h2>

          <div className="space-y-3">
            {audiencePoints.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <BadgeCheck
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-primary"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-vwa-dark/70">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {eventGallery.length > 0 && (
        <EventGallery
          eventTitle={event.title}
          images={eventGallery}
          onOpenLightbox={onOpenLightbox}
        />
      )}

      {isUpcoming && (
        <motion.section
          aria-label="Appel à l'action"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...sectionTransition, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-vwa-dark to-vwa-primary p-6 text-white shadow-xl md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(199,140,59,0.35),transparent_35%)]" />

          <div className="relative">
            <h2 className="mb-3 text-xl font-bold sm:text-2xl">
              Envie de vivre ce moment avec nous ?
            </h2>

            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              Réservez dès maintenant votre place et rejoignez une expérience
              culturelle pensée pour transmettre, relier et créer du lien dans
              une ambiance chaleureuse.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={reservationHref}
                target={hasPayment ? "_blank" : undefined}
                rel={hasPayment ? "noreferrer noopener" : undefined}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-vwa-dark shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                {reservationLabel}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/evenements"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                Voir les autres événements
              </Link>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}