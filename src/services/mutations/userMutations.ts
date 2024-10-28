import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { UserType } from "../../types/userType";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";
import { createUser, loginUser, logOutUser } from "../userApis";

// create user
export function useCreateUser() {
  const auth = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userObj: UserType) => createUser(userObj),
    onSuccess: (data) => {
      auth.login(data.token, data.user);
      if (data.user.userType === "project manager") {
        navigate({ to: "/projectManager/managerOverview" });
      } else {
        navigate({ to: "/" });
      }
    },
  });
}
// login user
export function useLoginUser() {
  const auth = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userLoginObj: UserType) => loginUser(userLoginObj),
    onSuccess: (data) => {
      auth.login(data.token, data.user);
      if (data.user.userType === "project manager") {
        navigate({ to: "/projectManager/managerOverview" });
      } else {
        navigate({ to: "/" });
      }
    },
  });
}
// logout user
export function useLogOutUser() {
  return useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      Cookies.remove("token");
    },
  });
}
