import { API_VERSION, SERVER_URL } from "@/env";
import axios, { AxiosError, isAxiosError } from "axios";
import type { User as UserSchema } from "@/requests/schemas/userSchemas";
import type { User } from "@/types/user";
import { redirect } from "next/navigation";

const LOGIN_LINK_REQUEST_URI = `${SERVER_URL}/${API_VERSION}/auth/login`;
const REGISTER_URI = `${SERVER_URL}/${API_VERSION}/auth/register`;
const CURRENT_USER_URI = `${SERVER_URL}/${API_VERSION}/`;

export async function registerUser(
  username: string,
  email: string,
): Promise<number> {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("email", email);
  const response = await axios({
    method: "POST",
    url: REGISTER_URI,
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.status;
}

export async function requestLoginLink(email: string): Promise<number> {
  const params = new URLSearchParams();
  params.append("email", email);
  const response = await axios({
    method: "POST",
    url: LOGIN_LINK_REQUEST_URI,
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.status;
}

export async function requestCurrentUser(): Promise<User> {
  try {
    const response = await axios<UserSchema>({
      method: "GET",
      url: CURRENT_USER_URI,
      withCredentials: true,
    });
    return {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      accountType: response.data.account_type,
    };
  } catch (e) {
    if (isAxiosError(e)) {
      console.error(e)
      switch (e.response?.status) {
        case 401:
          redirect("/login");
          break;
        default:
          redirect("/login");
      }
    }
  }
}
