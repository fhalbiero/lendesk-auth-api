export type CreateUserDto = {
  username: string;
  password: string;
}

export type UserResponseDto = {
  id: string;
  username: string;
}

export type User = {
  id: string;
  username: string;
  username_normalized: string;
  password_hash: string;
  created_at: string;
}