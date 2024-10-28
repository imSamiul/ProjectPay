import axios from "axios";
import { getAuthToken } from "../utils/auth";
import { getErrorMessage } from "../utils/errorHandler";

const apiUrl = `${import.meta.env.VITE_BASE_API_URL}/manager`;
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

// GET: get all projects for manager

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
    throw new Error(getErrorMessage(error));
  }
}
