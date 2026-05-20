"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import type { Event } from "@/data/events";
import { categoryIcons } from "../constants/categoryIcons"; // ✅ FIX PATH

type Props = {
  event: Event;
  isUpcoming: boolean;
  reservationHref: string;
  reservationLabel: string;
  hasPayment: boolean;
  pulse: boolean;
};

export function EventHero({
  event,
  isUpcoming,
  reservationHref,
  reservationLabel,
  hasPayment,
  pulse,
}: Props) {
  return (
    <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-white/20 shadow-[0_30px_80px_-35px_rgba(59,38,29,0.45)]">
      <div className="relative h-[60vh] min-h-[420px] max-h-[720px]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 1280px) calc(100vw - 2rem), 1280px"
          className="object-cover object-top"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

        {/* BADGES */}
        <div className="absolute top-0 left-0 right-0 flex flex-wrap gap-2 p-5">
          <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase bg-vwa-accent text-white">
            {isUpcoming ? "À venir" : "Souvenir"}
          </span>

          {event.category && (
            <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm">
              {categoryIcons[event.category] ?? (
                <Sparkles className="h-4 w-4" />
              )}
              {event.category}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-bold text-white mb-3">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-3 text-white/80 text-sm mb-4">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {event.date}
            </span>

            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {event.time}
            </span>

            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.location}
            </span>
          </div>

          <motion.div
            animate={pulse ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={reservationHref}
              target={hasPayment ? "_blank" : undefined}
              rel={hasPayment ? "noreferrer noopener" : undefined}
              className="inline-flex items-center gap-2 bg-vwa-accent text-white px-6 py-3 rounded-full font-bold"
            >
              {reservationLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}