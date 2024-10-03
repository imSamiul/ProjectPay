import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { createUser, loginUser, logOutUser } from "./apis";
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
      navigate({ to: "/" });
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
      navigate({ to: "/" });
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
// logout user
export function useLogOutUser() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      Cookies.remove("token");
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
