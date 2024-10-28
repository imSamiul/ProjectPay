import axios from "axios";
import { getAuthToken } from "../utils/auth";
import {
  ProjectType,
  UpdateProjectStatusType,
  UpdateProjectType,
} from "../types/projectType";
import { getErrorMessage } from "../utils/errorHandler";

const apiUrl = `${import.meta.env.VITE_BASE_API_URL}/projects`;

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

// GET: get project details
export async function getProjectDetails(projectCode: string) {
  try {
    const response = await instance.get(`/details/${projectCode}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// GET: search project
export async function searchProject(searchString: string) {
  try {
    const response = await instance.get("/search", {
      params: {
        q: searchString,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// POST:create new project
export async function createNewProject(projectObject: ProjectType) {
  try {
    const response = await instance.post("/create", projectObject);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// PATCH:update project status
export async function updateProjectStatus(
  updatedStatusObj: UpdateProjectStatusType,
) {
  try {
    const response = await instance.patch(
      `/updateProjectStatus/${updatedStatusObj.projectCode}`,
      {
        status: updatedStatusObj.status,
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
// PATCH: update project
export async function apiUpdateProjectDetails(
  projectObject: UpdateProjectType,
) {
  try {
    const response = await instance.patch(
      `/updateProjectDetails/${projectObject.projectCode}`,
      projectObject,
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// DELETE: delete project
export async function deleteProject(projectId: string) {
  try {
    const response = await instance.delete(`/delete/${projectId}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
