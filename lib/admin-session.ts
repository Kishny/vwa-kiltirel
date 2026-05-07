const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

if (!SESSION_SECRET) {
  throw new Error("ADMIN_SESSION_SECRET manquant dans .env.local");
}

type SessionPayload = {
  email: string;
  role: "admin";
  exp: number;
};

const encoder = new TextEncoder();

function toBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

async function getHmacKey() {
  return globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(SESSION_SECRET!),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signAdminSession(
  email: string,
  expiresInSeconds = 60 * 60 * 8
) {
  const payload: SessionPayload = {
    email,
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };

  const encoded = toBase64Url(JSON.stringify(payload));
  const key = await getHmacKey();
  const sig = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(encoded)
  );
  const signature = Buffer.from(sig).toString("base64url");
  return `${encoded}.${signature}`;
}

export async function verifyAdminSession(token: string | undefined | null) {
  if (!token) return null;

  try {
    const lastDot = token.lastIndexOf(".");
    if (lastDot === -1) return null;

    const encoded = token.slice(0, lastDot);
    const signature = token.slice(lastDot + 1);

    const key = await getHmacKey();
    const sigBytes = Buffer.from(signature, "base64url");
    const valid = await globalThis.crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      encoder.encode(encoded)
    );

    if (!valid) return null;

    const payload = JSON.parse(fromBase64Url(encoded)) as SessionPayload;

    if (!payload?.email || payload.role !== "admin") return null;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}
