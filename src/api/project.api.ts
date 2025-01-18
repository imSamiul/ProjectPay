import {
  ProjectType,
  UpdateProjectStatusType,
  UpdateProjectType,
} from '../types/projectType';
import { getErrorMessage } from '../utils/errorHandler';
import { instance } from './instance.api';

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
  updateProjectStatus: async (updatedStatusObj: UpdateProjectStatusType) => {
    try {
      const response = await instance.patch(
        `/projects/updateProjectStatus/${updatedStatusObj.projectCode}`,
        {
          status: updatedStatusObj.status,
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  updateProjectDetails: async (projectObject: UpdateProjectType) => {
    try {
      const response = await instance.patch(
        `/projects/updateProjectDetails/${projectObject.projectCode}`,
        projectObject,
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  searchProject: async (searchString: string) => {
    try {
      const response = await instance.get('/projects/search', {
        params: {
          q: searchString,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  deleteProject: async (projectId: string) => {
    try {
      const response = await instance.delete(`/projects/delete/${projectId}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};
