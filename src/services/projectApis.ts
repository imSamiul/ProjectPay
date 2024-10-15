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

// GET:Project
// get project details
export async function getProjectDetails(projectCode: string) {
  try {
    const response = await instance.get(`/details/${projectCode}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
}

// search project
export async function searchProject(searchString: string) {
  try {
    const response = await instance.get("/search", {
      params: {
        q: searchString,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching project:", error);
    throw error;
  }
}

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

// PATCH:project

// DELETE:project
