import { API_CONFIG } from 'api/config';

import axios, { type AxiosInstance } from 'axios';
import { localStorageService } from 'utils';
import { AuthService } from './AuthService/AuthService';
import { EAppRoutes } from 'routes/config';
import { useNavigate } from 'react-router-dom';

export const createHttpClient = (): AxiosInstance => {
  const instance = axios.create(API_CONFIG);

  // Request интерсептор
  instance.interceptors.request.use((config) => {
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // Response интерсептор
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes('/refresh')
      ) {
        originalRequest._retry = true;
        try {
          await AuthService.refreshToken();

          return instance(originalRequest);
        } catch {
          AuthService.logout();
          const navigate = useNavigate();
          navigate(EAppRoutes.LOGIN);
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const httpClient = createHttpClient();
