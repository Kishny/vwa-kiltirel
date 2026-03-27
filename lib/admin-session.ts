import crypto from "crypto";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

if (!SESSION_SECRET) {
  throw new Error("ADMIN_SESSION_SECRET manquant dans .env.local");
}

type SessionPayload = {
  email: string;
  role: "admin";
  exp: number;
};

function toBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

export function signAdminSession(
  email: string,
  expiresInSeconds = 60 * 60 * 8
) {
  const payload: SessionPayload = {
    email,
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET as string)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSession(token: string | undefined | null) {
  if (!token) return null;

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) return null;

  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET as string)
    .update(encodedPayload)
    .digest("base64url");

  if (signature !== expectedSignature) return null;

  const payload = JSON.parse(fromBase64Url(encodedPayload)) as SessionPayload;

  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}