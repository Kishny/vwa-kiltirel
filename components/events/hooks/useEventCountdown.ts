"use client";

import { useEffect, useMemo, useState } from "react";

type Countdown = {
  expired: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(targetDate: string): Countdown {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (Number.isNaN(target) || diff <= 0) {
    return {
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    expired: false,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function useEventCountdown(startDate?: string) {
  const initial = useMemo<Countdown>(() => {
    if (!startDate) {
      return {
        expired: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return getCountdown(startDate);
  }, [startDate]);

  const [countdown, setCountdown] = useState<Countdown>(initial);

  useEffect(() => {
    if (!startDate) return;

    const interval = window.setInterval(() => {
      setCountdown(getCountdown(startDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [startDate]);

  return countdown;
}