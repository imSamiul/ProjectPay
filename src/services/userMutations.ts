import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUser, loginUser } from "./apis";
import { UserType } from "../types/userType";

import { setAuthToken } from "../utils/auth";
import { useNavigate } from "@tanstack/react-router";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userObj: UserType) => createUser(userObj),
    onSuccess: (data) => {
      setAuthToken(data.token);
      navigate({ to: "/appLayout" });
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

export function useLoginUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userLoginObj: UserType) => loginUser(userLoginObj),
    onSuccess: (data) => {
      setAuthToken(data.token);
      navigate({ to: "/appLayout" });
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
