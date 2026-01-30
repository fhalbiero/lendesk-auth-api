import { FastifyInstance } from "fastify";
import { UserService } from "@/services/user.service";
import { CreateUserDto } from "@/dto/user.dto";

export async function usersRoutes(app: FastifyInstance, deps: { userService: UserService }) {

    app.post("/v1/users", async (request, reply) => {
        const { username, password } = request.body as CreateUserDto;

        const user = await deps.userService.createUser({ username, password });

        return reply.status(201).send(user);
    });

}
