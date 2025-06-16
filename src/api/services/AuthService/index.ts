import { httpClient } from 'api/services/httpClient';
import { localStorageService } from 'utils/localStorageService';

export interface AuthResponse {
  access_token: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

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

  async getMe() {
    return httpClient.get('/users/me');
  },

  async refreshToken() {
    const res = await httpClient.post<AuthResponse>('/auth/refresh', {});
    localStorageService.setAccessToken(res.data.access_token);
    return res.data;
  },

  logout() {
    localStorageService.removeAccessToken();
  },
};
