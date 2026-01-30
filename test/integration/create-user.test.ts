import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import { buildApp } from '../../src/app';
import Redis from "ioredis";
import { ApiErrorCode, errorMessages } from '@/errors/api.error';

describe('Create Users (POST /v1/users)', async () => {
    const app = await buildApp();
    const redis = new Redis(`${process.env.REDIS_HOST || "redis://localhost"}:${process.env.REDIS_PORT || "6379"}`);

    beforeAll(async () => {
        await app.ready();
    });

    beforeEach(async () => {
        await redis.flushdb();
    })

    afterAll(async () => {
        await redis.quit()
        await app.close();
    });

    it('should create a user successfully', async () => {
        const response = await request(app.server)
        .post('/v1/users')
        .send({
            username: 'fabio',
            password: '@StrongPassword123!'
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('username', 'fabio');
    });

    it('should not allow duplicate usernames (case-insensitive)', async () => {
        // First creation
        const firstResponse = await request(app.server)
            .post('/v1/users')
            .send({
                username: 'fabio albiero',
                password: '@StrongPassword123!'
            });

        expect(firstResponse.status).toBe(201);

        // Second creation with different casing and spaces
        const secondResponse = await request(app.server)
            .post('/v1/users')
            .send({
                username: '  FABIO ALBIERO  ',
                password: '@AnotherStrongPass123!'
            });

        expect(secondResponse.status).toBe(409);
        expect(secondResponse.body).toEqual({
            error: {
                code: "USERNAME_TAKEN" as ApiErrorCode,
                message: errorMessages.USERNAME_TAKEN,
            }
        });
    });

    it('should return 400 when username is missing', async () => {
        const response = await request(app.server)
            .post('/v1/users')
            .send({
                password: 'StrongPassword123!'
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: {
                code: 'VALIDATION_ERROR' as ApiErrorCode,
                message: errorMessages.VALIDATION_ERROR
            }
        });
    });

    it('should return 400 when password is missing', async () => {
        const response = await request(app.server)
            .post('/v1/users')
            .send({
                username: 'fabio'
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: {
                code: 'VALIDATION_ERROR' as ApiErrorCode,
                message: errorMessages.VALIDATION_ERROR
            }
        });
    });

    it("should return 400 when password is weak", async () => {
        const response = await request(app.server)
            .post("/v1/users")
            .send({
                username: "fabio",
                password: "password12345" // weak password: lowercase + numbers
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: { 
                code: "VALIDATION_ERROR" as ApiErrorCode, 
                message: errorMessages.VALIDATION_ERROR
            }
        });
    });


});
