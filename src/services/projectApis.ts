import axios from "axios";
import { getAuthToken } from "../utils/auth";
import { ProjectType } from "../types/projectType";

const MONGOOSE_URL = "http://localhost:4000/projects";
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

// POST:project
// create new project
export async function createNewProject(projectObject: ProjectType) {
  try {
    const response = await instance.post("/create", projectObject);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

// GET:Project
// export async function getProjectOverview() {
//   const response = await fetch(`${BASE_URL}/projects`);
//   return response.json();
// }