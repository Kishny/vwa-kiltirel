type AttemptRecord = {
    count: number;
    firstAttemptAt: number;
    blockedUntil?: number;
  };
  
  const attempts = new Map<string, AttemptRecord>();
  
  const WINDOW_MS = 15 * 60 * 1000;
  const MAX_ATTEMPTS = 5;
  const BLOCK_MS = 15 * 60 * 1000;
  
  function now() {
    return Date.now();
  }
  
  export function getClientKey(ip: string | null, email?: string) {
    return `${ip || "unknown"}:${email || "no-email"}`;
  }
  
  export function checkAdminRateLimit(key: string) {
    const record = attempts.get(key);
    const current = now();
  
    if (!record) {
      return {
        allowed: true,
        remaining: MAX_ATTEMPTS,
        retryAfterMs: 0,
      };
    }
  
    if (record.blockedUntil && current < record.blockedUntil) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterMs: record.blockedUntil - current,
      };
    }
  
    if (current - record.firstAttemptAt > WINDOW_MS) {
      attempts.delete(key);
      return {
        allowed: true,
        remaining: MAX_ATTEMPTS,
        retryAfterMs: 0,
      };
    }
  
    return {
      allowed: true,
      remaining: Math.max(0, MAX_ATTEMPTS - record.count),
      retryAfterMs: 0,
    };
  }
  
  export function recordAdminFailure(key: string) {
    const current = now();
    const record = attempts.get(key);
  
    if (!record || current - record.firstAttemptAt > WINDOW_MS) {
      attempts.set(key, {
        count: 1,
        firstAttemptAt: current,
      });
      return;
    }
  
    record.count += 1;
  
    if (record.count >= MAX_ATTEMPTS) {
      record.blockedUntil = current + BLOCK_MS;
    }
  
    attempts.set(key, record);
  }
  
  export function clearAdminFailures(key: string) {
    attempts.delete(key);
  }