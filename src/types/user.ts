import type { UserSchema } from "@/requests/schemas/userSchemas";

export type User = {
  id: string;
  username: string;
  email: string;
  accountType: "admin" | "user";
};

export function userFromSchema(schema: UserSchema): User {
  return {
    id: schema.id,
    username: schema.username,
    email: schema.email,
    accountType: schema.account_type,
  };
}

export function userToSchema(user: User): UserSchema {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    account_type: user.accountType,
  };
}
