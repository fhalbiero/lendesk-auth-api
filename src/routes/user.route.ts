import { FastifyInstance } from "fastify";
import { UserService } from "@/services/user.service";
import { CreateUserDto } from "@/dto/user.dto";
import { CreateUserBodySchema, UserResponseSchema, ErrorResponseSchema } from "@/schemas/user.schema";

export async function usersRoutes(app: FastifyInstance, deps: { userService: UserService }) {

    app.post("/v1/users", {
        schema: {
            tags: ["Users"],
            summary: "Create a new user",
            description: "Creates a new user account with unique username and strong password",
            body: CreateUserBodySchema,
            response: {
                201: UserResponseSchema,
                400: ErrorResponseSchema,
                409: ErrorResponseSchema,
            },
        }
    }, async (request, reply) => {
        const { username, password } = request.body as CreateUserDto;

        const user = await deps.userService.createUser({ username, password });

        return reply.status(201).send(user);
    });

}
