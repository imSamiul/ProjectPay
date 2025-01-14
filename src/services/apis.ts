import axios from "axios";
import Cookies from "js-cookie";

import { UserType } from "../types/userType";

const MONGOOSE_URL = "http://192.168.31.207:4000";

// GET:User
// get user details
export async function fetchUserDetails() {
  try {
    const TOKEN = Cookies.get("token") || "";
    const response = await axios.get(`${MONGOOSE_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    // Check if the error is an AxiosError
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data); // Access the response property safely
      return error.response;
    }

    // Handle unknown errors
    console.error("An unexpected error occurred:", error);
    throw new Error("Failed to fetch user details");
  }
}

// POST:user
// create new user
export async function createUser(userSignUpObj: UserType) {
  return (await axios.post(`${MONGOOSE_URL}/user/signUp`, userSignUpObj)).data;
}
// login user
export async function loginUser(userLoginObj: UserType) {
  return (await axios.post(`${MONGOOSE_URL}/user/login`, userLoginObj)).data;
}
// logout user
export async function logOutUser() {
  const TOKEN = Cookies.get("token") || "";
  const response = await axios({
    method: "POST",
    baseURL: MONGOOSE_URL,
    url: "/user/logout",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}
