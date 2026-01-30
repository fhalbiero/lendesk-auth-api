import { errorMessages, type ApiErrorCode } from "./api.error";

export class DomainError extends Error {
  constructor(public code: ApiErrorCode, message?: string) {
    super(message || errorMessages[code]);
    this.name = "DomainError";
  }
}

export class ValidationError extends DomainError {
  constructor(message?: string) {
    super("VALIDATION_ERROR", message);
    this.name = "ValidationError";
  }
}

export class UsernameTakenError extends DomainError {
  constructor(message?: string) {
    super("USERNAME_TAKEN", message);
    this.name = "UsernameTakenError";
  }
}

export class InvalidCredentialsError extends DomainError {
  constructor(message?: string) {
    super("INVALID_CREDENTIALS", message);
    this.name = "InvalidCredentialsError";
  }
}
