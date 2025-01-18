import axios from 'axios';
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '../utils/auth';
import { authApi } from './auth.api';

// Base API URL from environment variables
const API_URL = `${import.meta.env.VITE_BASE_URL}/api`;

// Create an Axios instance with default configurations
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Automatically include cookies (refresh token)
  headers: { 'Content-Type': 'application/json' },
});

// Request Interceptor: Attach Access Token
instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers['x-auth-token'] = `${token}`;
  }
  return config;
});
export { instance };
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
