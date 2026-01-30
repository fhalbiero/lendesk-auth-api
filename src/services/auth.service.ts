import argon2 from "argon2";
import { normalizeUsername } from "@/utils/username";
import { UserRepository } from "@/repositories/user.repo";
import { InvalidCredentialsError, ValidationError } from "@/errors/domain.error";
import { AuthResponseDto, LoginDto } from "@/dto/auth.dto";

export class AuthService {
    constructor(private readonly repo: UserRepository) {}

    async authenticate(input: LoginDto): Promise<AuthResponseDto> {    
        if (!input.username || !input.password) {
            throw new ValidationError();
        }

        const usernameNormalized = normalizeUsername(input.username);

        const userId = await this.repo.getUserIdByUsername(usernameNormalized);
        if (!userId) throw new InvalidCredentialsError();

        const hash = await this.repo.getPasswordHash(userId);
        if (!hash) throw new InvalidCredentialsError();

        const ok = await argon2.verify(hash, input.password);
        if (!ok) throw new InvalidCredentialsError();

        return { ok: true };
    }
}
