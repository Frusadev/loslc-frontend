import { API_VERSION, SERVER_URL } from "@/env";
import axios from "axios";
import type { UserSchema } from "./schemas/userSchemas";
import { type User, userFromSchema } from "@/types/user";

const ADMIN_CREATE_URI = `${SERVER_URL}/${API_VERSION}/admin/`;
const USER_PROMOTE_URI = `${SERVER_URL}/${API_VERSION}/user/promote`;

export async function createAdmin(username: string, email: string) {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("email", email);
  const axiosResponse = await axios<UserSchema>({
    method: "POST",
    url: ADMIN_CREATE_URI,
    withCredentials: true,
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return userFromSchema(axiosResponse.data);
}

export async function promoteUser(email: string): Promise<User> {
  const axiosResponse = await axios<UserSchema>({
    method: "POST",
    withCredentials: true,
    url: USER_PROMOTE_URI,
    params: {
      email: email,
    },
  });
  return userFromSchema(axiosResponse.data);
}
