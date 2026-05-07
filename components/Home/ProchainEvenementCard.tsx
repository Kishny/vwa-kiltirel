"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  Sparkles,
} from "lucide-react";
import type { Event } from "@/lib/events";

type ProchainEvenementCardProps = {
  event: Event;
  showRegisterButton?: boolean;
  priority?: boolean;
  className?: string;
};

const BlinkingButton = ({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`transition-all duration-200 ${
        isVisible ? "scale-100 opacity-100" : "scale-[0.98] opacity-80"
      }`}
    >
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
      >
        <Sparkles className="h-4 w-4" />
        {children}
      </Link>
    </div>
  );
};

export default function ProchainEvenementCard({
  event,
  showRegisterButton = true,
  priority = false,
  className = "",
}: ProchainEvenementCardProps) {
  const isFree = useMemo(() => {
    const price = event.price?.toLowerCase() ?? "";
    return price.includes("gratuit") || price.includes("entrée libre");
  }, [event.price]);

  const registerHref = event.paymentUrl || `/evenements/${event.slug}/inscription`;
  const registerLabel = event.paymentUrl
    ? "Je réserve"
    : isFree
      ? "Je réserve"
      : "Je m'inscris";

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-vwa-dark/8 bg-white/90 shadow-xl transition-all duration-500 hover:shadow-2xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-0 h-36 w-36 rounded-full bg-vwa-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-vwa-primary/8 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
        <div className="relative z-10 flex flex-col justify-between p-6 md:p-8">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-vwa-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-vwa-accent">
                {event.subtitle ?? "Événement à venir"}
              </span>

              <span className="rounded-full border border-vwa-accent/20 bg-vwa-accent/5 px-3 py-1 text-[10px] font-medium text-vwa-accent">
                {event.tag}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-vwa-dark transition-colors group-hover:text-vwa-primary md:text-2xl">
                {event.title}
              </h3>

              <p className="text-sm leading-relaxed text-vwa-dark/70">
                {event.shortDescription}
              </p>
            </div>

            <div className="space-y-2 border-t border-vwa-dark/8 pt-2">
              <div className="flex flex-wrap items-center gap-4 text-sm text-vwa-dark/65">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-vwa-accent" />
                  {event.date}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-vwa-accent" />
                  {event.time}
                </span>

                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-vwa-accent" />
                  {event.location}
                </span>
              </div>

              {event.price && (
                <div className="flex items-center gap-1.5 text-sm">
                  <Ticket className="h-4 w-4 text-vwa-accent" />
                  <span className="font-semibold text-vwa-dark">
                    {event.price}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {showRegisterButton && (
              <BlinkingButton
                href={registerHref}
                external={Boolean(event.paymentUrl)}
              >
                {registerLabel}
              </BlinkingButton>
            )}

            <Link
              href={`/evenements/${event.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-vwa-dark/15 bg-white px-5 py-2.5 text-sm font-medium text-vwa-dark/80 shadow-sm transition-all duration-300 hover:border-vwa-primary/40 hover:bg-vwa-primary/5 hover:text-vwa-primary"
            >
              Voir la fiche
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[280px] overflow-hidden bg-vwa-dark/5 md:min-h-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 768px) 40vw, 100vw"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-black/10" />
          <div className="absolute bottom-4 right-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm">
            Vwa Kiltirèl
          </div>
        </div>
      </div>
    </article>
  );
}