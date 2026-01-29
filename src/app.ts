import Fastify, { FastifyInstance } from 'fastify';
import { getRedis, closeRedis } from './db/redis';
import { randomUUID } from 'crypto';

function normalizeUsername(username: string): string {
    return username.trim().toLowerCase();
}

export function buildApp(): FastifyInstance {
    const app = Fastify({
        logger: false,
        ajv: {
            customOptions: {
                allErrors: true,
                removeAdditional: "all",
                useDefaults: true,
                coerceTypes: false,
            },
        }
    });

    const redis = getRedis();

    app.post('/v1/users', async (request, reply) => {
        const { username, password } = request.body as { username?: string; password?: string; }

        if (!username || !password) {
            return reply.status(400).send({
                error: { code: "VALIDATION_ERROR", message: "Invalid request" },
            });
        }

        const usernameNormalized = normalizeUsername(username);
        const userId = randomUUID();
        const usernameKey = `user:unique-username:${usernameNormalized}`;

        const response = await redis.set(usernameKey, userId, "NX");

        if (response !== "OK") {
            return reply.status(409).send({
                error: {
                    code: "USERNAME_TAKEN",
                    message: "Username is already in use",
                },
            });
        }

        await redis.hset(`user:${userId}`, {
            id: userId,
            username,
            username_normalized: usernameNormalized,
            created_at: new Date().toISOString(),
        });

        return reply.status(201).send({
            id: userId,
            username: username.trim()
        });
    });

    app.addHook("onClose", async () => {
        await closeRedis();
    });

    return app;
}