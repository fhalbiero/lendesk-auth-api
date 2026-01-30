import { FastifyInstance } from "fastify";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "@/dto/auth.dto";
import { AuthBodySchema, AuthResponseSchema, ErrorResponseSchema } from "@/schemas/auth.schema";

export async function authRoutes(app: FastifyInstance, deps: { authService: AuthService }) {

    app.post("/v1/auth", {
        schema: {
            tags: ["Auth"],
            summary: "Authenticate user",
            description: "Authenticates a user with username and password. Rate limited to 5 requests per minute.",
            body: AuthBodySchema,
            response: {
                200: AuthResponseSchema,
                401: ErrorResponseSchema,
            },
        },
        config: {
            rateLimit: {
                max: 5,    
                timeWindow: '1 minute' 
            }
        }
    }, async (request, reply) => {
        const { username, password } = request.body as LoginDto;

        const result = await deps.authService.authenticate({ username, password });

        return reply.status(200).send(result);
    });
}
