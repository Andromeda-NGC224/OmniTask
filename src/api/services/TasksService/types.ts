import { TaskStatus } from 'types/tasks';
import type { SerializedEditorState } from 'lexical';

export interface GetTasksParams {
  order?: 'asc' | 'desc';
  sortBy?: string;
  per_page: number;
  page: number;
  search?: string;
  filter?: string | null;
}

export interface PaginatedResponse<DataType> {
  data: DataType[];
  total: number;
  page: number;
  per_page: number;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  richEditorData?: SerializedEditorState;
  status?: TaskStatus;
}

export interface TasksStatsResponse {
  totalTasks: number;
  tasksByStatus: {
    status: string;
    count: string;
  }[];
}
