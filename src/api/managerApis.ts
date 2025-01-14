import { getErrorMessage } from '../utils/errorHandler';
import { getAccessToken } from '../utils/auth';
import { instance } from './auth.api';

instance.interceptors.request.use((config) => {
  const TOKEN = getAccessToken();
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
});

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
