export interface GetTasksParams {
  order?: 'asc' | 'desc';
  sortBy?: string;
  per_page?: number;
  page?: number;
  search?: string;
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
  completed?: boolean;
}
