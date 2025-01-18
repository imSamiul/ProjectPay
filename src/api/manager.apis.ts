import { getErrorMessage } from '../utils/errorHandler';
import { instance } from './instance.api';

// GET: get all projects for manager

export const managerApi = {
  getManagerProjects: async ({ pageParam }: { pageParam: number }) => {
    try {
      const response = await instance.get('/manager/projects', {
        params: {
          pageParam,
          limit: 10,
        },
      });

      return response.data.projects;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};
