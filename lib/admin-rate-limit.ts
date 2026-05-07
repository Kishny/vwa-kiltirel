import { connectToDatabase } from "@/lib/mongodb";
import RateLimit from "@/models/RateLimit";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const BLOCK_MS = 15 * 60 * 1000;

export function getClientKey(ip: string | null, email?: string) {
  return `admin:${ip || "unknown"}:${email || "no-email"}`;
}

export async function checkAdminRateLimit(key: string) {
  await connectToDatabase();

  const record = await RateLimit.findOne({ key }).lean();
  const now = Date.now();

  if (!record) {
    return { allowed: true, remaining: MAX_ATTEMPTS, retryAfterMs: 0 };
  }

  if (record.blockedUntil && new Date(record.blockedUntil).getTime() > now) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: new Date(record.blockedUntil).getTime() - now,
    };
  }

  if (now - new Date(record.firstAttemptAt).getTime() > WINDOW_MS) {
    await RateLimit.deleteOne({ key });
    return { allowed: true, remaining: MAX_ATTEMPTS, retryAfterMs: 0 };
  }

  return {
    allowed: true,
    remaining: Math.max(0, MAX_ATTEMPTS - record.count),
    retryAfterMs: 0,
  };
}

export async function recordAdminFailure(key: string) {
  await connectToDatabase();

  const now = new Date();
  const expiresAt = new Date(now.getTime() + WINDOW_MS + BLOCK_MS);

  const record = await RateLimit.findOne({ key }).lean();

  if (!record || now.getTime() - new Date(record.firstAttemptAt).getTime() > WINDOW_MS) {
    await RateLimit.findOneAndUpdate(
      { key },
      { count: 1, firstAttemptAt: now, blockedUntil: null, expiresAt },
      { upsert: true, new: true }
    );
    return;
  }

  const newCount = record.count + 1;
  const blockedUntil = newCount >= MAX_ATTEMPTS ? new Date(now.getTime() + BLOCK_MS) : null;

  await RateLimit.updateOne(
    { key },
    { $set: { count: newCount, blockedUntil, expiresAt } }
  );
}

export async function clearAdminFailures(key: string) {
  await connectToDatabase();
  await RateLimit.deleteOne({ key });
}
