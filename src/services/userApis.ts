import axios from "axios";

import {
  AddOtherInfoFormType,
  SignUpFormType,
  UserType,
} from "../types/userType";
import { getErrorMessage } from "../utils/errorHandler";

const apiUrl = `${import.meta.env.VITE_BASE_API_URL}`;

const defaultOptions = {
  baseURL: `${apiUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const instance = axios.create(defaultOptions);

// instance.interceptors.request.use((config) => {
//   const TOKEN = getAuthToken();
//   if (TOKEN) {
//     config.headers.Authorization = `Bearer ${TOKEN}`;
//   }
//   return config;
// });

// GET: get user details
export async function fetchUserDetails() {
  try {
    const response = await instance.get(`/user/me`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// POST: create new user
export async function createUser(userSignUpObj: SignUpFormType) {
  try {
    const response = await instance.post(`/auth/signup`, userSignUpObj);
    return response;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
// POST: Add user other info
export async function addUserOtherInfo(userOtherInfoObj: AddOtherInfoFormType) {
  try {
    const response = await instance.post(
      `/user/addOtherInfo`,
      userOtherInfoObj,
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
// POST: login user
export async function loginUser(userLoginObj: UserType) {
  try {
    const response = await instance.post(`${apiUrl}/auth/login`, userLoginObj);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
// POST: logout user
export async function logOutUser() {
  try {
    const response = await instance.post(`${apiUrl}/logout`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// PATCH:user

// DELETE:user
