import { useEffect, useState } from "react";

export function usePulse(intervalMs = 4000, pulseDurationMs = 1000) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), pulseDurationMs);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs, pulseDurationMs]);

  return pulse;
}