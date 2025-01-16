import {
  ProjectType,
  UpdateProjectStatusType,
  UpdateProjectType,
} from '../types/projectType';
import { getErrorMessage } from '../utils/errorHandler';

import { instance } from './auth.api';

export const projectApi = {
  createNewProject: async (projectObject: ProjectType) => {
    try {
      const response = await instance.post('/projects/create', projectObject);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  getProjectDetails: async (projectCode: string) => {
    try {
      const response = await instance.get(`/projects/details/${projectCode}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

// GET: search project
export async function searchProject(searchString: string) {
  try {
    const response = await instance.get('/search', {
      params: {
        q: searchString,
      },
    });
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
