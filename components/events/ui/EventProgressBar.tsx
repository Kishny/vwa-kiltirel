"use client";

export function EventProgressBar({ progress }: { progress: number }) {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-50 h-[2px] bg-gradient-to-r from-vwa-accent to-vwa-primary transition-none"
      style={{ width: `${progress * 100}%` }}
    />
  );
}