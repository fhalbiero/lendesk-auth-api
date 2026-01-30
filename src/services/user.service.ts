import { randomUUID } from "crypto";
import argon2 from "argon2";

import { validatePassword } from "./password-policy";
import { normalizeUsername } from "@/utils/username";
import { UserRepository } from "@/repositories/user.repo";
import { UsernameTakenError, ValidationError } from "@/errors/domain.error";
import { CreateUserDto, UserResponseDto } from "@/dto/user.dto";

export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async createUser(input: CreateUserDto): Promise<UserResponseDto>  {
    const username = input.username;
    const password = input.password;

    if (!username || !password) {
      throw new ValidationError();
    }

    const pwdCheck = validatePassword(password);
    if (!pwdCheck.ok) {
      throw new ValidationError();
    }

    const usernameNormalized = normalizeUsername(username);
    const userId = randomUUID();

    const reserved = await this.repo.reserveUsername(usernameNormalized, userId);
    if (!reserved) {
      throw new UsernameTakenError()
    }

    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });

    await this.repo.saveUser({
      id: userId,
      username,
      username_normalized: usernameNormalized,
      password_hash: passwordHash,
      created_at: new Date().toISOString(),
    });

    return { 
        id: userId, 
        username: username.trim() 
    };
  }
}
