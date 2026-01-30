import { FastifyReply } from "fastify";

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "USERNAME_TAKEN"
  | "INVALID_CREDENTIALS"
  | "INTERNAL_ERROR";

export const errorMessages: Record<ApiErrorCode, string> = {
  VALIDATION_ERROR: "Invalid request",
  USERNAME_TAKEN: "Username is already in use",
  INVALID_CREDENTIALS: "Invalid username or password",
  INTERNAL_ERROR: "Internal server error",
};

export function sendError(
  reply: FastifyReply,
  statusCode: number,
  code: ApiErrorCode,
  message: string = errorMessages[code]
) {
  return reply.status(statusCode).send({
    error: { code, message },
  });
}
