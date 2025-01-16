import axios from 'axios';
import {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
  User,
} from '../types/auth.types';
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '../utils/auth';

// Base API URL from environment variables
const API_URL = `${import.meta.env.VITE_BASE_URL}/api`;

// Create an Axios instance with default configurations
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Automatically include cookies (refresh token)
  headers: { 'Content-Type': 'application/json' },
});

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await instance.post<AuthResponse>(
      '/auth/login',
      credentials,
    );
    return data;
  },
  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    console.log(credentials);

    const { data } = await instance.post<AuthResponse>(
      '/auth/signup',
      credentials,
    );
    return data;
  },
  logout: async () => {
    await instance.post('/auth/logout');
  },
  refreshToken: async (): Promise<{ accessToken: string }> => {
    const { data } = await instance.post('/auth/refresh-token');
    return data;
  },
  getUser: async (): Promise<User> => {
    const { data } = await instance.get('/users/me');
    return data.user;
  },
};

// Request Interceptor: Attach Access Token
instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers['x-auth-token'] = `${token}`;
  }
  return config;
});

// Response Interceptor: Handle Token Expiry
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest.config._retry) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await authApi.refreshToken();
        setAccessToken(accessToken); // Update the access token in localStorage
        originalRequest.headers['x-auth-token'] = `${accessToken}`; // Retry the original request
        return instance(originalRequest);
      } catch (refreshError) {
        clearAccessToken(); // Clear the access token from localStorage
        window.location.href = '/'; // Redirect to login page
        console.error('Failed to refresh token:', refreshError);
        throw Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
export { instance };
