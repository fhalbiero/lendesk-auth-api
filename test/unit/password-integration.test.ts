import { describe, it, expect } from "vitest";
import { validatePassword } from "@/services/password-policy";

// Password policy:
// - password must be at least 8 characters
// - lowercase letters
// - uppercase letters
// - numbers
// - symbols

describe("Validate Password", () => {
  it("should accept a strong password (4/4 categories)", () => {
    const result = validatePassword("StrongPassword123!");
    expect(result.ok).toBe(true);
  });

  it("should reject if less than 8 chars", () => {
    const result = validatePassword("Abc123!");
    expect(result.ok).toBe(false);
  });

  it("should reject if it does not meet 4/4 categories", () => {
    const result = validatePassword("password12345");
    expect(result.ok).toBe(false);
  });

  it("should reject if has leading or trailing spaces", () => {
    const result = validatePassword(" StrongPassword123!");
    expect(result.ok).toBe(false);
  });
});
