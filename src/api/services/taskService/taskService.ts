import type { Task } from 'types/tasks';
import { httpClient } from '../httpClient';
import type {
  CreateTaskPayload,
  GetTasksParams,
  GetTasksResponse,
  UpdateTaskPayload,
} from './types';

export const taskService = {
  async getTasks(
    params: GetTasksParams,
    signal?: AbortSignal,
  ): Promise<GetTasksResponse> {
    return httpClient.get('/task', {
      params: {
        order: params.order ?? 'desc',
        sortBy: params.sortBy ?? 'title',
        per_page: params.per_page ?? 10,
        page: params.page ?? 1,
        search: params.search ?? '',
      },
      signal,
    });
  },

  async getTaskById(taskId: string): Promise<Task> {
    return httpClient.get(`/task/${taskId}`);
  },

  async createTask(payload: CreateTaskPayload): Promise<Task> {
    return httpClient.post('/task', payload);
  },

  async updateTask(taskId: string, payload: UpdateTaskPayload): Promise<Task> {
    return httpClient.put(`/task/${taskId}`, payload);
  },

  async deleteTask(taskId: string): Promise<void> {
    return httpClient.delete(`/task/${taskId}`);
  },
};
