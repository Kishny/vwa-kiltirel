import { describe, it, expect } from "vitest";
import { generateUnsubscribeToken, verifyUnsubscribeToken } from "@/lib/newsletter-token";

describe("newsletter unsubscribe token", () => {
  it("génère et vérifie un token valide", () => {
    const token = generateUnsubscribeToken("user@example.com");
    expect(token).toBeTruthy();

    const result = verifyUnsubscribeToken(token);
    expect(result.valid).toBe(true);
  });

  it("le payload contient le bon email", () => {
    const token = generateUnsubscribeToken("user@example.com");
    const result = verifyUnsubscribeToken(token);

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.payload.email).toBe("user@example.com");
    }
  });

  it("rejette un token vide", () => {
    const result = verifyUnsubscribeToken("");
    expect(result.valid).toBe(false);
  });

  it("rejette un token avec signature altérée", () => {
    const token = generateUnsubscribeToken("user@example.com");
    const tampered = token.slice(0, -5) + "XXXXX";
    const result = verifyUnsubscribeToken(tampered);
    expect(result.valid).toBe(false);
  });

  it("rejette un token malformé (sans point)", () => {
    const result = verifyUnsubscribeToken("notavalidtoken");
    expect(result.valid).toBe(false);
  });
});
