// lib/events.ts

import {
  events as rawEvents,
  isEventPast,
  getEventDate,
} from "@/data/events";
import type { Event as RawEvent } from "@/data/events";

export type EventCategory = "atelier" | "soiree" | "brunch" | "plein-air";

export type Event = {
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  date: string;
  time: string;
  location: string;
  tag?: string;
  shortDescription?: string;
  longDescription?: string;
  image: string;
  paymentUrl?: string;
  price?: string;
};



// ==================== ADAPTATION DATA ====================
function mapEvent(e: RawEvent): Event {
  return {
    slug: e.slug,
    title: e.title,
    subtitle: e.tag,
    category: e.category,
    date: e.date,
    time: e.time,
    location: e.location,
    tag: e.tag,
    shortDescription: e.shortDescription,
    longDescription: e.description,
    image: e.image,
    paymentUrl: e.paymentUrl,
    price: e.price,
  };
}



// ==================== GETTERS ====================
export function getUpcomingEvents(): Event[] {
  return rawEvents
    .filter((event) => !isEventPast(event))
    .sort((a, b) => {
      const dateA = getEventDate(a);
      const dateB = getEventDate(b);

      if (!dateA) return 1;
      if (!dateB) return -1;

      return dateA.getTime() - dateB.getTime();
    })
    .map(mapEvent);
}



export function getPastEvents(): Event[] {
  return rawEvents
    .filter((event) => isEventPast(event))
    .sort((a, b) => {
      const dateA = getEventDate(a);
      const dateB = getEventDate(b);

      if (!dateA) return 1;
      if (!dateB) return -1;

      return dateB.getTime() - dateA.getTime();
    })
    .map(mapEvent);
}



export function getEventBySlug(slug: string): Event | undefined {
  const found = rawEvents.find((e) => e.slug === slug);
  return found ? mapEvent(found) : undefined;
}



export function isUpcomingEvent(event: Event): boolean {
  const original = rawEvents.find((e) => e.slug === event.slug);
  if (!original) return false;

  return !isEventPast(original);
}
