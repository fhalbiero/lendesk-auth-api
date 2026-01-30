import Fastify, { FastifyInstance } from 'fastify';

import { getRedis, closeRedis } from './db/redis';
import { registerRateLimit } from './plugins/rate-limit';
import { UserRepository } from './repositories/user.repo';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { usersRoutes } from './routes/user.route';
import { authRoutes } from './routes/auth.route';
import { sendError } from './errors/api.error';
import { DomainError } from './errors/domain.error';

export function buildApp(): FastifyInstance {
    const app = Fastify({
        logger: false,
        ajv: {
            customOptions: {
                allErrors: true,
                removeAdditional: "all",
                useDefaults: true,
                coerceTypes: false,
            }
        }
    });

    registerRateLimit(app);

    const redis = getRedis();
    const userRepo = new UserRepository(redis);
    const userService = new UserService(userRepo);
    const authService = new AuthService(userRepo);

    app.setErrorHandler((error, request, reply) => {
        if (error instanceof DomainError) {
            switch (error.code) {
                case "VALIDATION_ERROR":
                    return sendError(reply, 400, error.code, error.message);
                case "USERNAME_TAKEN":
                    return sendError(reply, 409, error.code, error.message);
                case "INVALID_CREDENTIALS":
                    return sendError(reply, 401, error.code, error.message);
                default:
                    return sendError(reply, 500, "INTERNAL_ERROR");
            }
        }

        request.log?.error?.(error);
        return sendError(reply, 500, "INTERNAL_ERROR");
    });

    usersRoutes(app, { userService });
    authRoutes(app, { authService });

    app.addHook("onClose", async () => {
        await closeRedis();
    });

    return app;
}