import axios from "axios";
import { getAuthToken } from "../utils/auth";
import { UserType } from "../types/userType";
import { getErrorMessage } from "../utils/errorHandler";

const apiUrl = `${import.meta.env.VITE_BASE_API_URL}/user`;

const defaultOptions = {
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use((config) => {
  const TOKEN = getAuthToken();
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
});

// GET: get user details
export async function fetchUserDetails() {
  try {
    const response = await instance.get(`${apiUrl}/me`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// POST: create new user
export async function createUser(userSignUpObj: UserType) {
  try {
    const response = await instance.post(`${apiUrl}/signUp`, userSignUpObj);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
// POST: login user
export async function loginUser(userLoginObj: UserType) {
  try {
    const response = await instance.post(`${apiUrl}/login`, userLoginObj);
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
