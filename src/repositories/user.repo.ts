import Redis from "ioredis";
import { usernameUniqueKey, userKey } from "@/utils/redis-keys";

export type UserRecord = {
  id: string;
  username: string;
  username_normalized: string;
  password_hash: string;
  created_at: string;
};

export class UserRepository {
  constructor(private readonly redis: Redis) {}

  async reserveUsername(usernameNormalized: string, userId: string): Promise<boolean> {
    const key = usernameUniqueKey(usernameNormalized);
    const res = await this.redis.set(key, userId, "NX");
    return res === "OK";
  }

  async getUserIdByUsername(usernameNormalized: string): Promise<string | null> {
    return this.redis.get(usernameUniqueKey(usernameNormalized));
  }

  async saveUser(user: UserRecord): Promise<void> {
    await this.redis.hset(userKey(user.id), user);
  }

  async getPasswordHash(userId: string): Promise<string | null> {
    const data = await this.redis.hgetall(userKey(userId));
    return data.password_hash || null;
  }
}
