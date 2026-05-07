"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getUpcomingEvents } from "@/lib/events";
import ProchainEvenementCard from "./ProchainEvenementCard";

const AUTO_PLAY_DELAY = 8000;
const SWIPE_THRESHOLD = 50;

export default function NextEventsCarousel() {
  const events = useMemo(() => getUpcomingEvents(), []);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const safeCurrent = current >= events.length ? 0 : current;
  const event = events[safeCurrent];

  useEffect(() => {
    if (events.length <= 1 || isPaused) return;

    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(id);
  }, [events.length, isPaused]);

  if (!events.length) {
    return (
      <section aria-labelledby="next-events-title" className="mt-4">
        <div className="mb-3 flex items-center justify-between">
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
            className="inline-flex items-center gap-1 text-xs font-medium text-vwa-primary transition hover:text-vwa-dark"
          >
            Tout voir
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="rounded-2xl border border-vwa-dark/8 bg-white/90 px-6 py-8 text-center shadow-lg">
          <p className="text-sm text-vwa-dark/70">
            Aucun événement à venir pour le moment. De belles choses se
            préparent en coulisses…
          </p>
        </div>
      </section>
    );
  }

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + events.length) % events.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % events.length);
  };

  return (
    <section
      aria-labelledby="next-events-title"
      className="mt-4 space-y-4 md:group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="mb-2 inline-flex items-center gap-2">
            <div className="h-px w-6 bg-gradient-to-r from-transparent to-vwa-accent/60" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-vwa-accent/70">
              À ne pas manquer
            </span>
            <div className="h-px w-6 bg-gradient-to-l from-transparent to-vwa-accent/60" />
          </div>

          <h2
            id="next-events-title"
            className="text-xl font-bold text-vwa-dark"
          >
            Prochains événements
          </h2>

          <p className="mt-0.5 text-xs text-vwa-dark/55">
            Les rendez-vous qui vous attendent
          </p>
        </div>

        <Link
          href="/evenements"
          className="group inline-flex items-center gap-1 text-xs font-medium text-vwa-primary transition hover:text-vwa-dark"
        >
          Tout voir
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={event.slug}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) {
                goNext();
              } else if (info.offset.x > SWIPE_THRESHOLD) {
                goPrev();
              }
              setIsPaused(false);
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="touch-pan-y cursor-grab active:cursor-grabbing"
          >
            <ProchainEvenementCard event={event} priority />
          </motion.div>
        </AnimatePresence>

        {events.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-vwa-dark/70 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-vwa-primary md:opacity-0 md:group-hover:opacity-100"
              aria-label="Événement précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-vwa-dark/70 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-vwa-primary md:opacity-0 md:group-hover:opacity-100"
              aria-label="Événement suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {events.length > 1 && (
        <div className="space-y-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-vwa-dark/10">
            <motion.div
              key={`${event.slug}-${isPaused ? "paused" : "running"}`}
              className="h-full rounded-full bg-gradient-to-r from-vwa-accent to-vwa-primary"
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "100%" : "100%" }}
              transition={{
                duration: isPaused ? 0 : AUTO_PLAY_DELAY / 1000,
                ease: "linear",
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            {events.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === safeCurrent
                    ? "w-6 bg-vwa-primary"
                    : "w-1.5 bg-vwa-dark/20 hover:bg-vwa-dark/40"
                }`}
                aria-label={`Afficher l'événement ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

