import { describe, it, expect } from "vitest";
import { validatePassword } from "@/services/password-policy";

describe("Validate Password", () => {
  it("should accept a strong password (3/4 categories)", () => {
    const result = validatePassword("StrongPassword123!");
    expect(result.ok).toBe(true);
  });

  it("should reject if less than 12 chars", () => {
    const result = validatePassword("Abc123!");
    expect(result.ok).toBe(false);
  });

  it("should reject if it does not meet 3/4 categories", () => {
    // só lowercase + numbers = 2 categorias
    const result = validatePassword("password12345");
    expect(result.ok).toBe(false);
  });

  it("should reject if has leading or trailing spaces", () => {
    const result = validatePassword(" StrongPassword123!");
    expect(result.ok).toBe(false);
  });
});
