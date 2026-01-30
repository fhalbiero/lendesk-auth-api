import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";

export async function registerSwagger(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "Auth API",
        description: "Internal authentication API",
        version: "1.0.0",
      },
      tags: [
        { name: "Users", description: "User creation" },
        { name: "Auth", description: "Authentication" },
      ],
    },
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });
}
