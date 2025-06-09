import { API_CONFIG } from 'api/config';
import { errorHandler } from 'api/utils';
import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { localStorageService } from 'utils';

export const createHttpClient = (): AxiosInstance => {
  const instance = axios.create(API_CONFIG);

  // Request интерсептор
  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      const acceptLanguage = localStorageService.getLanguage();
      if (acceptLanguage) {
        config.headers['Accept-Language'] = acceptLanguage;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response интерсептор
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      errorHandler(error);
      return Promise.reject(error);
    },
  );

  return instance;
};

export const httpClient = createHttpClient();
