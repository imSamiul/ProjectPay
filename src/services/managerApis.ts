import axios from 'axios';

import { getErrorMessage } from '../utils/errorHandler';
import { getAccessToken } from '../utils/auth';

const apiUrl = `${import.meta.env.VITE_BASE_URL}/manager`;
const defaultOptions = {
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
};
const instance = axios.create(defaultOptions);

instance.interceptors.request.use((config) => {
  const TOKEN = getAccessToken();
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
});

// GET: get all projects for manager

export async function getManagerProjects({ pageParam }: { pageParam: number }) {
  try {
    const response = await instance.get('/projects', {
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
