import { useMutation, useQuery } from "@tanstack/react-query";
import {
  registerUser,
  requestLoginLink,
  requestCurrentUser,
} from "@/requests/authRequests";
import type { User } from "@/types/user";
import { redirect } from "next/navigation";
import type { AxiosError } from "axios";

// Keys for query caching
export const authKeys = {
  user: ["currentUser"] as const,
};

// Current User Query
export function useCurrentUser() {
  return useQuery<User>({
    queryKey: authKeys.user,
    queryFn: () => requestCurrentUser(),
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors
      if (
        (error as AxiosError).response?.status === 401 ||
        (error as AxiosError).response?.status === 403
      ) {
        redirect("/login");
      }
      return failureCount < 3;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Auth Mutations
export function useRegisterUser(username: string, email: string) {
  return useMutation({
    mutationFn: () => registerUser(username, email),
  });
}

export function useRequestLoginLink(email: string) {
  return useMutation({
    mutationFn: () => requestLoginLink(email),
  });
}
