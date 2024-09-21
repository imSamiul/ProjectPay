import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUser } from "./apis";
import { UserType } from "../types/userType";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userObj: UserType) => createUser(userObj),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data, error) => {
      console.log(data, error);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
