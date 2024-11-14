import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddOtherInfoFormType,
  LoginFormType,
  SignUpFormType,
} from "../../types/userType";
import { useNavigate } from "@tanstack/react-router";

import {
  addUserOtherInfo,
  createUser,
  loginUser,
  logOutUser,
} from "../userApis";
import {
  removeAuthToken,
  setAuthToken,
  setTemporaryToken,
} from "../../utils/auth";
import { removeRole, setRole } from "../../utils/role";
import { toast } from "react-toastify";

// create user
export function useCreateUser() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userObj: SignUpFormType) => createUser(userObj),
    onSuccess: (data) => {
      if (data.status === 208) {
        toast.warning(data.data.message);
      }
      console.log(data);
      setTemporaryToken(data.data.temporaryToken);
      navigate({ to: "/signUp/addOtherInfo" });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
// Add other info
export function useAddUserOtherInfo() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userObj: AddOtherInfoFormType) => addUserOtherInfo(userObj),
    onSuccess: (data) => {
      setAuthToken(data.token);
      setRole(data.user.role);
      if (data.user.role === "project_manager") {
        navigate({ to: "/projectManager/managerOverview" });
      }
      // if (data.user.userType === "client") {
      //   navigate({ to: "/client/clientOverview" });
      // }
      else {
        navigate({ to: "/" });
      }
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data, error) => {
      console.log(data, error);
      await queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    },
  });
}
// login user
export function useLoginUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userLoginObj: LoginFormType) => loginUser(userLoginObj),
    onSuccess: (data) => {
      setAuthToken(data.token);
      setRole(data.user.role);
      if (data.user.role === "project_manager") {
        navigate({ to: "/projectManager/managerOverview" });
      } else {
        navigate({ to: "/" });
      }
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async (data, error) => {
      console.log(data, error);
      await queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    },
  });
}
// logout user
export function useLogOutUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      removeAuthToken();
      removeRole();
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
      navigate({ to: "/" });
    },
  });
}
