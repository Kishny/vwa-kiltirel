"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CalendarDays,
  Camera,
  Download,
  Heart,
  MapPin,
  Share,
  Share2,
  Shield,
  Sparkles,
  Ticket,
} from "lucide-react";

import type { Event } from "@/data/events";
import { getShareUrls } from "../utils/share";

type Props = {
  event: Event;
  isUpcoming: boolean;
  remainingPlaces: number | null;
  reservationHref: string;
  reservationLabel: string;
  hasPayment: boolean;
  pageUrl: string;
  onCopyLink: () => void;
  onAddToCalendar: () => void;

  /**
   * Capacité max réelle de l'événement.
   * À passer depuis tes données si tu veux une vraie progress bar.
   */
  maxPlaces?: number | null;

  /**
   * URL websocket ex:
   * ws://localhost:5000
   * wss://api.tonsite.fr
   */
  socketUrl?: string | null;
};

type CountdownState = {
  expired: boolean;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type ReservationSocketMessage =
  | {
      type: "reservation:update";
      slug: string;
      remainingPlaces: number;
      maxPlaces?: number;
    }
  | {
      type: "reservation:init";
      slug: string;
      remainingPlaces: number;
      maxPlaces?: number;
    };

function parseFrenchEventDate(dateStr: string, timeStr: string): Date | null {
  const months: Record<string, number> = {
    janvier: 0,
    février: 1,
    mars: 2,
    avril: 3,
    mai: 4,
    juin: 5,
    juillet: 6,
    août: 7,
    septembre: 8,
    octobre: 9,
    novembre: 10,
    décembre: 11,
  };

  const cleanDate = dateStr.trim().toLowerCase();
  const parts = cleanDate.split(/\s+/);

  if (parts.length < 4) return null;

  const day = Number(parts[1]);
  const month = months[parts[2] ?? ""];
  const year = Number(parts[3]);

  if (Number.isNaN(day) || Number.isNaN(year) || month === undefined) {
    return null;
  }

  let hours = 12;
  let minutes = 0;

  const startTime = timeStr.split("–")[0]?.trim() ?? timeStr;
  const match = startTime.match(/(\d{1,2})\s*h?\s*(\d{0,2})/i);

  if (match) {
    hours = Number(match[1]);
    minutes = match[2] ? Number(match[2]) : 0;
  }

  return new Date(year, month, day, hours, minutes);
}

// ==================== FONCTIONS DE DATE / PASSÉ ====================
function isPastEvent(dateStr: string, timeStr: string): boolean {
  const eventDate = parseFrenchEventDate(dateStr, timeStr);
  if (!eventDate) return false;
  return eventDate.getTime() < Date.now();
}

/**
 * Vérifie si un événement est passé en se basant sur ses propriétés date et time.
 * Cette fonction est un wrapper pratique pour isPastEvent.
 */
function isEventPast(event: Event): boolean {
  return isPastEvent(event.date, event.time);
}
// ================================================================

function getCountdown(targetDate: Date | null): CountdownState {
  if (!targetDate) {
    return {
      expired: true,
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) {
    return {
      expired: true,
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return {
    expired: false,
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function FlipUnit({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-vwa-dark/8 bg-white/95 p-3 shadow-sm">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="origin-center text-center"
        >
          <p className="text-lg font-bold text-vwa-dark sm:text-xl">{value}</p>
        </motion.div>
      </AnimatePresence>
      <p className="mt-1 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-vwa-dark/45">
        {label}
      </p>
    </div>
  );
}

export function EventSidebar({
  event,
  isUpcoming,
  remainingPlaces,
  reservationHref,
  reservationLabel,
  hasPayment,
  pageUrl,
  onCopyLink,
  onAddToCalendar,
  maxPlaces = null,
  socketUrl = null,
}: Props) {
  const shareUrls = getShareUrls(pageUrl, event.title);

  const [liveRemainingPlaces, setLiveRemainingPlaces] = useState<number | null>(
    remainingPlaces
  );
  const [liveMaxPlaces, setLiveMaxPlaces] = useState<number | null>(maxPlaces);

  const eventStartDate = useMemo(
    () => parseFrenchEventDate(event.date, event.time),
    [event.date, event.time]
  );

  const [countdown, setCountdown] = useState<CountdownState>(() =>
    getCountdown(eventStartDate)
  );

  useEffect(() => {
    setLiveRemainingPlaces(remainingPlaces);
  }, [remainingPlaces]);

  useEffect(() => {
    setLiveMaxPlaces(maxPlaces);
  }, [maxPlaces]);

  useEffect(() => {
    setCountdown(getCountdown(eventStartDate));

    if (!eventStartDate) return;

    const interval = window.setInterval(() => {
      setCountdown(getCountdown(eventStartDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [eventStartDate]);

  useEffect(() => {
    if (!socketUrl || !isUpcoming) return;

    let socket: WebSocket | null = null;

    try {
      socket = new WebSocket(socketUrl);

      socket.onopen = () => {
        socket?.send(
          JSON.stringify({
            type: "reservation:subscribe",
            slug: event.slug,
          })
        );
      };

      socket.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data) as ReservationSocketMessage;

          if (data.slug !== event.slug) return;

          if (
            data.type === "reservation:update" ||
            data.type === "reservation:init"
          ) {
            if (typeof data.remainingPlaces === "number") {
              setLiveRemainingPlaces(data.remainingPlaces);
            }

            if (typeof data.maxPlaces === "number") {
              setLiveMaxPlaces(data.maxPlaces);
            }
          }
        } catch (error) {
          console.error("WebSocket message parse error:", error);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("WebSocket connection error:", error);
    }

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "reservation:unsubscribe",
            slug: event.slug,
          })
        );
      }
      socket?.close();
    };
  }, [socketUrl, isUpcoming, event.slug]);

  const isSoldOut =
    typeof liveRemainingPlaces === "number" && liveRemainingPlaces <= 0;

  const isLowStock =
    typeof liveRemainingPlaces === "number" &&
    liveRemainingPlaces > 0 &&
    liveRemainingPlaces <= 10;

  const fillPercent =
    typeof liveMaxPlaces === "number" &&
    liveMaxPlaces > 0 &&
    typeof liveRemainingPlaces === "number"
      ? Math.min(
          100,
          Math.max(
            0,
            ((liveMaxPlaces - liveRemainingPlaces) / liveMaxPlaces) * 100
          )
        )
      : null;

  return (
    <aside
      id="infos-pratiques"
      aria-label="Informations pratiques"
      className="space-y-6 lg:sticky lg:top-24"
    >
      <div className="rounded-2xl bg-gradient-to-br from-vwa-dark to-vwa-dark/95 p-6 text-white shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Ticket className="h-4 w-4 text-vwa-accent" />
            Informations pratiques
          </h3>

          {isUpcoming && isSoldOut && (
            <span className="rounded-full bg-red-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-red-200 ring-1 ring-red-300/20">
              Complet
            </span>
          )}
        </div>

        <dl className="space-y-5">
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
            <div>
              <dt className="text-xs text-white/70">Date</dt>
              <dd className="text-sm font-medium">{event.date}</dd>
              <dd className="text-xs text-white/50">{event.time}</dd>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
            <div>
              <dt className="text-xs text-white/70">Lieu</dt>
              <dd className="text-sm font-medium">{event.location}</dd>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Ticket className="mt-0.5 h-4 w-4 flex-shrink-0 text-vwa-accent" />
            <div>
              <dt className="text-xs text-white/70">Tarif</dt>
              <dd className="text-xl font-bold">{event.price}</dd>
            </div>
          </div>
        </dl>

        {isUpcoming && typeof liveRemainingPlaces === "number" && (
          <motion.div
            animate={
              isLowStock && !isSoldOut
                ? { scale: [1, 1.015, 1], opacity: [1, 0.92, 1] }
                : {}
            }
            transition={{
              duration: 1.8,
              repeat: isLowStock && !isSoldOut ? Infinity : 0,
            }}
            className={`mt-5 rounded-2xl border p-4 ${
              isSoldOut
                ? "border-red-400/20 bg-red-500/10"
                : isLowStock
                  ? "border-vwa-accent/30 bg-vwa-accent/10"
                  : "border-white/10 bg-white/8"
            }`}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-vwa-accent">
                  {isSoldOut ? "Statut" : "Places restantes"}
                </p>
                <p className="text-2xl font-bold">
                  {isSoldOut ? "0" : liveRemainingPlaces}
                </p>
              </div>

              {isLowStock && !isSoldOut && (
                <span className="rounded-full bg-vwa-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-lg">
                  Dernières places
                </span>
              )}
            </div>

            {typeof fillPercent === "number" && (
              <div className="space-y-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fillPercent}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full rounded-full ${
                      isSoldOut
                        ? "bg-red-400"
                        : isLowStock
                          ? "bg-gradient-to-r from-vwa-accent to-orange-400"
                          : "bg-gradient-to-r from-vwa-primary to-vwa-accent"
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-white/55">
                  <span>Remplissage</span>
                  <span>{Math.round(fillPercent)}%</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {event.reservationNote && (
          <div className="mt-5 rounded-xl bg-white/8 p-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-vwa-accent">
              Réservation
            </p>
            <p className="text-xs leading-relaxed text-white/75">
              {event.reservationNote}
            </p>
          </div>
        )}

        {event.ticketNote && (
          <div className="mt-5 rounded-xl bg-white/8 p-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-vwa-accent">
              Billet
            </p>
            <p className="text-xs leading-relaxed text-white/75">
              {event.ticketNote}
            </p>
          </div>
        )}

        {event.paymentNote && (
          <div className="mt-5 rounded-xl bg-white/8 p-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-vwa-accent">
              Paiement
            </p>
            <p className="text-xs leading-relaxed text-white/75">
              {event.paymentNote}
            </p>
          </div>
        )}

        {isUpcoming ? (
          <div className="mt-6 border-t border-white/20 pt-5">
            <Link
              href={reservationHref}
              target={hasPayment ? "_blank" : undefined}
              rel={hasPayment ? "noreferrer noopener" : undefined}
              className={`group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 ${
                isSoldOut
                  ? "pointer-events-none cursor-not-allowed bg-white/10 text-white/50 shadow-none"
                  : "bg-gradient-to-r from-vwa-accent to-vwa-primary hover:-translate-y-0.5 hover:shadow-xl"
              }`}
              aria-disabled={isSoldOut}
            >
              <Sparkles className="h-4 w-4" />
              {isSoldOut ? "Complet" : reservationLabel}
              {!isSoldOut && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Link>

            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-white/55">
              <Shield className="h-3.5 w-3.5" />
              <span>
                {isSoldOut
                  ? "Réservations closes"
                  : hasPayment
                    ? "Paiement sécurisé"
                    : "Confirmation par email"}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-6 border-t border-white/20 pt-5">
            <Link
              href={`/mediatheque?event=${event.slug}`}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
            >
              <Camera className="h-4 w-4" />
              Voir les souvenirs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>

      {isUpcoming && eventStartDate && !countdown.expired && !isSoldOut && (
        <div className="rounded-2xl border border-vwa-dark/8 bg-white/90 p-5 shadow-md backdrop-blur-sm">
          <h3 className="mb-4 text-sm font-semibold text-vwa-dark">
            Début dans
          </h3>

          <div className="grid grid-cols-4 gap-2 text-center">
            <FlipUnit value={countdown.days} label="Jours" />
            <FlipUnit value={countdown.hours} label="Heures" />
            <FlipUnit value={countdown.minutes} label="Min" />
            <FlipUnit value={countdown.seconds} label="Sec" />
          </div>
        </div>
      )}

      {isUpcoming && (
        <div className="rounded-2xl border border-vwa-accent/25 bg-gradient-to-br from-vwa-accent/5 to-vwa-primary/5 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-vwa-accent/15">
              <AlertCircle className="h-4 w-4 text-vwa-accent" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-vwa-dark">
                {isSoldOut ? "Événement complet" : "Places limitées"}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-vwa-dark/65">
                {isSoldOut
                  ? "Toutes les places disponibles ont été réservées. Restez connecté pour les prochains événements."
                  : "La jauge est volontairement restreinte pour préserver la qualité des échanges et le confort de chacun."}
              </p>
              {!isSoldOut && event.reservationNote && (
                <p className="mt-2 text-[11px] font-medium text-vwa-accent">
                  {event.reservationNote}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {isUpcoming && (
        <div className="rounded-2xl border border-vwa-dark/8 bg-white/90 p-5 shadow-md backdrop-blur-sm">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-vwa-dark">
            <Calendar className="h-4 w-4 text-vwa-accent" />
            Ajouter à mon agenda
          </h3>

          <button
            onClick={onAddToCalendar}
            aria-label="Télécharger le fichier ICS pour ajouter l'événement à votre agenda"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-vwa-dark/10 bg-white px-4 py-2 text-xs font-medium text-vwa-dark/70 transition hover:border-vwa-primary/30 hover:text-vwa-primary"
          >
            <Download className="h-3.5 w-3.5" />
            Télécharger (.ics)
          </button>
        </div>
      )}

      <div className="rounded-2xl border border-vwa-dark/8 bg-white/90 p-5 shadow-md backdrop-blur-sm">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-vwa-dark">
          <Share2 className="h-4 w-4 text-vwa-accent" />
          Partager
        </h3>

        <button
          onClick={onCopyLink}
          className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-vwa-dark/10 bg-white px-4 py-2 text-xs font-medium text-vwa-dark/70 transition hover:border-vwa-primary/30 hover:text-vwa-primary"
        >
          <Share className="h-3.5 w-3.5" />
          Copier le lien
        </button>

        <div className="flex flex-wrap gap-2">
          <a
            href={shareUrls.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-600"
          >
            WhatsApp
          </a>
          <a
            href={shareUrls.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
          >
            Facebook
          </a>
          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gray-800"
          >
            X
          </a>
          <a
            href={shareUrls.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-blue-700 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-800"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-vwa-accent/5 to-vwa-primary/5 p-5">
        <Heart className="mb-2 h-5 w-5 text-vwa-accent" />
        <p className="text-xs leading-relaxed text-vwa-dark/60">
          Un moment pour vibrer, partager et transmettre.
        </p>
      </div>
    </aside>
  );
}  