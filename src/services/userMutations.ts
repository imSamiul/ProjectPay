import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUser, loginUser } from "./apis";
import { UserType } from "../types/userType";
import { useNavigate } from "react-router";
import { setAuthToken } from "../utils/auth";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userObj: UserType) => createUser(userObj),
    onSuccess: (data) => {
      setAuthToken(data.token);
      navigate("/");
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
      navigate("/");
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
