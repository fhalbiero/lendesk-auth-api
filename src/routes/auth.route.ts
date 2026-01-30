import { FastifyInstance } from "fastify";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "@/dto/auth.dto";

export async function authRoutes(app: FastifyInstance, deps: { authService: AuthService }) {

    app.post("/v1/auth", {
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
