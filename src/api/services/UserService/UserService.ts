import { httpClient } from 'api/services/httpClient';
import type { UpdateUserDto } from './types';

export const UserService = {
  async getMe() {
    return httpClient.get('/users/me');
  },

  async updateUser(id: string, data: UpdateUserDto) {
    return httpClient.patch(`/users/${id}`, data);
  },
};
