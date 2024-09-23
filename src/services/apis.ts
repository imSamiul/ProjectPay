import axios from "axios";

import { UserType } from "../types/userType";

const BASE_URL = "http://localhost:3001/user";
const MONGOOSE_URL = "http://localhost:4000";

// GET:
export async function getProjectOverview() {
  const response = await fetch(`${BASE_URL}/projects`);
  return response.json();
}
export async function getClientList() {
  return (await axios.get(`${MONGOOSE_URL}/client`)).data;
}

// POST:
export async function createUser(userSignUpObj: UserType) {
  return (await axios.post(`${MONGOOSE_URL}/user/signUp`, userSignUpObj)).data;
}
export async function loginUser(userLoginObj: UserType) {
  return (await axios.post(`${MONGOOSE_URL}/user/login`, userLoginObj)).data;
}
