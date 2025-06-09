import type { Task } from 'types/tasks';
import { httpClient } from './httpClient';
import type {
  CreateTaskPayload,
  GetTasksParams,
  GetTasksResponse,
  UpdateTaskPayload,
} from './types';

export const taskService = {
  async getTasks(params: GetTasksParams): Promise<GetTasksResponse> {
    const response = await httpClient.get<GetTasksResponse>('/task', {
      params: {
        order: params.order ?? 'desc',
        sortBy: params.sortBy ?? 'title',
        per_page: params.per_page ?? 10,
        page: params.page ?? 1,
        search: params.search ?? '',
      },
    });
    return response.data;
  },

  async getTaskById(taskId: string): Promise<Task> {
    const response = await httpClient.get<Task>(`/task/${taskId}`);
    return response.data;
  },

  async createTask(payload: CreateTaskPayload): Promise<Task> {
    const response = await httpClient.post<Task>('/task', payload);
    return response.data;
  },

  async updateTask(taskId: string, payload: UpdateTaskPayload): Promise<Task> {
    const response = await httpClient.put<Task>(`/task/${taskId}`, payload);
    return response.data;
  },

  async deleteTask(taskId: string): Promise<void> {
    await httpClient.delete(`/task/${taskId}`);
  },
};
