import { AxiosResponse } from 'axios';
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
  getProjectDetails: async (projectCode: string): Promise<ProjectType> => {
    try {
      const { data }: AxiosResponse<ProjectType> = await instance.get(
        `/projects/details/${projectCode}`,
      );
      return data;
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
  // send project invitation
  sendProjectInvitation: async (projectId: string, clientId: string) => {
    try {
      const response = await instance.patch(`/projects/invite/${projectId}`, {
        clientId,
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  cancelProjectInvitation: async (projectId: string, clientId: string) => {
    try {
      const response = await instance.patch(
        `/projects/cancelInvitation/${projectId}`,
        {
          clientId,
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  deleteClientFromProject: async (projectId: string, clientId: string) => {
    try {
      const response = await instance.patch(
        `/projects/removeClient/${projectId}`,
        {
          clientId,
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};
