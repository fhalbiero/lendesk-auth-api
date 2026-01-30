import { Type } from "@sinclair/typebox";

export const AuthBodySchema = Type.Object({
  username: Type.String({ 
    minLength: 3, 
    maxLength: 30,
    description: "Username to authenticate"
  }),
  password: Type.String({ 
    minLength: 1, 
    maxLength: 128,
    description: "Password for authentication"
  }),
}, { 
  additionalProperties: false,
  description: "Authentication credentials"
});

export const AuthResponseSchema = Type.Object({
  ok: Type.Boolean({
    description: "Authentication success indicator"
  }),
}, {
  description: "Successful authentication response"
});

export const ErrorResponseSchema = Type.Object({
  error: Type.Object({
    code: Type.String({
      description: "Error code identifier"
    }),
    message: Type.String({
      description: "Human-readable error message"
    }),
  }),
}, {
  description: "Error response"
});
