import type { Task } from 'types/tasks';
import { httpClient } from '../httpClient';
import type {
  CreateTaskPayload,
  GetTasksParams,
  PaginatedResponse,
  UpdateTaskPayload,
} from './types';

export const taskService = {
  async getTasks(params: GetTasksParams, signal?: AbortSignal) {
    return httpClient.get<PaginatedResponse<Task>>('/tasks', {
      params: {
        order: params.order,
        sortBy: params.sortBy,
        per_page: params.per_page,
        page: params.page,
        search: params.search,
      },
      signal,
    });
  },

  async getTaskById(taskId: string) {
    return httpClient.get<Task>(`/tasks/${taskId}`);
  },

  async createTask(payload: CreateTaskPayload): Promise<Task> {
    return httpClient.post('/tasks', payload);
  },

  async updateTask(taskId: string, payload: UpdateTaskPayload): Promise<Task> {
    return httpClient.patch(`/tasks/${taskId}`, payload);
  },

  async deleteTask(taskId: string): Promise<void> {
    return httpClient.delete(`/tasks/${taskId}`);
  },
};
