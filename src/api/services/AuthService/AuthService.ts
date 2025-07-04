import { httpClient } from 'api/services/httpClient';
import { localStorageService } from 'utils/localStorageService';
import type { AuthResponse, LoginDto, RegisterDto } from './types';
import { useUserStore } from 'store';

export const AuthService = {
  async login(data: LoginDto): Promise<AuthResponse> {
    const res = await httpClient.post<AuthResponse>('/auth/local/login', data);
    localStorageService.setAccessToken(res.data.access_token);
    return res.data;
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const res = await httpClient.post<AuthResponse>(
      '/auth/local/register',
      data,
    );
    localStorageService.setAccessToken(res.data.access_token);
    return res.data;
  },

  async refreshToken() {
    const res = await httpClient.get<AuthResponse>('/auth/refresh');
    localStorageService.setAccessToken(res.data.access_token);
    return res.data;
  },

  async logout() {
    await httpClient.post('/auth/logout');
    localStorageService.removeAccessToken();
    useUserStore.getState().clearUser();
  },
};
