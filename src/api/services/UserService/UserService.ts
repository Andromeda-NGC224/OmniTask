import { httpClient } from 'api/services/httpClient';
import type { User, UpdateUserDto } from './types';

export const UserService = {
  async getMe(): Promise<User> {
    const res = await httpClient.get<User>('/users/me');
    return res.data;
  },

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const res = await httpClient.patch<User>(`/users/${id}`, data);
    return res.data;
  },

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await httpClient.post<{ avatarUrl: string }>(
      '/users/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res.data;
  },
};
