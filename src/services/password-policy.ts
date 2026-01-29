type PasswordValidationResult = { ok: true } | { ok: false; reason: string };

export function validatePassword(password: string): PasswordValidationResult {
    
  if (typeof password !== "string") {
    return { ok: false, reason: "not_string" };
  }

  if (password.trim() !== password) {
    return { ok: false, reason: "leading_or_trailing_spaces" };
  }

  if (password.length < 8) {
    return { ok: false, reason: "too_short" };
  }

  if (password.length > 128) {
    return { ok: false, reason: "too_long" };
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const score = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

  if (score < 3) {
    return { ok: false, reason: "weak" };
  }

  return { ok: true };
}
