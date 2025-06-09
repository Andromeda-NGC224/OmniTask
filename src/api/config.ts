import { API_BASE_URL } from 'config/apiConfig';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};
