import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdmin, promoteUser } from "@/requests/userRequests";
import { authKeys } from "./authQueries";

// User Mutations
export function useCreateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, email }: { username: string; email: string }) =>
      createAdmin(username, email),
    onSuccess: () => {
      // Invalidate any relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function usePromoteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => promoteUser(email),
    onSuccess: (updatedUser) => {
      // If the promoted user is the current user, invalidate current user query
      const currentUser = queryClient.getQueryData<{ email: string }>(
        authKeys.user,
      );
      if (currentUser && currentUser.email === updatedUser.email) {
        queryClient.invalidateQueries({ queryKey: authKeys.user });
      }

      // Invalidate any other relevant queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
