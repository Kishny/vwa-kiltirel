import { describe, it, expect } from "vitest";
import { isValidEmail } from "@/lib/validators/email";

describe("isValidEmail", () => {
  it("accepte les emails valides", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("prenom.nom@domaine.fr")).toBe(true);
    expect(isValidEmail("user+tag@sub.domain.org")).toBe(true);
  });

  it("rejette les emails sans @", () => {
    expect(isValidEmail("userexample.com")).toBe(false);
  });

  it("rejette les emails sans domaine", () => {
    expect(isValidEmail("user@")).toBe(false);
  });

  it("rejette les emails sans extension", () => {
    expect(isValidEmail("user@domain")).toBe(false);
  });

  it("rejette les chaînes vides", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("rejette les emails avec espaces", () => {
    expect(isValidEmail("user @example.com")).toBe(false);
    expect(isValidEmail("user@ example.com")).toBe(false);
  });
});
