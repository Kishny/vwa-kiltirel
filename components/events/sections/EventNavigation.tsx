"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Event } from "@/data/events";

type Props = {
  prevEvent: Event | null;
  nextEvent: Event | null;
};

export function EventNavigation({ prevEvent, nextEvent }: Props) {
  if (!prevEvent && !nextEvent) return null;

  return (
    <nav aria-label="Navigation entre les événements" className="mt-12 border-t border-vwa-dark/8 pt-8">
      <h3 className="mb-4 text-center text-sm font-semibold text-vwa-dark">D&apos;autres événements</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {prevEvent && (
          <Link
            href={`/evenements/${prevEvent.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-vwa-dark/8 bg-white/80 p-4 transition-all duration-300 hover:bg-white hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 text-vwa-accent transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-wide text-vwa-dark/50">Précédent</p>
              <p className="line-clamp-1 text-sm font-medium text-vwa-dark">{prevEvent.title}</p>
            </div>
          </Link>
        )}
        {nextEvent && (
          <Link
            href={`/evenements/${nextEvent.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-vwa-dark/8 bg-white/80 p-4 transition-all duration-300 hover:bg-white hover:shadow-md"
          >
            <div className="flex-1 text-right">
              <p className="text-[10px] uppercase tracking-wide text-vwa-dark/50">Suivant</p>
              <p className="line-clamp-1 text-sm font-medium text-vwa-dark">{nextEvent.title}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-vwa-accent transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        )}
      </div>
    </nav>
  );
}