import { describe, it, expect } from "vitest";
import { signAdminSession, verifyAdminSession } from "@/lib/admin-session";

describe("signAdminSession / verifyAdminSession", () => {
  it("génère un token vérifiable", async () => {
    const token = await signAdminSession("admin@example.com");
    expect(token).toBeTruthy();
    expect(token.split(".")).toHaveLength(2);
  });

  it("retourne le payload correct", async () => {
    const token = await signAdminSession("admin@example.com");
    const payload = await verifyAdminSession(token);

    expect(payload).not.toBeNull();
    expect(payload?.email).toBe("admin@example.com");
    expect(payload?.role).toBe("admin");
    expect(payload?.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it("rejette un token forgé", async () => {
    const token = await signAdminSession("admin@example.com");
    const tampered = token.slice(0, -5) + "XXXXX";
    expect(await verifyAdminSession(tampered)).toBeNull();
  });

  it("rejette null, undefined, chaîne vide", async () => {
    expect(await verifyAdminSession(null)).toBeNull();
    expect(await verifyAdminSession(undefined)).toBeNull();
    expect(await verifyAdminSession("")).toBeNull();
  });

  it("rejette un token expiré", async () => {
    const token = await signAdminSession("admin@example.com", -1);
    expect(await verifyAdminSession(token)).toBeNull();
  });

  it("rejette un payload sans signature", async () => {
    const fakePayload = Buffer.from(
      JSON.stringify({ email: "hack@example.com", role: "admin", exp: 9999999999 })
    ).toString("base64url");
    expect(await verifyAdminSession(fakePayload)).toBeNull();
  });
});
