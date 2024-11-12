import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  AddOtherInfoFormType,
  SignUpFormType,
  UserType,
} from "../../types/userType";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";
import {
  addUserOtherInfo,
  createUser,
  loginUser,
  logOutUser,
} from "../userApis";
import { setAuthToken, setTemporaryToken } from "../../utils/auth";
import { setRole } from "../../utils/role";
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
    onSettled: (data, error) => {
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      }
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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      Cookies.remove("token");
      queryClient.removeQueries();
      navigate({ to: "/" });
    },
  });
}
