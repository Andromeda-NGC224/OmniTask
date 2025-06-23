import type { Task } from 'types/tasks';
import { httpClient } from '../httpClient';
import type {
  CreateTaskPayload,
  GetTasksParams,
  PaginatedResponse,
  UpdateTaskPayload,
} from './types';

export const TasksService = {
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

  async createTask(payload: CreateTaskPayload) {
    return httpClient.post<Task>('/tasks', payload);
  },

  async updateTask(taskId: string, payload: UpdateTaskPayload) {
    return httpClient.patch<Task>(`/tasks/${taskId}`, payload);
  },

  async deleteTask(taskId: string): Promise<void> {
    return httpClient.delete(`/tasks/${taskId}`);
  },
};
