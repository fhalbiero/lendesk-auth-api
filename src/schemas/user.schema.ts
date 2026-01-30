import { Type } from "@sinclair/typebox";

export const CreateUserBodySchema = Type.Object({
  username: Type.String({
    minLength: 3,
    maxLength: 128,
    description: "Unique username for the account"
  }),
  password: Type.String({
    minLength: 8,
    maxLength: 128,
    description: "Strong password meeting security requirements"
  }),
}, { 
  additionalProperties: false,
  description: "User creation payload"
});

export const UserResponseSchema = Type.Object({
  id: Type.String({ 
    format: "uuid",
    description: "Unique user identifier" 
  }),
  username: Type.String({
    description: "Username of the created user"
  }),
}, {
  description: "Successful user creation response"
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
