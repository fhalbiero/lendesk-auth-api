export function usernameUniqueKey(usernameNormalized: string) {
  return `user:unique-username:${usernameNormalized}`;
}

export function userKey(userId: string) {
  return `user:${userId}`;
}
