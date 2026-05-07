"use client";

import { useState, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { Event } from "@/data/events";
import { isEventPast } from "@/data/events";
import { mediaByEvent } from "@/data/media";

import { useScrollProgress } from "./hooks/useScrollProgress";
import { useStickyCTA } from "./hooks/useStickyCTA";
import { usePulse } from "./hooks/usePulse";
import { generateIcsEvent } from "./utils/generateIcsEvent";

import { EventProgressBar } from "./ui/EventProgressBar";
import { EventStickyCTA } from "./ui/EventStickyCTA";
import { EventToast } from "./ui/EventToast";

import { EventHero } from "./sections/EventHero";
import { EventContent } from "./sections/EventContent";
import { EventSidebar } from "./sections/EventSidebar";
import { EventNavigation } from "./sections/EventNavigation";
import { EventQuote } from "./sections/EventQuote";

import { EventLightbox } from "./gallery/EventLightbox";

type Props = {
  event: Event;
  allEvents: Event[];
  remainingPlaces?: number | null;
};

export default function EventDetailClient({
  event,
  allEvents,
  remainingPlaces = null,
}: Props) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const readProgress = useScrollProgress();
  const showStickyCta = useStickyCTA();
  const pulse = usePulse();

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const pageUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${pathname}`;
  }, [pathname]);

  const eventIndex = allEvents.findIndex((e) => e.slug === event.slug);
  const prevEvent = eventIndex > 0 ? allEvents[eventIndex - 1] : null;
  const nextEvent =
    eventIndex < allEvents.length - 1 ? allEvents[eventIndex + 1] : null;

  const isUpcoming = !isEventPast(event);
  const eventGallery = mediaByEvent[event.slug] ?? [];

  const highlights =
    event.highlights && event.highlights.length > 0
      ? event.highlights
      : [
          "Un moment culturel fort porté par Vwa Kiltirèl",
          "Une expérience pensée pour le partage et la transmission",
          "Un cadre chaleureux et humain",
          "Une atmosphère fidèle à l'esprit de l'association",
        ];

  const audiencePoints =
    event.audiencePoints && event.audiencePoints.length > 0
      ? event.audiencePoints
      : [
          "Vous aimez les expériences humaines et culturelles",
          "Vous souhaitez découvrir l'univers de Vwa Kiltirèl",
          "Vous recherchez un moment de partage ancré dans la transmission",
        ];

  const isFree =
    event.price?.toLowerCase().includes("gratuit") ||
    event.price?.toLowerCase().includes("entrée libre");

  const hasPayment = Boolean(event.paymentUrl);

  const reservationHref = hasPayment
    ? event.paymentUrl!
    : `/evenements/${event.slug}/inscription`;

  const reservationLabel = hasPayment
    ? "Réserver et payer"
    : isFree
      ? "Réserver gratuitement"
      : "Je m'inscris";

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);

    window.setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  }, []);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      showToast("Lien copié dans le presse-papiers");
    } catch (err) {
      console.error("Erreur de copie :", err);
      showToast("Impossible de copier le lien");
    }
  }, [pageUrl, showToast]);

  const handleAddToCalendar = useCallback(() => {
    const icsContent = generateIcsEvent(event);

    if (!icsContent) {
      showToast("Impossible de générer le fichier calendrier");
      return;
    }

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${event.slug}.ics`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    showToast("Événement ajouté à votre calendrier");
  }, [event, showToast]);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    if (!eventGallery.length) return;
    setLightboxIndex((i) => (i + 1) % eventGallery.length);
  }, [eventGallery.length]);

  const prevImage = useCallback(() => {
    if (!eventGallery.length) return;
    setLightboxIndex((i) => (i - 1 + eventGallery.length) % eventGallery.length);
  }, [eventGallery.length]);

  return (
    <>
      <EventProgressBar progress={readProgress} />

      {!shouldReduceMotion && (
        <div
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="relative h-[800px] w-[800px] opacity-[0.03] sm:opacity-[0.04] md:opacity-[0.05]"
            >
              <Image
                src="/images/Logo.png"
                alt=""
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="relative h-[500px] w-[500px] opacity-[0.02] sm:opacity-[0.03]"
            >
              <Image
                src="/images/Logo.png"
                alt=""
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>
      )}

      <main
        id="main-content"
        className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="mb-8">
          <Link
            href="/evenements"
            className="group inline-flex items-center gap-2 text-sm font-medium text-vwa-dark/60 transition-colors hover:text-vwa-dark"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour aux événements
          </Link>
        </div>

        <EventHero
          event={event}
          isUpcoming={isUpcoming}
          reservationHref={reservationHref}
          reservationLabel={reservationLabel}
          hasPayment={hasPayment}
          pulse={pulse}
        />

        <div className="grid gap-10 lg:grid-cols-[1.8fr_0.95fr]">
          <EventContent
            event={event}
            isUpcoming={isUpcoming}
            highlights={highlights}
            audiencePoints={audiencePoints}
            eventGallery={eventGallery}
            reservationHref={reservationHref}
            reservationLabel={reservationLabel}
            hasPayment={hasPayment}
            onOpenLightbox={openLightbox}
          />

          <EventSidebar
            event={event}
            isUpcoming={isUpcoming}
            remainingPlaces={remainingPlaces}
            reservationHref={reservationHref}
            reservationLabel={reservationLabel}
            hasPayment={hasPayment}
            pageUrl={pageUrl}
            onCopyLink={copyLink}
            onAddToCalendar={handleAddToCalendar}
          />
        </div>

        <EventNavigation prevEvent={prevEvent} nextEvent={nextEvent} />
        <EventQuote />
      </main>

      <EventLightbox
        open={lightboxOpen}
        images={eventGallery}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        eventTitle={event.title}
      />

      {isUpcoming && showStickyCta && (
        <EventStickyCTA
          event={event}
          reservationHref={reservationHref}
          reservationLabel={reservationLabel}
          hasPayment={hasPayment}
          pulse={pulse}
        />
      )}

      <EventToast visible={toastVisible} message={toastMessage} />
    </>
  );
}