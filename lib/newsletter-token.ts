import crypto from "crypto";

const rawSecret =
  process.env.NEWSLETTER_UNSUBSCRIBE_SECRET || process.env.ADMIN_SESSION_SECRET;

if (!rawSecret) {
  throw new Error(
    "NEWSLETTER_UNSUBSCRIBE_SECRET est manquant dans les variables d’environnement."
  );
}

const NEWSLETTER_UNSUBSCRIBE_SECRET: string = rawSecret;

function base64UrlEncode(value: string) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(normalized + padding, "base64").toString("utf8");
}

type UnsubscribePayload = {
  email: string;
  exp: number;
};

export function generateUnsubscribeToken(email: string, expiresInDays = 30) {
  const payload: UnsubscribePayload = {
    email: email.trim().toLowerCase(),
    exp: Date.now() + expiresInDays * 24 * 60 * 60 * 1000,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  const signature = crypto
    .createHmac("sha256", NEWSLETTER_UNSUBSCRIBE_SECRET)
    .update(encodedPayload)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  return `${encodedPayload}.${signature}`;
}

export function verifyUnsubscribeToken(token: string) {
  try {
    const [encodedPayload, signature] = token.split(".");

    if (!encodedPayload || !signature) {
      return { valid: false as const, reason: "invalid_format" };
    }

    const expectedSignature = crypto
      .createHmac("sha256", NEWSLETTER_UNSUBSCRIBE_SECRET)
      .update(encodedPayload)
      .digest("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");

    const provided = Buffer.from(signature);
    const expected = Buffer.from(expectedSignature);

    if (
      provided.length !== expected.length ||
      !crypto.timingSafeEqual(provided, expected)
    ) {
      return { valid: false as const, reason: "invalid_signature" };
    }

    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as UnsubscribePayload;

    if (!payload.email || !payload.exp) {
      return { valid: false as const, reason: "invalid_payload" };
    }

    if (Date.now() > payload.exp) {
      return { valid: false as const, reason: "expired" };
    }

    return {
      valid: true as const,
      payload,
    };
  } catch {
    return { valid: false as const, reason: "invalid_token" };
  }
}