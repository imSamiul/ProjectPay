import axios from "axios";
import { getAuthToken } from "../utils/auth";

const MONGOOSE_URL = "http://localhost:4000/manager";
const defaultOptions = {
  baseURL: MONGOOSE_URL,
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

// GET:Manger
// get all projects for manager

export async function getManagerProjects({ pageParam }: { pageParam: number }) {
  try {
    const response = await instance.get("/projects", {
      params: {
        pageParam,
        limit: 10,
      },
    });

    return response.data.projects;
  } catch (error) {
    console.log("Error loading all projects", error);
    throw error;
  }
}
