"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Event } from "@/data/events";

type Props = {
  event: Event;
  reservationHref: string;
  reservationLabel: string;
  hasPayment: boolean;
  pulse: boolean;
};

export function EventStickyCTA({ event, reservationHref, reservationLabel, hasPayment, pulse }: Props) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/20 bg-vwa-dark/95 p-3 backdrop-blur-xl md:hidden"
      role="region"
      aria-label="Réservation rapide"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="truncate text-xs font-semibold text-white">{event.title}</p>
          <p className="text-[10px] text-white/60">
            {event.date} • {event.location}
          </p>
        </div>
        <motion.div
          animate={pulse ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Link
            href={reservationHref}
            target={hasPayment ? "_blank" : undefined}
            rel={hasPayment ? "noreferrer noopener" : undefined}
            aria-label={`${reservationLabel} – ${event.title}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vwa-accent to-vwa-primary px-5 py-2 text-sm font-bold text-white shadow-lg"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {reservationLabel}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}